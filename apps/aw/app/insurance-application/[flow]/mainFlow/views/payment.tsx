import InsuranceApplicationIllustrationDialog from "../../components/illustration-dialog";
import { MAIN_FLOW_STEP_TITLES } from "../controller";
import { CHECKPOINT_STEPS } from "./checkpoints/checkpoint-dialog";
import { IDENTITY_STEP_TITLES } from "./identity/main";

export default function InsuranceApplicationPayment(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationIllustrationDialog
      title={MAIN_FLOW_STEP_TITLES.payment}
      subtitle="$1000 Underwriting & Concierge Fee"
      buttonCallback={() => null}
      backbuttonStep="submit"
    >
      <div className="flex flex-col gap-xl text-xl text-darkTeal-5">
        <div>This fee covers:</div>
        <div className="flex flex-col gap-1">
          <div>1) Application & Underwriting Reviews</div>
          <div>2) Background Checks of all Individuals</div>
          <div>3) Personalized Unlimited Onboarding Time</div>
          <div>4) Three Signing Devices</div>
        </div>
        <div>
          This fee is non-refundable; the Signing Devices are yours to keep.
        </div>
      </div>
    </InsuranceApplicationIllustrationDialog>
  );
}
