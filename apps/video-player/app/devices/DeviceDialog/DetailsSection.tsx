import React from "react";
import { Stack } from "@mui/system";
import { Typography, UrsorTypographyVariant } from "ui/typography";
import { PALETTE } from "ui";

export const getMaxLinesStyle = (n: number) => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: n,
  wordBreak: "break-word",
});

const MAX_N_LINES = 9;

export interface IDetailsSectionProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  boldTitle?: boolean;
  titleSize?: UrsorTypographyVariant;
  contentFontSize?: UrsorTypographyVariant;
  contentFontColor?: string;
  iconSize?: string;
  children: React.ReactNode;
  titleExtraElement?: React.ReactNode;
}

export default function DetailsSection(props: IDetailsSectionProps) {
  return (
    <Stack
      direction="row"
      spacing="16px"
      sx={{ transform: "translateX(-5px)" }}
      width="100%"
    >
      <Stack
        height={props.iconSize ?? "20px"}
        width={props.iconSize ?? "20px"}
        sx={{ transform: "translateY(3.7px)" }}
      >
        <props.icon />
      </Stack>
      <Stack spacing="2px" width="85%">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant={props.titleSize ?? "large"}
            bold={props.boldTitle}
          >
            {props.title}
          </Typography>
          {props.titleExtraElement}
        </Stack>
        <Typography
          sx={getMaxLinesStyle(MAX_N_LINES)}
          variant={props.contentFontSize ?? "normal"}
          color={props.contentFontColor ?? PALETTE.font.dark}
          maxLines={2}
        >
          {props.children}
        </Typography>
      </Stack>
    </Stack>
  );
}
