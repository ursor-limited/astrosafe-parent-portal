/* eslint-disable react/jsx-sort-props -- want to have paddings in the current order */
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { PALETTE } from "./palette";
import { Typography } from "./typography";

// tertiary is implemented here only for dark mode; the light mode implementation is in UrsorMagicalButton
export type ButtonVariant = "primary" | "secondary" | "tertiary";
// | "tertiary"
// | "ghost"
// | "google"
// | "nippon"
// | "transparentRed"
// | "green";
export type ButtonSize = "large" | "medium" | "small" | "tiny";

type ButtonState = "enabled" | "hover" | "pressed";

type Mode = "light" | "dark";

export const HEIGHTS: Record<ButtonSize, number> = {
  large: 52,
  medium: 42,
  small: 28,
  tiny: 20,
};

export const ICON_SIZES: Record<ButtonSize, number> = {
  large: 26,
  medium: 20,
  small: 20,
  tiny: 16,
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
  tiny: {
    x: 12,
    y: 2,
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
      enabled: "rgb(255,255,255)",
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

export interface UrsorButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  backgroundColor?: string;
  borderColor?: string;
  hoverOpacity?: number;
  fontColor?: string;
  startIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  endIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  iconSize?: number;
  iconColor?: string;
  disabled?: boolean;
  dark?: boolean;
  shadow?: boolean;
}

export function UrsorButton(props: UrsorButtonProps): JSX.Element {
  const mode = props.dark ? "dark" : "light";
  const variant = props.variant ?? "primary";
  const size = props.size ?? "medium";
  const [hovering, setHovering] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);
  const [state, setState] = useState<ButtonState>("enabled");
  useEffect(() => {
    if (pressed) {
      setState("pressed");
    } else if (hovering) {
      setState("hover");
    } else {
      setState("enabled");
    }
  }, [hovering, pressed]);
  return (
    <Stack
      alignItems="center"
      bgcolor={BACKGROUND_COLORS[mode][variant]?.[state]}
      border={`2px solid ${
        props.borderColor || BORDER_COLORS[mode][variant]?.[state]
      }`}
      borderRadius={`${HEIGHTS[size] / 2}px`}
      boxSizing="border-box"
      direction="row"
      height={HEIGHTS[size]}
      justifyContent="center"
      onClick={props.onClick}
      onMouseDown={() => {
        setPressed(true);
      }}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
        setPressed(false);
      }}
      onMouseUp={() => {
        setPressed(false);
      }}
      px={`${PADDINGS[size].x}px`}
      pl={props.startIcon ? `${0.8 * PADDINGS[size].x}px` : undefined}
      pr={props.endIcon ? `${0.8 * PADDINGS[size].x}px` : undefined}
      spacing="12px"
      boxShadow={props.shadow ? "0 0 20px rgba(0,0,0,0.05)" : undefined}
      sx={{
        cursor: "pointer",
        transition: "0.2s",
        background: props.backgroundColor,
        opacity: state === "hover" ? props.hoverOpacity : undefined,
        svg: {
          path: {
            fill:
              props.iconColor ||
              props.fontColor ||
              FONT_COLORS[mode][variant]?.[state] ||
              PALETTE.font.light,
            transition: "0.2s",
          },
        },
      }}
      width="fit-content"
    >
      {props.startIcon ? (
        <props.startIcon
          height={props.iconSize || ICON_SIZES[props.size || "medium"]}
          width={props.iconSize || ICON_SIZES[props.size || "medium"]}
        />
      ) : null}
      <Typography
        bold
        color={
          props.fontColor ??
          FONT_COLORS[mode][variant]?.[state] ??
          PALETTE.font.dark
        }
        noWrap
        sx={{
          transition: "0.2s",
        }}
        variant={size}
      >
        {props.children}
      </Typography>
      {props.endIcon ? (
        <props.endIcon
          height={props.iconSize || ICON_SIZES[props.size || "medium"]}
          width={props.iconSize || ICON_SIZES[props.size || "medium"]}
        />
      ) : null}
    </Stack>
  );
}
