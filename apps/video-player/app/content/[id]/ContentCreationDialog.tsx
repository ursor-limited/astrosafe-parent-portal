import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, Stack, alpha } from "@mui/system";
import {
  PALETTE,
  Typography,
  UrsorButton,
  UrsorInputField,
  UrsorTextField,
} from "ui";
import _ from "lodash";
import PencilIcon from "@/images/icons/Pencil.svg";
import DesktopDownloadIcon from "@/images/icons/DesktopDownloadIcon.svg";
import Image from "next/image";
import WonderingIllustration from "@/images/WonderingIllustration.png";
import { isMobile } from "react-device-detect";
import UrsorDialog from "@/app/components/UrsorDialog";
import { AstroContent } from "@/app/devices/[id]/ContentTab";
import { CONTENT_DISPLAY_NAMES } from "./ContentCard";
import { IFilterUrl } from "@/app/filters/FiltersPageContents";

export interface IContentCreationDialogProps {
  open: boolean;
  type: AstroContent;
  title: IFilterUrl["title"];
  setTitle: (title: IFilterUrl["title"]) => void;
  url: IFilterUrl["url"];
  setUrl: (url: IFilterUrl["url"]) => void;
  // lessonId?: string;
  // updateCallback?: () => void;
  closeCallback: () => void;
  creationCallback?: () => void;
  children?: React.ReactNode;
}

export default function ContentCreationDialog(
  props: IContentCreationDialogProps
) {
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.closeCallback}
      title={`Add a ${CONTENT_DISPLAY_NAMES[props.type]}`}
      dynamicHeight
      noPadding={isMobile}
    >
      <Stack
        pt="16px"
        p="16px"
        boxSizing="border-box"
        flex={1}
        width="100%"
        alignItems="center"
        spacing="24px"
      >
        <Stack
          direction={isMobile ? "column" : "row"}
          width="100%"
          height="100%"
          spacing="32px"
          justifyContent="space-between"
        >
          <Stack flex={1} spacing="20px" overflow="hidden">
            <Stack spacing="8px">
              <Typography variant="small" color={PALETTE.secondary.grey[4]}>
                URL
              </Typography>
              <UrsorInputField
                value={props.url}
                placeholder="Set a URL"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  props.setUrl(event.target.value);
                }}
                leftAlign
                width="100%"
              />
            </Stack>
            <Stack spacing="8px">
              <Typography variant="small" color={PALETTE.secondary.grey[4]}>
                Title
              </Typography>
              <UrsorInputField
                value={props.title}
                placeholder="Set a title"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  props.setTitle(event.target.value);
                }}
                leftAlign
                width="100%"
              />
            </Stack>
          </Stack>
          <Stack width="1px" bgcolor={PALETTE.secondary.grey[2]} />
          <Stack width="299px">{props.children}</Stack>
        </Stack>
        <UrsorButton width="358px" dark variant="tertiary">{`Add ${
          CONTENT_DISPLAY_NAMES[props.type]
        }`}</UrsorButton>
      </Stack>
    </UrsorDialog>
  );
}
