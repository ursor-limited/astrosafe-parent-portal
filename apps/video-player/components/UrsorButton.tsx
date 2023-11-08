import { Avatar, Button } from "@mui/material";
import { SxProps, alpha } from "@mui/system";
import React from "react";
import { PALETTE } from "../palette";
import Typography, { UrsorTypographyVariant } from "./Typography";

// tertiary is implemented here only for dark mode; the light mode implementation is in UrsorMagicalButton
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "google"
  | "nippon"
  | "transparentRed"
  | "green";
export type ButtonSize = "large" | "medium" | "small" | "tiny";

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
    y: 3,
  },
};

export interface IUrsorButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  backgroundColor?: string;
  fontColor?: string;
  outline?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  noPadding?: boolean;
  sx?: SxProps;
  mode?: "light" | "dark";
}

export default function UrsorButton(props: IUrsorButtonProps) {
  const mode = props.mode || "light";
  const PRIMARY_STYLE = {
    borderRadius: "60px",
    bgcolor: mode === "dark" ? "rgb(255,255,255)" : PALETTE.primary.indigo,
    color: mode === "dark" ? PALETTE.font.dark : PALETTE.font.light,
    svg: {
      path: {
        fill: mode === "dark" ? PALETTE.font.dark : PALETTE.font.light,
      },
    },
    "&:hover": {
      color: PALETTE.font.light,
      background: PALETTE.secondary.purple[2],
      svg: {
        path: {
          fill: PALETTE.font.light,
        },
      },
    },
    "&:active": {
      color: mode === "dark" ? PALETTE.secondary.purple[2] : PALETTE.font.light,
      boxShadow: "none",
      background:
        mode === "dark"
          ? PALETTE.primary.offWhite
          : PALETTE.secondary.purple[5],
    },
    // "&:disabled": {
    //   background: alpha(PALETTE.primary.indigo, 0.4),
    //   color: PALETTE.font.light,
    // },
  };

  const SECONDARY_STYLE = {
    height:
      !props.size || props.size === "medium"
        ? "42px"
        : props.size === "small"
        ? "28px"
        : "fit-content", // VERY HACKY SOLUTION TO ALIGN THE HEIGHT WITH BORDERLESS BUTTONS
    borderRadius: "60px",
    bgcolor: mode === "dark" ? "transparent" : PALETTE.primary.offWhite,
    color: mode === "dark" ? PALETTE.font.light : PALETTE.font.dark,
    svg: {
      path: {
        fill: mode === "light" ? PALETTE.font.dark : PALETTE.font.light,
      },
    },
    border: `2px solid ${
      mode === "light" ? PALETTE.primary.indigo : "rgb(255,255,255)"
    }`,
    "&:hover": {
      background: mode === "light" ? "white" : "transparent",
      opacity: 1,
      color: PALETTE.secondary.purple[2],
      svg: {
        path: {
          fill: PALETTE.secondary.purple[2],
        },
      },
      border: `2px solid ${PALETTE.secondary.purple[2]}`,
      path: { fill: PALETTE.secondary.purple[2] },
    },
    "&:active": {
      bgcolor: mode === "light" ? PALETTE.secondary.grey[2] : "transparent",
      color:
        mode === "light"
          ? PALETTE.secondary.purple[3]
          : PALETTE.secondary.grey[3],
      svg: {
        path: {
          fill:
            mode === "light"
              ? PALETTE.secondary.purple[3]
              : PALETTE.secondary.grey[3],
        },
      },
      border: `2px solid ${
        mode === "light"
          ? PALETTE.secondary.purple[3]
          : PALETTE.secondary.grey[3]
      }`,
      boxShadow: "none",
      path: { fill: PALETTE.primary.indigo },
    },
    // "&:disabled": {
    //   bgcolor: "background.main",
    //   color: "#A9A9A9",
    // },
  };

  const TERTIARY_STYLE = {
    borderRadius: "60px",
    bgcolor: PALETTE.secondary.purple[2],
    color: PALETTE.primary.offWhite,
    svg: { path: { fill: PALETTE.primary.offWhite } },
    "&:hover": {
      bgcolor: PALETTE.secondary.purple[1],
    },
    "&:active": {
      bgcolor: PALETTE.secondary.purple[3],
    },
    // "&:disabled": {
    //   bgcolor: PALETTE.secondary.grey[2],
    //   color: PALETTE.secondary.grey[4],
    // },
  };

  const GHOST_STYLE = {
    borderRadius: "60px",
    color: props.danger ? PALETTE.secondary.pink[3] : PALETTE.primary.indigo,
    svg: {
      path: {
        fill: props.danger ? PALETTE.secondary.pink[3] : PALETTE.primary.indigo,
      },
    },
    "&:hover": {
      background: "none",
      color: props.danger
        ? PALETTE.secondary.pink[2]
        : PALETTE.secondary.purple[2],
    },
    // "&:disabled": {
    //   color: PALETTE.secondary.grey[3],
    // },
  };

  const NIPPON_STYLE = {
    borderRadius: "60px",
    bgcolor: "rgb(255,255,255)",
    color: PALETTE.system.red,
    svg: {
      path: {
        fill: PALETTE.system.red,
      },
    },
    "&:hover": {
      background: PALETTE.secondary.grey[2],
      //color: PALETTE.secondary.blue[2],
    },
    // "&:disabled": {
    //   color: PALETTE.secondary.grey[3],
    // },
  };

  const TRANSPARENT_RED_STYLE = {
    borderRadius: "60px",
    bgcolor: "transparent",
    border: `2px solid ${PALETTE.system.red}`,
    color: PALETTE.system.red,
    svg: {
      path: {
        fill: PALETTE.system.red,
      },
    },
    "&:hover": {
      background: alpha(PALETTE.system.red, 0.2),
      //color: PALETTE.secondary.blue[2],
    },
    // "&:disabled": {
    //   color: PALETTE.secondary.grey[3],
    // },
  };

  const GREEN_STYLE = {
    borderRadius: "60px",
    bgcolor: PALETTE.secondary.green[4],
    color: PALETTE.font.light,
    svg: {
      path: {
        fill: PALETTE.font.light,
      },
    },
    "&:hover": {
      color: PALETTE.font.light,
      background: PALETTE.secondary.green[3],
      svg: {
        path: {
          fill: PALETTE.font.light,
        },
      },
    },
    "&:active": {
      color: PALETTE.font.light,
      boxShadow: "none",
      background: PALETTE.secondary.green[5],
    },
    // "&:disabled": {
    //   background: alpha(PALETTE.primary.indigo, 0.4),
    //   color: PALETTE.font.light,
    // },
  };

  const GOOGLE_STYLE = {
    borderRadius: "60px",
    bgcolor: PALETTE.primary.offWhite,
    color: PALETTE.font.dark,
    border: mode === "light" ? `2px solid ${PALETTE.primary.indigo}` : "none",
    "&:hover": {
      background: "white",
      opacity: 1,
      color: PALETTE.secondary.purple[2],
      border:
        mode === "light" ? `2px solid ${PALETTE.secondary.purple[2]}` : "none",
      path: { fill: PALETTE.secondary.purple[2] },
    },
    "&:active": {
      bgcolor: PALETTE.secondary.grey[2],
      color: PALETTE.primary.indigo,
      border: mode === "light" ? `2px solid ${PALETTE.primary.indigo}` : "none",
      boxShadow: "none",
      path: { fill: PALETTE.primary.indigo },
    },
    // "&:disabled": {
    //   bgcolor: "background.main",
    //   color: "#A9A9A9",
    // },
    fontFamily: "Roboto",
  };

  const BUTTON_STYLES: Record<ButtonVariant, any> = {
    primary: PRIMARY_STYLE,
    secondary: SECONDARY_STYLE,
    tertiary: TERTIARY_STYLE,
    ghost: GHOST_STYLE,
    google: GOOGLE_STYLE,
    nippon: NIPPON_STYLE,
    transparentRed: TRANSPARENT_RED_STYLE,
    green: GREEN_STYLE,
  };

  return (
    <Button
      sx={{
        ...props.sx,
        ...BUTTON_STYLES[props.variant ?? "primary"],
        ...(props.backgroundColor ? { bgcolor: props.backgroundColor } : null),
        ...(props.outline ? { outline: props.outline } : null),
        ...(props.fontColor ? { color: props.fontColor } : null),
        padding: props.noPadding
          ? 0
          : [
              `${PADDINGS[props.size ?? "medium"].y}px`,
              `${PADDINGS[props.size ?? "medium"].x}px`,
            ].join(" "),
        cursor: "pointer",
        path: { transition: "0.2s" },
        minWidth: "fit-content",
        ".MuiButton-startIcon": { marginRight: "5px" },
        opacity: props.disabled ? 0.4 : 1,
        pointerEvents: props.disabled ? "none" : undefined,
      }}
      onClick={props.onClick}
      // startIcon={ClippyIcon}
      startIcon={
        props.variant === "google" ? (
          <Avatar
            src={
              "https://ursorassets.s3.eu-west-1.amazonaws.com/img/icons/googleClassroomIcon.png"
            }
            sx={{ width: "24px", height: "24px" }}
          />
        ) : (
          props.startIcon
        )
      }
      endIcon={props.endIcon}
      disableRipple
    >
      <Typography
        noWrap
        variant={(props.size as UrsorTypographyVariant) ?? "medium"}
        color="inherit"
        bold
      >
        {props.children}
      </Typography>
    </Button>
  );
}
