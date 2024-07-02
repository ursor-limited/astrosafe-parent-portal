import React, { useEffect, useState } from "react";
import { Box, Stack, Switch } from "@mui/material";
import UrsorDialog from "../../components/UrsorDialog";
import ChromeDeviceIllustration from "../../images/ChromeDeviceIllustration.png";
import iPadIllustration from "../../images/iPadIllustration.png";
import { IDevice } from "@/app/browserApi";
import { UrsorInputField } from "ui";

export const SWITCH_LENGTH = 61; // px
export const SWITCH_HEIGHT = 33; // px
export const SWITCH_THUMB_MARGIN = 3;
export const SWITCH_THUMB_SIZE = SWITCH_HEIGHT - 2 * SWITCH_THUMB_MARGIN;
export const SWITCH_MOVEMENT_DISTANCE =
  SWITCH_LENGTH - SWITCH_THUMB_SIZE - 2 * SWITCH_THUMB_MARGIN;

export interface IDeviceEditingDialogProps {
  device: IDevice;
  open: boolean;
  onCloseCallback: () => void;
  submitCallback: (name: string) => void;
}

export default function DeviceEditingDialog(props: IDeviceEditingDialogProps) {
  const [name, setName] = useState<string>("");
  useEffect(() => setName(props.device.name), [props.device.name]);

  return (
    <UrsorDialog
      title={"Rename Device"}
      supertitle="Rename Device"
      subtitle={[
        "Enter the new name for the device so you can easily identify the device",
        "in your school.",
      ]}
      open={props.open}
      button={{
        text: "Save",
        callback: () => props.submitCallback(name),
      }}
      onCloseCallback={props.onCloseCallback}
    >
      <Stack alignItems="center" flex={1}>
        <UrsorInputField
          onChange={(change: React.ChangeEvent<HTMLInputElement>) =>
            setName(change.target.value)
          }
          value={name}
          placeholder={"Name"}
        />
        <Stack flex={1} justifyContent="center" alignItems="center">
          <img
            height="140px"
            width="230px"
            src={
              props.device.type === "chrome"
                ? "https://ursorassets.s3.eu-west-1.amazonaws.com/ChromeDeviceIllustration.png"
                : "https://ursorassets.s3.eu-west-1.amazonaws.com/iPadIllustration.png"
            }
          />
        </Stack>
      </Stack>
    </UrsorDialog>
  );
}
