import { Stack } from "@mui/system";
import React, { useState } from "react";
import ActionPopup, { IActionPopupItem } from "./ActionPopup";
import MoreIcon from "@/images/icons/MoreIcon.svg";
import { PALETTE } from "ui";

const DEFAULT_SIZE = "12px";
const LARGE_SIZE = "20px";

export interface IUrsorActionButtonProps {
  actions: IActionPopupItem[];
  size?: string;
  iconSize?: string;
  large?: boolean;
  light?: boolean;
  background?: string;
  fontColor?: string;
  buttonClickCallback?: () => void;
}

export default function UrsorActionButton(props: IUrsorActionButtonProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <ActionPopup
      open={open}
      items={props.actions}
      closeCallback={() => setOpen(false)}
      placement="right"
    >
      <Stack
        height={props.size ?? "40px"}
        width={props.size ?? "40px"}
        justifyContent="center"
        alignItems="center"
        sx={{
          background: props.background,
          cursor: "pointer",
          "&:hover": {
            opacity: 0.7,
          },
          transition: "0.2s",
          svg: {
            transform: "rotate(90deg)",
            path: {
              fill:
                props.fontColor ||
                (props.light ? PALETTE.font.light : PALETTE.font.dark),
            },
          },
        }}
        borderRadius="100%"
        onClick={() => {
          setOpen(true);
          props.buttonClickCallback?.();
        }}
      >
        <MoreIcon
          height={props.iconSize || (props.large ? LARGE_SIZE : DEFAULT_SIZE)}
          width={props.iconSize || (props.large ? LARGE_SIZE : DEFAULT_SIZE)}
        />
      </Stack>
    </ActionPopup>
  );
}
