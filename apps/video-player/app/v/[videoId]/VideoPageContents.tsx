"use client";

import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
//import CaptionsIcon from "./images/icons/Captions.svg";
import Clipboard from "@/images/icons/Clipboard.svg";
import Image from "next/image";
import { IVideo } from "@/app/api";
import dynamic from "next/dynamic";
import { PALETTE, Typography, UrsorButton } from "ui";
import { HEADER_HEIGHT, Header } from "@/app/components/header";
import { createPortal } from "react-dom";
import { Footer } from "@/app/components/footer";

const Player = dynamic(
  () => import("@/app/components/player"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const UrlBar = dynamic(
  () => import("@/app/components/url-bar"),
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
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const [playing, setPlaying] = useState<boolean>(false);

  return props.details && provider ? (
    <>
      {!fullscreen ? <Header /> : null}
      <Stack
        px="60px"
        justifyContent="center"
        alignItems="center"
        position="relative"
        // height={`calc(100vh - ${HEADER_HEIGHT}px)`}
        // minHeight={`calc(100vh - ${HEADER_HEIGHT}px)`}
        width="100vw"
        pb={!fullscreen ? "100px" : undefined}
        //overflow="scroll"
        spacing="14px"
        pt="70px"
      >
        {!fullscreen ? (
          <Stack width={`904px`}>
            <UrlBar />
          </Stack>
        ) : null}
        <Stack
          spacing="10px"
          py="24px"
          px="28px"
          borderRadius="12px"
          bgcolor="rgba(0,0,0,0.15)"
          sx={{
            backdropFilter: "blur(7px)",
          }}
        >
          <Stack
            sx={{
              background: "linear-gradient(45deg, #F279C5, #FD9B41)",
              "-webkit-text-fill-color": "transparent",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
            }}
            width="fit-content"
          >
            <Typography bold variant="h4" color={PALETTE.font.light}>
              {props.details.title}
            </Typography>
          </Stack>
          <Stack
            p="1.8px"
            borderRadius="15px"
            overflow="hidden"
            sx={{ backdropFilter: "none" }}
            position="relative"
          >
            <Stack
              top={0}
              left={0}
              width="100%"
              height="100%"
              position="absolute"
              sx={{
                opacity: playing ? 0 : 1,
                transition: "0.3s",
                background: fullscreen
                  ? "none"
                  : "linear-gradient(90deg, #F279C5, #FD9B41)",
              }}
            />
            <Player
              key={props.details.id}
              url={props.details.url}
              provider={provider}
              startTime={props.details.startTime}
              endTime={props.details.endTime}
              width={VIDEO_WIDTH}
              height={VIDEO_HEIGHT}
              top="0px"
              setDuration={(d) => setDuration(d)}
              showUrlBar
              setFullscreen={setFullscreen}
              playingCallback={(p) => setPlaying(p)}
            />
          </Stack>
          {/* <Image src={Background} alt='Background'  */}
          {/* <Stack width={`${VIDEO_WIDTH}px`} height={`${VIDEO_HEIGHT + 90}px`} /> */}
          {!fullscreen ? (
            <Stack
              width={`${VIDEO_WIDTH}px`}
              justifyContent="space-between"
              overflow="scroll"
              pt="12px"
              //px="16px"
            >
              <Stack p="20px" bgcolor={"rgba(0,0,0,0.3)"} borderRadius="12px">
                <Stack spacing="5px">
                  {(props.details.description?.split("\n") ?? []).map(
                    (line, i) => (
                      <Typography key={i} color="rgba(255,255,255,0.8)">
                        {line}
                      </Typography>
                    )
                  )}
                </Stack>
              </Stack>
            </Stack>
          ) : null}
          {/* <UrsorButton variant="secondary" onClick={() => setPlaying(true)}>
        Play
      </UrsorButton>
      <UrsorButton variant="secondary" onClick={() => setPlaying(false)}>
        Pause
      </UrsorButton> */}

          {/* <Stack
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
              <Link href={"https://astrosafe.co/"} target={"_blank"}>
                <Image src={Logo} width={80} height={80} alt="Astro logo" />
              </Link>
            </Stack>
            <Typography bold variant="small" color={"rgba(255,255,255,0.7)"}>
              FAMILY OF TOOLS
            </Typography>
          </Stack>
        </Stack> */}
        </Stack>
      </Stack>
      {!fullscreen ? <Footer /> : null}
    </>
  ) : (
    <></>
  );
}

export default VideoPageContents;
