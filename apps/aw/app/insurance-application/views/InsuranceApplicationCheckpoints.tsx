import InsuranceApplicationDialog from "../InsuranceApplicationDialog";
import { STEPS } from "../InsuranceApplicationPage";
import { useLocalStorage } from "usehooks-ts";
import { IAWFormInputAnswer } from "./InsuranceApplicationForm___";
import { useEffect, useState } from "react";
import InsuranceApplicationIllustrationDialog from "../InsuranceApplicationIllustrationDialog";

export default function InsuranceApplicationCheckpoints(props: {
  startCallback: () => void;
}) {
  const [committedAnswers, setCommittedAnswers] = useLocalStorage<
    IAWFormInputAnswer[] | undefined
  >("committedAnswers", undefined);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  useEffect(() => {
    const firstNotCompleteStep = STEPS.find(
      (step) =>
        !step.sections.every(
          (section) =>
            section.inputs?.every(
              (input) =>
                input.optional ||
                committedAnswers?.find((answer) => answer.inputId === input.id)
            )
        )
    );
    setCurrentStepIndex(
      firstNotCompleteStep
        ? Math.max(0, STEPS.indexOf(firstNotCompleteStep))
        : STEPS.length - 1
    );
  }, [committedAnswers]);

  const [started, setStarted] = useState<boolean>(false);
  useEffect(
    () => setStarted(!!committedAnswers?.some((a) => a.value)),
    [committedAnswers]
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
      buttonCallback={props.startCallback}
      infoText="You can come back anytime"
    >
      <div className="flex flex-col">
        {STEPS.map((step, i) => (
          <div key={i} className="flex flex-col">
            <div className="flex gap-[10px] items-center cursor-pointer hover:opacity-60 duration-200">
              <div
                className={`h-[12px] w-[12px] rounded-full border-[1px] border-solid border-greyscale-7 ${
                  currentStepIndex === i
                    ? "bg-darkTeal-5"
                    : currentStepIndex > i
                    ? "bg-greyscale-5"
                    : ""
                }`}
              />
              <div
                className={`text-xl underline underline-offset-2 decoration-1 ${
                  currentStepIndex > i ? "text-greyscale-6" : "text-darkTeal-3"
                }`}
              >
                {step.title}
              </div>
            </div>
            {i < STEPS.length - 1 ? (
              <div className="w-[1px] h-[16px] ml-[5.3px] bg-darkTeal-5" />
            ) : null}
          </div>
        ))}
      </div>
    </InsuranceApplicationIllustrationDialog>
  );
}
