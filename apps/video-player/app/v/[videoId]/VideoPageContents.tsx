"use client";

import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
//import CaptionsIcon from "./images/icons/Captions.svg";
import Logo from "@/images/logo.svg";
import Image from "next/image";
import Typography from "@/components/Typography";
import ApiController, { IVideo } from "@/app/api";
import Background from "@/images/background.png";
import PlayerLogo from "@/images/playerLogo.png";
//import Player from "@/components/Player";
import VideoDetailsEditingSection from "@/components/VideoDetailsEditingSection";
import Link from "next/link";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { PALETTE } from "@/palette";
import { Slider } from "@mui/material";
import DurationLabel from "./DurationLabel";

const Player = dynamic(
  () => import("@/components/Player"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const PADDING_TOP = "100px";
const VIDEO_WIDTH = 845;
const VIDEO_HEIGHT = 475;

// export const getStaticProps = (async (context) => {
//   //const videoDetails = ApiController.getVideoDetails(videoId)
//   return {
//     props: {
//       videoDetails: await ApiController.getVideoDetails(
//         context.params?.videoId as string
//       ), //projects: data.projects
//     },
//   };
// }) satisfies GetStaticProps<{
//   videoDetails: IVideo;
// }>;

function VideoPageContents(props: { details: IVideo }) {
  const provider = props.details?.url.includes("vimeo") ? "vimeo" : "youtube";
  const [duration, setDuration] = useState<number | undefined>(undefined);
  // const [range, setRange] = useState<number[] | undefined>(undefined);
  // useEffect(() => {
  //   duration && setRange([0, duration]);
  // }, [duration]);
  return props.details && provider ? (
    <Stack
      height="100vh"
      width="100vw"
      sx={{
        backgroundImage: `url(${Background.src})`,
        backgroundSize: "cover",
        boxSizing: "border-box",
      }}
      spacing="10px"
    >
      <Stack width="100%">
        <Stack width="fit-content">
          <Link href="/">
            <Stack
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
                transition: "0.2s",
              }}
            >
              <Image
                width={165}
                src={PlayerLogo}
                alt="Safe video player logo."
              />
            </Stack>
          </Link>
        </Stack>
      </Stack>
      <Stack
        flex={1}
        px="60px"
        justifyContent="center"
        alignItems="center"
        position="relative"
        height="100vh"
        width="100vw"
      >
        {/* <Image src={Background} alt='Background'  */}
        <Stack width={`${VIDEO_WIDTH}px`} height={`${VIDEO_HEIGHT}px`} />
        <Stack width={`${VIDEO_WIDTH}px`}>
          <VideoDetailsEditingSection details={props.details} />
          <Stack direction="row">
            {/* <Stack
              height="3px"
              width="100%"
              bgcolor={PALETTE.secondary.orange[2]}
            /> */}
            {/* {duration && range ? (
              <Stack
                direction="row"
                spacing="44px"
                justifyContent="center"
                width="100%"
              >
                <DurationLabel
                  value={range[0]}
                  incrementCallback={() =>
                    setRange([Math.min(duration, range[0] + 1), range[1]])
                  }
                  decrementCallback={() =>
                    setRange([Math.max(0, range[0] - 1), range[1]])
                  }
                />
                <Slider
                  min={0}
                  max={duration}
                  valueLabelDisplay="off"
                  getAriaLabel={() => "Temperature range"}
                  value={range}
                  onChange={(event: Event, newValue: number | number[]) => {
                    setRange(newValue as number[]);
                  }}
                />
                <DurationLabel
                  value={range[1]}
                  incrementCallback={() =>
                    setRange([range[0], Math.min(duration, range[1] + 1)])
                  }
                  decrementCallback={() =>
                    setRange([range[0], Math.max(0, range[1] - 1)])
                  }
                />
              </Stack>
            ) : null} */}
            {/* <Typography color={PALETTE.font.light}>{duration}</Typography> */}
          </Stack>
        </Stack>
        {/* <UrsorButton variant="secondary" onClick={() => setPlaying(true)}>
        Play
      </UrsorButton>
      <UrsorButton variant="secondary" onClick={() => setPlaying(false)}>
        Pause
      </UrsorButton> */}

        <Stack
          width="100%"
          height="200px"
          alignItems="center"
          justifyContent="flex-end"
          flex={1}
        >
          <Stack direction="row" spacing="12px" alignItems="center" pb="20px">
            <Typography bold variant="small" color={"rgba(255,255,255,0.7)"}>
              PART OF THE
            </Typography>
            <Stack
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
                transition: "0.2s",
              }}
            >
              <a href={"https://astrosafe.co/"} target={"_blank"}>
                <Image src={Logo} width={80} height={80} alt="Astro logo" />
              </a>
            </Stack>
            <Typography bold variant="small" color={"rgba(255,255,255,0.7)"}>
              FAMILY OF TOOLS
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Player
        key={props.details.id}
        url={props.details.url}
        provider={provider}
        startTime={props.details.startTime}
        endTime={props.details.endTime}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        setDuration={(d) => setDuration(d)}
      />
    </Stack>
  ) : (
    <></>
  );
}

export default VideoPageContents;
