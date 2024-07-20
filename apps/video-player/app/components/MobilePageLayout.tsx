import { Stack } from "@mui/system";
import TitleRow, { ITitleRowItem } from "./TitleRow";
import UrsorActionButton from "./UrsorActionButton";
import { IActionPopupItem } from "./ActionPopup";
import React from "react";
import { Typography } from "ui";
import { AstroPage } from "../teest/contents/common";

const MobilePageLayout = (props: {
  title?: string;
  titleRow?: ITitleRowItem[];
  actions?: IActionPopupItem[];
  topRightElement?: React.ReactNode;
  selectedSidebarItemId?: AstroPage;
  header?: React.ReactNode;
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
    {props.header ? <Stack pb="24px">{props.header}</Stack> : null}
    <Stack
      pb="24px"
      justifyContent="space-between"
      alignItems="center"
      direction="row"
    >
      {props.title ? (
        <Typography bold variant="medium">
          {props.title}
        </Typography>
      ) : null}
      {props.titleRow ? <TitleRow items={props.titleRow} isMobile /> : null}
      {props.topRightElement}
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
    {props.children}
  </Stack>
);

export default MobilePageLayout;
