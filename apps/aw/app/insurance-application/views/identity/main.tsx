import { useState } from "react";
import InsuranceApplicationPersonalDetails from "./personalDetails";
import InsuranceApplicationResponsibilities from "./responsibilities";
import InsuranceApplicationIdentityIntro from "./intro";
import InsuranceApplicationIdentityKYC from "./kyc";

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
};

export default function InsuranceApplicationIdentity(props: {
  nextCallback: () => void;
}) {
  const [currentView, setCurrentView] =
    useState<AWInsuranceApplicationIdentityStepView>("kyc");

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
  // <InsuranceApplicationIllustrationDialog
  //   title={IDENTITY_STEP_TITLES[currentView]}
  //   buttonCallback={() =>
  //     currentView === "status"
  //       ? props.nextCallback()
  //       : setCurrentView(
  //           awInsuranceApplicationIdentityStepViews[
  //             awInsuranceApplicationIdentityStepViews.indexOf(currentView) + 1
  //           ]
  //         )
  //   }
  //   infoText="Why we do this"
  //   progress={
  //     (CHECKPOINT_STEPS.indexOf("identity") - 1) / CHECKPOINT_STEPS.length
  //   }
  // >
  //   <div className="flex flex-col gap-3xl text-xl text-darkTeal-5">
  //     <div>
  //       Anchorwatch has sent all identified Company Leaders an email to accept
  //       Terms of Service, complete identity verification and KYC/AML
  //       compliance.
  //     </div>
  //     <div>
  //       Note: The application can not be submitted until all Company Leaders
  //       have provided their requested information
  //     </div>
  //   </div>
  // </InsuranceApplicationIllustrationDialog>
}
