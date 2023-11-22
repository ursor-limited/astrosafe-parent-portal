"use client";

import React, { useEffect, useState } from "react";
import { Stack, keyframes } from "@mui/system";
//import CaptionsIcon from "./images/icons/Captions.svg";
import Logo from "@/images/playerLogo.svg";
import Image from "next/image";
import ApiController, { IVideo } from "@/app/api";
import ChevronLeft from "@/images/icons/ChevronLeftLight.svg";
import Kitemark from "@/images/kiteMark.svg";
import Pencil from "@/images/icons/Pencil.svg";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Slider } from "@mui/material";
import DurationLabel from "../../v/[videoId]/duration-label";
import { useRouter, useSearchParams } from "next/navigation";
import { deNoCookiefy, noCookiefy } from "@/app/components/utils";
import UrsorInputField from "@/app/components/ursor-input-field";
import UrsorTextField from "@/app/components/ursor-text-field";
import { PALETTE } from "ui/palette";
import { Typography, UrsorButton } from "ui";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { FONT_SIZES } from "ui/typography";

const Player = dynamic(
  () => import("@/app/components/player"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export const spin = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(180deg);
}
`;

const PADDING_TOP = "100px";
export const VIDEO_WIDTH = 845;
const VIDEO_HEIGHT = 475;
const INPUT_FIELD_TEXT_COLOR = "rgba(255,255,255,0.86)";
const INPUT_FIELD_BACKGROUND_COLOR = "rgba(0,0,0,0.22)";
const BACKGROUND_BLUR = "blur(5px)";

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

const CreationPageInputSection = (props: {
  title: string;
  hideTitle?: boolean;
  children: React.ReactNode;
}) => (
  <Stack width="100%" spacing="3px" justifyContent="center">
    {!props.hideTitle ? (
      <Stack pl="2px">
        <Typography variant="small" bold color="rgba(255,255,255,0.55)">
          {props.title}
        </Typography>
      </Stack>
    ) : null}
    {props.children}
  </Stack>
);

const extractUrl = (html: string) => html.split('src="')[1].split("?")[0];

function CreationPageContents(props: { details: IVideo }) {
  const [playing, setPlaying] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  useEffect(() => {
    props.details?.description && setDescription(props.details.description);
  }, [props.details?.description]);

  const searchParams = useSearchParams();
  const [originalUrl, setOriginalUrl] = useState<string>("");
  useEffect(
    () => setOriginalUrl(decodeURIComponent(searchParams.get("url") ?? "")),
    [searchParams]
  );
  const [provider, zetProvider] = useState<"youtube" | "vimeo">("youtube");
  useEffect(
    () => zetProvider(originalUrl.includes("vimeo") ? "vimeo" : "youtube"),
    [originalUrl]
  );
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
        setDescription(details.description); // vimeo has the description here; youtube requires the youtube api
      });
  }, [originalUrl]);

  useEffect(() => {
    setPlaying(false);
    url?.includes("youtube") &&
      ApiController.getYoutubeVideoDetails(url.split("/").slice(-1)[0]).then(
        (result) => setDescription(result.description)
      );
  }, [url]);

  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [range, setRange] = useState<number[] | undefined>(undefined);
  useEffect(() => {
    duration && setRange([0, duration]);
  }, [Math.floor((duration ?? 0) / 3)]);

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const submit = () => {
    setLoading(true);
    ApiController.createVideo({
      title,
      description,
      url,
      startTime: range?.[0],
      endTime: range?.[1],
    }).then((v) => router.push(`/v/${v.id}`));
  };

  const [fullscreen, setFullscreen] = useState<boolean>(false);

  return props.details && provider && url ? (
    <>
      {!fullscreen ? <Header noCreateNew /> : null}
      <Stack
        flex={1}
        justifyContent="center"
        alignItems="center"
        position="relative"
        width="100vw"
        spacing="20px"
        sx={{
          opacity: !loading ? 1 : 0,
          transition: "1s",
        }}
      >
        {!fullscreen ? (
          <Stack
            spacing="15px"
            justifyContent="center"
            alignItems="center"
            pb="46px"
          >
            <Image width={96} src={Logo} alt="Astro" />
            <Stack
              sx={{
                background: "linear-gradient(76deg, #F279C5, #FD9B41)",
                "-webkit-text-fill-color": "transparent",
                backgroundClip: "text",
                "-webkit-background-clip": "text",
              }}
            >
              <Stack width="300px" sx={{ textAlign: "center" }}>
                <Typography variant="h3" color={PALETTE.secondary.purple[2]}>
                  Create your safe video link
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        ) : null}

        <Stack spacing="15px">
          <Stack direction="row" spacing="14px" alignItems="flex-end">
            <Stack flex={1}>
              <CreationPageInputSection title="Title">
                <UrsorInputField
                  value={title}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Title"
                  width="100%"
                  backgroundColor={"rgba(0,0,0,0.25)"}
                  color={INPUT_FIELD_TEXT_COLOR}
                  backgroundBlur="blur(3px)"
                  leftAlign
                  boldValue
                  fontSize={FONT_SIZES["large"]}
                  height="53px"
                />
              </CreationPageInputSection>
            </Stack>

            <Stack>
              <UrsorButton
                dark
                size="large"
                variant="tertiary"
                onClick={
                  submit
                  //setEditing(!editing);
                }
                backgroundColor="linear-gradient(150deg, #F279C5, #FD9B41)"
                hoverOpacity={0.7}
                endIcon={
                  <Image
                    src={ChevronLeft}
                    width={23}
                    height={23}
                    alt="Chevron left"
                    style={{
                      transform: "rotate(180deg)",
                    }}
                  />
                }
              >
                Complete
              </UrsorButton>
            </Stack>
          </Stack>
          {/* <Stack
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
                  : "linear-gradient(50deg, #F279C5, #FD9B41)",
              }}
            /> */}

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
              url={url}
              provider={provider}
              width={VIDEO_WIDTH}
              height={VIDEO_HEIGHT}
              setDuration={(d) => d && setDuration(d)}
              top="120px"
              setFullscreen={setFullscreen}
              playingCallback={(p) => setPlaying(p)}
            />
          </Stack>
        </Stack>

        {!fullscreen ? (
          <Stack width={`${VIDEO_WIDTH}px`} spacing="12px">
            <Stack
              width="100%"
              position="relative"
              overflow="visible"
              alignItems="center"
            >
              <Stack
                width="100%"
                spacing="32px"
                p="20px"
                bgcolor={"rgba(0,0,0,0.15)"}
                sx={{
                  backdropFilter: "blur(7px)",
                }}
                borderRadius="12px"
              >
                {/* <CreationPageInputSection title="Want to change the title?">
                  <UrsorInputField
                    value={title}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setTitle(event.target.value)
                    }
                    placeholder="Title"
                    width="100%"
                    backgroundColor={INPUT_FIELD_BACKGROUND_COLOR}
                    color={INPUT_FIELD_TEXT_COLOR}
                    backgroundBlur={BACKGROUND_BLUR}
                  />
                </CreationPageInputSection> */}

                <CreationPageInputSection title="Description">
                  <UrsorTextField
                    value={description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setDescription(event.target.value)
                    }
                    placeholder="Description"
                    width="100%"
                    backgroundColor={INPUT_FIELD_BACKGROUND_COLOR}
                    color={INPUT_FIELD_TEXT_COLOR}
                    backgroundBlur={BACKGROUND_BLUR}
                  />
                </CreationPageInputSection>

                <CreationPageInputSection title="Start and end time">
                  <Stack
                    direction="row"
                    width="100%"
                    bgcolor={INPUT_FIELD_BACKGROUND_COLOR}
                    borderRadius="10px"
                    p="30px"
                    sx={{
                      backdropFilter: BACKGROUND_BLUR,
                    }}
                  >
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
                          ".MuiSlider-root": {
                            color: "transparent !important",
                          },
                          ".MuiSlider-rail": {
                            opacity: 0.4,
                            background:
                              "linear-gradient(90deg,#F279C5,#FD9B41)",
                          },
                          ".MuiSlider-track": {
                            background:
                              "linear-gradient(90deg,#F279C5,#FD9B41)",
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
                            setRange([
                              Math.min(duration, range[0] + 1),
                              range[1],
                            ])
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
                          onChange={(
                            event: Event,
                            newValue: number | number[]
                          ) => {
                            setRange(newValue as number[]);
                          }}
                        />
                        <DurationLabel
                          value={range[1]}
                          incrementCallback={() =>
                            setRange([
                              range[0],
                              Math.min(duration, range[1] + 1),
                            ])
                          }
                          decrementCallback={() =>
                            setRange([range[0], Math.max(0, range[1] - 1)])
                          }
                        />
                      </Stack>
                    ) : null}
                    {/* <Typography color={PALETTE.font.light}>{duration}</Typography> */}
                  </Stack>
                </CreationPageInputSection>
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

            {/* <Stack pt="26px" width="100%" alignItems="center">
              <div>
                <UrsorButton
                  dark
                  size="large"
                  variant="tertiary"
                  onClick={
                    submit
                    //setEditing(!editing);
                  }
                  backgroundColor="linear-gradient(150deg, #F279C5, #FD9B41)"
                  hoverOpacity={0.7}
                  endIcon={
                    <Image
                      src={ChevronLeft}
                      width={23}
                      height={23}
                      alt="Chevron left"
                      style={{
                        transform: "rotate(180deg)",
                      }}
                    />
                  }
                >
                  Complete
                </UrsorButton>
              </div>
            </Stack> */}
          </Stack>
        ) : null}
      </Stack>
      <Stack
        position="absolute"
        top={0}
        width="100vw"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        sx={{
          opacity: loading ? 1 : 0,
          transition: "1s",
          pointerEvents: "none",
        }}
      >
        <Stack
          sx={{
            width: "48px",
            height: "47px",
            background: "linear-gradient(76deg, #F279C5, #FD9B41)",
            "-webkit-mask-image": `url(${Kitemark.src})`,
            maskImage: `url(${Kitemark.src})`,
            animation: `${spin} 2s linear infinite`,
          }}
        >
          {/* <Image src={Kitemark} height={100} width={100} alt="Loading" /> */}
        </Stack>
      </Stack>
      {!fullscreen ? <Footer /> : null}
    </>
  ) : (
    <Stack
      spacing="30px"
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h3" color="rgba(255,255,255,0.7)">
        We don`t have a page with this url.
      </Typography>
      <Image
        src={Kitemark}
        height={60}
        width={60}
        style={{ opacity: 0.7, transform: "rotate(26deg)" }}
        alt="Star"
      />
      <Link href={"https://astrosafe.co/"} target={"_blank"}>
        <UrsorButton
          size="large"
          dark
          variant="tertiary"
          startIcon={
            <Image src={ChevronLeft} width={23} height={23} alt="Chevron" />
          }
        >
          Let`s try again
        </UrsorButton>
      </Link>
    </Stack>
  );
}

export default CreationPageContents;
