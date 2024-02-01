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

export const MAGICAL_BORDER_THICKNESS = 1.8;
export const HIDE_LOGO_PLAYER_WIDTH_THRESHOLD = 500;

const PLACEHOLDER_THUMBNAIL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/Safetubelogo2.png";

const FREE_VIDEO_LIMIT = 3;

const VIDEO_WIDTH = 845;
const VIDEO_HEIGHT = 475;

const GRADIENT = "linear-gradient(150deg, #F279C5, #FD9B41)";

export const getFormattedDate = (date: string) =>
  moment(date).format("Do MMMM YYYY");

const VideoCard = (props: IVideo) => (
  <Stack
    width="299px"
    minWidth="299px"
    height="253px"
    borderRadius="12px"
    border="4px solid rgba(255,255,255,0.6)"
    bgcolor="rgba(255,255,255)"
    overflow="hidden"
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
      position="relative"
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
      <Stack position="absolute" top="10px" right="10px">
        <UrsorButton variant="secondary" size="small">
          Share
        </UrsorButton>
      </Stack>
    </Stack>
    <Stack flex={1} alignItems="space-between">
      <Typography variant="medium" bold maxLines={2}>
        {props.title}
      </Typography>
      <Typography variant="small">
        {getFormattedDate(props.createdAt)}
      </Typography>
    </Stack>
  </Stack>
);

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
            <UrsorButton size="small" dark>
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
            <Grid container gap="8px" width="80%">
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
