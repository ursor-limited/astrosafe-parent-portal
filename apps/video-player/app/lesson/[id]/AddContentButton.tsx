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
  open: boolean;
  setOpen: (open: boolean) => void;
  callback: (type: AstroContent) => void;
  mobile?: boolean;
  clickOutsideCloseCallback: () => void;
}) {
  const contentOrder: AstroContent[] = [
    "worksheet",
    "video",
    "image",
    "text",
    "link",
  ];

  const [hovering, setHovering] = useState<boolean>(false);

  return (
    <>
      <UrsorPopover
        open={props.open}
        fieldWidth="20px"
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
                      props.setOpen(false);
                    }}
                    fullWidth
                    strongShadow
                  />
                </Stack>
              );
            })}
          </Stack>
        }
        closeCallback={() => {
          props.setOpen(false);
          props.clickOutsideCloseCallback();
        }}
        maxHeight
        clickableFloatedButton
        noFloatButton
        noPadding
        flip
      >
        <Stack
          height="32px"
          width="32px"
          borderRadius="100%"
          border={`2px solid ${PALETTE.secondary.purple[2]}`}
          bgcolor={
            hovering || props.mobile
              ? PALETTE.secondary.purple[2]
              : "rgb(255,255,255)"
          }
          justifyContent="center"
          alignItems="center"
          sx={{
            cursor: "pointer",
            transition: "0.2s",
            svg: {
              path: {
                fill:
                  hovering || props.mobile
                    ? "rgb(255,255,255)"
                    : PALETTE.secondary.purple[2],
              },
            },
          }}
          onClick={() => props.setOpen(true)}
          onMouseEnter={() => {
            setHovering(true);
          }}
          onMouseLeave={() => {
            setHovering(false);
          }}
        >
          <PlusIcon width="20px" height="20px" />
        </Stack>
      </UrsorPopover>
    </>
  );
}
