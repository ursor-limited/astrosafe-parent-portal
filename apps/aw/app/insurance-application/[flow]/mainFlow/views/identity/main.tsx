import { useState } from "react";
import InsuranceApplicationPersonalDetails from "./personal-details";
import InsuranceApplicationResponsibilities from "./responsibilities";
import InsuranceApplicationIdentityIntro from "./intro";
import InsuranceApplicationIdentityKYC from "./kyc";
import InsuranceApplicationIdentitySuccess from "./success";
import InsuranceApplicationIdentityStatus from "./status";

export const awInsuranceApplicationIdentityStepViews = [
  "intro",
  "responsibilities",
  "personalDetails",
  "kyc",
  "success",
  "status",
] as const;
export type AWInsuranceApplicationIdentityStepView =
  (typeof awInsuranceApplicationIdentityStepViews)[number];

export const IDENTITY_STEP_TITLES: Record<
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

const IDENTITY_STEP_VIEW_COMPONENTS: Partial<
  Record<
    AWInsuranceApplicationIdentityStepView,
    React.FC<{ nextCallback: () => void }>
  >
> = {
  intro: InsuranceApplicationIdentityIntro,
  responsibilities: InsuranceApplicationResponsibilities,
  personalDetails: InsuranceApplicationPersonalDetails,
  kyc: InsuranceApplicationIdentityKYC,
  success: InsuranceApplicationIdentitySuccess,
  status: InsuranceApplicationIdentityStatus,
};

export default function InsuranceApplicationIdentity(props: {
  nextCallback: () => void;
}) {
  const [currentView, setCurrentView] =
    useState<AWInsuranceApplicationIdentityStepView>("intro");

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
