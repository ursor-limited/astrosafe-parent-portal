import { Stack } from "@mui/system";
import TitleRow, { ITitleRowItem } from "./TitleRow";
import UrsorActionButton from "./UrsorActionButton";
import { IActionPopupItem } from "./ActionPopup";
import React from "react";
import { Typography } from "ui";

const MobilePageLayout = (props: {
  actions?: IActionPopupItem[];
  title?: string;
  titleRow?: ITitleRowItem[];
  children: React.ReactNode;
}) => (
  <Stack
    height="100%"
    width="100%"
    overflow="scroll"
    px="12px"
    py="24px"
    boxSizing="border-box"
  >
    <Stack pb="24px" justifyContent="space-between" direction="row">
      {props.title ? (
        <Typography bold variant="medium">
          {props.title}
        </Typography>
      ) : null}
      {props.titleRow ? <TitleRow items={props.titleRow} isMobile /> : null}
      <Stack width="32px">
        {props.actions ? (
          <UrsorActionButton
            actions={props.actions}
            iconSize="14px"
            size="32px"
            background="transparent"
            border
          />
        ) : null}
      </Stack>
    </Stack>
    {props.children}
  </Stack>
);

export default MobilePageLayout;
