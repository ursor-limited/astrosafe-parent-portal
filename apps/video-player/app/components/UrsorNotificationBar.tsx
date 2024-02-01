"use client";

import * as React from "react";
import { Box, Stack } from "@mui/material";
import { useContext } from "react";
import { NotificationType } from "./NotificationProvider";
import { PALETTE, Typography } from "ui";
import NotificationContext from "./NotificationContext";

const HEIGHT = "48px";
const WIDTH = "421px";
const DURATION = 2000;
const TOP_PADDING = "31px";

export interface IUrsorNotificationBarProps {}

export const COLORS: Record<NotificationType, string> = {
  error: PALETTE.system.red,
  success: PALETTE.secondary.green[4],
  negativeSuccess: PALETTE.system.red,
};

export default function UrsorNotificationBar(
  props: IUrsorNotificationBarProps
) {
  const notificationCtx = useContext(NotificationContext);

  const [visible, setVisible] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (notificationCtx.message) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, DURATION);
    }
  }, [notificationCtx.message]);

  return (
    <Stack
      position="absolute"
      left={0}
      right={0}
      margin="auto auto"
      height={HEIGHT}
      width={WIDTH}
      bgcolor={
        notificationCtx.type && notificationCtx.message
          ? COLORS[notificationCtx.type]
          : "transparent"
      }
      justifyContent="center"
      alignItems="center"
      zIndex={999999}
      borderRadius="12px"
      top={visible ? TOP_PADDING : `-${HEIGHT}`}
      sx={{ transition: "0.5s", willChange: "transform" }}
    >
      <Stack
        position="absolute"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Typography bold color={PALETTE.font.light}>
          {notificationCtx.type === "error"
            ? `Technical Error: ${notificationCtx.message}`
            : notificationCtx.message}
        </Typography>
      </Stack>
    </Stack>
  );
}
