"use client";

import { useLocalStorage } from "usehooks-ts";
import InsuranceApplicationTermsOfService from "../mainFlow/views/terms-of-service";
import InsuranceApplicationGlossary from "../mainFlow/views/glossary";
import InsuranceApplicationIdentity from "../mainFlow/views/identity/main";
import InsuranceApplicationPolicyOwner from "../mainFlow/views/policy-owner";
import InsuranceApplicationInsuranceNeeds from "../mainFlow/views/insurance-needs";
import InsuranceApplicationSpending from "../mainFlow/views/spending";
import InsuranceApplicationWhitelist from "../mainFlow/views/whitelist";
import InsuranceApplicationUpload from "../mainFlow/views/upload";
import _ from "lodash";
import InsuranceApplicationPayment from "../mainFlow/views/payment";
import TestingBar from "../TestingBar";
import dynamic from "next/dynamic";
import { AWInsuranceApplicationFlow } from "../mainFlow/controller";
import InsuranceApplicationPersonalCheckpointsStart from "./start";
import InsuranceApplicationWelcome from "../mainFlow/views/welcome";
import InsuranceApplicationKeyholders from "./keyholders";
import { useEffect } from "react";
import InsuranceApplicationCheckpointsPersonalSubmit from "./submit";

export const SCROLLABLE_PAGE_ID = "scrollable-page";

const AWInfoLine = dynamic(
  () => import("@/components/AWInfoLine"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export const awInsuranceApplicationPersonalFlowSteps = [
  "welcome",
  "glossary",
  "termsOfService",
  "start",
  "policyOwner",
  "keyholders",
  "identity",
  "insuranceNeeds",
  "spending",
  "whitelist",
  "upload",
  "submit",
  "payment",
] as const;
export type AWInsuranceApplicationPersonalFlowStep =
  (typeof awInsuranceApplicationPersonalFlowSteps)[number];

export const PERSONAL_FLOW_STEP_TITLES: Record<
  AWInsuranceApplicationPersonalFlowStep,
  string
> = {
  welcome: "Welcome to your AnchorWatch Insurance Application",
  glossary: "Terms to understand",
  termsOfService: "Terms of Service",
  start: "Start Application",
  policyOwner: "Policy owner information",
  identity: "Identity verification",
  keyholders: "Key holder details",
  insuranceNeeds: "Insurance needs & history",
  spending: "Spending behavior",
  whitelist: "Whitelist addresses",
  upload: "Upload files",
  submit: "Submit Application",
  payment: "Underwriting and concierge fees payment",
};

const STEP_COMPONENTS: Record<
  AWInsuranceApplicationPersonalFlowStep,
  React.FC<{ nextCallback: () => void }>
> = {
  welcome: InsuranceApplicationWelcome,
  glossary: InsuranceApplicationGlossary,
  termsOfService: InsuranceApplicationTermsOfService,
  start: InsuranceApplicationPersonalCheckpointsStart,
  policyOwner: InsuranceApplicationPolicyOwner,
  keyholders: InsuranceApplicationKeyholders,
  identity: InsuranceApplicationIdentity,
  insuranceNeeds: InsuranceApplicationInsuranceNeeds,
  spending: InsuranceApplicationSpending,
  whitelist: InsuranceApplicationWhitelist,
  upload: InsuranceApplicationUpload,
  submit: InsuranceApplicationCheckpointsPersonalSubmit,
  payment: InsuranceApplicationPayment,
};

export default function InsuranceApplicationPersonalFlowController() {
  useLocalStorage<AWInsuranceApplicationFlow | undefined>("flow", "personal");

  const [stepCompletions, setStepCompletions] = useLocalStorage<
    Partial<Record<AWInsuranceApplicationPersonalFlowStep, boolean>>
  >("stepCompletions", {});

  const [currentStep, setCurrentStep] = useLocalStorage<
    AWInsuranceApplicationPersonalFlowStep | undefined
  >("currentStep", "welcome");

  const setStepComplete = (step: AWInsuranceApplicationPersonalFlowStep) => {
    setStepCompletions({ ...stepCompletions, [step]: true });
    setCurrentStep(
      awInsuranceApplicationPersonalFlowSteps[
        awInsuranceApplicationPersonalFlowSteps.indexOf(step) + 1
      ]
    );
  };

  const StepView = currentStep ? STEP_COMPONENTS[currentStep] : null;

  return (
    <div
      id={SCROLLABLE_PAGE_ID}
      className="h-screen w-screen py-[98px] flex justify-center overflow-scroll relative"
    >
      {currentStep && StepView ? (
        <StepView
          key={currentStep}
          nextCallback={() => setStepComplete(currentStep)}
        />
      ) : null}
      <TestingBar flow="personal" />
    </div>
  );
}
