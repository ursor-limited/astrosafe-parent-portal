import React, { useEffect, useState } from "react";
import { IBrowserLink } from "../api";
import { Stack, alpha } from "@mui/system";
import { PALETTE, Typography } from "ui";
import dayjs from "dayjs";
import FavoriteStar from "./FavoriteStar";

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

const BrowserLinkCard = (props: {
  link: IBrowserLink;
  clickCallback?: () => void;
  editCallback?: () => void;
  updateCallback?: () => void;
  duplicateCallback?: () => void;
  noActionButton?: boolean;
}) => {
  const [lightText, setLightText] = useState<boolean>(false);
  useEffect(
    () => setLightText(shouldBeLightText(props.link.color)),
    [props.link.color]
  );
  const agoText = getAgoText(props.link.createdAt);
  return (
    <Stack position="relative" width="100%" minHeight="313px">
      <FavoriteStar id={props.link.id} type="link" black />
      <Stack
        bgcolor={props.link.color}
        borderRadius="12px"
        overflow="hidden"
        border={`4px solid ${props.link.color}`}
        boxSizing="border-box"
        flex={1}
        spacing="5px"
        onClick={props.clickCallback}
        sx={{
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.6 },
        }}
      >
        <Stack
          width="100%"
          height="204px"
          minHeight="204px"
          sx={{
            backgroundColor: "rgba(255,255,255,0.15)",
            backgroundImage: `url(${props.link.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxSizing: "border-box",
          }}
          position="relative"
        />
        <Stack
          px="4px"
          pb="4px"
          pt="2px"
          justifyContent="space-between"
          flex={1}
        >
          <Stack direction="row" minWidth="100%" maxWidth={0}>
            <Typography
              bold
              variant="medium"
              color={lightText ? PALETTE.font.light : PALETTE.font.dark}
              maxLines={3}
            >
              {props.link.title}
            </Typography>
            <Stack minWidth="25px" width="25px" />
          </Stack>
          <Stack direction="row" spacing="4px">
            <Typography
              variant="small"
              color={alpha(
                lightText ? PALETTE.font.light : PALETTE.font.dark,
                0.7
              )}
            >
              {agoText.value}
            </Typography>
            <Typography
              variant="small"
              color={alpha(
                lightText ? PALETTE.font.light : PALETTE.font.dark,
                0.7
              )}
            >
              {agoText.text}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BrowserLinkCard;
