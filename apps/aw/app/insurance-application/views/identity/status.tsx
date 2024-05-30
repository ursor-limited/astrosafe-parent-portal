import { useEffect, useState } from "react";
import InsuranceApplicationIllustrationDialog from "../../components/InsuranceApplicationIllustrationDialog";
import { CHECKPOINT_STEPS } from "../InsuranceApplicationCheckpoints";
import {
  IDENTITY_STEP_TITLES,
  awInsuranceApplicationIdentityStepViews,
} from "./main";
import CircleCheckIcon from "@/images/icons/CircleCheckIcon.svg";
import HourglassIcon from "@/images/icons/HourglassIcon.svg";

const IdentityStatusRow = (props: {
  name: string;
  resend: () => void;
  done: boolean;
}) => (
  <div className="h-[37px] flex justify-between items-center">
    <div className="text-lg font-normal text-darkTeal-5">{props.name}</div>
    <div>{props.done ? <CircleCheckIcon /> : <HourglassIcon />}</div>
  </div>
);

const DUMMY_NAMES = ["BUU goo", "Rob Hamilton", "Chris Boolean", "Gus Cool"];

export default function InsuranceApplicationIdentityStatus(props: {
  nextCallback: () => void;
}) {
  // const [progress, setProgress] = useState<number>(0);
  // useEffect(() => {
  //   (CHECKPOINT_STEPS.indexOf("identity") +
  //     awInsuranceApplicationIdentityStepViews.indexOf("status") /
  //       awInsuranceApplicationIdentityStepViews.length) /
  //     CHECKPOINT_STEPS.length;
  // }, []);
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
          {DUMMY_NAMES.map((name, i) => (
            <IdentityStatusRow
              key={i}
              name={name}
              done={i === 1}
              resend={() => null}
            />
          ))}
        </div>
      </div>
    </InsuranceApplicationIllustrationDialog>
  );
}
