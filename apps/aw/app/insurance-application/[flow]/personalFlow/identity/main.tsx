import { useState } from "react";
import InsuranceApplicationResponsibilities from "./responsibilities";
import InsuranceApplicationIdentityIntro from "./intro";
import InsuranceApplicationIdentityKYC from "./kyc";
import InsuranceApplicationIdentitySuccess from "./success";
import InsuranceApplicationIdentityStatus from "./status";

export const awInsuranceApplicationIdentityStepViews = [
  "intro",
  "responsibilities",
  "kyc",
  "success",
  "status",
] as const;
export type AWInsuranceApplicationPersonalFlowIdentityStepView =
  (typeof awInsuranceApplicationIdentityStepViews)[number];

export const IDENTITY_STEP_TITLES: Record<
  AWInsuranceApplicationPersonalFlowIdentityStepView,
  string
> = {
  intro: "Identity verification",
  responsibilities: "Your responsibilities as a Key Holder",
  kyc: "Identity verification",
  success: "Identity verified",
  status: "Identity verification status",
};

const IDENTITY_STEP_VIEW_COMPONENTS: Partial<
  Record<
    AWInsuranceApplicationPersonalFlowIdentityStepView,
    React.FC<{ nextCallback: () => void }>
  >
> = {
  intro: InsuranceApplicationIdentityIntro,
  responsibilities: InsuranceApplicationResponsibilities,
  kyc: InsuranceApplicationIdentityKYC,
  success: InsuranceApplicationIdentitySuccess,
  status: InsuranceApplicationIdentityStatus,
};

export default function InsuranceApplicationIdentity(props: {
  nextCallback: () => void;
}) {
  const [currentView, setCurrentView] =
    useState<AWInsuranceApplicationPersonalFlowIdentityStepView>("intro");

  const View = currentView ? IDENTITY_STEP_VIEW_COMPONENTS[currentView] : null;

  return View ? (
    <View
      nextCallback={() =>
        currentView === "status"
          ? props.nextCallback()
          : setCurrentView(
              awInsuranceApplicationIdentityStepViews[
                awInsuranceApplicationIdentityStepViews.indexOf(currentView) + 1
              ]
            )
      }
    />
  ) : (
    <></>
  );
}
