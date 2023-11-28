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

export interface UrsorButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  backgroundColor?: string;
  hoverOpacity?: number;
  fontColor?: string;
  startIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  endIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  iconSize?: string;
  iconColor?: string;
  disabled?: boolean;
  dark?: boolean;
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
      border={`2px solid ${BORDER_COLORS[mode][variant]?.[state]}`}
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
      pl={props.startIcon ? `${0.6 * PADDINGS[size].x}px` : undefined}
      pr={props.endIcon ? `${0.6 * PADDINGS[size].x}px` : undefined}
      spacing="12px"
      sx={{
        cursor: "pointer",
        transition: "0.2s",
        background: props.backgroundColor,
        opacity: state === "hover" ? props.hoverOpacity : undefined,
        svg: {
          path: {
            fill: props.iconColor || BORDER_COLORS[mode][variant]?.[state],
            transition: "0.2s",
          },
        },
      }}
      width="fit-content"
    >
      {props.startIcon ? (
        <props.startIcon
          height={props.iconSize || 20}
          width={props.iconSize || 20}
        />
      ) : null}
      <Typography
        bold
        color={FONT_COLORS[mode][variant]?.[state] ?? PALETTE.font.dark}
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
          height={props.iconSize || 20}
          width={props.iconSize || 20}
        />
      ) : null}
    </Stack>
  );
}
