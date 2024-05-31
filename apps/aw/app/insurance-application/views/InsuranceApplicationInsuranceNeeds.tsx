import {
  AWMultiChoiceField,
  AWTextField,
  IAWFormSectionProps,
  STEP_TITLES,
} from "../InsuranceApplicationPage";
import InsuranceApplicationFormDialog, {
  IAWFormSection,
} from "../components/InsuranceApplicationFormDialog";
import { CHECKPOINT_STEPS } from "./InsuranceApplicationCheckpoints";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const AWDropdown = dynamic(
  () => import("@/components/AWDropdown"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

type AWCurrency = "btc" | "usd";

export const SECTIONS: IAWFormSection[] = [
  {
    id: "6659fb2c1e89e6391892a41d",
    title:
      "Approximately how many Bitcoin (or equivalent value in USD)  does the prospective insured intend store in Trident Vault and insure?",
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
        placeholder:
          "Include amount involved, specific location ,the sequence of events and any relevant parties",
        title: "If yes, please describe the circumstances in detail.",
      },
    ],
  },
];

const QUANTITY_INPUT_ID = "6659fe85f73131d69a55edd7";
const BITCOIN_QUANTITY_UNIT_SEPARATOR = "_";

const BitcoinQuantitySection = (props: IAWFormSectionProps) => {
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

const ADDRESS_SEPARATOR = "__";

const BitcoinStorageSection = (props: IAWFormSectionProps) => {
  const [addressesN, setAddressesN] = useState<number>(2);
  const [addresses, setAddresses] = useState<string[]>([]);

  useEffect(
    () => props.setValue(ADDRESSES_INPUT_ID, addresses.join(ADDRESS_SEPARATOR)),
    [addresses]
  );
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
        {props.answers?.find((a) => a.inputId === BITCOIN_LOCATION_INPUT_ID)
          ?.value === SELF_CUSTODY_OPTION_ID ? (
          <div className="flex flex-col gap-1">
            <div className="text-lg text-darkTeal-2">
              What are the Bitcoin addresses of where the Bitcoin are currently
              stored?
            </div>
            <div className="flex flex-col gap-lg">
              {[...Array(addressesN).keys()].map((i) => (
                <AWTextField
                  key={i}
                  value={addresses[i]}
                  setValue={
                    (v) => Object.assign([], addresses, { [i]: v })
                    //props.setValue(EXCHANGE_CUSTODIAN_FUNDS_INPUT_ID, v)
                  }
                  placeholder={`Address ${i + 1}`}
                />
              ))}
            </div>
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
      title={STEP_TITLES.insuranceNeeds}
      sections={SECTIONS}
      customSections={{
        "6659fb2c1e89e6391892a41d": BitcoinQuantitySection,
        "6658d3d22db39fce622f4068": BitcoinStorageSection,
      }}
      nextCallback={props.nextCallback}
      progress={
        (CHECKPOINT_STEPS.indexOf("insuranceNeeds") - 1) /
        CHECKPOINT_STEPS.length
      }
    />
  );
}
