import React from "react";
import Typography from "../../../components/Typography";
import UrsorDialog from "../../../components/UrsorDialog";
import { Box, Stack } from "@mui/system";
import WonderingIllustration from "../../../images/WonderingIllustration.svg";

export interface IBlockedSiteDialogProps {
  open: boolean;
  closeCallback: () => void;
}

export default function BlockedSiteDialog(props: IBlockedSiteDialogProps) {
  return (
    <UrsorDialog
      title={"Blocked site"}
      supertitle="Add a Link"
      open={props.open}
      button={{
        text: "Close",
        callback: props.closeCallback,
      }}
      onCloseCallback={props.closeCallback}
      backButtonCallback={props.closeCallback}
    >
      <Stack spacing="5px" textAlign="center">
        <Typography>The url entered is a high-risk site.</Typography>
        <Typography>
          If you think this is incorrect, please contact your school admin or
        </Typography>
        <Typography bold>support@ursor.com</Typography>
      </Stack>
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
