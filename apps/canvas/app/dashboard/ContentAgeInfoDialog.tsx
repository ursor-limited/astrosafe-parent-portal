import React from "react";
import { useState } from "react";
import { Stack } from "@mui/system";
import { Dialog } from "@mui/material";
import Fire from "../../images/Fire.png";
import { BACKDROP_STYLE } from "../components/UrsorDialog";
import { PALETTE, Typography } from "ui";

const ILLUST_SIZE = "14px";

export interface IContentAgeInfoDialogProps {
  open: boolean;
  closeCallback: () => void;
}

export default function ContentAgeInfoDialog(
  props: IContentAgeInfoDialogProps
) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog
      transitionDuration={800}
      open={props.open}
      onClose={props.closeCallback}
      PaperProps={{
        style: {
          //   width: WIDTH,
          //   maxWidth: WIDTH,
          //   height: "74%",
          //   minHeight: MIN_HEIGHT,
          width: "401px",
          height: "281px",
          borderRadius: "8px",
        },
      }}
      sx={{
        p: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE,
      }}
    ></Dialog>
  );
}
