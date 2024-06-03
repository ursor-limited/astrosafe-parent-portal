import _ from "lodash";
//import InsuranceApplicationCheckpointDialog from "../../components/InsuranceApplicationCheckpointDialog";
import {
  AWInsuranceApplicationStep,
  STEP_TITLES,
} from "../../InsuranceApplicationPage";
import dynamic from "next/dynamic";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
import { CHECKPOINT_STEPS } from "../../components/InsuranceApplicationCheckpointDialog";

const InsuranceApplicationCheckpointDialog = dynamic(
  () => import("../../components/InsuranceApplicationCheckpointDialog"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export default function InsuranceApplicationCheckpointsSubmit(props: {
  nextCallback: () => void;
}) {
  const [currentStep, setCurrentStep] =
    useLocalStorage<AWInsuranceApplicationStep>("currentStep", "welcome");

  const [allCompleted, setAllCompleted] = useState<boolean>(false);
  const [stepCompletions, setStepCompletions] = useLocalStorage<
    Partial<Record<AWInsuranceApplicationStep, boolean>>
  >("stepCompletions", {});
  useEffect(
    () =>
      setAllCompleted(CHECKPOINT_STEPS.every((step) => stepCompletions[step])),
    [stepCompletions]
  );

  const [firstNotCompletedStep, setFirstNotCompletedStep] =
    useState<AWInsuranceApplicationStep>("welcome");
  useEffect(
    () =>
      setFirstNotCompletedStep(
        CHECKPOINT_STEPS.find((cs) => !stepCompletions[cs]) || "welcome"
      ),
    [stepCompletions]
  );

  return (
    <InsuranceApplicationCheckpointDialog
      title={allCompleted ? STEP_TITLES.submit : "Resume application"}
      firstNotCompletedStep={firstNotCompletedStep}
      subtitle={
        allCompleted
          ? "The application is ready to submit. Please proceed to the Underwriting & Concierge Fee"
          : "Complete the remaining sections to submit your application"
      }
      stepCompletions={stepCompletions}
      buttonText={allCompleted ? "Proceed to payment" : "Resume"}
      buttonCallback={() =>
        allCompleted
          ? props.nextCallback()
          : setCurrentStep(firstNotCompletedStep)
      }
      highlightNotCompleted
    />
  );
}
