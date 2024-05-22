import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import UrsorDialog from "@/app/components/UrsorDialog";
import { Typography } from "ui";

export interface IUserDeletionDialogProps {
  open: boolean;
  userDisplayName: string;
  onCloseCallback: () => void;
  submitCallback: () => Promise<void>;
}

export default function UserDeletionDialog(props: IUserDeletionDialogProps) {
  return (
    <UrsorDialog
      title={"Delete account"}
      supertitle="Delete account"
      open={props.open}
      onCloseCallback={() => {
        props.onCloseCallback();
      }}
      button={{
        text: "Remove",
        callback: async () => {
          await props.submitCallback();
          props.onCloseCallback();
        },
      }}
    >
      <Typography variant="medium">
        <Stack direction="row" spacing={1}>
          <Box sx={{ opacity: 0.8 }}>Delete</Box>
          <Box sx={{ fontWeight: "500" }}>{props.userDisplayName}</Box>
          <Box sx={{ opacity: 0.8 }}>from your school&apos;s ASTRO?</Box>
        </Stack>
      </Typography>
    </UrsorDialog>
  );
}
