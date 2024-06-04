import { useEffect, useState } from "react";
import InsuranceApplicationDialog from "../components/InsuranceApplicationDialog";
import {
  AWFormSection,
  AWInsuranceApplicationStep,
  AWLongTextField,
  AWTextField,
  IAWFormSectionProps,
  STEP_TITLES,
} from "../InsuranceApplicationPage";
import { AWButton } from "@/components/AWButton";
import { useLocalStorage } from "usehooks-ts";
import { IAWInfoLineProps } from "@/components/AWInfoLine";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import ChevronDownIcon from "@/images/icons/ChevronDownIcon.svg";
import AddPersonIcon from "@/images/icons/AddPersonIcon.svg";
import XIcon from "@/images/icons/XIcon.svg";
import _, { add } from "lodash";
import {
  IAWFormInputAnswer,
  IAWFormSection,
} from "../components/InsuranceApplicationFormDialog";
import { CHECKPOINT_STEPS } from "../components/InsuranceApplicationCheckpointDialog";
import DynamicContainer from "@/components/DynamicContainer";
import { AWCheckbox } from "@/components/AWCheckbox";

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

const LEADER_DETAILS_AGGLOMERATED_INPUT_ID = "leaders";

export const SECTIONS: IAWFormSection[] = [
  {
    id: "665f42111472a5653be043fa",
    title: "Has a Company Leader been involved in any criminal investigation?",
    inputs: [
      {
        id: "665f4242a0f8b69084d560ac",
        inputType: "multiChoice",
        options: [
          {
            id: "665f4246be7e00eede11c7f9",
            text: "Yes",
          },
          {
            id: "665f424aa7eef6bceaa33bef",
            text: "No",
          },
        ],
      },
    ],
  },
  {
    id: "665f4263e6b91b846b78afb5",
    title:
      "Has a Company Leader been convicted of a felony or crime of dishonesty (including, but not limited to: theft, forgery, embezzlement, and fraud)?",
    inputs: [
      {
        id: "665f4268bb98df27e4601ab4",
        inputType: "multiChoice",
        options: [
          {
            id: "665f426c8eb680b7e46ee61a",
            text: "Yes",
          },
          {
            id: "665f42701c708f7609ddcdf5",
            text: "No",
          },
        ],
      },
    ],
  },
  {
    id: "665f42ae5767755321871b05",
    title:
      "Has a Company Leader experienced losses greater than $10,000 related to access of private key material for Bitcoin, cryptocurrency, or other digital assets?",
    inputs: [
      {
        id: "665f42b27163413ef8c5c771",
        inputType: "multiChoice",
        options: [
          {
            id: "665f42b8520100b245e9e7ab",
            text: "Yes",
          },
          {
            id: "665f42bc40987dee1788d101",
            text: "No",
          },
        ],
      },
    ],
  },
  {
    id: "665f4301ad072875140001b8",
    title:
      "Has a Company Leader experienced any losses in personal holdings or losses related to prior employers greater than $10,000  in Bitcoin, cryptocurrency, or other digital assets?",
    inputs: [
      {
        id: "665f430586bf43b7aecea5ac",
        inputType: "multiChoice",
        options: [
          {
            id: "665f430a2cfbeb1847db7031",
            text: "Yes",
          },
          {
            id: "665f430f2fbb82eae4f7435b",
            text: "No",
          },
        ],
      },
    ],
  },
  {
    id: "665f4e4fcd81bc33290c2cd4",
    title:
      "If you answered yes to any of the questions above, please provide a detailed description below",
    noNumber: true,
    inputs: [
      {
        id: "665f4e5369bc960c37e387ee",
        inputType: "textLong",
        optional: true,
        placeholder: "Write your description here",
      },
    ],
  },
];

const LeaderRow = (props: {
  details: IAWCompanyLeader;
  title: string;
  update: (update: Partial<IAWCompanyLeader>) => void;
  delete?: () => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<"complete" | "incomplete" | "empty">(
    "empty"
  );
  useEffect(
    () =>
      props.details &&
      setStatus(
        Object.values(props.details).every((x) => !!x)
          ? "complete"
          : Object.values(props.details).some((x) => !!x)
          ? "incomplete"
          : "empty"
      ),
    [props.details]
  );
  return (
    <DynamicContainer duration={600} fullWidth>
      <div className="flex flex-col gap-5xl">
        <div
          className="flex gap-xl item-center w-full p-[8px] hover:opacity-60 duration-200 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <div className="w-full flex gap-xl">
            <div className="flex items-center">
              <PersonIcon />
            </div>
            <div className="font-medium text-xl">{props.title}</div>
            <div
              className={`h-[25px] flex px-[10px] rounded-xs ${
                status === "complete"
                  ? "bg-[#EDFDF4]"
                  : status === "incomplete"
                  ? "bg-[#FEF4EC]"
                  : "bg-[#E9EAEC]"
              } ${
                status === "complete"
                  ? "text-system-green-3"
                  : status === "incomplete"
                  ? "text-[#FFC66D]"
                  : "text-[#9c9c9c]"
              } text-sm font-medium items-center`}
            >
              {_.capitalize(status)}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-xl items-center">
              {props.delete ? (
                <div
                  onClick={props.delete}
                  className="hover:opacity-60 cursor-pointer duration-200"
                >
                  <XIcon />
                </div>
              ) : null}
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
        </div>
        {open ? (
          <div className="flex flex-col gap-5xl pb-xl">
            <div className={`flex flex-col gap-lg`}>
              <div className="text-xl font-medium text-darkTeal-2">
                Which roles apply to this individual? (select all roles that
                apply)
              </div>
              <div className={`flex flex-col gap-[12px]`}>
                <div className={`flex items-center gap-[12px]`}>
                  <AWCheckbox
                    checked={props.details.roles?.executive}
                    callback={() =>
                      props.update({
                        roles: {
                          ...props.details.roles,
                          executive: !props.details.roles?.executive,
                        },
                      })
                    }
                  />
                  <div className="text-lg text-darkTeal-2">Executive</div>
                </div>
                <div className={`flex items-center gap-[12px]`}>
                  <AWCheckbox
                    checked={props.details.roles?.assMan}
                    callback={() =>
                      props.update({
                        roles: {
                          ...props.details.roles,
                          assMan: !props.details.roles?.assMan,
                        },
                      })
                    }
                  />
                  <div className="text-lg text-darkTeal-2">
                    Digital Asset Manager
                  </div>
                </div>
                <div className={`flex items-center gap-[12px]`}>
                  <AWCheckbox
                    checked={props.details.roles?.shareholder}
                    callback={() =>
                      props.update({
                        roles: {
                          ...props.details.roles,
                          shareholder: !props.details.roles?.shareholder,
                        },
                      })
                    }
                  />
                  <div className="text-lg text-darkTeal-2">
                    Shareholder with 25% or greater ownership
                  </div>
                </div>
              </div>
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className="text-xl font-medium text-darkTeal-2">
                Legal name
              </div>
              <AWTextField
                value={props.details.name}
                setValue={(name) => props.update({ name })}
                placeholder="Enter name here"
              />
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className="text-xl font-medium text-darkTeal-2">
                Date of birth
              </div>
              <AWTextField
                value={props.details.birthday}
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
                value={props.details.email}
                setValue={(email) => props.update({ email })}
                placeholder="Enter address here"
              />
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className="text-xl font-medium text-darkTeal-2">
                Job title
              </div>
              <AWTextField
                value={props.details.job}
                setValue={(job) => props.update({ job })}
                placeholder="Enter job title in organization"
              />
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className="text-xl text-darkTeal-2">
                What are the areas of responsibility for this job title
              </div>
              <AWLongTextField
                value={props.details.areas}
                setValue={(areas) => props.update({ areas })}
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

  // useEffect(() => {
  //   setCanProceed(!!props.canProceed);
  // }, [props.canProceed]);

  const commitAnswers = () =>
    setCommittedAnswers({
      ...committedAnswers.leaders,
      leaders: answers.map((a) =>
        a.inputId === LEADER_DETAILS_AGGLOMERATED_INPUT_ID
          ? { inputId: LEADER_DETAILS_AGGLOMERATED_INPUT_ID, value: leaders }
          : a
      ),
    });

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
  useEffect(() => {
    const leaders_ = answers?.find(
      (a) => a.inputId === LEADER_DETAILS_AGGLOMERATED_INPUT_ID
    )?.value;
    if (leaders_) {
      setLeaders(leaders_);
    }
  }, [answers]);

  const [leadersFilled, setLeadersFilled] = useState<boolean>(false);
  const [canProceed, setCanProceed] = useState<boolean>(false);
  useEffect(() => {
    const leadersDone = leaders.every((l) =>
      Object.values(l).every((x) => !!x)
    );
    if (leadersDone) {
      if (!leadersFilled) {
        setLeadersFilled(true);
        //commitAnswers();
      }
      setCanProceed(
        SECTIONS.filter((s) => !s.custom)
          .flatMap((s) => [
            ...(s.inputs || []),
            ...(s.subsections ? s.subsections.flatMap((ss) => ss.inputs) : []),
          ])
          .every(
            (input) =>
              input.optional ||
              answers.find((a) => a.inputId === input?.id)?.value
          )
      );
    } else {
      setLeadersFilled(false);
    }
  }, [answers, leaders]);

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
        <div className="w-full flex flex-col gap-5xl">
          <div className="w-full flex flex-col gap-xl">
            {leaders.map((l, i) => (
              <LeaderRow
                key={i}
                details={l}
                title={getRowTitle(i)}
                update={(update) => updateLeader(i, update)}
                delete={
                  i > 2
                    ? () =>
                        setLeaders([
                          ...leaders.slice(0, i),
                          ...leaders.slice(i + 1),
                        ])
                    : undefined
                }
              />
            ))}
          </div>
          <AWButton
            onClick={addLeader}
            icon={AddPersonIcon}
            variant="secondary"
            width="100%"
            disabled={!leadersFilled}
          >
            Save and add another leader
          </AWButton>
          <div className="w-full flex justify-center">
            <div className="h-[2px] w-[400px] bg-[#ACC6C5]" />
          </div>
          <div className="w-full flex flex-col gap-[46px]">
            {SECTIONS.map((section, i) => (
              <AWFormSection
                i={i + 1}
                key={section.id}
                {...section}
                answers={answers}
                setValue={setValue}
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
