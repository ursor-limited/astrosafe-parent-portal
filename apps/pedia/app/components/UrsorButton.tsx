import { Button } from "@mui/material";
import { SxProps, useTheme } from "@mui/system";
import React from "react";
import Typography, { UrsorTypographyVariant } from "./Typography";
import { PALETTE } from "ui";

// tertiary is implemented here only for dark mode; the light mode implementation is in UrsorMagicalButton
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";
export type ButtonSize = "large" | "medium" | "small";

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

export interface IUrsorButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  backgroundColor?: string;
  outline?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  noPadding?: boolean;
  sx?: SxProps;
  dark?: boolean;
}

export default function UrsorButton(props: IUrsorButtonProps) {
  const PRIMARY_STYLE = {
    borderRadius: "60px",
    bgcolor: props.dark ? PALETTE.primary.offWhite : PALETTE.primary.indigo,
    color: props.dark ? PALETTE.font.dark : PALETTE.font.light,
    border: "2px solid transparent",
    "&:hover": {
      color: PALETTE.font.light,
      background: PALETTE.secondary.purple[2],
    },
    "&:active": {
      color: props.dark ? PALETTE.secondary.purple[2] : PALETTE.font.light,
      boxShadow: "none",
      background: props.dark
        ? PALETTE.primary.offWhite
        : PALETTE.secondary.purple[5],
    },
    "&:disabled": {
      bgcolor: "background.main",
      color: "#A9A9A9",
    },
  };

  const SECONDARY_STYLE = {
    borderRadius: "60px",
    bgcolor: !props.dark ? PALETTE.primary.offWhite : "none",
    color: !props.dark ? PALETTE.font.dark : PALETTE.font.light,
    border: `2px solid ${
      !props.dark ? PALETTE.primary.indigo : PALETTE.font.light
    }`,
    "&:hover": {
      background: !props.dark ? "white" : "none",
      opacity: 1,
      color: PALETTE.secondary.purple[2],
      border: `2px solid ${PALETTE.secondary.purple[2]}`,
      path: { fill: PALETTE.secondary.purple[2] },
    },
    "&:active": {
      bgcolor: !props.dark ? PALETTE.secondary.grey[2] : "none",
      color: !props.dark ? PALETTE.primary.indigo : PALETTE.secondary.grey[3],
      border: `2px solid ${
        !props.dark ? PALETTE.primary.indigo : PALETTE.secondary.grey[3]
      }`,
      boxShadow: "none",
      path: { fill: PALETTE.primary.indigo },
    },
    "&:disabled": {
      bgcolor: "background.main",
      color: "#A9A9A9",
    },
  };

  const TERTIARY_STYLE = {
    borderRadius: "60px",
    bgcolor: PALETTE.secondary.purple[2],
    color: PALETTE.primary.offWhite,
    svg: { path: { fill: PALETTE.primary.offWhite } },
    border: "2px solid transparent",
    "&:hover": {
      bgcolor: PALETTE.secondary.purple[1],
    },
    "&:active": {
      bgcolor: PALETTE.secondary.purple[3],
    },
    "&:disabled": {
      bgcolor: PALETTE.secondary.grey[2],
      color: PALETTE.secondary.grey[4],
    },
  };

  const GHOST_STYLE = {
    borderRadius: "60px",
    color: props.danger ? PALETTE.secondary.pink[3] : PALETTE.primary.indigo,
    "&:hover": {
      background: "none",
      color: props.danger
        ? PALETTE.secondary.pink[2]
        : PALETTE.secondary.blue[2],
    },
    "&:disabled": {
      color: PALETTE.secondary.grey[3],
    },
  };

  const BUTTON_STYLES: Record<ButtonVariant, any> = {
    primary: PRIMARY_STYLE,
    secondary: SECONDARY_STYLE,
    tertiary: TERTIARY_STYLE,
    ghost: GHOST_STYLE,
  };

  return (
    <Button
      sx={{
        ...props.sx,
        ...BUTTON_STYLES[props.variant ?? "primary"],
        ...(props.backgroundColor ? { bgcolor: props.backgroundColor } : null),
        ...(props.outline ? { outline: props.outline } : null),
        fontFamily: "Rubik",
        opacity: props.disabled ? 0.4 : 1,
        padding: props.noPadding
          ? 0
          : [
              `${PADDINGS[props.size ?? "medium"].y}px`,
              `${PADDINGS[props.size ?? "medium"].x}px`,
            ].join(" "),
        cursor: "pointer",
        path: { transition: "0.2s" },
        minWidth: "fit-content",
        height: "fit-content",
      }}
      disabled={props.disabled}
      onClick={props.onClick}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      disableRipple
    >
      <Typography
        noWrap
        variant={(props.size as UrsorTypographyVariant) ?? "medium"}
        color="inherit"
        bold
      >
        {props.children ? props.children : null}
      </Typography>
    </Button>
  );
}
