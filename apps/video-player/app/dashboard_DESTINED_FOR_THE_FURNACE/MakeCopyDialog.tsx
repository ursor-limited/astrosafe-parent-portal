import React from "react";
import { Box, Stack } from "@mui/system";
import GraphIllustration from "@/images/GraphIllustration.svg";
import UrsorDialog from "../components/UrsorDialog";
import Image from "next/image";

export interface IInvalidUrlDialogProps {
  open: boolean;
  callback: () => void;
  closeCallback: () => void;
}

export default function MakeCopyDialog(props: IInvalidUrlDialogProps) {
  return (
    <UrsorDialog
      title="Make a copy"
      subtitle={[
        "Are you sure you want to create a copy",
        "of this Lesson to adapt?",
      ]}
      supertitle="Make a copy"
      open={props.open}
      button={{
        text: "Do it",
        callback: props.callback,
      }}
      secondaryButton={{
        text: "Not now",
        callback: props.closeCallback,
      }}
      onCloseCallback={props.closeCallback}
    >
      <Stack flex={1} justifyContent="center" alignItems="center">
        <Image
          src="https://ursorassets.s3.eu-west-1.amazonaws.com/Untitled_Artwork+21+1.png"
          height={260}
          width={260}
          alt="graph illustration"
        />
      </Stack>
    </UrsorDialog>
  );
}
