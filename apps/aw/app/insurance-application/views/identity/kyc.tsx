import { useState } from "react";
import InsuranceApplicationIllustrationDialog from "../../components/InsuranceApplicationIllustrationDialog";
import { CHECKPOINT_STEPS } from "../InsuranceApplicationCheckpoints";
import { IDENTITY_STEP_TITLES } from "./main";

export default function InsuranceApplicationIdentityKYC(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationIllustrationDialog
      title={IDENTITY_STEP_TITLES.kyc}
      subtitle="How to verify your identity?"
      buttonCallback={props.nextCallback}
      progress={CHECKPOINT_STEPS.indexOf("identity") / CHECKPOINT_STEPS.length}
    >
      <div className="flex flex-col gap-3xl text-lg text-darkTeal-5">
        <div className="flex gap-lg text-lg text-darkTeal-5">
          <div className="min-w-[16px] flex justify-end">
            <div className="">1.</div>
          </div>
          <div>
            Using your mobile phone, scan this QR code to verify your identity.
          </div>
        </div>

        <div className="flex gap-lg text-lg text-darkTeal-5">
          <div className="min-w-[16px] flex justify-end">
            <div className="">2.</div>
          </div>
          <div>
            Follow the instructions on the mobile screen. Once completed, return
            to this page.
          </div>
        </div>

        <div className="flex gap-lg text-lg text-darkTeal-5">
          <div className="min-w-[16px] flex justify-end">
            <div className="">3.</div>
          </div>
          <div>
            Other company leaders will also receive an email with instructions
            to complete this KYC/AML identity verification
          </div>
        </div>
      </div>
    </InsuranceApplicationIllustrationDialog>
  );
}
