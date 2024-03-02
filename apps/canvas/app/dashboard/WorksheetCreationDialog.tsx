import { Stack } from "@mui/system";
import UrsorDialog from "../components/UrsorDialog";
import WorksheetGenerator from "../landing/[urlId]/WorksheetGenerator";
import { useState } from "react";
import { Slider } from "@mui/material";

export const TITLE_CHARACTER_LIMIT = 40;

const WorksheetCreationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
}) => {
  return (
    <UrsorDialog
      supertitle="Create worksheet"
      title="Create a math worksheet"
      open={props.open}
      onCloseCallback={props.closeCallback}
      maxWidth="880px"
      dynamicHeight
      noOverflowHidden
    >
      <WorksheetGenerator noBackground />
    </UrsorDialog>
  );
};

export default WorksheetCreationDialog;
