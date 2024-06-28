import InsuranceApplicationIllustrationDialog from "../../../components/illustration-dialog";
import { AWInsuranceApplicationFlow } from "../../controller";
import { CHECKPOINT_STEPS } from "../checkpoints/checkpoint-dialog";
import {
  IDENTITY_STEP_TITLES,
  awInsuranceApplicationIdentityStepViews,
} from "./main";
import QR from "@/images/QR.png";
import Image from "next/image";

export default function InsuranceApplicationIdentityKYC(props: {
  nextCallback: () => void;
  progress?: number;
  flow?: AWInsuranceApplicationFlow;
}) {
  return (
    <InsuranceApplicationIllustrationDialog
      title={IDENTITY_STEP_TITLES.kyc}
      subtitle="How to verify your identity?"
      //buttonCallback={props.nextCallback}
      progress={
        props.progress ||
        (CHECKPOINT_STEPS.indexOf("identity") +
          awInsuranceApplicationIdentityStepViews.indexOf("kyc") /
            awInsuranceApplicationIdentityStepViews.length) /
          CHECKPOINT_STEPS.length
      }
      illustration={
        <Image
          src={QR.src}
          height={388}
          width={388}
          alt="qr code"
          unoptimized
        />
      }
      backbuttonStep={
        props.flow === "main"
          ? CHECKPOINT_STEPS[CHECKPOINT_STEPS.indexOf("identity") - 1]
          : "personalInfo"
      }
    >
      <div className="h-[347px] flex flex-col gap-3xl text-lg text-darkTeal-5">
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
        <div
          className="w-full bg-darkTeal-5 items-center justify-center rounded-xs p-[24px] cursor-pointer hover:opacity-50 duration-200"
          onClick={props.nextCallback}
        >
          <div className="text-sm text-yellow-2 text-center">
            View the result of scanning the QR code by clicking this. Remember
            to remove this for the production build!
          </div>
        </div>
      </div>
    </InsuranceApplicationIllustrationDialog>
  );
}
