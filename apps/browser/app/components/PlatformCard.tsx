import React, { useState } from "react";
import { Box, Stack } from "@mui/system";
import { IPlatform } from "../api";
import { PALETTE, Typography } from "ui";

const PADDING = "8px";
export const MIN_WIDTH = "175px";
const HEIGHT = "243px";
const IMAGE_HEIGHT = "108px";
const BORDER_RADIUS = "12px";
export const PLACEHOLDER_IMAGE_URL_COMMON_SECTION =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/img/cardAssets/patterns/pattern";

export interface IPlatformCardProps {
  platform: IPlatform;
  clickCallback: () => void;
}

const PlatformCard = (props: IPlatformCardProps) => {
  return (
    <Stack
      height="162px"
      width="124px"
      sx={{
        cursor: "pointer",
        "&:hover": { opacity: 0.6 },
        transition: "0.2s",
      }}
      borderRadius={BORDER_RADIUS}
      p={PADDING}
      bgcolor="#ffffff"
      boxSizing="border-box"
      spacing="8px"
    >
      <Stack
        sx={{
          backgroundImage: `url(${props.platform.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundColor: props.platform.img.includes(
            PLACEHOLDER_IMAGE_URL_COMMON_SECTION
          )
            ? PALETTE.secondary.grey[2]
            : undefined,
        }}
        height={IMAGE_HEIGHT}
        width="100%"
        borderRadius="8px"
      />
      <Typography variant="small" bold maxLines={2}>
        {props.platform.title}
      </Typography>
    </Stack>
  );
};

export default PlatformCard;