import React, { useContext, useEffect, useState } from "react";
import { Stack, alpha } from "@mui/system";
import dayjs from "dayjs";
import { PALETTE, Typography } from "ui";
import { useRouter } from "next/navigation";
import { ILink } from "../dashboard/LinkDialog";
import { getFormattedDate } from "./VideoCard";
import LinkIcon from "@/images/icons/LinkIcon.svg";

const LIGHT_TEXT_THRESHOLD = 200;

export function rgbToHex(rgb: number[]) {
  return (
    "#" +
    ((1 << 24) | (rgb[0] << 16) | (rgb[1] << 8) | rgb[2])
      .toString(16)
      .slice(1)
      .toUpperCase()
  );
}

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

export const shouldBeLightText = (color: number[]) =>
  getRelativeLuminance(color) < LIGHT_TEXT_THRESHOLD;

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

export const getPrefixRemovedUrl = (url: string) =>
  url
    .replace(/^(https\:\/\/)/, "")
    .replace(/^(http\:\/\/)/, "")
    .replace(/^(www\.)/, "");

export const getPrefixRemovedUrlWithWWWRetained = (url: string) =>
  url.replace(/^(https\:\/\/)/, "").replace(/^(http\:\/\/)/, "");

export const getAbsoluteUrl = (url: string) =>
  `https://${getPrefixRemovedUrl(url)}`;

const LinkCard = (props: {
  title: ILink["title"];
  url: ILink["url"];
  imageUrl: ILink["imageUrl"];
  color: ILink["color"];
  createdAt: ILink["createdAt"];
  clickCallback?: () => void;
  editCallback?: () => void;
  duplicateCallback?: () => void;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  const [lightText, setLightText] = useState<boolean>(false);
  useEffect(
    () => setLightText(shouldBeLightText(hexToRgb(props.color))),
    [props.color]
  );

  const router = useRouter();
  return (
    <Stack
      position="relative"
      width="100%"
      minHeight="313px"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Stack
        bgcolor={props.color || "rgb(255,255,255)"}
        borderRadius="12px"
        overflow="hidden"
        border={`4px solid ${props.color || "rgb(255,255,255)"}`}
        boxSizing="border-box"
        flex={1}
        spacing="5px"
        onClick={() => router.push(`https://${getPrefixRemovedUrl(props.url)}`)}
        sx={{
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.6 },
        }}
      >
        <Stack
          width="100%"
          minHeight="304px"
          sx={{
            backgroundColor: "rgba(255,255,255,0.15)",
            backgroundImage: `url(${props.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxSizing: "border-box",
          }}
          position="relative"
        />
        <Stack pb="4px" pt="2px" justifyContent="space-between" flex={1}>
          <Stack flex={1} justifyContent="space-between">
            <Typography
              color="rgba(255,255,255)"
              variant="medium"
              bold
              maxLines={2}
            >
              {props.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ svg: { path: { fill: "rgba(255,255,255,0.93)" } } }}
            >
              <Typography color="rgba(255,255,255,0.93)" variant="small">
                {getFormattedDate(props.createdAt)}
              </Typography>
              <LinkIcon height="20px" width="20px" />
            </Stack>
          </Stack>
          {/* <Stack direction="row" spacing="4px">
            <Typography
              variant="small"
              color={alpha(
                lightText ? PALETTE.font.light : PALETTE.font.dark,
                0.7
              )}
              bold
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
          </Stack> */}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LinkCard;
