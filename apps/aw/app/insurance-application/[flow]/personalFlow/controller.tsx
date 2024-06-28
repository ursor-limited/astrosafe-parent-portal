"use client";

import { useLocalStorage } from "usehooks-ts";
import InsuranceApplicationTermsOfService from "../mainFlow/views/terms-of-service";
import InsuranceApplicationGlossary from "../mainFlow/views/glossary";
import InsuranceApplicationInsuranceNeeds from "../mainFlow/views/insurance-needs";
import InsuranceApplicationSpending from "../mainFlow/views/spending";
import InsuranceApplicationWhitelist from "../mainFlow/views/whitelist";
import _ from "lodash";
import InsuranceApplicationPayment from "../mainFlow/views/payment";
import TestingBar from "../TestingBar";
import dynamic from "next/dynamic";
import { AWInsuranceApplicationFlow } from "../mainFlow/controller";
import InsuranceApplicationPersonalCheckpointsStart from "./start";
import InsuranceApplicationWelcome from "../mainFlow/views/welcome";
import InsuranceApplicationKeyholders from "./keyholders";
import { useEffect, useState } from "react";
import InsuranceApplicationCheckpointsPersonalSubmit from "./submit";
import InsuranceApplicationBeneficiary from "./beneficiary";
import InsuranceApplicationIdentity from "./identity/main";
import InsuranceApplicationPersonalUpload from "./upload";
import InsuranceApplicationPersonalDetails from "../mainFlow/views/identity/personal-details";

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
  "beneficiary",
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
  glossary: "Terms to Understand",
  termsOfService: "Terms of Service",
  start: "Start Application",
  policyOwner: "Policy Owner Information",
  beneficiary: "Beneficiary Information",
  identity: "Identity Verification",
  keyholders: "Key Holder & Details",
  insuranceNeeds: "Insurance Needs & History",
  spending: "Spending Behavior",
  whitelist: "Whitelist Addresses",
  upload: "Upload Documents",
  submit: "Submit Application",
  payment: "Underwriting and Concierge Fees Payment",
};

const STEP_COMPONENTS: Record<
  AWInsuranceApplicationPersonalFlowStep,
  React.FC<{ nextCallback: () => void; flow?: AWInsuranceApplicationFlow }>
> = {
  welcome: InsuranceApplicationWelcome,
  glossary: InsuranceApplicationGlossary,
  termsOfService: InsuranceApplicationTermsOfService,
  start: InsuranceApplicationPersonalCheckpointsStart,
  policyOwner: InsuranceApplicationPersonalDetails,
  beneficiary: InsuranceApplicationBeneficiary,
  keyholders: InsuranceApplicationKeyholders,
  identity: InsuranceApplicationIdentity,
  insuranceNeeds: InsuranceApplicationInsuranceNeeds,
  spending: InsuranceApplicationSpending,
  whitelist: InsuranceApplicationWhitelist,
  upload: InsuranceApplicationPersonalUpload,
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

  const [previousStep, setPreviousStep] = useLocalStorage<
    AWInsuranceApplicationPersonalFlowStep | undefined
  >("previousStep", undefined);

  const setStepComplete = (step: AWInsuranceApplicationPersonalFlowStep) => {
    setStepCompletions({ ...stepCompletions, [step]: true });
    setPreviousStep(step);
    setCurrentStep(
      awInsuranceApplicationPersonalFlowSteps[
        awInsuranceApplicationPersonalFlowSteps.indexOf(step) + 1
      ]
    );
  };

  const StepView = currentStep ? STEP_COMPONENTS[currentStep] : null;

  const [ref, setRef] = useState<HTMLElement | null>(null);
  useEffect(() => ref?.scrollTo(0, 0), [currentStep]);

  return (
    <div
      id={SCROLLABLE_PAGE_ID}
      className="h-screen w-screen py-[98px] flex justify-center overflow-scroll relative"
      ref={setRef}
    >
      {currentStep && StepView ? (
        <StepView
          key={currentStep}
          flow="personal"
          nextCallback={() => setStepComplete(currentStep)}
        />
      ) : null}
      <TestingBar flow="personal" />
    </div>
  );
}