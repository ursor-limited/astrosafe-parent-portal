import React, { useEffect, useState } from "react";
import UrsorDialog, {
  BODY_FADE_DURATION,
  IDialogButtonDetails,
} from "./UrsorDialog";
import _ from "lodash";
import { ButtonVariant } from "ui/ursor-button";

export interface IStepDialogButtonDetails {
  text?: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  hidden?: boolean;
  callback?: () => Promise<boolean> | void;
}

export interface IDialogStepDetails {
  title: string;
  subtitle?: (string | JSX.Element)[];
  supertitle?: string;
  content?: JSX.Element;
  button?: IStepDialogButtonDetails;
  secondaryButton?: IStepDialogButtonDetails;
  backButtonCallback?: () => void;
  noBackButton?: boolean;
  noNextButton?: boolean;
  bunchedUpContent?: boolean;
}

export interface IStepDialogProps {
  open: boolean;
  steps: IDialogStepDetails[];
  step?: number; // gives the ability to reset to the beginning
  callback?: (step: number) => void;
  closeCallback: () => void;
  initialBackCallback?: () => void;
  loadingSpinner?: boolean;
}

export default function StepDialog(props: IStepDialogProps) {
  const [step, setStep] = useState<number>(0);
  const [bodyStep, setBodyStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (_.isNumber(props.step)) {
      setStep(props.step);
    }
  }, [props.step]);

  useEffect(() => {
    props.callback?.(step);
    setTimeout(() => {
      setBodyStep(step);
    }, BODY_FADE_DURATION);
  }, [step]);

  const getEnrichedButtonDetails: (
    details?: IStepDialogButtonDetails
  ) => IDialogButtonDetails = (details) => ({
    text: details?.text ?? (step < props.steps.length - 1 ? "Next" : "Close"),
    callback: async () => {
      setLoading(true);
      if (!details?.callback || (await details?.callback?.())) {
        if (step < props.steps.length - 1) {
          setStep(step + 1);
        } else {
          props.closeCallback();
        }
      }
      setLoading(false);
    },
    disabled: !!details?.disabled || bodyStep !== step,
    variant: details?.variant,
  });

  return (
    <UrsorDialog
      title={props.steps[bodyStep].title}
      subtitle={props.steps[bodyStep].subtitle}
      supertitle={props.steps[bodyStep].supertitle}
      titleMaxWidth="80%"
      open={props.open}
      step={step}
      nSteps={props.steps.length}
      button={
        !props.steps[bodyStep].button?.hidden
          ? getEnrichedButtonDetails(props.steps[bodyStep].button)
          : undefined
      }
      secondaryButton={
        !props.steps[bodyStep].secondaryButton?.hidden &&
        props.steps[bodyStep].secondaryButton
          ? getEnrichedButtonDetails(props.steps[bodyStep].secondaryButton)
          : undefined
      }
      onCloseCallback={() => {
        props.closeCallback();
        setStep(0);
      }}
      backButtonCallback={
        props.steps[step].noBackButton
          ? undefined
          : step > 0
          ? () => {
              setStep(step - 1);
              props.steps[step].backButtonCallback?.();
            }
          : props.initialBackCallback
      }
      bunchedUpContent={props.steps[bodyStep].bunchedUpContent}
      loading={props.loadingSpinner && loading}
    >
      {props.steps[bodyStep].content ? props.steps[bodyStep].content : null}
    </UrsorDialog>
  );
}
