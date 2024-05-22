import React from "react";
import { Box, Stack } from "@mui/system";
import WonderingIllustration from "@/images/WonderingIllustration.png";
import UrsorDialog from "@/app/components/UrsorDialog";
import { Typography } from "ui";
import Image from "next/image";

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
            If you add the domain &quot;youtube.com&quot; or
            &quot;google.com&quot;, this allows permission to the whole site.
            This means a user can go to any video or search anything!
          </Box>
          <Box>
            If you put a specific URL, i.e. for an individual video on YouTube,
            they will not be able to explore the whole site. They will only be
            able to watch that specific video.
          </Box>
        </Stack>
        <Image
          height={207}
          width={217}
          src={WonderingIllustration}
          alt="Empty state illustration"
        />
      </Typography>
    </UrsorDialog>
  );
}
