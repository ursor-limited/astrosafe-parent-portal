import PinPad, { SHOW_RED_DURATION } from "@/app/components/PinPad";
import { useEffect, useState } from "react";
import { FADE_DURATION } from "../../common";
import { Stack } from "@mui/system";
import { fadeIn, fadeOut } from "@/app/components/UrsorDialog";
import { DesktopOnBoardingViewLayout } from "../../layout/desktop";

const PinView = (props: { onNext: () => void; isMobile?: boolean }) => {
  const [pin, setPin] = useState<number[]>([]);
  const [confirmationPin, setConfirmationPin] = useState<number[]>([]);
  const [confirming, setConfirming] = useState<boolean>(false);

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

  const [fade, setFade] = useState<"in" | "out">("in");
  useEffect(() => {
    if (pin.length === 4) {
      setFade("out");
      setTimeout(() => {
        setConfirming(true);
        setFade("in");
      }, FADE_DURATION);
    }
  }, [pin]);
  useEffect(() => {
    pin.length > 0 && pin === confirmationPin && props.onNext();
  }, [pin, confirmationPin]);

  const addToPin = (n: number) =>
    (confirming ? confirmationPin : pin).length < 4 &&
    (confirming ? setConfirmationPin : setPin)([
      ...(confirming ? confirmationPin : pin),
      n,
    ]);
  return (
    <Stack
      height="100%"
      width="100%"
      justifyContent="center"
      alignItems="center"
      sx={{
        animation: `${
          fade === "in" ? fadeIn : fadeOut
        } ${FADE_DURATION}ms ease-out`,
        animationFillMode: "forwards",
      }}
    >
      <DesktopOnBoardingViewLayout
        title={
          displayIncorrectnessTitle
            ? "The pin you entered is incorrect, please try again"
            : confirming
            ? "Please confirm your pin"
            : "Set your parental pin to keep this safe!"
        }
        subtitle={
          displayIncorrectnessTitle
            ? "Please enter the same pin"
            : confirming
            ? "Enter your pin again to make sure it's correct! Keep this safe!"
            : "This is needed so you can manage your settings later. Ask your child to look away and note this down!"
        }
      >
        <PinPad
          pin={confirming ? confirmationPin : pin}
          onKey={addToPin}
          onRemove={() =>
            setPin((confirming ? confirmationPin : pin).slice(0, -1))
          }
          wrong={wrong}
        />
      </DesktopOnBoardingViewLayout>
    </Stack>
  );
};

export default PinView;
