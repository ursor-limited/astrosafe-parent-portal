import { Stack } from "@mui/system";
import UrsorDialog from "../components/UrsorDialog";
import WorksheetGenerator from "../components/WorksheetGenerator";
import { useState } from "react";
import { Slider } from "@mui/material";
import SignupPromptDialog from "./SignupPromptDialog";

export const TITLE_CHARACTER_LIMIT = 40;

const WorksheetCreationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  mobile?: boolean;
}) => {
  return (
    <UrsorDialog
      supertitle={props.mobile ? undefined : "Create worksheet"}
      open={props.open}
      onCloseCallback={props.closeCallback}
      maxWidth="880px"
      dynamicHeight
      noOverflowHidden
      noPadding={props.mobile}
    >
      <Stack p={props.mobile ? "20px" : undefined} overflow="scroll">
        <WorksheetGenerator
          mobile={props.mobile}
          noPadding
          landOnWorksheetPage
        />
      </Stack>
    </UrsorDialog>
  );
};

export default WorksheetCreationDialog;
