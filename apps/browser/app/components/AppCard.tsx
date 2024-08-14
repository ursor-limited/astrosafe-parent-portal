import React from "react";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import Image from "next/image";

const PADDING = "8px";
export const MIN_WIDTH = "175px";
const HEIGHT = "243px";
const IMAGE_HEIGHT = "108px";
const BORDER_RADIUS = "12px";
export const PLACEHOLDER_IMAGE_URL_COMMON_SECTION =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/img/cardAssets/patterns/pattern";

export interface IApp {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  description: string;
}

export interface IPlatformCardProps {
  app: IApp;
  clickCallback?: () => void;
}

const AppCard = (props: IPlatformCardProps) => {
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
        height={IMAGE_HEIGHT}
        width="100%"
        borderRadius="8px"
        overflow="hidden"
        position="relative"
        boxShadow="0 0 6px rgba(0,0,0,0.08)"
      >
        <Image
          src={props.app.imageUrl}
          style={{ objectFit: "cover" }}
          fill
          alt="app logo"
        />
      </Stack>
      <Typography variant="small" bold maxLines={2}>
        {props.app.title}
      </Typography>
    </Stack>
  );
};

export default AppCard;
