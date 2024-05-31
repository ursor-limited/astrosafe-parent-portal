import React, { useEffect, useState } from "react";
import { IBrowserLink, IVideo } from "../api";
import { Stack, alpha } from "@mui/system";
import { PALETTE, Typography } from "ui";
import dayjs from "dayjs";
import FavoriteStar from "./FavoriteStar";
import PlayIcon from "@/images/icons/PlayIcon.svg";

const LIGHT_TEXT_THRESHOLD = 215;

const getRelativeLuminance = (rgb: number[]) =>
  0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return [
    parseInt(result?.[1] ?? "", 16),
    parseInt(result?.[2] ?? "", 16),
    parseInt(result?.[3] ?? "", 16),
  ];
}

export function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()
  );
}

export const shouldBeLightText = (color: string) =>
  getRelativeLuminance(hexToRgb(color)) < LIGHT_TEXT_THRESHOLD;

export const getAgoText: (datetime?: string) => {
  value?: number;
  text: string;
} = (datetime) => {
  const days = dayjs().diff(dayjs(datetime), "days");
  if (days > 0) {
    return days === 1
      ? { text: "Yesterday" }
      : { value: days, text: "days ago" };
  } else {
    const hours = dayjs().diff(dayjs(datetime), "hours");
    if (hours > 0) {
      return {
        value: hours,
        text: `hour${hours === 1 ? "" : "s"} ago`,
      };
    } else {
      const minutes = dayjs().diff(dayjs(datetime), "minutes");
      return minutes <= 1
        ? { text: "Now" }
        : { value: minutes, text: "minutes ago" };
    }
  }
};

const VideoCard = (props: {
  video: IVideo;
  clickCallback?: () => void;
  editCallback?: () => void;
  updateCallback?: () => void;
  duplicateCallback?: () => void;
  noActionButton?: boolean;
}) => {
  const agoText = getAgoText(props.video.createdAt);
  return (
    <Stack position="relative" width="100%" minHeight="244px">
      <FavoriteStar id={props.video.id} type="video" />
      <Stack
        width="100%"
        height="100%"
        position="absolute"
        onClick={props.clickCallback}
        zIndex={2}
        sx={{
          transition: "0.2s",
          cursor: "pointer",
          "&:hover": { background: "rgba(255,255,255,0.2)" },
          // background: "radial-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0))",
        }}
      />
      <Stack
        bgcolor="rgb(255,255,255)"
        borderRadius="12px"
        overflow="hidden"
        border={`4px solid rgb(255,255,255)`}
        boxSizing="border-box"
        flex={1}
        spacing="5px"
        // sx={{
        //   cursor: "pointer",
        //   transition: "0.2s",
        //   "&:hover": { opacity: 0.6 },
        // }}
      >
        <Stack
          width="100%"
          height="144px"
          minHeight="144px"
          sx={{
            backgroundColor: "rgba(255,255,255,0.15)",
            backgroundImage: `url(${props.video.thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxSizing: "border-box",
            svg: {
              path: {
                fill: "rgb(255,255,255)",
              },
            },
          }}
          position="relative"
        >
          <Stack
            sx={{
              background: "radial-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0))",
            }}
            justifyContent="center"
            alignItems="center"
            flex={1}
          >
            <PlayIcon height="46px" width="46px" />
          </Stack>
        </Stack>
        <Stack
          px="4px"
          pb="4px"
          pt="2px"
          justifyContent="space-between"
          flex={1}
        >
          <Stack direction="row" minWidth="100%" maxWidth={0}>
            <Typography bold variant="medium" maxLines={2}>
              {props.video.title}
            </Typography>
            <Stack minWidth="25px" width="25px" />
          </Stack>
          <Stack direction="row" spacing="4px">
            <Typography variant="small" color={alpha(PALETTE.font.dark, 0.7)}>
              {agoText.value}
            </Typography>
            <Typography variant="small" color={alpha(PALETTE.font.dark, 0.7)}>
              {agoText.text}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default VideoCard;
