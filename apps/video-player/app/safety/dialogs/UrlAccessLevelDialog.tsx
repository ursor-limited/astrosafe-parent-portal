import React, { useEffect, useState } from "react";
import UrsorDialog from "../../../components/UrsorDialog";
import { Box, Stack, alpha } from "@mui/system";
import Typography from "../../../components/Typography";
import { PALETTE } from "../../../palette";
import _ from "lodash";

const URL_SECTION_SPACING = "8px";

const SELECTED_COLOR = PALETTE.secondary.green[3];
//const HOVER_EXCLUSION_COLOR = alpha(PALETTE.secondary.green[2], 0.5);
const HOVER_COLOR = PALETTE.secondary.green[4];
const HOVER_IN_BETWEEN_COLOR = PALETTE.secondary.green[2];
const HOVER_EXCLUSION_COLOR = "transparent";
const EXCLUSION_COLOR = PALETTE.secondary.grey[1];

export interface IUrlAccessLevelDialogProps {
  url: string;
  accessibleUrl: string;
  callback: (accessibleUrl: string) => void;
  open: boolean;
  closeCallback: () => void;
  supertitle: string;
}

export default function UrlAccessLevelDialog(
  props: IUrlAccessLevelDialogProps
) {
  // const [accessibleUrl, setAccessibleUrl] = useState<string>(props.url);
  // useEffect(() => setAccessibleUrl(props.accessibleUrl), [props.accessibleUrl]);

  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number>(0);
  useEffect(
    () => setSelectedSectionIndex(props.accessibleUrl.split("/").length - 1),
    [props.accessibleUrl]
  );

  const [hoveringOverSectionIndex, setHoveringOverSectionIndex] = useState<
    number | null
  >(null);

  const getBackgroundColor = (index: number) => {
    if (_.isNumber(hoveringOverSectionIndex)) {
      if (hoveringOverSectionIndex === index) {
        if (selectedSectionIndex === index) {
          return SELECTED_COLOR;
        } else {
          return HOVER_COLOR;
        }
      } else if (hoveringOverSectionIndex < index) {
        if (selectedSectionIndex === hoveringOverSectionIndex) {
          return EXCLUSION_COLOR;
        } else {
          return HOVER_EXCLUSION_COLOR;
        }
      } else if (selectedSectionIndex < index) {
        return HOVER_IN_BETWEEN_COLOR;
      } else {
        return SELECTED_COLOR;
      }
    } else if (selectedSectionIndex < index) {
      return EXCLUSION_COLOR;
    }
    return SELECTED_COLOR;
  };

  return (
    <UrsorDialog
      title="Change URL access level"
      subtitle={["Set the subdomain that Students will", "be able to access."]}
      supertitle={props.supertitle}
      open={props.open}
      button={{
        text: "Save",
        callback: () => {
          props.callback(
            props.url
              .split("/")
              .slice(0, selectedSectionIndex + 1)
              .join("/")
          );
          props.closeCallback();
        },
      }}
      onCloseCallback={props.closeCallback}
      backButtonCallback={props.closeCallback}
    >
      <Stack
        pt="20px"
        direction="row"
        width="100%"
        overflow="scroll"
        spacing="3px"
        justifyContent="center"
      >
        {props.url.split("/").map((section, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={URL_SECTION_SPACING}
            onMouseEnter={() => setHoveringOverSectionIndex(index)}
            onMouseLeave={() => setHoveringOverSectionIndex(null)}
            onClick={() => setSelectedSectionIndex(index)}
          >
            <Stack
              py="3px"
              px="6px"
              bgcolor={getBackgroundColor(index)}
              direction="row"
              sx={{
                cursor: "pointer",
                // "&:hover": { background: PALETTE.secondary.green[4] },
                transition: "0.2s",
              }}
            >
              {index > 0 ? (
                <Typography sx={{ opacity: 0.4 }} bold>
                  /
                </Typography>
              ) : undefined}
              <Typography noWrap>{section}</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </UrsorDialog>
  );
}
