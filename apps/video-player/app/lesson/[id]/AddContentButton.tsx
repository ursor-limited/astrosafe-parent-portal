import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import UrsorPopover from "@/app/components/UrsorPopover";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import {
  AstroContent,
  CONTENT_BRANDING,
  ToolButton,
} from "@/app/dashboard/DashboardPageContents";

export default function AddContentButton(props: {
  callback: (type: AstroContent) => void;
  mobile?: boolean;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const contentOrder: AstroContent[] = [
    "worksheet",
    "video",
    "image",
    "text",
    "link",
  ];

  return (
    <>
      <UrsorPopover
        open={open}
        content={
          <Stack
            p="16px"
            bgcolor="rgb(255,255,255)"
            borderRadius="12px"
            spacing="10px"
            boxSizing="border-box"
            width={props.mobile ? "100%" : "420px"}
          >
            {contentOrder.map((c, i) => {
              return (
                <Stack key={i} width="100%">
                  <ToolButton
                    {...CONTENT_BRANDING[c]}
                    onClick={() => {
                      props.callback(c);
                      setOpen(false);
                    }}
                    fullWidth
                    strongShadow
                  />
                </Stack>
              );
            })}
          </Stack>
        }
        closeCallback={() => setOpen(false)}
        maxHeight
        clickableFloatedButton
        noFloatButton
        noPadding
      >
        <Stack
          height="32px"
          width="32px"
          borderRadius="100%"
          border="2px solid rgb(255,255,255)"
          boxShadow="0 0 45px rgba(0,0,0,0.4)"
          bgcolor={PALETTE.secondary.purple[2]}
          justifyContent="center"
          alignItems="center"
          sx={{
            svg: {
              path: {
                fill: "rgb(255,255,255)",
              },
            },
          }}
          onClick={() => setOpen(true)}
        >
          <PlusIcon width="20px" height="20px" />
        </Stack>
      </UrsorPopover>
    </>
  );
}
