import React from "react";
import { Stack } from "@mui/system";
import _ from "lodash";
import UrsorDialog from "@/app/components/UrsorDialog";

const INPUT_PHRASE = "delete";

const TroomiManagePlanDialog = (props: {
  open: boolean;
  onClose: () => void;
  isMobile?: boolean;
}) => {
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      button={{
        text: "Got it",
        callback: props.onClose,
      }}
      title="Change plan"
      subtitle={["If you want to change your plan", "contact Troomi."]}
      width="422px"
      dynamicHeight
      isMobile={props.isMobile}
    >
      <Stack />
    </UrsorDialog>
  );
};

export default TroomiManagePlanDialog;
