import React from "react";
import { useState } from "react";
import { Stack } from "@mui/system";
import { Dialog } from "@mui/material";
import X from "@/images/icons/X.svg";

import { BACKDROP_STYLE } from "../components/UrsorDialog";
import { PALETTE, Typography } from "ui";

const ILLUST_SIZE = "14px";

export interface IStepperOverlayProps {
  open: boolean;
  closeCallback: () => void;
}

export default function ContentAgeInfoDialog(props: IStepperOverlayProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog
      transitionDuration={800}
      open={props.open}
      onClose={props.closeCallback}
      PaperProps={{
        style: {
          width: "381px",
          borderRadius: "8px",
        },
      }}
      sx={{
        p: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE,
      }}
    >
      <Stack
        position="absolute"
        right="16px"
        top="22px"
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s",
        }}
        onClick={props.closeCallback}
        zIndex={2}
      >
        <X height="22px" width="22px" />
      </Stack>
      <Stack
        bgcolor="rgb(255,255,255)"
        flex={1}
        p="20px"
        boxSizing="border-box"
        spacing="16px"
      >
        <Stack spacing="3px">
          <Typography bold variant="medium">
            Bro!!!
          </Typography>
          <Typography variant="small" color={PALETTE.secondary.grey[4]}>
            Wha are we gonna do fo dinnah tonyte? Mac or kfc?
          </Typography>
        </Stack>
      </Stack>
    </Dialog>
  );
}
