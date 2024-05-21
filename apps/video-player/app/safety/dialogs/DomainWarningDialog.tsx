import React from "react";
import UrsorDialog from "../../../components/UrsorDialog";
import { Box, Stack } from "@mui/system";
import Typography from "../../../components/Typography";
import WonderingIllustration from "../../../images/WonderingIllustration.svg";

export interface IDomainWarningDialogProps {
  open: boolean;
  closeCallback: () => void;
  continueCallback: () => void;
}

export default function DomainWarningDialog(props: IDomainWarningDialogProps) {
  return (
    <UrsorDialog
      title="Hold up!"
      open={props.open}
      button={{
        text: "Proceed",
        callback: props.continueCallback,
      }}
      secondaryButton={{
        text: "Go Back",
        callback: props.closeCallback,
      }}
      onCloseCallback={props.closeCallback}
    >
      <Typography variant="medium" sx={{ textAlign: "center" }}>
        <Stack spacing="17px" justifyContent="center">
          <Box>
            If you add the domain "youtube.com" or
            "google.com", this allows permission to the whole site. This
            means a user can go to any video or search anything!
          </Box>
          <Box>
          If you put a specific URL, i.e. for an individual video on YouTube, they will
          not be able to explore the whole site. They will only be able to watch that
          specific video.
          </Box>
        </Stack>
        <Box
          component="img"
          height="60%"
          minHeight={0}
          maxHeight="100%"
          width="fit-content"
          src={WonderingIllustration}
        />
      </Typography>
    </UrsorDialog>
  );
}
