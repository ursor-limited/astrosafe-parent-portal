import InsuranceApplicationIllustrationDialog from "../../../components/illustration-dialog";
import { CHECKPOINT_STEPS } from "../checkpoints/checkpoint-dialog";
import {
  IDENTITY_STEP_TITLES,
  awInsuranceApplicationIdentityStepViews,
} from "./main";
import IdentitySuccessIllustration from "@/images/IdentitySuccessIllustration.png";
import Image from "next/image";

export default function InsuranceApplicationIdentitySuccess(props: {
  nextCallback: () => void;
  progress?: number;
}) {
  return (
    <InsuranceApplicationIllustrationDialog
      title={IDENTITY_STEP_TITLES.success}
      buttonCallback={props.progress === 1 ? undefined : props.nextCallback}
      progress={
        props.progress ||
        (CHECKPOINT_STEPS.indexOf("identity") +
          awInsuranceApplicationIdentityStepViews.indexOf("success") /
            awInsuranceApplicationIdentityStepViews.length) /
          CHECKPOINT_STEPS.length
      }
      illustration={
        <Image
          src={IdentitySuccessIllustration.src}
          height={388}
          width={388}
          alt="success"
          unoptimized
        />
      }
    >
      <div className="h-[347px] flex flex-col gap-3xl text-xl font-medium text-darkTeal-2">
        <div>Your identity was successfully verified.</div>
        <div>
          {props.progress === 1
            ? "You can now close the application."
            : "Proceed to the next parts of the application now."}
        </div>
      </div>
    </InsuranceApplicationIllustrationDialog>
  );
}
