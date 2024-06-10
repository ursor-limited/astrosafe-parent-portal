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

export type IAWKeyholderIdentity = IAWKeyholder & {
  status: "pending" | "done";
};

const IdentityStatusRow = (props: {
  name: string;
  resend: () => void;
  status: IAWKeyholderIdentity["status"];
  showButton: boolean;
}) => (
  <div className="h-[37px] flex justify-between items-center">
    <div className="text-lg font-normal text-darkTeal-5">{props.name}</div>
    <div className="flex gap-lg items-center">
      {props.showButton ? (
        <AWButton
          size="xs"
          onClick={props.resend}
          variant="secondary"
          width={91}
        >
          Resend
        </AWButton>
      ) : null}
      <div>
        {props.status === "done" ? <CircleCheckIcon /> : <HourglassIcon />}
      </div>
    </div>
  </div>
);

export default function InsuranceApplicationIdentityStatus(props: {
  nextCallback: () => void;
}) {
  const [committedAnswers, setCommittedAnswers] = useLocalStorage<
    Partial<
      Record<AWInsuranceApplicationPersonalFlowStep, IAWFormInputAnswer[]>
    >
  >("committedAnswers", {});

  const [leaders, setLeaders] = useState<IAWKeyholderIdentity[]>([]);
  useEffect(() => {
    const keyholders_ = committedAnswers?.keyholders?.find(
      (a) => a.inputId === KEYHOLDER_DETAILS_AGGLOMERATED_INPUT_ID
    )?.value as IAWKeyholder[];
    const leadersWithHardcodedStatuses = keyholders_?.map((l, i) => ({
      ...l,
      status: i === 2 ? "pending" : "done",
    })) as IAWKeyholderIdentity[];
    setLeaders(leadersWithHardcodedStatuses || []);
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
          {leaders.map((l, i) => (
            <IdentityStatusRow
              key={i}
              name={l.name}
              status={l.status as IAWKeyholderIdentity["status"]}
              showButton={
                l.status === "pending" &&
                leaders.some((l) => l.status === "done")
              }
              resend={() => null}
            />
          ))}
        </div>
      </div>
    </InsuranceApplicationIllustrationDialog>
  );
}
