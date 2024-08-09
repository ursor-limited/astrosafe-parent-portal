import { Stack } from "@mui/system";
import MobileTitleRow from "./MobileTitleRow";
import UrsorActionButton from "./UrsorActionButton";
import { IActionPopupItem } from "./ActionPopup";
import React, { useState } from "react";
import { Typography } from "ui";
import ThreeBarsIcon from "@/images/icons/ThreeBarsIcon.svg";
import MobileSideBar, { AstroPage } from "./MobileSideBar";
import { ITitleRowItem } from "./TitleRow";

const MobilePageLayout = (props: {
  title?: string;
  titleRow?: ITitleRowItem;
  actions?: IActionPopupItem[];
  topRightElement?: React.ReactNode;
  selectedPage: AstroPage;
  header?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  return (
    <>
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
          <Stack direction="row" spacing="12px" alignItems="center">
            <Stack onClick={() => setSideBarOpen(true)}>
              <ThreeBarsIcon height="20px" width="20px" />
            </Stack>
            {props.title ? (
              <Typography bold variant="medium">
                {props.title}
              </Typography>
            ) : null}
            {props.titleRow ? <MobileTitleRow item={props.titleRow} /> : null}
          </Stack>
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
      <MobileSideBar
        selectedPage={props.selectedPage}
        open={sideBarOpen}
        onClose={() => setSideBarOpen(false)}
      />
    </>
  );
};

export default MobilePageLayout;
