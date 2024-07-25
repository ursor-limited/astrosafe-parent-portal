import { Dialog } from "@mui/material";
import { PALETTE, Typography } from "ui";
import { BACKDROP_STYLE } from "../components/UrsorDialog";
import { Stack } from "@mui/system";
import PinPad, { SHOW_RED_DURATION } from "../components/PinPad";
import { useEffect, useState } from "react";
import { FADE_DURATION } from "../onboarding/OnboardingFlow";

const LoginToParentPortalDialog = (props: {
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

  // const [fade, setFade] = useState<"in" | "out">("in");
  // useEffect(() => {
  //   if (pin.length === 4) {
  //     setFade("out");
  //     setTimeout(() => {
  //       setFade("in");
  //     }, FADE_DURATION);
  //   }
  // }, [pin]);

  const addToPin = (n: number) => pin.length < 4 && setPin([...pin, n]);
  return (
    <Dialog
      transitionDuration={800}
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        style: {
          width: 954,
          maxWidth: "90%",
          height: 547,
          borderRadius: 24,
          padding: "32px",
          background: PALETTE.secondary.grey[1],
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE,
      }}
    >
      <Stack direction="row" spacing="36px" flex={1}>
        <Stack flex={1} justifyContent="space-between">
          <Typography variant="h4" color={PALETTE.secondary.purple[2]}>
            {displayIncorrectnessTitle
              ? "Incorrect pin, please try again"
              : "Log in to your Parent Portal and connect your Device"}
          </Typography>
          <Stack height="300px" bgcolor={PALETTE.secondary.grey[2]} />
        </Stack>
        <Stack flex={1} alignItems="center" spacing="32px">
          <Typography sx={{ textAlign: "center" }} variant="h5">
            Enter you pin
          </Typography>
          <PinPad
            pin={pin}
            onKey={addToPin}
            onRemove={() => setPin(pin.slice(0, -1))}
            wrong={wrong}
            dark
          />
          <Stack
            sx={{
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": { opacity: 0.7 },
            }}
          >
            <Typography sx={{ textAlign: "center" }} bold>
              Forgot your pin?
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default LoginToParentPortalDialog;
