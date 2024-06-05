import {
  AWInsuranceApplicationMainFlowStep,
  AWMultiChoiceField,
  AWTextField,
  IAWFormSectionProps,
  MAIN_FLOW_STEP_TITLES,
} from "../controller";
import InsuranceApplicationFormDialog, {
  IAWFormInputAnswer,
  IAWFormSection,
} from "../../components/form-dialog";
import { CHECKPOINT_STEPS } from "../../components/checkpoint-dialog";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AWButton } from "@/components/AWButton";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import XIcon from "@/images/icons/XIcon.svg";
import { useLocalStorage } from "usehooks-ts";

const AWDropdown = dynamic(
  () => import("@/components/AWDropdown"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

type AWCurrency = "btc" | "usd";

export const SECTIONS: IAWFormSection[] = [
  {
    id: "6659fb2c1e89e6391892a41d",
    title:
      "Approximately how many Bitcoin (or equivalent value in USD) does the prospective insured intend store in Trident Vault and insure?",
    custom: true,
  },
  {
    id: "6658d17dae46a105af0be6b1",
    title:
      "Is the Bitcoin to be insured the property of the prospective insured?",
    inputs: [
      {
        id: "6658d2b8b876632b2e886cc6",
        inputType: "multiChoice",
        options: [
          {
            id: "6658d2f319539091e72b48a9",
            text: "Yes",
          },
          {
            id: "6658d2fe7e1330344086c121",
            text: "No",
          },
        ],
      },
      {
        id: "6658d31fad53b64069c83b24",
        inputType: "text",
        optional: true,
        title: "If no, who is the title holder of the Bitcoin?",
        placeholder: "Legal name",
      },
    ],
  },
  {
    id: "6658d3d22db39fce622f4068",
    title: "Where is the Bitcoin currently being stored?",
    custom: true,
  },
  {
    id: "6659f73de79aab75c510fe7c",
    title:
      "Has the prospective insured been approved for other digital currency or cryptocurrency related insurance policies?",
    inputs: [
      {
        id: "6659f756aed44c395f11380a",
        inputType: "multiChoice",
        options: [
          {
            id: "6659f779361588594ffe8805",
            text: "Yes",
          },
          {
            id: "6659f77df188c43ef5e3ca28",
            text: "No",
          },
        ],
      },
      {
        id: "6659f78de8a344a5cef42375",
        inputType: "textLong",
        optional: true,
        placeholder: "Name the policy and carrier",
        title: "If yes, please list policies",
      },
    ],
  },
  {
    id: "6659f7cc4329fe6d6ca7c203",
    title:
      "Does the prospective insured have active and current insurance policies?",
    inputs: [
      {
        id: "6659f7d10a44908ffd529b4b",
        inputType: "multiChoice",
        options: [
          {
            id: "6659f7d5cbc8f81da6ff87ad",
            text: "Yes",
          },
          {
            id: "6659f7d9776cab967a0618f6",
            text: "No",
          },
        ],
      },
      {
        id: "6659f7df20f54552fbde5ee2",
        inputType: "textLong",
        optional: true,
        placeholder:
          "Examples include D&O, E&O, Kidnap & Ransom, Business Interruption, General Liability, Crime Homeowners, Crime and others",
        title:
          "If yes, please list additional insurance policies and include the name of the insurer.",
      },
    ],
  },
  {
    id: "6659fac7f923718b3c5829cb",
    title:
      "Has the prospective insured ever had insurance coverage terminated due to failure to comply with the policy?",
    inputs: [
      {
        id: "6659facb023a86b3bf0b08ae",
        inputType: "multiChoice",
        options: [
          {
            id: "6659facf120e9c073efb1592",
            text: "Yes",
          },
          {
            id: "6659fad4a496441d7a507cf1",
            text: "No",
          },
        ],
      },
      {
        id: "6659fad759c8d6f0b1235d78",
        inputType: "textLong",
        optional: true,
        placeholder:
          "Include amount involved, specific location, the sequence of events and any relevant parties",
        title: "If yes, please describe the circumstances in detail.",
      },
    ],
  },
];

const QUANTITY_INPUT_ID = "6659fe85f73131d69a55edd7";
const BITCOIN_QUANTITY_UNIT_SEPARATOR = "_";

const BitcoinQuantitySection = (
  props: IAWFormSectionProps & { setDone: () => void }
) => {
  const [amount, setAmount] = useState<string>("");
  const [unit, setUnit] = useState<AWCurrency>("btc");
  useEffect(() => {
    const [a, u] = props.answers
      ?.find((a) => a.inputId === QUANTITY_INPUT_ID)
      ?.value?.split(BITCOIN_QUANTITY_UNIT_SEPARATOR) || ["", "btc"];
    setAmount(a);
    setUnit(u as AWCurrency);
  }, [props.answers]);
  useEffect(
    () =>
      props.setValue(
        QUANTITY_INPUT_ID,
        [amount, unit].join(BITCOIN_QUANTITY_UNIT_SEPARATOR)
      ),
    [amount, unit]
  );
  useEffect(() => {
    amount && props.setDone();
  }, [amount]);
  return (
    <div className={`flex flex-col gap-xl opacity-0 animate-fadeIn`}>
      <div className="text-xl font-medium text-darkTeal-2">{`${props.i}) Approximately how many Bitcoin (or equivalent value in USD)  does the prospective insured intend store in Trident Vault and insure?`}</div>
      <div className="flex gap-lg">
        <AWTextField
          value={amount}
          setValue={setAmount}
          placeholder="Quantity"
        />
        <div className="w-[100px]">
          <AWDropdown
            value={unit}
            setValue={(u) => setUnit(u as AWCurrency)}
            options={[
              {
                id: "btc",
                text: "BTC",
              },
              {
                id: "usd",
                text: "USD",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

const BITCOIN_LOCATION_INPUT_ID = "6658da211e93da88afa9de7b";
const EXCHANGE_CUSTODIAN_INPUT_ID = "6658dacf84e5fe3a6d37739e";
const ADDRESSES_INPUT_ID = "6658dd53d54478910600b2ac";

const EXCHANGE_CUSTODIAN_OPTION_ID = "6658d9c760b6313b6af2becf";
const SELF_CUSTODY_OPTION_ID = "6658d9e125c05ba09615c27e";
const NOT_PURCHASED_OPTION_ID = "6658d9f4d74b500ca7fcadbd";

// const ADDRESS_SEPARATOR = "__";

const BitcoinStorageSection = (
  props: IAWFormSectionProps & { setDone: () => void }
) => {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [modified, setModified] = useState<boolean>(false);

  useEffect(() => {
    if (addresses.length === 0 || !modified) {
      const addresses_ = props.answers?.find(
        (a) => a.inputId === ADDRESSES_INPUT_ID
      )?.value;
      if (addresses_) {
        setAddresses(addresses_);
        setModified(true);
      } else if (addresses.length === 0) {
        addRow();
      }
    }
  }, [props.answers]);

  useEffect(() => {
    modified && addresses && props.setValue(ADDRESSES_INPUT_ID, addresses);
  }, [addresses]);

  const addRow = () => setAddresses((prev) => [...prev, ""]);

  useEffect(() => {
    addresses.some((a) => !!a) && props.setDone();
  }, [addresses]);

  // const [committedAnswers, setCommittedAnswers] = useLocalStorage<
  //   Partial<Record<AWInsuranceApplicationStep, IAWFormInputAnswer[]>>
  // >("committedAnswers", {});

  // const [canProceed, setCanProceed] = useState<boolean>(false);
  // useEffect(() => {
  //   const sectionAnswers = committedAnswers["insuranceNeeds"];
  //   sectionAnswers &&
  //     setCanProceed(
  //       SECTIONS.filter((s) => !s.custom)
  //         .flatMap((s) => s.inputs)
  //         .every(
  //           (input) =>
  //             input?.optional ||
  //             sectionAnswers.find((a) => a.inputId === input?.id)?.value
  //         )
  //     );
  // }, [committedAnswers]);

  return (
    <div
      className={`flex flex-col gap-xl opacity-0 animate-fadeIn`}
      //style={{ animationDelay: `${props.i * FADEIN_DELAY}ms` }}
    >
      <div className="text-xl font-medium text-darkTeal-2">{`${props.i}) Where is the Bitcoin currently being stored?`}</div>
      <div className="flex flex-col gap-xl">
        <AWMultiChoiceField
          value={
            props.answers?.find((a) => a.inputId === BITCOIN_LOCATION_INPUT_ID)
              ?.value
          }
          setValue={(v) => props.setValue(BITCOIN_LOCATION_INPUT_ID, v)}
          options={[
            {
              id: EXCHANGE_CUSTODIAN_OPTION_ID,
              text: "Exchange/Custodian",
            },
            {
              id: SELF_CUSTODY_OPTION_ID,
              text: "Self custody",
            },
            {
              id: NOT_PURCHASED_OPTION_ID,
              text: "Not purchased yet",
            },
          ]}
        />
        {props.answers?.find((a) => a.inputId === BITCOIN_LOCATION_INPUT_ID)
          ?.value === EXCHANGE_CUSTODIAN_OPTION_ID ? (
          <div className="flex flex-col gap-1">
            <div className="text-lg text-darkTeal-2">
              What exchange/custodians are funds currently being held?
            </div>
            <AWTextField
              value={
                props.answers?.find(
                  (a) => a.inputId === EXCHANGE_CUSTODIAN_INPUT_ID
                )?.value
              }
              setValue={(v) => props.setValue(EXCHANGE_CUSTODIAN_INPUT_ID, v)}
              placeholder="Name the current custodian or the institution"
            />
          </div>
        ) : null}
        {addresses &&
        addresses.length > 0 &&
        props.answers?.find((a) => a.inputId === BITCOIN_LOCATION_INPUT_ID)
          ?.value === SELF_CUSTODY_OPTION_ID ? (
          <div className="flex flex-col gap-[12px]">
            <div className="flex flex-col gap-1">
              <div className="text-lg text-darkTeal-2">
                What are the Bitcoin addresses of where the Bitcoin are
                currently stored?
              </div>
              <div className="flex flex-col gap-lg">
                {addresses.map((a, i) => (
                  <div key={i} className="flex gap-lg relative">
                    <AWTextField
                      value={a}
                      setValue={(a) =>
                        setAddresses([
                          ...addresses.slice(0, i),
                          a,
                          ...addresses.slice(i + 1),
                        ])
                      }
                      placeholder={`Address ${i + 1}`}
                    />
                    {addresses.length > 1 ? (
                      <div
                        onClick={() =>
                          setAddresses([
                            ...addresses.slice(0, i),
                            ...addresses.slice(i + 1),
                          ])
                        }
                        className="absolute right-[-30px] bottom-[17px] hover:opacity-60 cursor-pointer duration-200"
                      >
                        <XIcon />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <AWButton
              onClick={() => {
                addRow();
                setModified(true);
              }}
              width="100%"
              variant="secondary"
              icon={PlusIcon}
            >
              Add another BTC address
            </AWButton>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default function InsuranceApplicationInsuranceNeeds(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationFormDialog
      stepId="insuranceNeeds"
      title={MAIN_FLOW_STEP_TITLES.insuranceNeeds}
      sections={SECTIONS}
      customSections={{
        "6659fb2c1e89e6391892a41d": BitcoinQuantitySection,
        "6658d3d22db39fce622f4068": BitcoinStorageSection,
      }}
      nextCallback={props.nextCallback}
      progress={
        CHECKPOINT_STEPS.indexOf("insuranceNeeds") / CHECKPOINT_STEPS.length
      }
    />
  );
}
