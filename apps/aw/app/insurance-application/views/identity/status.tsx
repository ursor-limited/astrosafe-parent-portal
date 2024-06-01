import InsuranceApplicationIllustrationDialog from "../../components/InsuranceApplicationIllustrationDialog";
import { CHECKPOINT_STEPS } from "../../components/InsuranceApplicationCheckpointDialog";
import {
  IDENTITY_STEP_TITLES,
  awInsuranceApplicationIdentityStepViews,
} from "./main";
import CircleCheckIcon from "@/images/icons/CircleCheckIcon.svg";
import HourglassIcon from "@/images/icons/HourglassIcon.svg";
import { AWButton } from "@/components/AWButton";
import { useState } from "react";

export interface IAWIdentity {
  name: string;
  email: string;
  status: "pending" | "done";
}

const IdentityStatusRow = (props: {
  name: string;
  resend: () => void;
  status: IAWIdentity["status"];
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

const DUMMY_PEOPLE = [
  {
    name: "Gooo Bool",
    email: "",
    status: "pending",
  },
  {
    name: "Losh Boorf",
    email: "",
    status: "done",
  },
];

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
  const [people, setPeople] = useState<IAWIdentity[]>([]);
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
          {DUMMY_PEOPLE.map((p, i) => (
            <IdentityStatusRow
              key={i}
              name={p.name}
              status={p.status as IAWIdentity["status"]}
              showButton={
                p.status === "pending" &&
                DUMMY_PEOPLE.some((p) => p.status === "done")
              }
              resend={() => null}
            />
          ))}
        </div>
      </div>
    </InsuranceApplicationIllustrationDialog>
  );
}
