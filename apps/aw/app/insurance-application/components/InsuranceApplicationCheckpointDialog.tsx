import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
import InsuranceApplicationIllustrationDialog from "./InsuranceApplicationIllustrationDialog";
import {
  AWInsuranceApplicationStep,
  STEP_TITLES,
} from "../InsuranceApplicationPage";
import _ from "lodash";
import { IAWInfoLineProps } from "@/components/AWInfoLine";

export const CHECKPOINT_STEPS: AWInsuranceApplicationStep[] = [
  "policyOwner",
  "businessSummary",
  "identity",
  "insuranceNeeds",
  "governance",
  "spending",
  "upload",
];

export default function InsuranceApplicationCheckpointDialog(props: {
  title: string;
  subtitle: string;
  buttonText: string;
  info?: IAWInfoLineProps;
  buttonCallback: () => void;
}) {
  const [stepCompletions, setStepCompletions] = useLocalStorage<
    Partial<Record<AWInsuranceApplicationStep, boolean>>
  >("stepCompletions", {});

  const [currentStep, setCurrentStep] =
    useLocalStorage<AWInsuranceApplicationStep>("currentStep", "welcome");

  const [lastCompletedStepIndex, setLastCompletedStepIndex] =
    useState<number>(0);
  useEffect(
    () =>
      setLastCompletedStepIndex(
        _.sum(CHECKPOINT_STEPS.map((cs) => !!stepCompletions[cs])) - 1
      ),
    [stepCompletions]
  );

  const [started, setStarted] = useState<boolean>(false);
  useEffect(
    () => setStarted(!!stepCompletions[CHECKPOINT_STEPS[0]]),
    [stepCompletions]
  );
  return (
    <InsuranceApplicationIllustrationDialog
      title={props.title}
      subtitle={props.subtitle}
      buttonText={props.buttonText}
      buttonCallback={() => props.buttonCallback}
      info={props.info}
    >
      <div className="flex flex-col">
        {CHECKPOINT_STEPS.map((step, i) => (
          <div key={i} className="flex flex-col">
            <div
              className="flex gap-[10px] items-center cursor-pointer hover:opacity-60 duration-200"
              onClick={() => setCurrentStep(step)}
            >
              <div
                className={`h-[12px] w-[12px] rounded-full border-[1px] border-solid border-greyscale-7 ${
                  lastCompletedStepIndex === i + 1
                    ? "bg-darkTeal-5"
                    : lastCompletedStepIndex < i + 1
                    ? ""
                    : "bg-lightTeal-1"
                }`}
              />
              <div
                className={`text-xl underline underline-offset-2 decoration-1 ${
                  lastCompletedStepIndex > i + 1
                    ? "text-buttons-secondary-text_hover"
                    : "text-darkTeal-3"
                }`}
              >
                {STEP_TITLES[step]}
              </div>
            </div>
            {i < CHECKPOINT_STEPS.length - 1 ? (
              <div className="w-[1px] h-[16px] ml-[5.3px] bg-darkTeal-5" />
            ) : null}
          </div>
        ))}
      </div>
    </InsuranceApplicationIllustrationDialog>
  );
}
