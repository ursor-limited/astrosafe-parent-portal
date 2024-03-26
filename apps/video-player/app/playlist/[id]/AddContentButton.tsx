import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import UrsorPopover from "@/app/components/UrsorPopover";
import PencilIcon from "@/images/icons/Pencil.svg";
import {
  AstroContent,
  CONTENT_BRANDING,
  ToolButton,
} from "@/app/dashboard/DashboardPageContents";

export interface IDeletionDialogProps {
  open: boolean;
  closeCallback: () => void;
  deletionCallback: () => void;
  category: string;
  title: string;
  mobile?: boolean;
}

export default function AddContentButton() {
  const [open, setOpen] = useState<boolean>(false);
  const contentOrder: AstroContent[] = ["worksheet", "video", "link", "lesson"];
  return (
    <UrsorPopover
      open={open}
      content={
        <Stack
          p="16px"
          bgcolor="rgb(255,255,255)"
          borderRadius="12px"
          spacing="10px"
          width="500px"
        >
          {contentOrder
            .map((c) => CONTENT_BRANDING[c])
            .map((cb, i) => (
              <Stack key={i} width="100%">
                <ToolButton {...cb} onClick={() => null} fullWidth></ToolButton>
              </Stack>
            ))}
        </Stack>
      }
      closeCallback={() => setOpen(false)}
      maxHeight
      clickableFloatedButton
      noPadding
      placement="left"
      //width={props.width}
      //fieldWidth={props.fieldWidth}
      noFloatButton
    >
      <UrsorButton
        dark
        variant="tertiary"
        onClick={() => setOpen(true)}
        endIcon={PencilIcon}
      >
        Add Content
      </UrsorButton>
    </UrsorPopover>
  );
}
