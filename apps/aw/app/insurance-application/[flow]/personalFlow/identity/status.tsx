import InsuranceApplicationIllustrationDialog from "../../components/illustration-dialog";
import CircleCheckIcon from "@/images/icons/CircleCheckIcon.svg";
import HourglassIcon from "@/images/icons/HourglassIcon.svg";
import { AWButton } from "@/components/AWButton";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { IAWFormInputAnswer } from "../../components/form-dialog";
import { AWInsuranceApplicationPersonalFlowStep } from "../controller";
import {
  IAWKeyholder,
  KEYHOLDER_DETAILS_AGGLOMERATED_INPUT_ID,
} from "../keyholders";
import {
  IDENTITY_STEP_TITLES,
  awInsuranceApplicationIdentityStepViews,
} from "./main";
import { CHECKPOINT_STEPS } from "../checkpoint-dialog";
import { IdentityStatusRow } from "../../mainFlow/views/identity/status";

export type IAWKeyholderIdentity = IAWKeyholder & {
  status: "pending" | "done";
};

export default function InsuranceApplicationIdentityStatus(props: {
  nextCallback: () => void;
}) {
  const [committedAnswers, setCommittedAnswers] = useLocalStorage<
    Partial<
      Record<AWInsuranceApplicationPersonalFlowStep, IAWFormInputAnswer[]>
    >
  >("committedAnswers", {});

  const [keyholders, setKeyholders] = useState<IAWKeyholderIdentity[]>([]);
  useEffect(() => {
    const keyholders_ = committedAnswers?.keyholders?.find(
      (a) => a.inputId === KEYHOLDER_DETAILS_AGGLOMERATED_INPUT_ID
    )?.value as IAWKeyholder[];
    const keyholdersWithHardcodedStatuses = keyholders_?.map((l, i) => ({
      ...l,
      status: i === 0 ? "pending" : "done",
    })) as IAWKeyholderIdentity[];
    setKeyholders(keyholdersWithHardcodedStatuses || []);
  }, [committedAnswers]);

  return (
    <InsuranceApplicationIllustrationDialog
      title={IDENTITY_STEP_TITLES.status}
      buttonCallback={props.nextCallback}
      progress={
        (CHECKPOINT_STEPS.indexOf("identity") +
          awInsuranceApplicationIdentityStepViews.indexOf("status") /
            awInsuranceApplicationIdentityStepViews.length) /
        CHECKPOINT_STEPS.length
      }
      backbuttonStep={
        CHECKPOINT_STEPS[CHECKPOINT_STEPS.indexOf("identity") - 1]
      }
    >
      <div className="h-[347px] flex flex-col gap-3xl text-xl font-medium text-darkTeal-5">
        <div>
          You can only submit the application once every individual has
          completed their verification.
        </div>
        <div>
          Resend the email prompt to the individuals below who have not yet
          completed identity verification.
        </div>
        <div className="flex flex-col gap-lg">
          {keyholders.map((l, i) => (
            <IdentityStatusRow
              key={i}
              name={l.name}
              status={l.status as IAWKeyholderIdentity["status"]}
              showButton={
                l.status === "pending" &&
                keyholders.some((l) => l.status === "done")
              }
              resend={() => null}
            />
          ))}
        </div>
      </div>
    </InsuranceApplicationIllustrationDialog>
  );
}
