import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
import InsuranceApplicationIllustrationDialog from "../components/InsuranceApplicationIllustrationDialog";
import {
  AWInsuranceApplicationStep,
  STEP_TITLES,
} from "../InsuranceApplicationPage";
import _ from "lodash";

export const CHECKPOINT_STEPS: AWInsuranceApplicationStep[] = [
  "policyOwner",
  "businessSummary",
  "identity",
  "insuranceNeeds",
  "governance",
  "spending",
  //"leaders",
];

export default function InsuranceApplicationCheckpoints(props: {
  nextCallback: () => void;
}) {
  // const [committedAnswers, setCommittedAnswers] = useLocalStorage<
  //   IAWFormInputAnswer[] | undefined
  // >("committedAnswers", undefined);
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
      title={started ? "RESUME APPLICATION" : "START APPLICATION"}
      subtitle={
        started
          ? "Complete all the sections below to submit your application"
          : "The application intake form consists of the following sections."
      }
      buttonText={started ? "Resume" : "Start"}
      buttonCallback={() =>
        !started
          ? props.nextCallback()
          : setCurrentStep(CHECKPOINT_STEPS[lastCompletedStepIndex])
      }
      info={{
        prompt: "You can come back anytime",
        content:
          "We automatically save your progress. So you can leave and come back to this application as you wish.",
      }}
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
                    : "bg-lightTeal-2"
                }`}
              />
              <div
                className={`text-xl underline underline-offset-2 decoration-1 ${
                  lastCompletedStepIndex > i
                    ? "text-greyscale-6"
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
