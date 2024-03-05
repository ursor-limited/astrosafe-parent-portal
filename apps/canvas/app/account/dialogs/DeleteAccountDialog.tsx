import React, { useState } from "react";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorInputField } from "ui";
import UrsorDialog from "@/app/components/UrsorDialog";

export interface IDeleteDialogProps {
  open: boolean;
  callback: () => void;
  closeCallback: () => void;
}

export default function DeleteAccountDialog(props: IDeleteDialogProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [inputedValue, setInputedValue] = useState<string>("");
  return (
    <UrsorDialog
      title="Delete account"
      supertitle="Delete account"
      subtitle={[
        `Are you sure you want to delete this account?`,
        "This action cannot be undone, except by contacting Astro.",
      ]}
      open={props.open}
      loading={loading}
      button={{
        text: "Delete",
        color: PALETTE.system.red,
        callback: () => {
          setLoading(true);
          props.callback();
          props.closeCallback();
        },
        disabled: inputedValue !== "delete",
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
      <Stack alignItems="center" spacing="8px">
        <Typography variant="medium">
          To confirm, type 'delete' below.
        </Typography>
        <UrsorInputField
          value={inputedValue}
          placeholder="delete"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setInputedValue(event.target.value)
          }
        />
      </Stack>
      <Stack flex={1} justifyContent="center" alignItems="center">
        <Typography sx={{ fontSize: "180px" }}>⚠️</Typography>
      </Stack>
    </UrsorDialog>
  );
}
