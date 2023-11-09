"use client";

import { Stack, keyframes } from "@mui/system";
import Image from "next/image";
import Play from "@/images/play.svg";
import FullScreenIcon from "@/images/icons/FullScreen.svg";
import NormalScreenIcon from "@/images/icons/NormalScreen.svg";
import Clipboard from "@/images/icons/Clipboard.svg";
import KiteMark from "@/images/kiteMark.svg";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PALETTE, Typography } from "ui";

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
  setDuration: (duration: number) => void;
  startTime?: number;
  endTime?: number;
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

  // const [currentTime, setCurrentTime] = useState<number>(0);
  // useEffect(() => {
  //   if (!playing) return;
  //   const interval = setInterval(
  //     () => setCurrentTime(videoElement?.target.playerInfo.currentTime),
  //     1000
  //   );
  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, [playing]);

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
    console.log(status);
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

  useEffect(
    () => props.setDuration(player?.getDuration()),
    [player?.getDuration()]
  );

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

  const handleUserKeyPress = useCallback((event: any) => {
    if (event.code === "Space") {
      resume();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const [hovering, setHovering] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  return document
    ? createPortal(
        <Stack
          width={fullScreen ? "100vw" : `${props.width}px`}
          height={fullScreen ? "100vh" : `${props.height}px`}
          marginLeft="auto"
          marginRight="auto"
          left={0}
          right={0}
          position="absolute"
          top={fullScreen ? 0 : PADDING_TOP}
          alignItems="center"
          //p="100px"
          sx={{
            transition: "0.7s",
            transitionTimingFunction: "ease-out",
          }}
          zIndex={99999}
          spacing="12px"
        >
          <Stack
            width="100%"
            px="12px"
            py="8px"
            bgcolor={hovering ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)"}
            borderRadius="12px"
            direction="row"
            justifyContent="space-between"
            onClick={() => {
              setCopied(true);
              navigator.clipboard.writeText(window.location.href);
            }}
            sx={{
              transition: "0.2s",
              cursor: "pointer",
            }}
            onMouseDown={() => {
              setPressed(true);
            }}
            onMouseEnter={() => {
              setHovering(true);
            }}
            onMouseLeave={() => {
              setHovering(false);
              setPressed(false);
            }}
            onMouseUp={() => {
              setPressed(false);
            }}
          >
            <Typography
              variant="small"
              color={
                hovering ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.75)"
              }
              sx={{
                transition: "0.2s",
              }}
            >
              {window.location.href}
            </Typography>
            {copied ? (
              <Typography variant="small" bold color="rgba(255,255,255,0.9)">
                Copied to Clipboard
              </Typography>
            ) : (
              <Stack direction="row" spacing="5px" sx={{ opacity: 0.9 }}>
                <Typography variant="small" bold color="rgb(255,255,255)">
                  Share
                </Typography>
                <Image src={Clipboard} width={16} alt="Copy" />
              </Stack>
            )}
          </Stack>
          <Stack
            width={fullScreen ? "100%" : `${props.width}px`}
            height={fullScreen ? "100%" : `${props.height}px`}
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
            onMouseEnter={() => setOverallHovering(true)}
            onMouseLeave={() =>
              setTimeout(() => setOverallHovering(false), 200)
            }
          >
            <iframe
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
                pointerEvents: youtubePauseOverlay ? undefined : "none",
              }}
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
              onMouseEnter={() => setOverlayHovering(true)}
              onMouseLeave={() => setOverlayHovering(false)}
              onClick={resume}
            >
              <Stack
                sx={{
                  transform: `scale(${overlayHovering ? 1.1 : 1})`,
                  transition: "0.3s",
                  transitionTimingFunction: BEZIER,
                }}
              >
                <Image src={Play} width={114} height={114} alt="Play" />
              </Stack>
            </Stack>
            <Stack
              position="absolute"
              top={0}
              //right={0}
              width={
                "100%" //overallHovering ? "100%" : 0 //overallHovering && props.playing && props.fullScreen ? "100%" : "80px"
              }
              //borderRadius="0 0 0 14px"
              height={props.provider === "vimeo" ? "120px" : "60px"}
              sx={{
                //transform: `translateY(${overallHovering ? 0 : "-60px"})`,
                opacity: overallHovering || !playing ? 1 : 0,
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
                transform: `rotate(${!playing ? 720 : 0}deg) translateX(${
                  !playing ? 0 : -200
                }px)`,
                transformOrigin: "center",
                transition: "1s",
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
                  transform: `rotate(${starHovering ? 20 : 0}deg)`,
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
                Here at Astro, we&apos;re on a mission to create a safer and
                more delightful internet. 😊
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
                opacity: !playing || overallHovering ? 1 : 0,
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
        </Stack>,
        document.body
      )
    : null;
};

export default Player;
