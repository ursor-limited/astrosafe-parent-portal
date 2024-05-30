import InsuranceApplicationIllustrationDialog from "../../components/InsuranceApplicationIllustrationDialog";
import { CHECKPOINT_STEPS } from "../InsuranceApplicationCheckpoints";
import { IDENTITY_STEP_TITLES } from "./main";
import IdentitySuccessIllustration from "@/images/IdentitySuccessIllustration.png";
import Image from "next/image";

export default function InsuranceApplicationIdentitySuccess(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationIllustrationDialog
      title={IDENTITY_STEP_TITLES.success}
      buttonCallback={props.nextCallback}
      progress={CHECKPOINT_STEPS.indexOf("identity") / CHECKPOINT_STEPS.length}
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
        <div>Proceed to the next parts of the application now.</div>
      </div>
    </InsuranceApplicationIllustrationDialog>
  );
}
