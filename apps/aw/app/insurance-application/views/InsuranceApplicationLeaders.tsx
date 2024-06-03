import { useEffect, useState } from "react";
import InsuranceApplicationDialog from "../components/InsuranceApplicationDialog";
import {
  AWFormSection,
  AWInsuranceApplicationStep,
  AWTextField,
  IAWFormSectionProps,
  STEP_TITLES,
} from "../InsuranceApplicationPage";
import { AWButton } from "@/components/AWButton";
import { useLocalStorage } from "usehooks-ts";
import { IAWInfoLineProps } from "@/components/AWInfoLine";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import ChevronDownIcon from "@/images/icons/ChevronDownIcon.svg";
import _ from "lodash";
import {
  IAWFormInputAnswer,
  IAWFormSection,
} from "../components/InsuranceApplicationFormDialog";
import { CHECKPOINT_STEPS } from "../components/InsuranceApplicationCheckpointDialog";
import DynamicContainer from "@/components/DynamicContainer";

interface IAWCompanyLeader {
  name: string;
  birthday: string;
  email: string;
  job: string;
  areas: string;
  roles: {
    executive: boolean;
    assMan: boolean;
    shareholder: boolean;
  };
}

const LeaderRow = (
  props: IAWCompanyLeader & {
    title: string;
    update: (update: Partial<IAWCompanyLeader>) => void;
  }
) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <DynamicContainer duration={500} fullWidth>
      <div className="flex flex-col gap-5xl">
        <div
          className="flex gap-xl item-center w-full p-[8px] hover:opacity-60 duration-200 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <div className="flex items-center">
            <PersonIcon />
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="font-medium text-xl">{props.title}</div>
            <div
              style={{
                transform: `rotate(${open ? 180 : 0}deg)`,
                transition: "0.2s",
              }}
            >
              <ChevronDownIcon />
            </div>
          </div>
        </div>
        {open ? (
          <div className="flex flex-col gap-5xl pb-xl">
            <div className={`flex flex-col gap-1`}>
              <div className="text-xl font-medium text-darkTeal-2">
                Legal name
              </div>
              <AWTextField
                value={props.name}
                setValue={(name) => props.update({ name })}
                placeholder="Enter name here"
              />
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className="text-xl font-medium text-darkTeal-2">
                Date of birth
              </div>
              <AWTextField
                value={props.birthday}
                setValue={(birthday) => props.update({ birthday })}
                placeholder="MM/DD/YYYY"
              />
            </div>
            <div className={`flex flex-col gap-xl`}>
              <div className="text-xl font-medium text-darkTeal-2">
                Email address
              </div>
              <div className="text-xl text-darkTeal-2">
                This email address will be used for important communications and
                for Key Holders, access to the insured Trident Vault.
              </div>
              <AWTextField
                value={props.email}
                setValue={(email) => props.update({ email })}
                placeholder="Enter address here"
              />
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className="text-xl font-medium text-darkTeal-2">
                Job title
              </div>
              <AWTextField
                value={props.job}
                setValue={(job) => props.update({ job })}
                placeholder="Enter job title in organization"
              />
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className="text-xl text-darkTeal-2">
                What are the areas of responsibility for this job title
              </div>
              <AWTextField
                value={props.email}
                setValue={(email) => props.update({ email })}
                placeholder="Describe the primary responsibilities of this role, including any specific responsibility for the management of or decisions related to digital assets."
              />
            </div>
          </div>
        ) : null}
      </div>
    </DynamicContainer>
  );
};

export default function InsuranceApplicationLeaders(props: {
  nextCallback: () => void;
}) {
  const [answers, setAnswers] = useState<IAWFormInputAnswer[]>([]);

  const setValue = (id: string, newValue?: string) => {
    setAnswers((prev) =>
      prev.find((a) => a.inputId === id)
        ? prev.map((a) =>
            a.inputId === id ? { inputId: id, value: newValue } : a
          )
        : [...prev, { inputId: id, value: newValue }]
    );
  };

  const [committedAnswers, setCommittedAnswers] = useLocalStorage<
    Partial<Record<AWInsuranceApplicationStep, IAWFormInputAnswer[]>>
  >("committedAnswers", {});
  useEffect(
    () => setAnswers(committedAnswers["leaders"] || []),
    [committedAnswers]
  );

  // const [customSectionsDone, setCustomSectionsDone] = useState<
  //   IAWFormSection["id"][]
  // >([]);

  const [canProceed, setCanProceed] = useState<boolean>(false);
  // useEffect(() => {
  //   setCanProceed(
  //     customSectionsDone.length >=
  //       props.sections.filter((s) => s.custom).length &&
  //       props.sections
  //         .filter((s) => !s.custom)
  //         .flatMap((s) => [
  //           ...(s.inputs || []),
  //           ...(s.subsections ? s.subsections.flatMap((ss) => ss.inputs) : []),
  //         ])
  //         .every(
  //           (input) =>
  //             input.optional ||
  //             answers.find((a) => a.inputId === input?.id)?.value
  //         )
  //   );
  // }, [answers, customSectionsDone, props.sections]);

  // useEffect(() => {
  //   setCanProceed(!!props.canProceed);
  // }, [props.canProceed]);

  const commitAnswers = () =>
    setCommittedAnswers({ ...committedAnswers, leaders: answers });

  const [leaders, setLeaders] = useState<IAWCompanyLeader[]>([
    {
      name: "",
      birthday: "",
      email: "",
      job: "",
      areas: "",
      roles: {
        executive: false,
        assMan: false,
        shareholder: false,
      },
    },
    {
      name: "",
      birthday: "",
      email: "",
      job: "",
      areas: "",
      roles: {
        executive: false,
        assMan: false,
        shareholder: false,
      },
    },
    {
      name: "",
      birthday: "",
      email: "",
      job: "",
      areas: "",
      roles: {
        executive: false,
        assMan: false,
        shareholder: false,
      },
    },
  ]);

  const addLeader = () =>
    setLeaders((prev) => [
      ...prev,
      {
        name: "",
        birthday: "",
        email: "",
        job: "",
        areas: "",
      } as IAWCompanyLeader,
    ]);

  // useEffect(() => {
  //   if (leaders.length === 0) {
  //     addLeader();
  //     addLeader();
  //     addLeader();
  //   }
  // }, []);

  const getRowTitle = (i: number) => {
    const name = leaders[i].name;
    if (i < 3) {
      return `Key Holder ${i + 1}${name ? ` (${name})` : ""}`;
    } else {
      return `Leader ${i - 2}${name ? ` (${name})` : ""}`;
    }
  };

  const updateLeader = (i: number, update: Partial<IAWCompanyLeader>) =>
    setLeaders([
      ...leaders.slice(0, i),
      { ...leaders[i], ...update },
      ...leaders.slice(i + 1),
    ]);

  return (
    <InsuranceApplicationDialog
      title={STEP_TITLES.leaders}
      rightArrowFaded={!canProceed}
      progress={CHECKPOINT_STEPS.indexOf("leaders") / CHECKPOINT_STEPS.length}
    >
      <div className="w-[600px] h-full justify-center flex flex-col gap-[32px] py-[64px]">
        <div className="w-full flex flex-col gap-[46px]">
          <div className="w-full flex flex-col gap-xl">
            {leaders.map((l, i) => (
              <LeaderRow
                key={i}
                {...l}
                title={getRowTitle(i)}
                update={(update) => updateLeader(i, update)}
              />
            ))}
          </div>
        </div>
        <div className="w-full justify-center flex gap-[16px]">
          <AWButton width={182} variant="secondary" onClick={commitAnswers}>
            Save
          </AWButton>
          <AWButton
            width={182}
            disabled={!canProceed}
            onClick={() => {
              commitAnswers();
              //setStepIndex(stepIndex + 1);
              props.nextCallback();
            }}
          >
            Next
          </AWButton>
        </div>
      </div>
    </InsuranceApplicationDialog>
  );
}
