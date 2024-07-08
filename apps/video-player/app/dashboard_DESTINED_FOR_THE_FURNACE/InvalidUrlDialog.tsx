import React from "react";
import { Box, Stack } from "@mui/system";
import WonderingIllustration from "@/images/WonderingIllustration.png";
import UrsorDialog from "../components/UrsorDialog";
import Image from "next/image";

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
