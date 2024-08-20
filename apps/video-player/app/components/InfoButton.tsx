import React from "react";
import { Stack } from "@mui/system";
import { useState } from "react";
import { PALETTE, Typography } from "ui";
import InfoIcon from "@/images/icons/InfoIcon.svg";
import UrsorPopover from "./UrsorPopover";

export interface IInfoButtonProps {
  title: string;
  text: string;
  rightAlign?: boolean;
}

export const InfoButton = (props: IInfoButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <UrsorPopover
      open={open}
      content={
        <Stack
          bgcolor="rgb(255,255,255)"
          borderRadius="12px"
          p="16px"
          boxSizing="border-box"
          spacing="6px"
          maxWidth="333px"
        >
          <Typography variant="small">{props.text}</Typography>
        </Stack>
      }
      closeCallback={() => setOpen(false)}
      placement={props.rightAlign ? "right" : "left"}
      noPadding
      zIndex={9999}
    >
      <Stack
        onClick={() => setOpen(true)}
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s",
        }}
      >
        <Stack
          sx={{
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { opacity: 0.8 },
            svg: {
              path: {
                fill: PALETTE.secondary.grey[3],
              },
            },
          }}
          direction="row"
          spacing="6px"
          alignItems="center"
        >
          <Typography bold color={PALETTE.secondary.grey[3]}>
            {props.title}
          </Typography>
          <InfoIcon width="16px" height="16px" />
        </Stack>
      </Stack>
    </UrsorPopover>
  );
};

export default InfoButton;
