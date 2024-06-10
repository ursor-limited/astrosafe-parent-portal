import InsuranceApplicationIllustrationDialog from "../../components/illustration-dialog";
import { CHECKPOINT_STEPS } from "../checkpoint-dialog";
import { IDENTITY_STEP_TITLES } from "./main";

export default function InsuranceApplicationIdentityIntro(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationIllustrationDialog
      title={IDENTITY_STEP_TITLES.intro}
      buttonCallback={props.nextCallback}
      info={{
        prompt: "Why we do this",
        content:
          "Information collected for Company Leaders is required for either regulatory compliance or insurance underwriting",
      }}
      progress={CHECKPOINT_STEPS.indexOf("identity") / CHECKPOINT_STEPS.length}
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
