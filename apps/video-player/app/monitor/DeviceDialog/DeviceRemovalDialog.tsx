import React, { useEffect, useState } from "react";
import { Box, Stack, Switch } from "@mui/material";
import UrsorDialog from "../../components/UrsorDialog";
import BrowserApiController, { IDevice } from "@/app/browserApi";
import NotificationContext from "@/app/components/NotificationContext";
import { PALETTE, Typography } from "ui";
import { useBrowserUserContext } from "@/app/components/BrowserUserContext";

export const SWITCH_LENGTH = 61; // px
export const SWITCH_HEIGHT = 33; // px
export const SWITCH_THUMB_MARGIN = 3;
export const SWITCH_THUMB_SIZE = SWITCH_HEIGHT - 2 * SWITCH_THUMB_MARGIN;
export const SWITCH_MOVEMENT_DISTANCE =
  SWITCH_LENGTH - SWITCH_THUMB_SIZE - 2 * SWITCH_THUMB_MARGIN;

export interface IDeviceRemovalDialogProps {
  open: boolean;
  device: IDevice;
  onCloseCallback: () => void;
  updateCallback: () => void;
  callback?: () => void;
}

export default function DeviceRemovalDialog(props: IDeviceRemovalDialogProps) {
  const notificationCtx = React.useContext(NotificationContext);
  const userCtx = useBrowserUserContext();
  return (
    <UrsorDialog
      title={"Remove Device"}
      subtitle={[
        "This device will be disconnected from your school and it will no longer be",
        "connected to your safe internet. Are you sure you want to proceed?",
      ]}
      supertitle="Remove Device"
      open={props.open}
      button={{
        text: "Remove",
        color: PALETTE.system.red,
        callback: () => {
          props.onCloseCallback();
          props.callback?.();
          BrowserApiController.rejectDevice(
            props.device.id,
            userCtx.userDetails?.id ?? ""
          )
            .then(props.updateCallback)
            .then(() => notificationCtx.negativeSuccess("Removed Device"));
        },
      }}
      onCloseCallback={props.onCloseCallback}
      backButtonCallback={props.onCloseCallback}
    >
      <Stack
        spacing="12px"
        alignItems="center"
        justifyContent="center"
        flex={1}
      >
        <img
          height="140px"
          width="230px"
          src={
            props.device.type === "chrome"
              ? "https://ursorassets.s3.eu-west-1.amazonaws.com/ChromeDeviceIllustration.png"
              : "https://ursorassets.s3.eu-west-1.amazonaws.com/iPadIllustration.png"
          }
        />
        <Typography variant="h5">{props.device.name}</Typography>
      </Stack>
    </UrsorDialog>
  );
}
