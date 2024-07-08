import React from "react";
import { Box, Stack } from "@mui/system";
import WonderingIllustration from "@/images/WonderingIllustration.png";
import UrsorDialog from "../components/UrsorDialog";
import { Typography } from "ui";
import Image from "next/image";

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
        <Image
          height={190}
          width={190}
          src={WonderingIllustration}
          alt="Wondering illustration"
        />
      </Stack>
    </UrsorDialog>
  );
}
