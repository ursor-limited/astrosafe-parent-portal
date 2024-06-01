import { AWCheckbox } from "@/components/AWCheckbox";
import InsuranceApplicationIllustrationDialog from "../../components/InsuranceApplicationIllustrationDialog";
import { useState } from "react";
import {
  IDENTITY_STEP_TITLES,
  awInsuranceApplicationIdentityStepViews,
} from "./main";
import { CHECKPOINT_STEPS } from "../../components/InsuranceApplicationCheckpointDialog";

export default function InsuranceApplicationResponsibilities(props: {
  nextCallback: () => void;
}) {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <InsuranceApplicationIllustrationDialog
      title={IDENTITY_STEP_TITLES.responsibilities}
      buttonCallback={props.nextCallback}
      info={{
        prompt: "Need help",
        content:
          "If you need support at any point during the application process contact agent@anchorwatch.com",
      }}
      buttonDisabled={!checked}
      progress={
        (CHECKPOINT_STEPS.indexOf("identity") +
          awInsuranceApplicationIdentityStepViews.indexOf("responsibilities") /
            awInsuranceApplicationIdentityStepViews.length) /
        CHECKPOINT_STEPS.length
      }
    >
      <div className="flex flex-col gap-3xl">
        <div className="flex flex-col gap-lg">
          <div className="font-medium text-xl text-darkTeal-2">
            Signing device custody
          </div>
          <div className="text-lg text-darkTeal-5">
            Signing Devices (hardware wallets) must be stored at a UNIQUE
            physical address at a residence, workplace premises, or safe Deposit
            box (e.g. a bank). If the Signing Devices is stored at a residence
            or workplace, it must be stored in a lockable safe.
          </div>
        </div>
        <div className="flex flex-col gap-lg">
          <div className="font-medium text-xl text-darkTeal-2">
            Signing transactions
          </div>
          <div className="text-lg text-darkTeal-5">
            Transactions require Key Holders to sign transactions, meaning they
            retrieve Signing Devices, complete ID verification and other
            compliance requirements and then approve transactions using the
            Signing Device. The customer is required to verify the accuracy of
            the send address; policies do not cover sending Bitcoin to
            unintended addresses.
          </div>
        </div>
        <div className="flex items-center gap-[12px]">
          <AWCheckbox checked={checked} callback={() => setChecked(!checked)} />
          <div className="text-lg font-normal text-darkTeal-5">
            I acknowledge my resposibilities as a Key Holder
          </div>
        </div>
      </div>
    </InsuranceApplicationIllustrationDialog>
  );
}
