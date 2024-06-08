"use client";

import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
import InsuranceApplicationIllustrationDialog from "../../../components/illustration-dialog";
import {
  AWInsuranceApplicationMainFlowStep,
  MAIN_FLOW_STEP_TITLES,
} from "../../controller";
import _ from "lodash";
import { IAWInfoLineProps } from "@/components/AWInfoLine";

export const CHECKPOINT_STEPS: AWInsuranceApplicationMainFlowStep[] = [
  "policyOwner",
  "businessSummary",
  "leaders",
  "identity",
  "insuranceNeeds",
  "governance",
  "spending",
  "whitelist",
  "upload",
];

export default function InsuranceApplicationCheckpointDialog(props: {
  title: string;
  subtitle: string;
  buttonText: string;
  info?: IAWInfoLineProps;
  firstNotCompletedStep?: AWInsuranceApplicationMainFlowStep;
  stepCompletions?: Partial<
    Record<AWInsuranceApplicationMainFlowStep, boolean>
  >;
  highlightNotCompleted?: boolean;
  buttonCallback: () => void;
}) {
  const [currentStep, setCurrentStep] =
    useLocalStorage<AWInsuranceApplicationMainFlowStep>(
      "currentStep",
      "welcome"
    );
  return (
    <InsuranceApplicationIllustrationDialog
      title={props.title}
      subtitle={props.subtitle}
      buttonText={props.buttonText}
      buttonCallback={props.buttonCallback}
      info={props.info}
    >
      <div className="flex flex-col">
        {CHECKPOINT_STEPS.map((step, i) => {
          const completed = props.stepCompletions?.[step];
          return (
            <div key={step} className="flex flex-col">
              <div
                className="flex gap-[10px] items-center cursor-pointer hover:opacity-60 duration-200"
                onClick={() => setCurrentStep(step)}
              >
                <div
                  className={`h-[12px] w-[12px] rounded-full border-[1px] border-solid ${
                    !completed && props.highlightNotCompleted
                      ? "border-system-orange-1"
                      : "border-greyscale-7"
                  } ${
                    completed
                      ? "bg-lightTeal-1"
                      : props.highlightNotCompleted
                      ? "bg-system-orange-5"
                      : props.firstNotCompletedStep === step
                      ? "bg-darkTeal-5"
                      : ""
                  }`}
                />
                <div
                  className={`text-xl underline underline-offset-2 decoration-1 ${
                    completed
                      ? "text-buttons-secondary-text_hover"
                      : "text-darkTeal-3"
                  }`}
                >
                  {MAIN_FLOW_STEP_TITLES[step]}
                </div>
              </div>
              {i < CHECKPOINT_STEPS.length - 1 ? (
                <div className="w-[1px] h-[16px] ml-[5.3px] bg-darkTeal-5" />
              ) : null}
            </div>
          );
        })}
      </div>
    </InsuranceApplicationIllustrationDialog>
  );
}
