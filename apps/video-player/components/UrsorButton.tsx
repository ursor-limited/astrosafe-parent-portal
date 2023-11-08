import { Avatar, Button } from "@mui/material";
import { Stack, SxProps, alpha } from "@mui/system";
import React, { useState } from "react";
import { PALETTE } from "../palette";
import Typography, { UrsorTypographyVariant } from "./Typography";

// tertiary is implemented here only for dark mode; the light mode implementation is in UrsorMagicalButton
export type ButtonVariant = "primary" | "secondary" | "tertiary";
// | "tertiary"
// | "ghost"
// | "google"
// | "nippon"
// | "transparentRed"
// | "green";
export type ButtonSize = "large" | "medium" | "small";

type ButtonState = "enabled" | "hover" | "pressed";

type Mode = "light" | "dark";

export const HEIGHTS: Record<ButtonSize, number> = {
  large: 52,
  medium: 42,
  small: 28,
};

export const PADDINGS: Record<ButtonSize, { x: number; y: number }> = {
  large: { x: 32, y: 12 },
  medium: {
    x: 24,
    y: 8,
  },
  small: {
    x: 16,
    y: 4,
  },
};

export const BACKGROUND_COLORS: Record<
  Mode,
  Partial<Record<ButtonVariant, Partial<Record<ButtonState, string>>>>
> = {
  light: {
    primary: {
      enabled: PALETTE.primary.indigo,
      hover: PALETTE.secondary.purple[2],
      pressed: PALETTE.secondary.purple[3],
    },
    secondary: {
      enabled: PALETTE.font.light,
      hover: PALETTE.font.light,
      pressed: PALETTE.secondary.grey[2],
    },
  },
  dark: {
    primary: {
      enabled: PALETTE.secondary.grey[1],
      hover: PALETTE.secondary.purple[2],
      pressed: PALETTE.secondary.grey[1],
    },
    tertiary: {
      enabled: PALETTE.secondary.purple[2],
      hover: PALETTE.secondary.purple[3],
      pressed: PALETTE.secondary.purple[1],
    },
  },
};

export const FONT_COLORS: Record<
  Mode,
  Partial<Record<ButtonVariant, Partial<Record<ButtonState, string>>>>
> = {
  light: {
    primary: {
      enabled: PALETTE.font.light,
      hover: PALETTE.font.light,
      pressed: PALETTE.font.light,
    },
    secondary: {
      enabled: PALETTE.primary.indigo,
      hover: PALETTE.secondary.purple[2],
      pressed: PALETTE.primary.indigo,
    },
  },
  dark: {
    primary: {
      enabled: PALETTE.font.dark,
      hover: PALETTE.font.light,
      pressed: PALETTE.secondary.purple[2],
    },
    secondary: {
      enabled: PALETTE.font.light,
      hover: PALETTE.secondary.purple[2],
      pressed: PALETTE.secondary.grey[3],
    },
    tertiary: {
      enabled: PALETTE.font.light,
      hover: PALETTE.font.light,
      pressed: PALETTE.font.light,
    },
  },
};

export const BORDER_COLORS: Record<
  Mode,
  Partial<Record<ButtonVariant, Partial<Record<ButtonState, string>>>>
> = {
  light: {
    secondary: {
      enabled: PALETTE.primary.indigo,
      hover: PALETTE.secondary.purple[2],
      pressed: PALETTE.primary.indigo,
    },
  },
  dark: {
    secondary: {
      enabled: PALETTE.font.light,
      hover: PALETTE.secondary.purple[2],
      pressed: PALETTE.secondary.grey[3],
    },
  },
};

export interface IUrsorButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  backgroundColor?: string;
  fontColor?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  dark?: boolean;
}

export default function UrsorButton(props: IUrsorButtonProps) {
  const mode = props.dark ? "dark" : "light";
  const variant = props.variant ?? "primary";
  const size = props.size ?? "medium";
  const [hovering, setHovering] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);
  return (
    <Stack
      height={HEIGHTS[size]}
      px={`${PADDINGS[size].x}px`}
      borderRadius={`${HEIGHTS[size] / 2}px`}
      bgcolor={
        BACKGROUND_COLORS[mode]?.[variant]?.[
          pressed ? "pressed" : hovering ? "hover" : "enabled"
        ]
      }
      justifyContent="center"
      alignItems="center"
      boxSizing="border-box"
      onClick={props.onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setPressed(false);
      }}
      sx={{
        cursor: "pointer",
        transition: "0.2s",
      }}
    >
      <Typography
        noWrap
        bold
        variant={size}
        color={
          FONT_COLORS[mode]?.[variant]?.[
            pressed ? "pressed" : hovering ? "hover" : "enabled"
          ] ?? PALETTE.font.dark
        }
      >
        {props.children}
      </Typography>
    </Stack>
  );
}
