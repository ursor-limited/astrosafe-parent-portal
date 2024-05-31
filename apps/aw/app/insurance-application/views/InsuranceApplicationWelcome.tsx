import { STEP_TITLES } from "../InsuranceApplicationPage";
import InsuranceApplicationIllustrationDialog from "../components/InsuranceApplicationIllustrationDialog";

export default function InsuranceApplicationWelcome(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationIllustrationDialog
      title={STEP_TITLES.welcome}
      subtitle="To become an insured AnchorWatch customer, you'll complete the following steps."
      buttonCallback={props.nextCallback}
      info={{
        prompt: "Need help",
        content:
          "If you need support at any point during the application process contact agent@anchorwatch.com",
      }}
    >
      <div className="flex flex-col gap-3xl px-2 pt-lg">
        <div className="flex gap-lg text-lg text-darkTeal-5">
          <div className="min-w-[16px] flex justify-end">
            <div className="">1.</div>
          </div>
          <div>Fill out the application form.</div>
        </div>
        <div className="flex gap-lg text-lg text-darkTeal-5">
          <div className="min-w-[16px] flex justify-end">
            <div className="">2.</div>
          </div>
          <div>
            Pay the one-time underwriting fee, which includes concierge
            onboarding, hardware wallets for each Key Holding member of your
            team.
          </div>
        </div>
        <div className="flex gap-lg text-lg text-darkTeal-5">
          <div className="min-w-[16px] flex justify-end">
            <div className="">3.</div>
          </div>
          <div>Your AnchorWatch agent will onboard you to Trident Vault.</div>
        </div>
        <div className="flex gap-lg text-lg text-darkTeal-5">
          <div className="min-w-[16px] flex justify-end">
            <div className="">4.</div>
          </div>
          <div>
            Deposit or buy bitcoin into your Trident Vault, pay your premium and
            sign your insurance contract.
          </div>
        </div>
      </div>
    </InsuranceApplicationIllustrationDialog>
  );
}
