"use client";

import { Box, SxProps, useTheme } from "@mui/system";
import React from "react";
import { PALETTE } from "../palette";

export const DEFAULT_FONT_WEIGHT = 300;
export const BOLD_FONT_WEIGHT = 500;

export const getMaxLinesStyle = (n: number) => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: n,
  wordBreak: "break-word",
});

export type UrsorTypographyVariant =
  | "h0"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "large"
  | "medium"
  | "normal"
  | "small"
  | "tiny";

export const FONT_SIZES: Record<UrsorTypographyVariant, number> = {
  h0: 80,
  h1: 56,
  h2: 48,
  h3: 40,
  h4: 32,
  h5: 24,
  large: 20,
  medium: 18,
  normal: 16,
  small: 14,
  tiny: 10,
};

export const LINE_HEIGHTS: Record<UrsorTypographyVariant, number> = {
  h0: 80,
  h1: 62,
  h2: 53,
  h3: 44,
  h4: 35,
  h5: 26,
  large: 28,
  medium: 25,
  normal: 22,
  small: 20,
  tiny: 11,
};

const DEFAULT_BOLD: UrsorTypographyVariant[] = [
  "h0",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
];

export interface ITypographyProps {
  variant?: UrsorTypographyVariant;
  bold?: boolean;
  faded?: boolean;
  noWrap?: boolean;
  color?: string;
  maxLines?: number;
  sx?: SxProps;
  children: React.ReactNode;
}

export default function Typography(props: ITypographyProps) {
  const theme = useTheme();
  return (
    <Box
      //fontFamily={"Rubik"}
      fontWeight={
        props.bold || (props.variant && DEFAULT_BOLD.includes(props.variant))
          ? BOLD_FONT_WEIGHT
          : DEFAULT_FONT_WEIGHT
      }
      fontSize={`${FONT_SIZES[props.variant ?? "normal"]}px`}
      lineHeight={`${LINE_HEIGHTS[props.variant ?? "normal"]}px`}
      color={
        props.color ??
        (theme.palette.mode === "dark" ? PALETTE.font.light : PALETTE.font.dark)
      }
      sx={{
        ...props.sx,
        ...(props.faded
          ? {
              opacity: 0.6,
            }
          : null),
        ...(props.noWrap
          ? {
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }
          : null),
        ...(props.maxLines
          ? {
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: props.maxLines,
              wordBreak: "break-all",
            }
          : null),
      }}
    >
      {props.children}
    </Box>
  );
}
