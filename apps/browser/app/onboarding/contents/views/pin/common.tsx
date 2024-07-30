import PinPad, { SHOW_RED_DURATION } from "@/app/components/PinPad";
import { useEffect, useState } from "react";
import { FADE_DURATION } from "../../common";
import { Stack } from "@mui/system";
import { fadeIn, fadeOut } from "@/app/components/UrsorDialog";
import { DesktopOnBoardingViewLayout } from "../../layout/desktop";
import PinViewDesktopBody from "./body-desktop";
import PinViewMobileBody from "./body-mobile";

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
      {props.isMobile ? (
        <PinViewMobileBody
          pin={pin}
          confirmationPin={confirmationPin}
          addToPin={addToPin}
          setPin={setPin}
          wrong={wrong}
          confirming={confirming}
          fade={fade}
          displayIncorrectnessTitle={displayIncorrectnessTitle}
          onNext={props.onNext}
        />
      ) : (
        <PinViewDesktopBody
          pin={pin}
          confirmationPin={confirmationPin}
          addToPin={addToPin}
          setPin={setPin}
          wrong={wrong}
          confirming={confirming}
          fade={fade}
          displayIncorrectnessTitle={displayIncorrectnessTitle}
          onNext={props.onNext}
        />
      )}
    </Stack>
  );
};

export default PinView;
