"use client";

import { Stack, keyframes } from "@mui/system";
import Image from "next/image";
import Play from "@/images/play.svg";
import Sync from "@/images/icons/Sync.svg";
import FullScreenIcon from "@/images/icons/FullScreen.svg";
import NormalScreenIcon from "@/images/icons/NormalScreen.svg";
import KiteMark from "@/images/kiteMark.svg";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PALETTE, Typography } from "ui";
import { useHover } from "react-aria";

const BEZIER = "cubic-bezier(.18,3.03,.35,-0.38)";

const VIDEO_DISABLINGS = ["fs", "rel"];

export const PADDING_TOP = "120px";

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

const fadeOut = keyframes`
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`;

export interface IVideo {
  id: string;
  creatorId: string;
  url: string;
  title: string;
  description?: string;
}

const Player = (props: {
  //playing: boolean;
  //clickCallback: () => void;
  url: string;
  //fullScreen?: boolean;
  //fullScreenCallback?: () => void;
  // captionsCallback: () => void;
  // captionsOn: boolean;
  //preHovering: boolean;
  provider: "youtube" | "vimeo";
  width: number;
  height: number;
  top: string;
  setDuration: (duration: number) => void;
  startTime?: number;
  endTime?: number;
  showUrlBar?: boolean;
  setFullscreen: (fs: boolean) => void;
  //youtubePauseOverlay: boolean;
}) => {
  const [provider, setProvider] = useState<"youtube" | "vimeo" | undefined>(
    undefined
  );
  useEffect(() => setProvider(props.provider), [props.provider]);

  const [overlayHovering, setOverlayHovering] = useState<boolean>(false);
  const [overallHovering, setOverallHovering] = useState<boolean>(false);
  const [starHovering, setStarHovering] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);

  const [youtubePauseOverlay, setYoutubePauseOverlay] =
    useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);

  /////////////////////////
  /* YOUTUBE specific */
  /////////////////////////
  function onPlayerReady(event: any) {
    setPlayer(event.target);
    setPlaying(false);
    //console.log(player?.getDuration());
    //props.setDuration(player?.getDuration());
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
    if (provider === "youtube") {
      //@ts-ignore
      window.YT.ready(onYoutubeReady);
    } else {
      //@ts-ignore
      const playah = new Vimeo.Player("player");
      playah.on("pause", () => setPlaying(false));
      playah.on("play", () => setPlaying(true));
      setPlayer(playah);
    }
  }

  /////////////////////////
  /////////////////////////
  /////////////////////////

  const [currentTime, setCurrentTime] = useState<number>(0);
  useEffect(() => {
    if (!player?.getCurrentTime || !playing) return;
    const interval = setInterval(
      () =>
        props.provider === "vimeo"
          ? player.getCurrentTime().then((time: number) => setCurrentTime(time))
          : setCurrentTime(player.getCurrentTime()),
      500
    );
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [player, playing, props.provider]);
  useEffect(() => {
    if (
      (playing && props.endTime && currentTime > props.endTime) ||
      (playing && props.startTime && currentTime < props.startTime)
    ) {
      props.provider === "vimeo"
        ? player?.setCurrentTime(props.startTime ?? 0)
        : player?.seekTo(props.startTime ?? 0);
      props.provider === "vimeo" ? player?.pause() : player?.pauseVideo();
      setPlaying(false);
      setEnded(true);
    }
  }, [props.endTime, currentTime, props.startTime, player]);

  useEffect(() => {
    props.provider === "vimeo"
      ? player?.getDuration().then((d: number) => {
          props.setDuration(d);
        })
      : props.setDuration(player?.getDuration());
  }, [player?.getDuration()]);

  useEffect(() => {
    if (!provider || !document) return;
    var tag = document.createElement("script");
    tag.src =
      provider === "youtube"
        ? "https://www.youtube.com/iframe_api"
        : "https://player.vimeo.com/api/player.js";
    //@ts-ignore
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    tag.onload = loadVideo;
  }, [provider, document]);

  const resume = () => {
    setEnded(false);
    if (
      provider === "youtube" &&
      (player?.playerInfo.playerState === 2 ||
        player?.playerInfo.playerState === 0 || // 0 is the ended
        player?.playerInfo.playerState === 5) // 5 is the non-yet-started
    ) {
      player?.playVideo();
      //setPlaying(true);
    } else if (provider === "vimeo") {
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

  const [hovering, setHovering] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const [iframe, setIFrame] = useState<HTMLIFrameElement | null>(null);

  // let { hoverProps, isHovered } = useHover({
  //   // onHoverStart: (e) =>
  //   //   setEvents((events) => [...events, `hover start with ${e.pointerType}`]),
  //   // onHoverEnd: (e) =>
  //   //   setEvents((events) => [...events, `hover end with ${e.pointerType}`]),
  // });

  return (
    <Stack
      width={fullScreen ? "100vw" : `${props.width}px`}
      height={fullScreen ? "100vh" : `${props.height}px`}
      marginLeft="auto"
      marginRight="auto"
      left={0}
      right={0}
      //position="absolute"
      //top={fullScreen ? 0 : props.top}
      alignItems="center"
      //p="100px"
      sx={{
        transition: "0.7s",
        transitionTimingFunction: "ease-out",
      }}
      //zIndex={99999}
      spacing="12px"
      onMouseEnter={() => setOverlayHovering(true)}
      onMouseLeave={() => setOverlayHovering(false)}
      onMouseMove={() => setOverlayHovering(true)}
    >
      <Stack
        width={fullScreen ? "100vw" : `${props.width}px`}
        height={fullScreen ? "100vh" : `${props.height}px`}
        borderRadius={fullScreen ? 0 : "14px"}
        boxShadow={!playing ? "0 0 60px rgba(255,255,255,0.2)" : undefined}
        overflow="hidden"
        position="relative"
        sx={{
          cursor: "pointer",
          transition: "0.7s",
          transitionTimingFunction: "ease-out",
          //transform: `rotate(${props.fullScreen ? 360 : 0}deg)`,
        }}
      >
        <iframe
          onMouseEnter={() => setOverlayHovering(true)}
          onMouseLeave={() => setOverlayHovering(false)}
          ref={setIFrame}
          id="player"
          title="Player"
          width={fullScreen ? "100%" : props.width}
          height={fullScreen ? "100%" : props.height}
          style={{
            transition: "0.7s",
            transitionTimingFunction: "ease-out",
          }}
          src={
            props.provider === "youtube"
              ? `${props.url.replace(
                  "youtube.com",
                  "youtube-nocookie.com"
                )}?enablejsapi=1&cc_load_policy=1&modestbranding=1&${
                  props.startTime ? `start=${props.startTime}&` : ""
                }${
                  props.endTime ? `end=${props.endTime}&` : ""
                }${VIDEO_DISABLINGS.map((d) => `${d}=0`).join("&")}`
              : props.startTime
              ? `${props.url}#t=${props.startTime}`
              : props.url
          }
          //src="https://player.vimeo.com/video/274713351?h=6410c8a64f"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
          //@ts-ignore
          //allowFullScreen="allowFullScreen"
          frameBorder={0}
        />
        {/* <Stack
          position="absolute"
          top={0}
          right={0}
          width={overallHovering ? "100%" : "80px"}
          //borderRadius="0 0 0 14px"
          height="60px"
        /> */}
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
          width="100%"
          height="100%"
          bgcolor={`rgba(0,0,0,${overlayHovering ? 0.6 : 0.72})`}
          sx={{
            transition: "0.2s",
            opacity: ended || !playing ? 1 : 0,
            pointerEvents: playing && !ended ? "none" : undefined,
            backdropFilter: "blur(5px)",
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
            <Image
              src={ended ? Sync : Play}
              width={114}
              height={114}
              alt="Play"
            />
          </Stack>
        </Stack>
        <Stack
          position="absolute"
          top={0}
          right={0}
          //right={0}
          width={
            props.provider === "vimeo" ? "62px" : "100%" //overallHovering ? "100%" : 0 //overallHovering && props.playing && props.fullScreen ? "100%" : "80px"
          }
          borderRadius={props.provider === "vimeo" ? "0 0 0 14px" : undefined}
          height={props.provider === "vimeo" ? "120px" : "60px"}
          sx={{
            //transform: `translateY(${overallHovering ? 0 : "-60px"})`,
            opacity: overlayHovering && playing ? 1 : 0,
            backdropFilter: "blur(38px)",
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
        {props.provider === "vimeo" ? (
          <Stack
            position="absolute"
            right={0}
            bottom={0}
            width="100px"
            height="50px"
          />
        ) : null}
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
          <Image
            src={KiteMark}
            width={23}
            height={23}
            alt="Astro kitemark"
            style={{
              transform: `rotate(${playing ? -540 : starHovering ? 20 : 0}deg)`,
              transition: "1s",
            }}
          />
        </Stack>
        <Stack
          position="absolute"
          top="19px"
          left="55px"
          sx={{
            opacity: starHovering ? 1 : 0,
            transition: "0.8s",
          }}
        >
          <Typography color="rgba(255,255,255)">
            Here at Astro, we&apos;re on a mission to create a safer and more
            delightful internet. 😊
          </Typography>
        </Stack>

        {/* {playing ? (
              <Stack
                position="absolute"
                width="53px"
                height="100px"
                bottom={0}
                right={0}
              />
            ) : null} */}

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
          {/* <Stack
            sx={{
              "&:hover": { opacity: 0.6 },
              transition: "0.2s",
              svg: {
                path: {
                  fill: props.captionsOn
                    ? PALETTE.secondary.orange[3]
                    : "rgba(255,255,255,0.7)",
                },
              },
            }}
            onClick={props.captionsCallback}
          >
            <CaptionsIcon width="24px" height="24px" />
          </Stack> */}
          <Stack
            sx={{
              "&:hover": { opacity: 0.6 },
              transition: "0.2s",
            }}
            onClick={() => setFullScreen(!fullScreen)}
          >
            {fullScreen ? (
              <Image
                src={NormalScreenIcon}
                width={24}
                height={24}
                alt="Full screen"
              />
            ) : (
              <Image
                src={FullScreenIcon}
                width={24}
                height={24}
                alt="Full screen"
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Player;
