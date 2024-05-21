import React, { useState } from "react";
import { Box, Stack } from "@mui/system";
import Typography from "../../../components/Typography";
import UrsorDialog from "../../../components/UrsorDialog";
import Illustration from "../../../images/WonderingIllustration.svg";

export interface IDeleteDialogProps {
  open: boolean;
  title: string;
  counter: string;
  name: string;
  submitCallback: () => void;
  closeCallback: () => void;
}

export default function DeleteDialog(props: IDeleteDialogProps) {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <UrsorDialog
      title={props.title}
      supertitle={`Delete ${props.counter}`}
      subtitle={[
        `Are you sure you want to delete this ${props.counter}?`,
        "This action cannot be undone.",
      ]}
      open={props.open}
      loading={loading}
      button={{
        text: "Delete",
        callback: () => {
          setLoading(true);
          props.submitCallback();
          props.closeCallback();
        },
      }}
      onCloseCallback={() => {
        setLoading(false);
        props.closeCallback();
      }}
      backButtonCallback={() => {
        setLoading(false);
        props.closeCallback();
      }}
    >
      <Stack flex={1} justifyContent="center" alignItems="center">
        <Box
          component="img"
          height="100%"
          minHeight={0}
          maxHeight="100%"
          width="fit-content"
          src={Illustration}
        />
      </Stack>
    </UrsorDialog>
  );
}
