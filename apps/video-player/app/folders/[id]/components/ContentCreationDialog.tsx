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
import { isMobile } from "react-device-detect";
import UrsorDialog from "@/app/components/UrsorDialog";
import { CONTENT_DISPLAY_NAMES } from "./ContentCard";
import { LabeledInputField } from "ui/labeled-input-field";
import { AstroContent } from "@/app/profiles/[id]/components/ContentTab";
import { IFilterUrl } from "@/app/filters/contents/common";

export interface IContentCreationDialogProps {
  open: boolean;
  type: AstroContent;
  title: IFilterUrl["title"];
  setTitle: (title: IFilterUrl["title"]) => void;
  url: IFilterUrl["url"];
  setUrl: (url: IFilterUrl["url"]) => void;
  onUrlFieldBlur: () => void;
  closeCallback: () => void;
  onSubmit?: () => void;
  editing?: boolean;
  buttonDisabled?: boolean;
  extraBottomElement?: React.ReactNode;
  children?: React.ReactNode;
}

export default function ContentCreationDialog(
  props: IContentCreationDialogProps
) {
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.closeCallback}
      title={`${props.editing ? "Edit" : "Add a"} ${
        CONTENT_DISPLAY_NAMES[props.type]
      }`}
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
            <LabeledInputField label="URL">
              <UrsorInputField
                value={props.url}
                placeholder="Set a URL"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  props.setUrl(event.target.value);
                }}
                leftAlign
                width="100%"
                onBlur={props.onUrlFieldBlur}
              />
            </LabeledInputField>
            <LabeledInputField label="Title">
              <UrsorInputField
                value={props.title}
                placeholder="Set a title"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  props.setTitle(event.target.value);
                }}
                leftAlign
                width="100%"
              />
            </LabeledInputField>
            {props.extraBottomElement ? (
              <Stack>
                <Stack height="20px">
                  <Stack
                    height="2px"
                    width="100%"
                    bgcolor={PALETTE.secondary.grey[2]}
                  />
                </Stack>
                {props.extraBottomElement}
              </Stack>
            ) : null}
          </Stack>
          <Stack width="1px" bgcolor={PALETTE.secondary.grey[2]} />
          <Stack width="299px">{props.children}</Stack>
        </Stack>
        <UrsorButton
          width="358px"
          dark
          variant="tertiary"
          onClick={props.onSubmit}
          disabled={props.buttonDisabled || !props.title || !props.url}
        >
          {props.editing
            ? "Save changes"
            : `Add ${CONTENT_DISPLAY_NAMES[props.type]}`}
        </UrsorButton>
      </Stack>
    </UrsorDialog>
  );
}
