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
import PersonIcon from "@/images/icons/PersonIcon.svg";
import ChevronRight from "@/images/icons/ChevronRight.svg";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Grid } from "@mui/material";
import UrsorFadeIn from "../components/UrsorFadeIn";
import DynamicContainer from "../components/DynamicContainer";
import _ from "lodash";
import Image from "next/image";
import NotificationContext from "../components/NotificationContext";

export const MAGICAL_BORDER_THICKNESS = 1.8;
export const HIDE_LOGO_PLAYER_WIDTH_THRESHOLD = 500;

const PLACEHOLDER_THUMBNAIL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/Safetubelogo2.png";

export const FREE_VIDEO_LIMIT = 3;

const VIDEO_WIDTH = 845;

const GRADIENT = "linear-gradient(150deg, #F279C5, #FD9B41)";

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
      width="299px"
      minWidth="299px"
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
          onClick={() => {
            navigator.clipboard.writeText(
              currentPageUrl ? currentPageUrl.split("?")[0] : ""
            );
            notificationCtx.success("Copied URL to Clipboard.");
          }}
        >
          Share
        </UrsorButton>
      </Stack>
      <Stack
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

  const { user } = useAuth0();

  const [inputValue, setInputValue] = useState<string>("");

  const [videos, setVideos] = useState<IVideo[]>([]);
  useEffect(() => {
    user?.email &&
      ApiController.getUserVideos(user.email).then((videos) =>
        setVideos(
          _.reverse(videos).filter(
            (v: any) => user.email !== "mkl.koskela@gmail.com" || v.thumbnailUrl
          )
        )
      );
  }, [user?.email]);

  const router = useRouter();

  return (
    <>
      <Header showUpgradeButton />
      <Stack
        spacing="40px"
        alignItems="center"
        justifyContent="center"
        pt="40px"
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
            <Typography variant="h1" color={PALETTE.font.light}>
              Your SafeTube Dashboard
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing="19px">
            <Stack direction="row" alignItems="center" spacing="6px">
              <Typography
                variant="large"
                bold
                color={PALETTE.font.light}
              >{`${2}/${FREE_VIDEO_LIMIT}`}</Typography>
              <Typography variant="large" bold color="rgba(255,255,255,0.7)">
                videos created
              </Typography>
            </Stack>
            <UrsorButton size="small" variant="tertiary" dark>
              Upgrade
            </UrsorButton>
          </Stack>
        </Stack>
        <Stack direction="row" spacing="10px">
          <UrsorInputField
            value={inputValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(event.target.value)
            }
            placeholder="Enter Youtube or Vimeo URL"
            width="645px"
            leftAlign
            boldValue
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
              onClick={() =>
                router.push(
                  `video/create?url=${encodeURIComponent(inputValue)}`
                )
              }
            >
              Create Video
            </UrsorButton>
          </Stack>
        </Stack>
        <DynamicContainer fullWidth duration={600}>
          <Stack flex={1} alignItems="center">
            <Grid container gap="32px" width="80%">
              {videos.map((v, i) => (
                <Grid item key={v.id}>
                  <UrsorFadeIn duration={600} delay={i * 120}>
                    <VideoCard {...v} />
                  </UrsorFadeIn>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </DynamicContainer>
      </Stack>
    </>
  );
}

export default DashboardPageContents;
