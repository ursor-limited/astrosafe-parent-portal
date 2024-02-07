"use client";

import React, { useEffect, useState } from "react";
import { Stack, keyframes } from "@mui/system";
import Logo from "@/images/playerLogo.svg";
import ApiController, { IVideo } from "@/app/api";
import ChevronRight from "@/images/icons/ChevronRight.svg";
import Kitemark from "@/images/coloredKitemark.svg";
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
import ForbiddenVideoView from "./ForbiddenVideoView";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import { MAGICAL_BORDER_THICKNESS } from "@/app/v/[videoId]/VideoPageContents";
import { useAuth0 } from "@auth0/auth0-react";
import SignupPromptDialog from "@/app/components/SignupPromptDialog";
import mixpanel from "mixpanel-browser";

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
export const INPUT_FIELD_TEXT_COLOR = "rgba(255,255,255,0.86)";
export const INPUT_FIELD_BACKGROUND_COLOR = "rgba(0,0,0,0.1)";
export const BACKGROUND_BLUR = "blur(3px)";

const CreationPageInputSection = (props: {
  title: string;
  hideTitle?: boolean;
  children: React.ReactNode;
}) => (
  <Stack flex={1} spacing="3px" justifyContent="center">
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
  useEffect(() => {
    mixpanel.init(
      process.env.NEXT_PUBLIC_REACT_APP_MIXPANEL_PROJECT_TOKEN as string,
      {
        debug: true,
        track_pageview: false,
        persistence: "localStorage",
      }
    );
  }, []);
  useEffect(() => {
    mixpanel?.track("creation page");
  }, []);

  const { user } = useAuth0();
  useEffect(() => {
    user?.email && mixpanel.identify(user?.email);
  }, [user?.email]);

  const [playing, setPlaying] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  useEffect(() => {
    props.details?.description && setDescription(props.details.description);
  }, [props.details?.description]);

  const [showForbiddenVideoView, setShowForbiddenVideoView] =
    useState<boolean>(false);

  const searchParams = useSearchParams();
  const [originalUrl, setOriginalUrl] = useState<string>("");
  useEffect(
    () => setOriginalUrl(decodeURIComponent(searchParams.get("url") ?? "")),
    [searchParams]
  );
  const [provider, zetProvider] = useState<"youtube" | "vimeo" | undefined>(
    undefined
  );
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
        if (details.error?.includes("403")) {
          setShowForbiddenVideoView(true);
        } else {
          console.log("---", noCookiefy(extractUrl(details.html)));
          setUrl(deNoCookiefy(extractUrl(details.html)));
          setTitle(details.title);
          setDescription(details.description); // vimeo has the description here; youtube requires the youtube api
          setThumbnailUrl(details.thumbnail_url);
        }
      });
  }, [originalUrl]);

  useEffect(() => {
    setPlaying(false);
    provider === "youtube" &&
      ApiController.getYoutubeVideoDetails(url.split("/").slice(-1)[0]).then(
        (result) => {
          setDescription(result.description);
          setThumbnailUrl(result.thumbnailUrl);
        }
      );
  }, [url]);

  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [range, setRange] = useState<number[] | undefined>(undefined);
  useEffect(() => {
    duration && setRange([0, duration]);
  }, [Math.floor((duration ?? 0) / 3)]);

  const [loading, setLoading] = useState<boolean>(false);

  const [freeVideoCreationCount, setFreeVideoCreationCount] =
    useLocalStorage<number>("freeVideoCreationCount", 0);

  const [freeVideoIds, setFreeVideoIds] = useLocalStorage<string[]>(
    "freeVideoIds",
    []
  );

  const [landInDashboardAfterCreation, setLandInDashboardAfterCreation] =
    useLocalStorage<boolean>("landInDashboardAfterCreation", false);

  useEffect(() => {
    if (user?.email && freeVideoIds.length > 0) {
      ApiController.claimVideos(user.email, freeVideoIds);
      setFreeVideoIds([]);
    }
  }, [user?.email, freeVideoIds.length]);

  const router = useRouter();
  const submit = () => {
    setLoading(true);
    mixpanel.track("video created");
    ApiController.createVideo({
      title,
      description,
      url,
      thumbnailUrl,
      startTime: range?.[0],
      endTime: range?.[1],
      creatorId: user?.email,
    }).then(async (v) => {
      if (user?.email) {
        // if (freeVideoIds.length > 0) {
        //   await ApiController.claimVideos(user.email, freeVideoIds);
        //   setFreeVideoIds([]);
        // }
      } else {
        setFreeVideoCreationCount(freeVideoCreationCount + 1);
        setFreeVideoIds([...freeVideoIds, v.id]);
      }
      router.push(landInDashboardAfterCreation ? "/dashboard" : `/v/${v.id}`);
      setLandInDashboardAfterCreation(false);
    });
  };
  useEffect(() => {
    user?.email && readyForSubmittingUponLoadingUser && submit();
  }, [user?.email]);

  const [
    readyForSubmittingUponLoadingUser,
    setReadyForSubmittingUponLoadingUser,
  ] = useState<boolean>(false);

  const [fullscreen, setFullscreen] = useState<boolean>(false);
  // props.details && provider && url ? (

  // <Stack>
  //   {!fullscreen ? <Header noCreateNew /> : null}

  const { width } = useWindowSize();

  const [playerWidthRef, setPlayerWidthRef] = useState<HTMLElement | null>(
    null
  );

  const [playerWidth, setPlayerWidth] = useState<number>(VIDEO_WIDTH);
  useEffect(
    () =>
      setPlayerWidth(
        playerWidthRef?.getBoundingClientRect().width ?? VIDEO_WIDTH
      ),
    [playerWidthRef, width]
  );

  const [mobile, setMobile] = useState<boolean>(false);
  useEffect(() => setMobile(playerWidth < VIDEO_WIDTH), [playerWidth]);

  const [signupPromptDialogOpen, setSignupPromptDialogOpen] =
    useState<boolean>(false);

  return (
    <>
      {!fullscreen ? (
        <Header
          showSigninButton={!user}
          signinCallback={() => setLandInDashboardAfterCreation(true)}
        />
      ) : null}
      {props.details && provider && url ? (
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
              <Logo width={96} src={Logo} />
              <Stack
                sx={{
                  background: "linear-gradient(76deg, #F279C5, #FD9B41)",
                  "-webkit-text-fill-color": "transparent",
                  backgroundClip: "text",
                  "-webkit-background-clip": "text",
                }}
              >
                <Stack sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    color={PALETTE.secondary.purple[2]}
                    scale={
                      Math.min(playerWidth * 1.2, VIDEO_WIDTH) / VIDEO_WIDTH
                    }
                  >
                    Create your safe video link
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          ) : null}

          <Stack spacing="42px" alignItems="center">
            {!fullscreen ? (
              <Stack>
                <Stack
                  minWidth={
                    Math.min(playerWidth, VIDEO_WIDTH) -
                    2 * MAGICAL_BORDER_THICKNESS
                  }
                  spacing="32px"
                  p="20px"
                  bgcolor={"rgba(0,0,0,0.15)"}
                  sx={{
                    backdropFilter: "blur(7px)",
                  }}
                  borderRadius="12px"
                >
                  <Stack direction="row" spacing="16px" alignItems="flex-end">
                    <CreationPageInputSection title="Title">
                      <UrsorInputField
                        value={title}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => setTitle(event.target.value)}
                        placeholder="Add a title"
                        width="100%"
                        backgroundColor={INPUT_FIELD_BACKGROUND_COLOR}
                        color={INPUT_FIELD_TEXT_COLOR}
                        backgroundBlur="blur(3px)"
                        leftAlign
                        boldValue
                      />
                    </CreationPageInputSection>
                    <Stack
                      sx={{
                        opacity: title ? 1 : 0.5,
                        pointerEvents: title ? undefined : "none",
                      }}
                    >
                      <UrsorButton
                        dark
                        variant="tertiary"
                        onClick={() => {
                          setReadyForSubmittingUponLoadingUser(true);
                          if (user) {
                            submit();
                          } else {
                            mixpanel.track(
                              "creation page - opened signup prompt dialog"
                            );
                            setSignupPromptDialogOpen(true);
                          }
                        }}
                        backgroundColor="linear-gradient(150deg, #F279C5, #FD9B41)"
                        hoverOpacity={0.7}
                        endIcon={ChevronRight}
                        iconColor={PALETTE.font.light}
                      >
                        Create link
                      </UrsorButton>
                    </Stack>
                  </Stack>

                  <CreationPageInputSection title="Description">
                    <UrsorTextField
                      value={description}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setDescription(event.target.value)
                      }
                      placeholder="Add a description"
                      width="100%"
                      backgroundColor={INPUT_FIELD_BACKGROUND_COLOR}
                      color={INPUT_FIELD_TEXT_COLOR}
                      backgroundBlur={BACKGROUND_BLUR}
                      boldValue
                    />
                  </CreationPageInputSection>

                  <CreationPageInputSection title="Start and end time">
                    <Stack
                      direction="row"
                      width="100%"
                      bgcolor={INPUT_FIELD_BACKGROUND_COLOR}
                      borderRadius="8px"
                      px={mobile ? "10px" : "30px"}
                      py="6px"
                      sx={{
                        backdropFilter: BACKGROUND_BLUR,
                        svg: {
                          path: {
                            fill: PALETTE.font.light,
                          },
                        },
                      }}
                    >
                      {duration && range ? (
                        <Stack
                          direction="row"
                          spacing={mobile ? "20px" : "44px"}
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
              </Stack>
            ) : null}
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
              width={fullscreen ? "100vw" : "90vw"}
              boxSizing="border-box"
              ref={setPlayerWidthRef}
            >
              <Stack
                p={`${MAGICAL_BORDER_THICKNESS}px`}
                borderRadius="15px"
                sx={{ backdropFilter: "none" }}
                position="relative"
              >
                <Stack
                  top="50%"
                  left="50%"
                  borderRadius="15px"
                  width={Math.min(playerWidth, VIDEO_WIDTH)}
                  height="100%"
                  position="absolute"
                  sx={{
                    transform: "translate(-50%, -50%)",
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
                  width={
                    Math.min(playerWidth, VIDEO_WIDTH) -
                    2 * MAGICAL_BORDER_THICKNESS
                  }
                  height={
                    Math.min(playerWidth, VIDEO_WIDTH) *
                    (VIDEO_HEIGHT / VIDEO_WIDTH)
                  }
                  setDuration={(d) => d && setDuration(d)}
                  noKitemark={playerWidth < VIDEO_WIDTH}
                  top="120px"
                  setFullscreen={setFullscreen}
                  playingCallback={(p) => setPlaying(p)}
                  mobile={mobile}
                />
              </Stack>
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
      ) : showForbiddenVideoView ? (
        <ForbiddenVideoView />
      ) : null}
      {!fullscreen ? (
        <Footer fontScale={Math.min(playerWidth, VIDEO_WIDTH) / VIDEO_WIDTH} />
      ) : null}
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
            width: "70px",
            height: "70px",
            animation: `${spin} 2s linear infinite`,
          }}
        >
          <Kitemark height={70} width={70} />
        </Stack>
      </Stack>
      <SignupPromptDialog
        open={signupPromptDialogOpen}
        closeCallback={() => setSignupPromptDialogOpen(false)}
        createCallback={submit}
        signinCallback={() => setLandInDashboardAfterCreation(true)}
        mobile={mobile}
      />
    </>
  );
}

export default CreationPageContents;
