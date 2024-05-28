import { CHECKPOINT_STEPS } from "../InsuranceApplicationPage";
import InsuranceApplicationIllustrationDialog from "../components/InsuranceApplicationIllustrationDialog";

export default function InsuranceApplicationIdentity(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationIllustrationDialog
      title="IDENTITY VERIFICATION"
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
