import PinPad from "@/app/components/PinPad";
import { DesktopOnBoardingViewLayout } from "../../layout/desktop";

const PinViewDesktopBody = (props: {
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
  return (
    <DesktopOnBoardingViewLayout
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
      <PinPad
        pin={props.confirming ? props.confirmationPin : props.pin}
        onKey={props.addToPin}
        onRemove={() =>
          props.setPin(
            (props.confirming ? props.confirmationPin : props.pin).slice(0, -1)
          )
        }
        wrong={props.wrong}
      />
    </DesktopOnBoardingViewLayout>
  );
};

export default PinViewDesktopBody;
