import { Typography } from "ui";
import UrsorDialog from "../components/UrsorDialog";
import { Stack } from "@mui/system";
import PinPad, { SHOW_RED_DURATION } from "../components/PinPad";
import { useEffect, useState } from "react";

const MobileLoginToParentPortalDialog = (props: {
  open: boolean;
  onClose: () => void;
}) => {
  const [pin, setPin] = useState<number[]>([]);
  const [confirmationPin, setConfirmationPin] = useState<number[]>([]);

  const [wrong, setWrong] = useState<boolean>(false);
  const [displayIncorrectnessTitle, setDisplayIncorrectnessTitle] =
    useState<boolean>(false);
  useEffect(() => {
    if (pin.length === 4 && confirmationPin.length === 4) {
      setWrong(true);
      setDisplayIncorrectnessTitle(true);
      setTimeout(() => {
        setWrong(false);
        setConfirmationPin([]);
      }, SHOW_RED_DURATION);
    }
  }, [pin, confirmationPin]);

  const addToPin = (n: number) => pin.length < 4 && setPin([...pin, n]);
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      noCloseButton
      title={
        displayIncorrectnessTitle
          ? "Incorrect pin, please try again"
          : "Log in to your Parent Portal and connect your Device"
      }
      titleSize="h5"
      dynamicHeight
    >
      <Stack direction="row" spacing="36px" flex={1} alignItems="center">
        <Typography sx={{ textAlign: "center" }} variant="h5">
          Enter you pin
        </Typography>
        <PinPad
          pin={pin}
          onKey={addToPin}
          onRemove={() => setPin(pin.slice(0, -1))}
          wrong={wrong}
          dark
          gap="20px"
          keySize="62px"
          spacing="30px"
        />
        <Stack py="12px">
          <Typography sx={{ textAlign: "center" }} bold>
            Forgot your pin?
          </Typography>
        </Stack>
      </Stack>
    </UrsorDialog>
  );
};

export default MobileLoginToParentPortalDialog;
