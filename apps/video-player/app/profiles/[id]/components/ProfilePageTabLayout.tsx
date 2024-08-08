import React, { useState } from "react";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import UrsorPopover from "@/app/components/UrsorPopover";
import InfoIcon from "@/images/icons/InfoIcon.svg";

const InfoButton = (props: {
  //   title: string;
  //   body: string;
  text: string;
  rightAlign?: boolean;
}) => {
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
          {/* <Typography variant="small" bold>
            {props.title}
          </Typography> */}
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
            How to use
          </Typography>
          <InfoIcon width="16px" height="16px" />
        </Stack>
      </Stack>
    </UrsorPopover>
  );
};

const ProfilePageTabLayout = (props: {
  title: string;
  rightSideElement?: React.ReactNode;
  explanation: string;
  children: React.ReactNode;
}) => (
  <Stack flex={1} spacing="24px">
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" alignItems="center" spacing="16px">
        <Typography variant="h5">{props.title}</Typography>
        <InfoButton text={props.explanation} />
      </Stack>
      {props.rightSideElement}
    </Stack>
    {props.children}
  </Stack>
);

export default ProfilePageTabLayout;
