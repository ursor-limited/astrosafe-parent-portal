import React, { useState } from "react";
import UrsorDialog from "../components/UrsorDialog";
import { Stack } from "@mui/system";
import { Typography, UrsorInputField } from "ui";

export interface ILockDialogProps {
  open: boolean;
  closeCallback: () => void;
  startCallback: (duration: number) => void;
  limitReached?: boolean;
}

export default function LockDialog(props: ILockDialogProps) {
  const [time, setTime] = useState<string>("15");
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.closeCallback}
      backButtonCallback={props.closeCallback}
      title="Lock screens"
      subtitle={["Set a duration for this", "screen lock session."]}
      supertitle="Lock screens"
      button={{
        text: "Lock",
        callback: () => {
          props.startCallback(parseInt(time));
          props.closeCallback();
        },
        disabled: !time,
      }}
    >
      <Stack direction="row" spacing="10px" alignItems="center">
        <Stack width="50px">
          <UrsorInputField
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const onlyNumbersString = event.target.value.match(/\d+/)?.[0];
              const leadingZeroRemovedString = onlyNumbersString?.slice(
                onlyNumbersString[0] === "0" ? 1 : 0
              );
              setTime(leadingZeroRemovedString ?? "");
            }}
            value={time}
            width="100%"
            fontSize="normal"
          />
        </Stack>
        <Typography bold>{`minute${time === "1" ? "" : "s"}`}</Typography>
      </Stack>
    </UrsorDialog>
  );
}
