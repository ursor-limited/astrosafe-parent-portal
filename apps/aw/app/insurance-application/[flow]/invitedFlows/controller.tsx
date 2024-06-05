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
import { AWInsuranceApplicationFlow } from "../mainFlow/controller";

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
  const [currentStep, setCurrentStep] = useLocalStorage<
    AWInsuranceApplicationInvitedFlowStep | undefined
  >("currentStep", "welcome");

  const StepView = currentStep ? STEP_COMPONENTS[currentStep] : null;

  return (
    <div className="h-screen w-screen py-[98px] flex justify-center overflow-scroll relative">
      {currentStep && StepView ? (
        <StepView
          progress={
            (awInsuranceApplicationInvitedFlowSteps.indexOf(currentStep) + 1) /
            awInsuranceApplicationInvitedFlowSteps.length
          }
          flow={props.flow}
          nextCallback={() =>
            setCurrentStep(
              awInsuranceApplicationInvitedFlowSteps[
                awInsuranceApplicationInvitedFlowSteps.indexOf(currentStep) + 1
              ]
            )
          }
        />
      ) : null}
      <TestingBar flow={props.flow} />
    </div>
  );
}
