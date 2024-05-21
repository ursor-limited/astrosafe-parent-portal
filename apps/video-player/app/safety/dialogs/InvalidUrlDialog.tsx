import React from "react";
import UrsorDialog from "../../../components/UrsorDialog";
import { Box, Stack } from "@mui/system";
import WonderingIllustration from "../../../images/WonderingIllustration.svg";

export interface IInvalidUrlDialogProps {
  open: boolean;
  closeCallback: () => void;
}

export default function InvalidUrlDialog(props: IInvalidUrlDialogProps) {
  return (
    <UrsorDialog
      title={"Invalid URL"}
      subtitle={["The URL you entered has a typo."]}
      supertitle={"Add a Link"}
      open={props.open}
      button={{
        text: "Try again",
        callback: props.closeCallback,
      }}
      onCloseCallback={props.closeCallback}
      backButtonCallback={props.closeCallback}
    >
      <Stack flex={1} justifyContent="center" alignItems="center">
        <Box
          component="img"
          height="100%"
          minHeight={0}
          maxHeight="100%"
          width="fit-content"
          src={WonderingIllustration}
        />
      </Stack>
    </UrsorDialog>
  );
}
