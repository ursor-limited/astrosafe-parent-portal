import InsuranceApplicationIllustrationDialog from "../../../components/illustration-dialog";
import { CHECKPOINT_STEPS } from "../checkpoints/checkpoint-dialog";
import {
  IDENTITY_STEP_TITLES,
  awInsuranceApplicationIdentityStepViews,
} from "./main";
import CircleCheckIcon from "@/images/icons/CircleCheckIcon.svg";
import HourglassIcon from "@/images/icons/HourglassIcon.svg";
import { AWButton } from "@/components/AWButton";
import { useEffect, useState } from "react";
import {
  IAWCompanyLeader,
  LEADER_DETAILS_AGGLOMERATED_INPUT_ID,
} from "../leaders";
import { AWInsuranceApplicationMainFlowStep } from "../../controller";
import { useLocalStorage } from "usehooks-ts";
import { IAWFormInputAnswer } from "../../../components/form-dialog";
import dayjs from "dayjs";

const RESEND_WAITING_TIME = 30; // min

export type IAWIdentity = IAWCompanyLeader & {
  status: "pending" | "done";
};

export const IdentityStatusRow = (props: {
  name: string;
  resend: () => void;
  status: IAWIdentity["status"];
  showButton: boolean;
}) => {
  const [lastResendTime, setLastResendTime] = useLocalStorage<
    string | undefined
  >(`${props.name}-sentResendTime`, undefined);
  const [canResend, setCanResend] = useState<boolean>(true);
  useEffect(() => {
    lastResendTime &&
      setCanResend(
        dayjs().diff(dayjs(lastResendTime).add(30, "minutes"), "minutes") > 30
      );
  }, [lastResendTime]);
  return (
    <div className="h-[37px] flex justify-between items-center">
      <div className="text-lg font-normal text-darkTeal-5">{props.name}</div>
      <div className="flex gap-lg items-center">
        {props.showButton ? (
          <AWButton
            size="xs"
            onClick={() => {
              setLastResendTime(new Date().toISOString());
              setCanResend(false);
              setTimeout(
                () => setCanResend(true),
                RESEND_WAITING_TIME * 1000 * 60
              );
              props.resend();
            }}
            variant="secondary"
            width={91}
            disabled={!canResend}
          >
            {canResend ? "Resend" : "30 minutes"}
          </AWButton>
        ) : null}
        <div>
          {props.status === "done" ? <CircleCheckIcon /> : <HourglassIcon />}
        </div>
      </div>
    </div>
  );
};

export default function InsuranceApplicationIdentityStatus(props: {
  nextCallback: () => void;
}) {
  const [committedAnswers, setCommittedAnswers] = useLocalStorage<
    Partial<Record<AWInsuranceApplicationMainFlowStep, IAWFormInputAnswer[]>>
  >("committedAnswers", {});

  const [leaders, setLeaders] = useState<IAWIdentity[]>([]);
  useEffect(() => {
    const leaders_ = committedAnswers?.leaders?.find(
      (a) => a.inputId === LEADER_DETAILS_AGGLOMERATED_INPUT_ID
    )?.value as IAWCompanyLeader[];
    const leadersWithHardcodedStatuses = leaders_?.map((l, i) => ({
      ...l,
      status: i === 2 ? "pending" : "done",
    })) as IAWIdentity[];
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
              status={l.status as IAWIdentity["status"]}
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
