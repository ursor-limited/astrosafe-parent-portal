"use client";

import { useLocalStorage } from "usehooks-ts";
import _ from "lodash";
import TestingBar from "../TestingBar";
import InsuranceApplicationWelcome from "./welcome";
import InsuranceApplicationTermsOfService from "../mainFlow/views/terms-of-service";
import InsuranceApplicationResponsibilities from "../mainFlow/views/identity/responsibilities";
import InsuranceApplicationPersonalDetails from "../mainFlow/views/identity/personal-details";
import InsuranceApplicationIdentityKYC from "../mainFlow/views/identity/kyc";
import InsuranceApplicationIdentitySuccess from "../mainFlow/views/identity/success";
import {
  AWInsuranceApplicationFlow,
  SCROLLABLE_PAGE_ID,
} from "../mainFlow/controller";
import { useEffect, useState } from "react";

const NON_KEYHOLDER_FLOWS: AWInsuranceApplicationFlow[] = [
  "digAssMan",
  "executive",
  "shareholder",
];

export const awInsuranceApplicationInvitedFlowSteps = [
  "welcome",
  "termsOfService",
  "responsibilities",
  "personalInfo",
  "identity",
  "success",
] as const;
export type AWInsuranceApplicationInvitedFlowStep =
  (typeof awInsuranceApplicationInvitedFlowSteps)[number];

//@ts-ignore
export const awInsuranceApplicationInvitedFlowNonKeyholderSteps: Partial<AWInsuranceApplicationInvitedFlowStep> =
  ["welcome", "termsOfService", "personalInfo", "identity", "success"];

export const INVITED_FLOWS_STEP_TITLES: Record<
  AWInsuranceApplicationInvitedFlowStep,
  string
> = {
  welcome: "Welcome to your AnchorWatch Insurance Application",
  termsOfService: "Terms of Service",
  responsibilities: "Your responsibilities as a Key Holder",
  personalInfo: "Company leader personal information",
  identity: "Identity verification",
  success: "Verification complete",
};

const STEP_COMPONENTS: Record<
  AWInsuranceApplicationInvitedFlowStep,
  React.FC<{
    nextCallback: () => void;
    progress?: number;
    flow?: AWInsuranceApplicationFlow;
  }>
> = {
  welcome: InsuranceApplicationWelcome,
  termsOfService: InsuranceApplicationTermsOfService,
  responsibilities: InsuranceApplicationResponsibilities,
  personalInfo: InsuranceApplicationPersonalDetails,
  identity: InsuranceApplicationIdentityKYC,
  success: InsuranceApplicationIdentitySuccess,
};

export default function InsuranceApplicationInvitedFlowsController(props: {
  flow: AWInsuranceApplicationFlow;
}) {
  const [stepCompletions, setStepCompletions] = useLocalStorage<
    Partial<Record<AWInsuranceApplicationInvitedFlowStep, boolean>>
  >("stepCompletions", {});

  const [currentStep, setCurrentStep] = useLocalStorage<
    AWInsuranceApplicationInvitedFlowStep | undefined
  >("currentStep", "welcome");

  const [previousStep, setPreviousStep] = useLocalStorage<
    AWInsuranceApplicationInvitedFlowStep | undefined
  >("previousStep", undefined);

  const StepView = currentStep ? STEP_COMPONENTS[currentStep] : null;

  const setStepComplete = (step: AWInsuranceApplicationInvitedFlowStep) => {
    setStepCompletions({ ...stepCompletions, [step]: true });
    setPreviousStep(step);
    setCurrentStep(steps[steps.indexOf(step) + 1]);
  };

  const [ref, setRef] = useState<HTMLElement | null>(null);
  useEffect(() => ref?.scrollTo(0, 0), [currentStep]);

  const [steps, setSteps] = useState<AWInsuranceApplicationInvitedFlowStep[]>( //@ts-ignore
    awInsuranceApplicationInvitedFlowSteps
  );
  useEffect(
    () =>
      setSteps(
        //@ts-ignore
        NON_KEYHOLDER_FLOWS.includes(props.flow)
          ? awInsuranceApplicationInvitedFlowNonKeyholderSteps
          : awInsuranceApplicationInvitedFlowSteps
      ),
    [props.flow]
  );

  return (
    <div
      id={SCROLLABLE_PAGE_ID}
      className="h-screen w-screen py-[98px] flex justify-center overflow-scroll relative"
      ref={setRef}
    >
      {currentStep && StepView ? (
        <StepView
          progress={
            (awInsuranceApplicationInvitedFlowSteps.indexOf(currentStep) + 1) /
            awInsuranceApplicationInvitedFlowSteps.length
          }
          flow={props.flow}
          nextCallback={() => setStepComplete(currentStep)}
        />
      ) : null}
      <TestingBar flow={props.flow} />
    </div>
  );
}
