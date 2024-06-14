import InsuranceApplicationIllustrationDialog from "../components/illustration-dialog";
import { MAIN_FLOW_STEP_TITLES } from "../mainFlow/controller";

export default function InsuranceApplicationWelcome(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationIllustrationDialog
      title={MAIN_FLOW_STEP_TITLES.welcome}
      subtitle="Next steps"
      buttonCallback={props.nextCallback}
      info={{
        prompt: "Need help",
        content:
          "If you need support at any point during the application process contact agent@anchorwatch.com",
      }}
    >
      <div className="flex flex-col gap-3xl px-2 pt-lg text-lg text-darkTeal-5">
        <div>The application consists of:</div>
        <div className="flex flex-col gap-1">
          <div>1. Understanding responsibilities as a key holder</div>
          <div>2. Filling the insurance application</div>
          <div>3. Verifying your identity</div>
        </div>
      </div>
    </InsuranceApplicationIllustrationDialog>
  );
}
