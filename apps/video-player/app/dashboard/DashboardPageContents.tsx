"use client";

import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import ApiController, { IVideo } from "@/app/api";
import dynamic from "next/dynamic";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { useWindowSize } from "usehooks-ts";
import { useAuth0 } from "@auth0/auth0-react";
import ClippyIcon from "@/images/icons/ClippyIcon.svg";
import ChevronRight from "@/images/icons/ChevronRight.svg";
import Play from "@/images/play.svg";
import moment from "moment";
import { useRouter } from "next/navigation";
import UrsorFadeIn from "../components/UrsorFadeIn";
import _ from "lodash";
import Image from "next/image";
import NotificationContext from "../components/NotificationContext";
import UpgradeDialog from "../components/UpgradeDialog";
import DynamicCardGrid from "../components/DynamicCardGrid";
import mixpanel from "mixpanel-browser";
import { deNoCookiefy } from "../components/utils";
import DashboardSignupPromptDialog from "./DashboardSignupPromptDialog";

export const MAGICAL_BORDER_THICKNESS = 1.8;
export const HIDE_LOGO_PLAYER_WIDTH_THRESHOLD = 500;

const PLACEHOLDER_THUMBNAIL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/Safetubelogo2.png";

export const FREE_VIDEO_LIMIT = 3;

const VIDEO_WIDTH = 845;

const GRADIENT = "linear-gradient(150deg, #F279C5, #FD9B41)";
const PROMPT_BAR_GRADIENT = "linear-gradient(0deg, #6596FF, #7B61FF)";

const UPGRADE_PROMPT_BAR_VISIBILITY_WINDOW_WIDTH_THRESHOLD = 1110;
export const MOBILE_WINDOW_WIDTH_THRESHOLD = 680;

const UpgradePromptBar = () => (
  <Stack width="100%" justifyContent="center">
    <Stack
      position="absolute"
      left={0}
      right={0}
      margin="auto auto"
      height="44px"
      maxWidth="40%"
      justifyContent="center"
      alignItems="center"
      zIndex={2}
      borderRadius="12px"
      top="21px"
      sx={{
        transition: "0.5s",
        willChange: "transform",
        background: PROMPT_BAR_GRADIENT,
      }}
    >
      <Typography
        variant="medium"
        bold
        color={PALETTE.font.light}
        sx={{ textAlign: "center" }}
      >
        Upgrade to premium for unlimited Video creation
      </Typography>
    </Stack>
  </Stack>
);

export const getFormattedDate = (date: string) =>
  moment(date).format("Do MMMM YYYY");

const VideoCard = (props: IVideo) => {
  const router = useRouter();
  const [currentPageUrl, setCurrentPageUrl] = useState<string | undefined>(
    undefined
  );
  useEffect(() => setCurrentPageUrl(window?.location.href), []);
  const notificationCtx = React.useContext(NotificationContext);
  return (
    <Stack
      width="100%"
      height="253px"
      borderRadius="12px"
      bgcolor="rgba(0,0,0, 0.3)"
      p="4px"
      overflow="hidden"
      sx={{
        backdropFilter: "blur(4px)",
      }}
      position="relative"
    >
      <Stack position="absolute" top="14px" right="14px" zIndex={2}>
        <UrsorButton
          variant="secondary"
          size="small"
          endIcon={ClippyIcon}
          iconSize={15}
          onClick={() => {
            navigator.clipboard.writeText(
              `https://www.astrosafe.co/v/${props.id}`
            );
            notificationCtx.success("Copied URL to Clipboard.");
          }}
        >
          Share
        </UrsorButton>
      </Stack>
      <Stack
        flex={1}
        spacing="8px"
        sx={{
          "&:hover": { opacity: 0.6 },
          transition: "0.2s",
          cursor: "pointer",
        }}
        onClick={() => router.push(`/v/${props.id}`)}
      >
        <Stack
          height="163px"
          width="100%"
          sx={{
            backgroundImage: `url(${props.thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          borderRadius="10px 10px 0 0"
          bgcolor={!props.thumbnailUrl ? PALETTE.primary.navy : undefined}
          position="relative"
        >
          {!props.thumbnailUrl ? (
            <Stack flex={1} justifyContent="center" alignItems="center">
              <Image
                src={PLACEHOLDER_THUMBNAIL}
                width={200}
                height={100}
                alt="Intro square"
              />
            </Stack>
          ) : null}
          <Stack
            flex={1}
            justifyContent="center"
            alignItems="center"
            sx={{
              opacity: 0.9,
              background: "radial-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0))",
            }}
          >
            <Play width="40px" height="40px" />
          </Stack>
        </Stack>
        <Stack flex={1} justifyContent="space-between">
          <Typography
            color="rgba(255,255,255,0.7)"
            variant="medium"
            bold
            maxLines={2}
          >
            {props.title}
          </Typography>
          <Typography color="rgba(255,255,255,0.7)" variant="small">
            {getFormattedDate(props.createdAt)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

function DashboardPageContents() {
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

  const { user, isLoading } = useAuth0();

  const [inputValue, setInputValue] = useState<string>("");

  const [videos, setVideos] = useState<IVideo[]>([]);
  useEffect(() => {
    user?.email &&
      ApiController.getUserVideos(user.email).then((videos) =>
        setVideos(_.reverse(videos).filter((v: any) => v.thumbnailUrl))
      );
  }, [user?.email]);

  const router = useRouter();

  const [creationDisabled, setCreationDisabled] = useState<boolean>(false);
  useEffect(
    () => videos && setCreationDisabled(videos.length >= FREE_VIDEO_LIMIT),
    [videos]
  );

  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState<boolean>(false);
  const [upgradePromptBarHidden, setUpgradePromptBarHidden] =
    useState<boolean>(false);
  useEffect(
    () =>
      setUpgradePromptBarHidden(
        width < UPGRADE_PROMPT_BAR_VISIBILITY_WINDOW_WIDTH_THRESHOLD
      ),
    [width]
  );

  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);

  const urlIsInvalid = async () =>
    !["youtube.com", "youtu.be", "vimeo.com"].some((x) =>
      inputValue.includes(x)
    ) &&
    !!(
      await fetch(
        `https://noembed.com/embed?url=${encodeURIComponent(
          deNoCookiefy(inputValue)
        )}`
      ).then(async (result) => result.json())
    ).error;

  const [invalidUrl, setInvalidUrl] = useState<boolean>(false);

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
    mixpanel.track("dashboard page");
  }, []);

  return (
    <>
      <Stack flex={1} position="relative">
        {/* {!upgradePromptBarHidden ? <UpgradePromptBar /> : null} */}
        <Header showUpgradeButton mobile={isMobile} />
        <Stack
          spacing={isMobile ? "26px" : "40px"}
          alignItems="center"
          justifyContent="center"
          pt={isMobile ? "30px" : "50px"}
          px="50px"
          width="100%"
          overflow="hidden"
        >
          <Stack spacing="20px" alignItems="center">
            <Stack
              sx={{
                background: GRADIENT,
                "-webkit-text-fill-color": "transparent",
                backgroundClip: "text",
                "-webkit-background-clip": "text",
              }}
              alignItems="center"
            >
              <Typography
                variant={isMobile ? "h3" : "h1"}
                color={PALETTE.font.light}
                sx={{ textAlign: "center", fontWeight: 480 }}
              >
                Your SafeTube Dashboard
              </Typography>
            </Stack>
            {/* {videos ? (
            <UrsorFadeIn duration={800}>
              <Stack direction="row" alignItems="center" spacing="19px">
                <Stack direction="row" alignItems="center" spacing="6px">
                  <Typography
                    variant={isMobile ? "medium" : "large"}
                    bold
                    color={PALETTE.font.light}
                  >{`${videos.length}/${FREE_VIDEO_LIMIT}`}</Typography>
                  <Typography
                    variant={isMobile ? "medium" : "large"}
                    bold
                    color="rgba(255,255,255,0.7)"
                  >
                    Videos created
                  </Typography>
                </Stack>
                <UrsorButton
                  size="small"
                  variant="tertiary"
                  dark
                  onClick={() => setUpgradeDialogOpen(true)}
                >
                  Upgrade
                </UrsorButton>
              </Stack>
            </UrsorFadeIn>
          ) : null} */}
          </Stack>
          {/* <UrsorFadeIn duration={800} delay={200}> */}
          {/* <Stack position="relative" width="100%" alignItems="center"> */}
          {/* <Stack
            position="absolute"
            top={0}
            left={0}
            bgcolor={PALETTE.system.red}
            py="5px"
            px="10px"
            borderRadius="6px"
          >
            <Typography color={PALETTE.font.light} bold variant="tiny">
              Invalid Youtube or Vimeo URL
            </Typography>
          </Stack> */}
          <Stack
            width="100%"
            maxWidth="800px"
            sx={
              {
                // opacity: creationDisabled ? 0.4 : 1,
                // pointerEvents: creationDisabled ? "none" : undefined,
              }
            }
            alignItems="center"
            position="relative"
          >
            <UrsorFadeIn duration={800}>
              <Stack
                position="absolute"
                bottom="-25px"
                left={0}
                bgcolor={PALETTE.system.red}
                py="5px"
                width="166px"
                minWidth="166px"
                borderRadius="6px"
                sx={{
                  opacity: invalidUrl ? 1 : 0,
                  transition: "0.2s",
                }}
                alignItems="center"
              >
                <Typography color={PALETTE.font.light} bold variant="tiny">
                  Invalid Youtube or Vimeo URL
                </Typography>
              </Stack>
            </UrsorFadeIn>

            <Stack
              width="100%"
              spacing="10px"
              direction={isMobile ? "column" : "row"}
              alignItems="center"
            >
              <UrsorInputField
                value={inputValue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setInputValue(event.target.value);
                  setInvalidUrl(false);
                }}
                placeholder="Enter Youtube or Vimeo URL"
                width="100%"
                leftAlign
                boldValue
                color={invalidUrl ? PALETTE.system.red : undefined}
              />
              <Stack
                sx={{
                  opacity: inputValue ? 1 : 0.5,
                  pointerEvents: inputValue ? undefined : "none",
                }}
              >
                <UrsorButton
                  backgroundColor={GRADIENT}
                  hoverOpacity={0.7}
                  endIcon={ChevronRight}
                  iconColor={PALETTE.font.light}
                  onClick={async () => {
                    if (await urlIsInvalid()) {
                      setInvalidUrl(true);
                    } else {
                      router.push(
                        `video/create?url=${encodeURIComponent(inputValue)}`
                      );
                    }
                  }}
                >
                  Create Video
                </UrsorButton>
              </Stack>
            </Stack>
          </Stack>
          {/* </Stack> */}
          {/* </UrsorFadeIn> */}

          <Stack
            flex={1}
            alignItems="center"
            maxWidth="1254px"
            width="100%"
            overflow="hidden"
          >
            {/* <DynamicContainer fullWidth duration={600}> */}
            <DynamicCardGrid
              cardWidth="272px"
              rowGap={isMobile ? "20px" : "28px"}
              columnGap={isMobile ? "20px" : "28px"}
            >
              {videos.map((v, i) => (
                <UrsorFadeIn key={v.id} duration={800} delay={i * 120}>
                  <VideoCard {...v} />
                </UrsorFadeIn>
              ))}
            </DynamicCardGrid>
            {/* </DynamicContainer> */}
          </Stack>
        </Stack>
        <UpgradeDialog
          open={upgradeDialogOpen}
          closeCallback={() => setUpgradeDialogOpen(false)}
        />
      </Stack>
      <DashboardSignupPromptDialog
        mobile={isMobile}
        open={!user && !isLoading}
      />
    </>
  );
}

export default DashboardPageContents;
