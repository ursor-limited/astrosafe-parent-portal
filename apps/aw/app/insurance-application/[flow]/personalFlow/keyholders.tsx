import { useEffect, useState } from "react";
import InsuranceApplicationDialog from "../components/dialog";
import {
  AWFormSection,
  AWInsuranceApplicationMainFlowStep,
} from "../mainFlow/controller";
import { AWButton } from "@/components/AWButton";
import { useLocalStorage } from "usehooks-ts";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import ChevronDownIcon from "@/images/icons/ChevronDownIcon.svg";
import XIcon from "@/images/icons/XIcon.svg";
import _ from "lodash";
import {
  IAWFormInput,
  IAWFormInputAnswer,
  IAWFormSection,
} from "../components/form-dialog";
import DynamicContainer from "@/components/DynamicContainer";
import AWTextField from "@/components/AWTextField";
import {
  AWInsuranceApplicationPersonalFlowStep,
  PERSONAL_FLOW_STEP_TITLES,
} from "./controller";
import { CHECKPOINT_STEPS } from "./checkpoint-dialog";
import AWMultiChoiceField from "@/components/AWMultiChoiceField";
import {
  PERSONAL_DETAILS_BIRTHDAY_INPUT_ID,
  PERSONAL_DETAILS_EMAIL_INPUT_ID,
  PERSONAL_DETAILS_NAME_INPUT_ID,
  PROFESSION_INPUT_ID,
} from "../mainFlow/views/identity/personal-details";

const BIRTHDAY_INPUT_ID = "keyholders-birthday";
const DESCRIPTION_SECTION_ID = "665f4e4fcd81bc33290c2cd4";
const DESCRIPTION_INPUT_ID = "665f4e5369bc960c37e387ee";
const INVESTIGATION_YES_OPTION_ID = "665f4246be7e00eede11c7f9";
const DISHONESTY_YES_OPTION_ID = "665f426c8eb680b7e46ee61a";
const LOSSES_YES_OPTION_ID = "665f42b8520100b245e9e7ab";
const PERSONAL_LOSSES_YES_OPTION_ID = "665f430a2cfbeb1847db7031";
const KIDNAPPING_YES_OPTION_ID = "6664b320524e335af68b98f9";
const SECURITY_YES_OPTION_ID = "6664b3514c676f49c3823795";

export interface IAWKeyholder {
  name: string;
  birthday: string;
  email: string;
  job: string;
  zips: string[];
}

export const KEYHOLDER_DETAILS_AGGLOMERATED_INPUT_ID = "keyholders";

export const SECTIONS: IAWFormSection[] = [
  {
    id: "665f42111472a5653be043fa",
    title: "Has a Key Holder been involved in any criminal investigation?",
    inputs: [
      {
        id: "665f4242a0f8b69084d560ac",
        inputType: "multiChoice",
        options: [
          {
            id: INVESTIGATION_YES_OPTION_ID,
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
      "Has a Key Holder been convicted of a felony or crime of dishonesty (including, but not limited to: theft, forgery, embezzlement, and fraud)?",
    inputs: [
      {
        id: "665f4268bb98df27e4601ab4",
        inputType: "multiChoice",
        options: [
          {
            id: DISHONESTY_YES_OPTION_ID,
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
      "Has a Key Holder experienced losses greater than $10,000 related to access of private key material for Bitcoin, cryptocurrency, or other digital assets?",
    inputs: [
      {
        id: "665f42b27163413ef8c5c771",
        inputType: "multiChoice",
        options: [
          {
            id: LOSSES_YES_OPTION_ID,
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
      "Has a Key Holder experienced any losses in personal holdings or losses related to prior employers greater than $10,000 in Bitcoin, cryptocurrency, or other digital assets?",
    inputs: [
      {
        id: "665f430586bf43b7aecea5ac",
        inputType: "multiChoice",
        options: [
          {
            id: PERSONAL_LOSSES_YES_OPTION_ID,
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
    id: "6664b312ffeda4742f2767ca",
    title:
      "Has a Key Holder ever experienced a kidnapping or threat of kidnapping of themselves or family members?",
    inputs: [
      {
        id: "6664b31bcd61e2ddee41174d",
        inputType: "multiChoice",
        options: [
          {
            id: KIDNAPPING_YES_OPTION_ID,
            text: "Yes",
          },
          {
            id: "6664b324589ab67ade71c897",
            text: "No",
          },
        ],
      },
    ],
  },

  {
    id: "6664b3470dfcf1864a7f96b1",
    title: "Does any Key Holder engage private security?",
    inputs: [
      {
        id: "6664b34c853da138d6891b6a",
        inputType: "multiChoice",
        options: [
          {
            id: SECURITY_YES_OPTION_ID,
            text: "Yes",
          },
          {
            id: "6664b355ddfd837bc112f10f",
            text: "No",
          },
        ],
      },
    ],
  },
  {
    id: DESCRIPTION_SECTION_ID,
    title:
      "If you answered yes to any of the questions above, please provide a detailed description below",
    noNumber: true,
    inputs: [
      {
        id: DESCRIPTION_INPUT_ID,
        inputType: "textLong",
        placeholder: "Write your description here",
      },
    ],
  },
];

const BULLETPOINTS = [
  "Named Insured is the named insured on the insurance policy.",
  "Key Holders are those who will hold a Signing Device and will be responsible for signing Bitcoin transaction",
];

const KeyholderRow = (props: {
  details: IAWKeyholder;
  title: string;
  zipsN: number;
  update: (update: Partial<IAWKeyholder>) => void;
  setErroneous: (id: IAWFormInput["id"], e: boolean) => void;
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
        props.details.zips.length >= props.zipsN &&
          Object.values(props.details).every((x) =>
            typeof x === "object" ? Object.values(x).some((y) => !!y) : !!x
          )
          ? "complete"
          : Object.values(props.details).some((x) =>
              typeof x === "object" ? Object.values(x).some((y) => !!y) : !!x
            )
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
                date
                maxLength={8}
                error={{
                  format: "date",
                  message: "The date should be in the format 01/31/2024",
                }}
                setErroneous={(e) => props.setErroneous(BIRTHDAY_INPUT_ID, e)}
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
                error={{
                  format: "email",
                  message: "The address should be in the format bob@xxx.com",
                }}
              />
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className="text-xl font-medium text-darkTeal-2">
                Profession
              </div>
              <AWTextField
                value={props.details.job}
                setValue={(job) => props.update({ job })}
                placeholder="Enter profession"
              />
            </div>
            <div
              className={`flex flex-col gap-xl opacity-0 animate-fadeIn text-xl`}
            >
              <div className="font-medium text-darkTeal-2">
                Signing Device(s)
              </div>
              <div className="flex flex-col gap-xl">
                <div className="flex flex-col gap-1">
                  Each Signing Device must be stored at a UNIQUE physical
                  address:
                  <div className="flex flex-col gap-1">
                    {[
                      "Residence",
                      "Workplace premises",
                      "Safe Deposit box (e.g. a bank)",
                    ].map((b, i) => (
                      <div key={i} className="flex gap-lg pl-[15px]">
                        <div className="pt-[10px]">
                          <div className="min-h-[6px] min-w-[6px] bg-darkTeal-5 rounded-full" />
                        </div>
                        <div>{b}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  If the Signing Devices is stored at a residence or workplace,
                  it must be stored in a lockable safe.
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  Provide the zip code of the chosen location(s) for your
                  Signing Device(s).
                </div>
                <div className="flex flex-col gap-4">
                  {[...Array(props.zipsN).keys()].map((i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <div>{`ZIP code for Signing Device ${i + 1}`}</div>
                      <div
                        style={{
                          opacity:
                            i === 0 || props.details.zips[i - 1] ? 1 : 0.5,
                          pointerEvents:
                            i === 0 || props.details.zips[i - 1]
                              ? undefined
                              : "none",
                        }}
                      >
                        <AWTextField
                          value={props.details.zips[i]}
                          setValue={(zip) => {
                            props.update({
                              zips: [
                                ...props.details.zips.slice(0, i),
                                zip,
                                ...props.details.zips.slice(i + 1),
                              ],
                            });
                          }}
                          placeholder="Insert ZIP code"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </DynamicContainer>
  );
};

const getEmptyKeyHolder: () => IAWKeyholder = () => ({
  name: "",
  birthday: "",
  email: "",
  job: "",
  zips: [],
});

export default function InsuranceApplicationKeyholders(props: {
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
    Partial<
      Record<AWInsuranceApplicationPersonalFlowStep, IAWFormInputAnswer[]>
    >
  >("committedAnswers", {});
  useEffect(
    () => setAnswers(committedAnswers["keyholders"] || []),
    [committedAnswers]
  );

  const commitAnswers = () =>
    setCommittedAnswers({
      ...committedAnswers,
      keyholders: answers.find(
        (a) => a.inputId === KEYHOLDER_DETAILS_AGGLOMERATED_INPUT_ID
      )
        ? answers.map((a) =>
            a.inputId === KEYHOLDER_DETAILS_AGGLOMERATED_INPUT_ID
              ? {
                  inputId: KEYHOLDER_DETAILS_AGGLOMERATED_INPUT_ID,
                  value: keyholders,
                }
              : a
          )
        : [
            ...answers,
            {
              inputId: KEYHOLDER_DETAILS_AGGLOMERATED_INPUT_ID,
              value: keyholders,
            },
          ],
    });

  const [keyholders, setKeyholders] = useState<IAWKeyholder[]>([]);
  useEffect(() => {
    if (keyholders.length === 0) {
      const prefilledKeyholder = {
        name:
          committedAnswers.identity?.find(
            (answer) => answer.inputId === PERSONAL_DETAILS_NAME_INPUT_ID
          )?.value ?? "",
        birthday:
          committedAnswers.identity?.find(
            (answer) => answer.inputId === PERSONAL_DETAILS_BIRTHDAY_INPUT_ID
          )?.value ?? "",
        email:
          committedAnswers.identity?.find(
            (answer) => answer.inputId === PERSONAL_DETAILS_EMAIL_INPUT_ID
          )?.value ?? "",
        job:
          committedAnswers.identity?.find(
            (answer) => answer.inputId === PROFESSION_INPUT_ID
          )?.value ?? "",
        zips: [],
      };
      setKeyholders([prefilledKeyholder]);
    }
  }, []);

  useEffect(() => {
    const keyholders_ = answers?.find(
      (a) => a.inputId === KEYHOLDER_DETAILS_AGGLOMERATED_INPUT_ID
    )?.value;
    if (keyholders_) {
      setKeyholders(keyholders_);
    }
  }, [answers]);

  const addKeyholder = () =>
    setKeyholders((prev) => [...prev, getEmptyKeyHolder()]);

  const getRowTitle = (i: number) => {
    const name = keyholders[i].name;
    if (i === 0) {
      return `Named Insured (${name || "You"})`;
    } else {
      return `Key Holder ${i}${name ? ` (${name})` : ""}`;
    }
  };

  const updateKeyholder = (i: number, update: Partial<IAWKeyholder>) =>
    setKeyholders([
      ...keyholders.slice(0, i),
      { ...keyholders[i], ...update },
      ...keyholders.slice(i + 1),
    ]);

  const getZipsN = (i: number) =>
    keyholders.length === 1
      ? 3
      : keyholders.length === 2
      ? i === 0
        ? 2
        : 1
      : 1;

  const [highlightEmpties, setHighlightEmpties] = useState<boolean>(false);

  const [erroneousValueInputIds, setErroneousValueInputIds] = useState<
    IAWFormInput["id"][]
  >([]);

  const setErroneous = (id: string, e: boolean) =>
    setErroneousValueInputIds(
      e
        ? _.uniq([...erroneousValueInputIds, id])
        : erroneousValueInputIds.filter((eviid) => id !== eviid)
    );

  const [canProceed, setCanProceed] = useState<boolean>(false);

  const [descriptionInputRequired, setDescriptionInputRequired] =
    useState<boolean>(false);
  useEffect(
    () =>
      setDescriptionInputRequired(
        [
          INVESTIGATION_YES_OPTION_ID,
          DISHONESTY_YES_OPTION_ID,
          LOSSES_YES_OPTION_ID,
          PERSONAL_LOSSES_YES_OPTION_ID,
          KIDNAPPING_YES_OPTION_ID,
          SECURITY_YES_OPTION_ID,
        ].some((optionId) => answers.find((a) => a.value === optionId))
      ),
    [answers]
  );

  const [emptyRequiredInputIds, setEmptyRequiredInputIds] = useState<
    IAWFormInput["id"][]
  >([]);
  useEffect(() => {
    setEmptyRequiredInputIds(
      SECTIONS.filter((s) => !s.custom)
        .flatMap((s) => [...(s.inputs || [])])
        .filter(
          (input) =>
            (input.id !== DESCRIPTION_INPUT_ID || descriptionInputRequired) &&
            !answers.find((a) => a.inputId === input?.id)?.value
        )
        .map((input) => input.id)
    );
  }, [answers, descriptionInputRequired]);

  useEffect(() => {
    if (keyholders.length === 0) return;
    const keyholdersDone = keyholders.every(
      (k, i) =>
        Object.values(k).every((x) => !!x) &&
        k.zips.every((zip) => !!zip) &&
        k.zips.length >= getZipsN(i)
    );
    if (keyholdersDone) {
      setCanProceed(
        erroneousValueInputIds.length === 0 &&
          emptyRequiredInputIds.length === 0
      );
    } else {
      setCanProceed(false);
    }
  }, [answers, keyholders, erroneousValueInputIds]);

  return (
    <InsuranceApplicationDialog
      title={PERSONAL_FLOW_STEP_TITLES.keyholders}
      progress={
        CHECKPOINT_STEPS.indexOf("keyholders") / CHECKPOINT_STEPS.length
      }
    >
      <div className="w-[600px] h-full justify-center flex flex-col gap-[32px] py-[64px]">
        <div className=" flex flex-col font-medium text-xl text-darkTeal-2 gap-[52px]">
          <div className="flex flex-col gap-[8px]">
            <div>
              You have the option of adding additional Key Holders to your
              vault, meaning they will both store a Signing Device and will
              participate in signing transactions when requested by you. This
              section must be filled out for all named Key Holders.
            </div>
            <div className="flex flex-col gap-[8px]">
              {BULLETPOINTS.map((b, i) => (
                <div key={i} className="flex gap-lg pl-[15px]">
                  <div className="pt-[10px]">
                    <div className="min-h-[6px] min-w-[6px] bg-darkTeal-5 rounded-full" />
                  </div>
                  <div>{b}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            All named Key Holders will receive an email directly from
            AnchorWatch to complete required KYC/AML identity verification.
          </div>
          <div>
            Only provide Key Holder information if that individual Key Holder
            will control the Signing Device (have the device PIN code and
            participate in transactions to send bitcoin).
          </div>
          <div className="flex flex-col gap-lg">
            <div>How many Key Holders will be in your vault?</div>
            <AWMultiChoiceField
              value={keyholders.length.toString()}
              setValue={(n_) => {
                const n = parseInt(n_);
                if (n < keyholders.length) {
                  setKeyholders(keyholders.slice(0, n));
                } else if (n - keyholders.length === 1) {
                  addKeyholder();
                } else if (n - keyholders.length === 2) {
                  addKeyholder();
                  addKeyholder();
                }
              }}
              options={[
                {
                  id: "1",
                  text: "1 (only you)",
                },
                {
                  id: "2",
                  text: "2",
                },
                {
                  id: "3",
                  text: "3",
                },
              ]}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-5xl">
          <div className="w-full flex flex-col gap-xl">
            {keyholders.map((l, i) => (
              <KeyholderRow
                key={i}
                details={l}
                zipsN={getZipsN(i)}
                title={getRowTitle(i)}
                update={(update) => updateKeyholder(i, update)}
                setErroneous={setErroneous}
                delete={
                  i > 2
                    ? () =>
                        setKeyholders([
                          ...keyholders.slice(0, i),
                          ...keyholders.slice(i + 1),
                        ])
                    : undefined
                }
              />
            ))}
          </div>
          <div className="w-full h-[45px] flex items-center justify-center">
            <div className="h-[2px] w-[400px] bg-[#ACC6C5]" />
          </div>
          <div className="font-medium text-xl text-darkTeal-2">
            Answer the following questions for the Key Holders listed above.
          </div>
          <div className="w-full flex flex-col gap-[46px]">
            {SECTIONS.filter(
              (section) =>
                section.id !== DESCRIPTION_SECTION_ID ||
                descriptionInputRequired
            ).map((section, i) => (
              <AWFormSection
                i={i + 1}
                key={section.id}
                {...section}
                answers={answers}
                setValue={setValue}
                setErroneous={setErroneous}
                highlightEmpties={highlightEmpties}
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
            onClick={() => {
              commitAnswers();
              if (canProceed) {
                props.nextCallback();
              } else {
                setHighlightEmpties(true);
                document
                  .getElementById(
                    emptyRequiredInputIds[0] || erroneousValueInputIds[0]
                  )
                  ?.parentElement?.parentElement?.scrollIntoView({
                    behavior: "smooth",
                  });
              }
            }}
          >
            Next
          </AWButton>
        </div>
      </div>
    </InsuranceApplicationDialog>
  );
}
