import PinPad from "@/app/components/PinPad";
import { DesktopOnBoardingViewLayout } from "../../layout/desktop";
import { MobileOnBoardingViewLayout } from "../../layout/mobile";
import { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import { useWindowSize } from "usehooks-ts";

const PinViewMobileBody = (props: {
  onNext: () => void;
  displayIncorrectnessTitle: boolean;
  confirming: boolean;
  wrong: boolean;
  pin: number[];
  confirmationPin: number[];
  addToPin: (n: number) => void;
  setPin: (pin: number[]) => void;
  fade: "in" | "out";
}) => {
  const [sizeRef, setSizeRef] = useState<HTMLElement | null>(null);
  const [scaling, setScaling] = useState<number>(1);
  const { height } = useWindowSize();
  useEffect(
    () =>
      setScaling(
        Math.min(
          1,
          ((sizeRef?.getBoundingClientRect?.()?.height ?? 0) -
            ((sizeRef?.getBoundingClientRect?.()?.bottom ?? 0) - height) ?? 0) /
            430
        )
      ),
    [
      sizeRef?.getBoundingClientRect?.()?.height,
      height,
      sizeRef?.getBoundingClientRect?.()?.bottom,
      props.confirming,
    ]
  );

  return (
    <MobileOnBoardingViewLayout
      title={
        props.displayIncorrectnessTitle
          ? "The pin you entered is incorrect, please try again"
          : props.confirming
          ? "Please confirm your pin"
          : "Set your parental pin to keep this safe!"
      }
      subtitle={
        props.displayIncorrectnessTitle
          ? "Please enter the same pin"
          : props.confirming
          ? "Enter your pin again to make sure it's correct! Keep this safe!"
          : "This is needed so you can manage your settings later. Ask your child to look away and note this down!"
      }
    >
      <Stack ref={setSizeRef}>
        <Stack sx={{ transform: `scale(${scaling})`, transformOrigin: "top" }}>
          <PinPad
            pin={props.confirming ? props.confirmationPin : props.pin}
            onKey={props.addToPin}
            onRemove={() =>
              props.setPin(
                (props.confirming ? props.confirmationPin : props.pin).slice(
                  0,
                  -1
                )
              )
            }
            wrong={props.wrong}
            gap="20px"
            keySize="62px"
          />
        </Stack>
      </Stack>
    </MobileOnBoardingViewLayout>
  );
};

export default PinViewMobileBody;
