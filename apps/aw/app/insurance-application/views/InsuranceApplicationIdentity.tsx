import { useState } from "react";
import { STEP_TITLES } from "../InsuranceApplicationPage";
import InsuranceApplicationIllustrationDialog from "../components/InsuranceApplicationIllustrationDialog";
import { CHECKPOINT_STEPS } from "./InsuranceApplicationCheckpoints";

const awInsuranceApplicationIdentityStepViews = [
  "intro",
  "responsibilities",
  "personalDetails",
  "kyc",
  "success",
  "status",
] as const;
export type AWInsuranceApplicationIdentityStepView =
  (typeof awInsuranceApplicationIdentityStepViews)[number];

export const VIEW_IDENTITY_STEP_TITLES: Record<
  AWInsuranceApplicationIdentityStepView,
  string
> = {
  intro: "Identity verification",
  responsibilities: "Your responsibilities as a Key Holder",
  personalDetails: "Company leader personal details",
  kyc: "Identity verification",
  success: "Identity verified",
  status: "Identity verification status",
};

export default function InsuranceApplicationIdentity(props: {
  nextCallback: () => void;
}) {
  const [currentView, setCurrentView] =
    useState<AWInsuranceApplicationIdentityStepView>("intro");
  return (
    <InsuranceApplicationIllustrationDialog
      title={STEP_TITLES.identity}
      buttonCallback={props.nextCallback}
      infoText="Why we do this"
      progress={
        (CHECKPOINT_STEPS.indexOf("identity") - 1) / CHECKPOINT_STEPS.length
      }
    >
      <div className="flex flex-col gap-3xl text-xl text-darkTeal-5">
        <div>
          Anchorwatch has sent all identified Company Leaders an email to accept
          Terms of Service, complete identity verification and KYC/AML
          compliance.
        </div>
        <div>
          Note: The application can not be submitted until all Company Leaders
          have provided their requested information
        </div>
      </div>
    </InsuranceApplicationIllustrationDialog>
  );
}
