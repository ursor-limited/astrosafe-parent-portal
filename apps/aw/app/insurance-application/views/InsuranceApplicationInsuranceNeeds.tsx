import { useScreen } from "usehooks-ts";
import {
  AWMultiChoiceField,
  AWTextField,
  IAWFormSectionProps,
  STEP_TITLES,
} from "../InsuranceApplicationPage";
import InsuranceApplicationFormDialog, {
  IAWFormInputAnswer,
  IAWFormSection,
} from "../components/InsuranceApplicationFormDialog";
import { CHECKPOINT_STEPS } from "./InsuranceApplicationCheckpoints";
import { useEffect, useState } from "react";

export const SECTIONS: IAWFormSection[] = [
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
  // {
  //   id: "6658d3d22db39fce622f4068",
  //   title:
  //     "Where is the Bitcoin currently being stored?",
  //   inputs: [
  //     {
  //       id: "6658d3d5c960e3861f95b4f6",
  //       inputType: "multiChoice",
  //       options: [
  //         {
  //           id: "6658d4227d0db94a1da30949",
  //           text: "Exchange/Custodian",
  //         },
  //         {
  //           id: "6658d4256204a5bcc8c0f4c6",
  //           text: "Self custody",
  //         },
  //         {
  //           id: "6658d429c1b2ec4fb1b16257",
  //           text: "Not purchased yet",
  //         },
  //       ],
  //     },
  //     {
  //       id: '6658d43a7923801fefad55a7',
  //       inputType: 'text'
  //     }

  //   ],
  // },
];

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

  console.log(props.answers);

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
