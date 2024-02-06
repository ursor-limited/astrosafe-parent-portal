"use client";

import { Stack, keyframes } from "@mui/system";
import Play from "@/images/play.svg";
import Sync from "@/images/icons/Sync.svg";
import FullScreenIcon from "@/images/icons/FullScreen.svg";
import NormalScreenIcon from "@/images/icons/NormalScreen.svg";
import KiteMark from "@/images/kiteMark.svg";
import { useCallback, useEffect, useState } from "react";
import { PALETTE, Typography } from "ui";
import { useWindowSize } from "usehooks-ts";

const BEZIER = "cubic-bezier(.18,3.03,.35,-0.38)";

const VIDEO_DISABLINGS = ["fs", "rel"];

const BORDER_RADIUS = "14px";

export const PADDING_TOP = "120px";

const Player = (props: {
  url: string;
  playingCallback?: (playing: boolean) => void;
  provider: "youtube" | "vimeo";
  width: number;
  height: number;
  top: string;
  setDuration: (duration: number) => void;
  startTime?: number;
  endTime?: number;
  showUrlBar?: boolean;
  setFullscreen?: (fs: boolean) => void;
  noGlow?: boolean;
  noKitemark?: boolean;
  mobile?: boolean;
}) => {
  const [overlayHovering, setOverlayHovering] = useState<boolean>(false);
  const [starHovering, setStarHovering] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  useEffect(
    () => props.playingCallback?.(playing),
    [playing, props.playingCallback]
  );
  useEffect(() => {
    (playing || overlayHovering) &&
      props.mobile &&
      setTimeout(() => setOverlayHovering(false), 3000);
  }, [props.mobile, props.provider, playing, overlayHovering]);

  const [youtubePauseOverlay, setYoutubePauseOverlay] =
    useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);

  /////////////////////////
  /* YOUTUBE specific */
  /////////////////////////
  function onPlayerReady(event: any) {
    setPlayer(event.target);
    setPlaying(false);
  }

  function onPlayerStateChange(event: any) {
    //@ts-ignore
    const videoStatuses = Object.entries(window.YT.PlayerState);

    const status = //@ts-ignore
      videoStatuses.find((status) => status[1] === event.data)[0];
    status === "PLAYING" && setPlaying(true);
    setTimeout(
      () => event.target.getPlayerState?.() === 2 && setPlaying(false),
      500 // prevent pausing if this is a seek instead of an actual pause
    );
    if (status !== "PLAYING") {
      setYoutubePauseOverlay(true);
      status === "ENDED" && setEnded(true);
    } else {
      setTimeout(() => setYoutubePauseOverlay(false), 500);
    }
  }

  // useEffect(
  //   () => setYoutubePauseOverlay(provider === "youtube" && !playing),
  //   [playing, provider]
  // );

  const onYoutubeReady = () => {
    //@ts-ignore
    new window.YT.Player("player", {
      // height: "390",
      // width: "640",
      //videoId,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        // onApiChange,
      },
    });
  };

  const [player, setPlayer] = useState<any | undefined>(undefined);
  function loadVideo() {
    if (url?.includes("youtube")) {
      //@ts-ignore
      window.YT.ready(onYoutubeReady);
    } else {
      //@ts-ignore
      const playah = new Vimeo.Player("player");
      playah.on("pause", () => setPlaying(false));
      playah.on("play", () => setPlaying(true));
      setPlayer(playah);
    }
    setPlaying(false);
  }

  /////////////////////////
  /////////////////////////
  /////////////////////////
  /////////////////////////
  
  const [url, setUrl] = useState<string | undefined>(undefined);
  useEffect(
    () =>
      setUrl(
        props.url?.includes("youtube")
          ? // ? `${props.url.replace(
            //     "youtube.com"
            //     "youtube-nocookie.com"
            //   )}?enablejsapi=1&cc_load_policy=1&modestbranding=1&${
            `${props.url}?enablejsapi=1&cc_load_policy=1&modestbranding=1&${
              // don't use nocookie, as it forces the youtube logo in there
              props.startTime ? `start=${props.startTime}&` : ""
            }${
              props.endTime ? `end=${props.endTime}&` : ""
            }${VIDEO_DISABLINGS.map((d) => `${d}=0`).join("&")}`
          : props.startTime
          ? `${props.url}#t=${props.startTime}`
          : props.url
      ),
    [props.endTime, props.startTime, props.url]
  );

  const [currentTime, setCurrentTime] = useState<number>(0);
  useEffect(() => {
    if (!player?.getCurrentTime || !playing) return;
    const interval = setInterval(
      () =>
        url?.includes("vimeo")
          ? player.getCurrentTime().then((time: number) => setCurrentTime(time))
          : setCurrentTime(player.getCurrentTime()),
      500
    );
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [player, playing, url]);
  useEffect(() => {
    if (
      (playing && props.endTime && currentTime > props.endTime) ||
      (playing && props.startTime && currentTime < props.startTime)
    ) {
      url?.includes("vimeo")
        ? player?.setCurrentTime(props.startTime ?? 0)
        : player?.seekTo(props.startTime ?? 0);
      url?.includes("vimeo") ? player?.pause() : player?.pauseVideo();
      setPlaying(false);
      setEnded(true);
    }
  }, [props.endTime, currentTime, props.startTime, player]);

  useEffect(() => {
    if (!url) return;
    url.includes("vimeo")
      ? player?.getDuration?.().then?.((d: number) => {
          props.setDuration(d);
        })
      : props.setDuration(player?.getDuration());
  }, [player?.getDuration, url, player?.origin]);

  const removePreviousScript = () => {
    const scripts = document.getElementsByTagName("script");
    const previousScript = [...scripts].find(
      (s) => s.src.includes("youtube") || s.src.includes("vimeo")
    );
    previousScript?.parentNode?.removeChild(previousScript);
  };

  useEffect(() => {
    if (!url || !document) return;
    removePreviousScript();
    var tag = document.createElement("script");
    tag.src = url?.includes("youtube")
      ? "https://www.youtube.com/iframe_api"
      : "https://player.vimeo.com/api/player.js";
    //@ts-ignore
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    tag.onload = loadVideo;
  }, [url, document]);

  const [hasBegunPlaying, setHasBegunPlaying] = useState<boolean>(false);

  const resume = () => {
    console.log("333");
    setHasBegunPlaying(true);
    setEnded(false);
    if (
      url?.includes("youtube") &&
      (player?.playerInfo.playerState === 2 ||
        player?.playerInfo.playerState === 0 || // 0 is the ended
        player?.playerInfo.playerState === 5) // 5 is the non-yet-started
    ) {
      console.log("0ccc");
      player?.playVideo();
      //setPlaying(true);
    } else if (url?.includes("vimeo")) {
      console.log("0-0-0ddddd");
      player?.play();
    }
  };

  const [fullScreen, setFullScreen] = useState<boolean>(false);
  useEffect(() => props.setFullscreen?.(fullScreen), [fullScreen]);

  const handleUserKeyPress = useCallback((event: any) => {
    if (event.code === "Space") {
      resume();
    }
  }, []);

  const [mouseIsOutsideWindow, setMouseIsOutsideWindow] =
    useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const handleMouseEnterWindow = useCallback(() => {
    //setOverallHovering(false);
    setOverlayHovering(true);
    //setTimeout(() => setOverlayHovering(false), [3000]);
  }, []);

  useEffect(() => {
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    return () => {
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [document, handleMouseEnterWindow]);

  const handleMouseLeaveWindow = useCallback(() => {
    //setOverallHovering(false);
    // setOverlayHovering(true);
    // setTimeout(() => setOverlayHovering(false), 3000);
    setMouseIsOutsideWindow(true);
  }, []);

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
    };
  }, [document, handleMouseLeaveWindow]);

  const { width, height } = useWindowSize();

  const [videoWidth, setVideoWidth] = useState<number>(0);
  useEffect(() => {
    const windowAspectRatio = width / height;
    const videoAspectRatio = 16 / 9;
    setVideoWidth(
      windowAspectRatio < videoAspectRatio ? width : height * videoAspectRatio
    );
  }, [width, height]);

  const [videoHeight, setVideoHeight] = useState<number>(0);
  useEffect(() => {
    const windowAspectRatio = width / height;
    const videoAspectRatio = 16 / 9;
    setVideoHeight(
      windowAspectRatio > videoAspectRatio ? height : width / videoAspectRatio
    );
  }, [width, height]);

  return (
    <Stack
      width={fullScreen ? "100vw" : `${props.width}px`}
      height={fullScreen ? "100vh" : `${props.height}px`}
      minWidth={fullScreen ? "100vw" : `${props.width}px`}
      minHeight={fullScreen ? "100vh" : `${props.height}px`}
      marginLeft="auto"
      marginRight="auto"
      left={0}
      right={0}
      spacing="12px"
      onMouseEnter={() => setOverlayHovering(true)}
      onMouseLeave={() => setOverlayHovering(false)}
      onMouseMove={() => setOverlayHovering(true)}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        width={fullScreen ? videoWidth || "100vw" : `${props.width}px`}
        height={fullScreen ? videoHeight || "100vh" : `${props.height}px`}
        boxShadow={!playing ? "0 0 65px rgba(255,255,255,0.2)" : undefined}
        borderRadius={fullScreen ? 0 : BORDER_RADIUS}
        overflow="hidden"
        position="relative"
        sx={{
          cursor: "pointer",
        }}
      >
        <iframe
          onMouseEnter={() => setOverlayHovering(true)}
          onMouseLeave={() => setOverlayHovering(false)}
          id="player"
          title="Player"
          width={fullScreen ? "100%" : props.width}
          height={fullScreen ? "100%" : props.height}
          src={url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
        />
        <Stack
          position="absolute"
          top={0}
          width="100%"
          height="100%"
          sx={{
            //opacity: youtubePauseOverlay ? 1 : 0,
            pointerEvents:
              youtubePauseOverlay || mouseIsOutsideWindow ? undefined : "none",
          }}
          onMouseEnter={() => {
            setOverlayHovering(true);
            setMouseIsOutsideWindow(false);
          }}
          onMouseLeave={() => setOverlayHovering(false)} //@ts-ignore
          //onClick={(event) => iframe?.dispatchEvent(event)}
        />
        <Stack
          position="absolute"
          top={0}
          borderRadius={fullScreen ? undefined : BORDER_RADIUS}
          width="100%"
          height="100%"
          bgcolor={`rgba(0,0,0,${overlayHovering ? 0.6 : 0.72})`}
          sx={{
            transition: "0.2s",
            opacity: ended || !playing ? 1 : 0,
            pointerEvents: playing && !ended ? "none" : undefined,
            backdropFilter: hasBegunPlaying ? "blur(13px)" : undefined,
            //player?.playerInfo?.playerState !== 5 ? "blur(13px)" : undefined, // don't use blur when the playing has not yet been started
          }}
          justifyContent="center"
          alignItems="center"
          onClick={resume}
        >
          <Stack
            sx={{
              transform: `scale(${overlayHovering ? 1.1 : 1})`,
              transition: "0.3s",
              transitionTimingFunction: BEZIER,
            }}
          >
            {ended ? (
              <Sync width={114} height={114} />
            ) : (
              <Play width={114} height={114} />
            )}
          </Stack>
        </Stack>
        <Stack
          position="absolute"
          top={0}
          right={0}
          //right={0}
          width={
            url?.includes("vimeo") ? "62px" : "100%" //overallHovering ? "100%" : 0 //overallHovering && props.playing && props.fullScreen ? "100%" : "80px"
          }
          borderRadius={
            url?.includes("vimeo")
              ? `0 ${BORDER_RADIUS} 0 ${BORDER_RADIUS}`
              : `${BORDER_RADIUS} ${BORDER_RADIUS} 0 0`
          }
          height={url?.includes("vimeo") ? "130px" : "60px"}
          sx={{
            //transform: `translateY(${overallHovering ? 0 : "-60px"})`,
            opacity: overlayHovering && playing ? 1 : 0,
            transition: !overlayHovering || !playing ? "0.2s" : 0,
            transitionDelay: !overlayHovering || !playing ? "0.3s" : 0,
            backdropFilter: "blur(30px)",
            //transitionDelay: "500ms",
            //transitionTimingFunction: "ease-out",
            svg: {
              path: {
                fill: "rgba(255,255,255,0.75)", //PALETTE.font.light,
              },
            },
          }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        />

        <Stack
          position="absolute"
          right={0}
          bottom={0}
          width={
            fullScreen
              ? `${videoWidth * (props.provider === "vimeo" ? 0.33 : 0.2)}px`
              : "130px"
          }
          height={props.provider === "vimeo" ? "60px" : "50px"}
        />
        {!props.noKitemark ? (
          <Stack
            position="absolute"
            left="20px"
            top="20px"
            sx={{
              transform: `rotate(${!playing ? 360 : 0}deg) translateX(${
                !playing ? 0 : -150
              }px)`,
              transformOrigin: "center",
              transition: "1.3s",
              transitionTimingFunction: "ease-out",
              svg: {
                path: {
                  fill: !starHovering
                    ? "rgba(255,255,255,0.8)"
                    : PALETTE.secondary.blue[2],
                  transform: `rotate(${starHovering ? 20 : 0}deg)`,
                  transformOrigin: "center",
                  transition: "1s",
                },
              },
            }}
            flex={1}
            overflow="visible"
            onMouseEnter={() => setStarHovering(true)}
            onMouseLeave={() => setStarHovering(false)}
          >
            <KiteMark
              width={23}
              height={23}
              style={{
                transform: `rotate(${
                  playing ? -540 : starHovering ? 20 : 0
                }deg)`,
                transition: "1s",
              }}
            />
          </Stack>
        ) : null}
        <Stack
          position="absolute"
          top="19px"
          left="55px"
          sx={{
            opacity: starHovering ? 1 : 0,
            transition: "0.8s",
            pointerEvents: "none",
          }}
        >
          <Typography color="rgba(255,255,255)">
            Here at Astro, we&apos;re on a mission to create a safer and more
            delightful internet. 😊
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing="11px"
          position="absolute"
          top="18px"
          right="0px"
          pr="19px"
          sx={{
            opacity: !playing || overlayHovering ? 1 : 0,
            svg: {
              rect: {
                stroke: "rgba(255,255,255,0.5)",
              },
              path: {
                fill: "rgba(255,255,255,0.7)",
              },
            },
          }}
        >
          {props.setFullscreen ? (
            <Stack
              sx={{
                "&:hover": { opacity: 0.6 },
                transition: "0.2s",
              }}
              onClick={() => setFullScreen(!fullScreen)}
            >
              {fullScreen ? (
                <NormalScreenIcon width={24} height={24} />
              ) : (
                <FullScreenIcon width={24} height={24} />
              )}
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Player;
