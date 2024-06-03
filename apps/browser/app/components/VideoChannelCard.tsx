import React, { useState } from "react";
import { Box, Stack } from "@mui/system";
import { IVideoChannel } from "../api";
import { PALETTE, Typography } from "ui";
import Image from "next/image";

const PADDING = "8px";
const IMAGE_HEIGHT = "89px";
const BORDER_RADIUS = "12px";
export const PLACEHOLDER_IMAGE_URL_COMMON_SECTION =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/img/cardAssets/patterns/pattern";

export interface IVideoChannelCardProps {
  videoChannel: IVideoChannel;
  clickCallback: () => void;
  mobile?: boolean;
}

const VideoChannelCard = (props: IVideoChannelCardProps) => {
  return (
    <Stack
      height="160px"
      width="176px"
      sx={{
        cursor: "pointer",
        "&:hover": { opacity: 0.6 },
        transition: "0.2s",
      }}
      borderRadius={BORDER_RADIUS}
      p={PADDING}
      bgcolor="#ffffff"
      boxSizing="border-box"
      position="relative"
    >
      <Stack
        borderRadius="100%"
        position="absolute"
        overflow="hidden"
        top="43px"
        left="50%"
        sx={{
          transform: "translateX(-50%)",
        }}
        height="63px"
        width="63px"
        border="3px solid white"
        boxShadow="0 10px 16px rgba(0,0,0,0.04)"
        zIndex={2}
      >
        <Image
          src={props.videoChannel.profileImageUrl}
          height={63}
          width={63}
          alt="video channel profile image"
        />
      </Stack>
      <Stack spacing="18px">
        <Stack
          sx={{
            backgroundImage: `url(${props.videoChannel.bannerImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundColor: props.videoChannel.bannerImageUrl.includes(
              PLACEHOLDER_IMAGE_URL_COMMON_SECTION
            )
              ? PALETTE.secondary.grey[2]
              : undefined,
            opacity: 0.64,
          }}
          height={IMAGE_HEIGHT}
          width="100%"
          borderRadius="8px"
        />
        <Typography variant="small" bold maxLines={2}>
          {props.videoChannel.title}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default VideoChannelCard;
