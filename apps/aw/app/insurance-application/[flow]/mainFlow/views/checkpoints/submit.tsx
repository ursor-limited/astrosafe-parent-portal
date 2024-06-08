import _ from "lodash";
//import InsuranceApplicationCheckpointDialog from "../../components/InsuranceApplicationCheckpointDialog";
import {
  AWInsuranceApplicationMainFlowStep,
  MAIN_FLOW_STEP_TITLES,
} from "../../controller";
import dynamic from "next/dynamic";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
import { CHECKPOINT_STEPS } from "./checkpoint-dialog";

const InsuranceApplicationCheckpointDialog = dynamic(
  () => import("./checkpoint-dialog"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export default function InsuranceApplicationCheckpointsSubmit(props: {
  nextCallback: () => void;
}) {
  const [currentStep, setCurrentStep] =
    useLocalStorage<AWInsuranceApplicationMainFlowStep>(
      "currentStep",
      "welcome"
    );

  const [allCompleted, setAllCompleted] = useState<boolean>(false);
  const [stepCompletions, setStepCompletions] = useLocalStorage<
    Partial<Record<AWInsuranceApplicationMainFlowStep, boolean>>
  >("stepCompletions", {});
  useEffect(
    () =>
      setAllCompleted(CHECKPOINT_STEPS.every((step) => stepCompletions[step])),
    [stepCompletions]
  );

  const [firstNotCompletedStep, setFirstNotCompletedStep] =
    useState<AWInsuranceApplicationMainFlowStep>("welcome");
  useEffect(
    () =>
      setFirstNotCompletedStep(
        CHECKPOINT_STEPS.find((cs) => !stepCompletions[cs]) || "welcome"
      ),
    [stepCompletions]
  );

  return (
    <InsuranceApplicationCheckpointDialog
      title={allCompleted ? MAIN_FLOW_STEP_TITLES.submit : "Resume application"}
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
