"use client";

import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
//import CaptionsIcon from "./images/icons/Captions.svg";
import Logo from "@/images/logo.svg";
import Image from "next/image";
import ApiController, { IVideo } from "@/app/api";
import ChevronLeft from "@/images/icons/ChevronLeftLight.svg";
import Pencil from "@/images/icons/Pencil.svg";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Slider } from "@mui/material";
import DurationLabel from "../v/[videoId]/duration-label";
import { useRouter, useSearchParams } from "next/navigation";
import { deNoCookiefy, noCookiefy } from "@/app/components/utils";
import UrsorInputField from "@/app/components/ursor-input-field";
import { PALETTE } from "../../../../packages/ui/palette";
import { UrsorButton } from "ui";
import { Footer } from "../components/footer";
import { HEADER_HEIGHT, Header } from "../components/header";

const Player = dynamic(
  () => import("@/app/components/Player"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const PADDING_TOP = "100px";
export const VIDEO_WIDTH = 845;
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

const extractUrl = (html: string) => html.split('src="')[1].split("?")[0];

function CreationPageContents(props: { details: IVideo }) {
  const [description, setDescription] = useState<string>("");
  useEffect(() => {
    props.details?.description && setDescription(props.details.description);
  }, [props.details?.description]);

  const searchParams = useSearchParams();
  const originalUrl = decodeURIComponent(searchParams.get("url") ?? "");
  const provider = originalUrl.includes("vimeo") ? "vimeo" : "youtube";
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    fetch(
      `https://noembed.com/embed?url=${encodeURIComponent(
        deNoCookiefy(originalUrl)
      )}`
    )
      .then((response) => response.json())
      .then((details) => {
        setUrl(noCookiefy(extractUrl(details.html)));
        setTitle(details.title);
      });
  }, [originalUrl]);

  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [range, setRange] = useState<number[] | undefined>(undefined);
  useEffect(() => {
    !range && duration && setRange([0, duration]);
  }, [duration, range]);

  const router = useRouter();
  const submit = () =>
    ApiController.createVideo({
      title,
      description,
      url,
      startTime: range?.[0],
      endTime: range?.[1],
    }).then((v) => router.push(`/v/${v.id}`));

  const [fullscreen, setFullscreen] = useState<boolean>(false);

  return props.details && provider && url ? (
    <>
      {!fullscreen ? <Header /> : null}
      <Stack
        flex={1}
        justifyContent="center"
        alignItems="center"
        position="relative"
        height={`calc(100vh - ${HEADER_HEIGHT}px)`}
        minHeight={`calc(100vh - ${HEADER_HEIGHT}px)`}
        width="100vw"
        spacing="20px"
      >
        <Player
          url={url}
          provider={provider}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          setDuration={(d) => setDuration(d)}
          top="120px"
          setFullscreen={setFullscreen}
        />
        {!fullscreen ? (
          <Stack width={`${VIDEO_WIDTH}px`} spacing="12px">
            <Stack width="100%" position="relative" overflow="visible">
              <Stack width="100%" spacing="5px">
                <UrsorInputField
                  value={title}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Title"
                  width="100%"
                  backgroundColor={PALETTE.secondary.grey[2]}
                  leftAlign
                />

                <UrsorInputField
                  value={description}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Description"
                  width="100%"
                  backgroundColor={PALETTE.secondary.grey[2]}
                  leftAlign
                />
              </Stack>
              {/* {isCreator ? (
              <Stack
                direction="row"
                width="100%"
                justifyContent="space-between"
                pt="30px"
              >
                <Stack width="100%">
                  <div>
                    <UrsorButton
                      variant="secondary"
                      mode="dark"
                      onClick={() => {
                        setEditing(!editing);
                      }}
                      endIcon={
                        <Image
                          src={Pencil}
                          width={17}
                          height={17}
                          alt="Pencil"
                        />
                      }
                    >
                      {editing ? "Save" : "Edit"}
                    </UrsorButton>
                  </div>
                </Stack>
                <Stack position="relative" alignItems="center">
                  <Stack sx={{ opacity: copiedUrl ? 0 : 1 }}>
                    <UrsorButton
                      variant="tertiary"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setCopiedUrl(true);
                      }}
                      endIcon={
                        <Image
                          src={ArrowUpRight}
                          width={24}
                          height={24}
                          alt="Arrow up right"
                        />
                      }
                    >
                      Share
                    </UrsorButton>
                  </Stack>
                  <Stack
                    position="absolute"
                    top="10px"
                    sx={{
                      pointerEvents: copiedUrl ? undefined : "none",
                      opacity: copiedUrl ? 1 : 0,
                      transition: "0.3s",
                      //animation: `${fadeIn} 0.8s ease-out`,
                    }}
                  >
                    <Typography
                      variant="medium"
                      bold
                      color={PALETTE.font.light}
                      noWrap
                    >
                      Copied URL to clipboard.
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            ) : null} */}
            </Stack>
            <Stack direction="row">
              {/* <Stack
              height="3px"
              width="100%"
              bgcolor={PALETTE.secondary.orange[2]}
            /> */}
              {duration && range ? (
                <Stack
                  direction="row"
                  spacing="44px"
                  justifyContent="center"
                  width="100%"
                  sx={{
                    ".MuiSlider-root": { color: "transparent !important" },
                    ".MuiSlider-rail": {
                      opacity: 0.4,
                      background: "linear-gradient(90deg,#F279C5,#FD9B41)",
                    },
                    ".MuiSlider-track": {
                      background: "linear-gradient(90deg,#F279C5,#FD9B41)",
                    },
                    ".MuiSlider-thumb": {
                      "&:nth-of-type(3)": {
                        background: "#F279C5",
                      },
                      "&:nth-of-type(4)": {
                        background: "#FD9B41",
                      },
                    },
                  }}
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
              ) : null}
              {/* <Typography color={PALETTE.font.light}>{duration}</Typography> */}
            </Stack>
            <Stack pt="40px" width="100%" alignItems="center">
              <div>
                <UrsorButton
                  dark
                  size="large"
                  variant="tertiary"
                  onClick={
                    submit
                    //setEditing(!editing);
                  }
                  endIcon={
                    <Image
                      src={ChevronLeft}
                      width={23}
                      height={23}
                      alt="Pencil"
                      style={{
                        transform: "rotate(180deg)",
                      }}
                    />
                  }
                >
                  Complete
                </UrsorButton>
              </div>
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
          alignItems="center"
          justifyContent="flex-end"
          pt="50px"
          pb="18px"
          flex={1}
        ></Stack> */}
      </Stack>
      {!fullscreen ? <Footer /> : null}
    </>
  ) : (
    <></>
  );
}

export default CreationPageContents;
