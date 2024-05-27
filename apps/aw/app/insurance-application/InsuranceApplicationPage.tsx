"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { AWDropdown } from "@/components/AWDropdown";
import InsuranceApplicationDialog from "./InsuranceApplicationDialog";
import InsuranceApplicationForm, {
  IAWFormInput,
  IAWFormInputAnswer,
  IAWFormSection,
  IAWMultiChoiceFieldOption,
} from "./views/InsuranceApplicationForm";
import InsuranceApplicationCheckpoints from "./views/InsuranceApplicationCheckpoints";
import InsuranceApplicationTermsOfService from "./views/InsuranceApplicationTermsOfService";
import InsuranceApplicationGlossary from "./views/InsuranceApplicationGlossary";
import InsuranceApplicationWelcome from "./views/InsuranceApplicationWelcome";
import { AWCheckbox } from "@/components/AWCheckbox";

const FADEIN_DELAY = 66;

export const STEPS: { title: string; sections: IAWFormSection[] }[] = [
  {
    title: "Policy owner information",
    sections: [
      {
        id: "6651d2bb1aaa5843d82bc607",
        title: "Full name",
        inputs: [
          {
            id: "6652e4a2214b3b8b436dc33d",
            inputType: "text",
            placeholder: "Insert name here",
          },
        ],
      },
      {
        id: "6651d2d30bc6c109d2a97aed",
        title: "Job title",
        inputs: [
          {
            id: "6652e4c66385fa89ff2e7f0e",
            inputType: "text",
            placeholder: "Insert title of role played in organization",
          },
        ],
      },
      {
        id: "6651d2db9af2d8a25e707374",
        title: "Email",
        inputs: [
          {
            id: "6652e4e30ea140b445d02a07",
            inputType: "text",
            placeholder: "Insert email address here",
          },
        ],
      },
      {
        id: "6651d885120e45915573a535",
        title: "Will you be a Key Holder in the vault?",
        inputs: [
          {
            id: "6652e5168e3e3d860c9772e3",
            inputType: "multiChoice",
            options: [
              {
                id: "6651d8968dec75fc382930a1",
                text: "Yes",
              },
              {
                id: "6651d8c083bc0df3082153e3",
                text: "No",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Business summary",
    sections: [
      {
        id: "6652e2c52226b1c9658f4560",
        title: "Name of business entity",
        inputs: [
          {
            id: "6652e53e8e43c301b281f5eb",
            inputType: "text",
            placeholder: "Name with which entity was incorporated",
          },
          {
            id: "6652e5b3fe447585b209b0c9",
            title: "Additional brand, trade names or DBAs",
            inputType: "textLong",
            placeholder: "List additional business names, separated by a comma",
            optional: true,
          },
        ],
      },
      {
        id: "6652f5a9c7abf8317d06e9de",
        title: "Registration type",
        inputs: [
          {
            id: "6652f5de4ae33a26e12ca1c7",
            inputType: "dropdown",
            placeholder: "Choose a type",
            options: [
              {
                id: "6653461b775dd263297ff525",
                text: "Chicorita",
              },
              {
                id: "665346543f251225d05f9c53",
                text: "Cyndaquil",
              },
              {
                id: "6653465f1409cd6fbed1b995",
                text: "Totodile",
              },
            ],
          },
        ],
      },
      {
        id: "665346a5e76e5f4fce9dbb7e",
        title: "EIN or Tax ID Number (SSN if an individual)",
        inputs: [
          {
            id: "665346cf1ec61b1354a74f9a",
            inputType: "text",
            placeholder: "Enter number here",
          },
        ],
      },
      {
        id: "6654b9148d3dfd8a05d588ab",
        title: "Company address",
        inputs: [
          {
            id: "6654b91846789fe0ff2334af",
            title: "Street address",
            inputType: "text",
            placeholder: "Enter address here",
          },
          {
            id: "6654b957c8216094b334a21b",
            title: "City, State and Country",
            inputType: "text",
            placeholder: "Enter City, State and Country",
          },
          {
            id: "6654b97671c74041398d0836",
            title: "Zip or Postal code",
            inputType: "text",
            placeholder: "Enter Zip or Postal Code",
          },
        ],
        hiddenInputs: {
          prompt: "The business entity has an additional address",
          title: "Company's business address",
          inputs: [
            {
              id: "6654c26dc3f4e07fba23c413",
              title: "Street address",
              inputType: "text",
              placeholder: "Enter address here",
            },
            {
              id: "6654c271388067a29bb34f0a",
              title: "City, State and Country",
              inputType: "text",
              placeholder: "Enter City, State and Country",
            },
            {
              id: "6654c275eb925065849228c9",
              title: "Zip or Postal code",
              inputType: "text",
              placeholder: "Enter Zip or Postal Code",
            },
          ],
        },
      },
      {
        id: "6654c8304f6d9bc2ccd4203c",
        title: "Industry and business model",
        inputs: [
          {
            id: "6654c84127bd5103ed3efee4",
            title: "Industry sector",
            inputType: "dropdown",
            placeholder: "Choose a sector from the list",
            options: [
              {
                id: "6654c88a854aae42481a4dc7",
                text: "Family or Multi-family Office",
              },
              { id: "6654c894fa0a1762693072d9", text: "Hedge Fund or Similar" },
              { id: "6654c8abaf6e245af0890bf8", text: "Miner" },
              { id: "6654c8bd5dd55c40a86a0dfd", text: "Mining Pool" },
              { id: "6654c8c904d08cccf38ce934", text: "Custodian" },
              { id: "6654c8dccae4c5f9d16aef58", text: "Exchange" },
              {
                id: "6654c8e9d0635af167179bb1",
                text: "Bitcoin Financial Services",
              },
              {
                id: "6654c8f8ba6062bec8e4786c",
                text: "Other Bitcoin Services",
              },
              {
                id: "6654c917ad74d440c2746fa4",
                text: "RIA or Investment Advisor",
              },
              {
                id: "6654c9239d8187cbbcec2f77",
                text: "Traditional Financial Services",
              },
              {
                id: "6654c939d5ea057a13a901ed",
                text: "Other",
              },
            ],
          },
        ],
      },
    ],
  },
];

// Family or Multi-family Office, Hedge Fund or Similar, Miner, Mining Pool, Custodian, Exchange, Bitcoin Financial Services, Other Bitcoin Services, RIA or Investment Advisor, Traditional Financial Services, Other

export function AWMultiChoiceField(props: {
  value?: string;
  setValue: (newValue: string) => void;
  options?: IAWMultiChoiceFieldOption[];
}) {
  return (
    <div className="h-[40px] w-full flex items-center gap-[45px]">
      {props.options?.map((o) => (
        <div
          key={o.id}
          className="flex items-center gap-[16px] cursor-pointer hover:opacity-60 duration-200"
          onClick={() => props.setValue(o.id)}
        >
          <div
            className={`h-[15px] w-[15px] flex items-center justify-center rounded-full ${
              props.value === o.id
                ? "border-fields-checkbox-selected"
                : "border-fields-checkbox-default"
            } border-[1.5px] border-solid duration-300`}
          >
            <div
              className={`h-[7px] w-[7px] rounded-full bg-fields-checkbox-selected duration-300 ${
                props.value === o.id ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
          <div className="text-darkTeal-5 text-xl">{o.text}</div>
        </div>
      ))}
    </div>
  );
}

export function AWTextField(props: {
  value?: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="h-[50px] w-full flex items-center px-lg bg-fields-bg rounded-xs">
      <input
        className="w-full text-base/[18px] bg-transparent placeholder-greyscale-6 text-fields-text-pressed placeholder:text-fields-text-placeholder"
        placeholder={props.placeholder}
        value={props.value ?? ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.setValue(event.target.value)
        }
        style={{
          outline: "none",
        }}
      />
    </div>
  );
}

export function AWLongTextField(props: {
  value?: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="h-[100px] w-full flex items-center pl-lg bg-fields-bg rounded-xs py-[14px]">
      <textarea
        className="w-full h-full text-base/[18px] bg-transparent placeholder-greyscale-6 text-fields-text-pressed placeholder:text-fields-text-placeholder"
        placeholder={props.placeholder}
        value={props.value ?? ""}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          props.setValue(event.target.value)
        }
        style={{
          resize: "none",
          outline: "none",
        }}
      />
    </div>
  );
}

export function AWFormSection(
  props: IAWFormSection & {
    i: number;
    answers?: IAWFormInputAnswer[];
    setValue: (
      id: IAWFormInput["id"],
      newValue: IAWFormInputAnswer["value"]
    ) => void;
  }
) {
  const [checked, setChecked] = useState<boolean>(false);
  useEffect(
    () =>
      setChecked(
        !!props.hiddenInputs?.inputs?.some(
          (input) => props.answers?.find((a) => a.id === input.id)?.value
        )
      ),
    [props.answers, props.hiddenInputs]
  );
  return (
    <div
      className={`flex flex-col ${
        props.inputs[0].title ? "gap-xl" : "gap-1"
      } opacity-0 animate-fadeIn`}
      style={{ animationDelay: `${props.i * FADEIN_DELAY}ms` }}
    >
      <div className="text-lg font-medium text-darkTeal-2">{`${props.i}) ${props.title}`}</div>
      <div className="flex flex-col gap-xl">
        {props.inputs.map((input) => (
          <div key={input.id} className="flex flex-col gap-1">
            {input.title ? (
              <div className="text-lg text-darkTeal-2">{input.title}</div>
            ) : null}
            {input.inputType === "text" ? (
              <AWTextField
                value={props.answers?.find((a) => a.id === input.id)?.value}
                setValue={(v) => props.setValue(input.id, v)}
                placeholder={input.placeholder}
              />
            ) : input.inputType === "textLong" ? (
              <AWLongTextField
                value={props.answers?.find((a) => a.id === input.id)?.value}
                setValue={(v) => props.setValue(input.id, v)}
                placeholder={input.placeholder}
              />
            ) : input.inputType === "multiChoice" ? (
              <AWMultiChoiceField
                value={props.answers?.find((a) => a.id === input.id)?.value}
                setValue={(v) => props.setValue(input.id, v)}
                options={input.options}
              />
            ) : input.inputType === "dropdown" ? (
              <AWDropdown
                value={props.answers?.find((a) => a.id === input.id)?.value}
                setValue={(v) => props.setValue(input.id, v)}
                options={input.options}
                placeholder={input.placeholder}
              />
            ) : null}
          </div>
        ))}
      </div>
      {props.hiddenInputs ? (
        <div className="flex items-center gap-[12px]">
          <AWCheckbox checked={checked} callback={() => setChecked(!checked)} />
          <div className="text-lg font-medium text-darkTeal-2">
            {props.hiddenInputs.prompt}
          </div>
        </div>
      ) : null}
      {checked && props.hiddenInputs ? (
        <div
          className={`flex flex-col ${
            props.hiddenInputs.inputs[0].title ? "gap-xl" : "gap-1"
          } pt-lg`}
        >
          <div className="text-lg font-medium text-darkTeal-2">{`${props.i}b) ${props.hiddenInputs.title}`}</div>
          <div className="flex flex-col gap-xl">
            {props.hiddenInputs.inputs.map((input) => (
              <div key={input.id} className="flex flex-col gap-1">
                {input.title ? (
                  <div className="text-lg text-darkTeal-2">{input.title}</div>
                ) : null}
                {input.inputType === "text" ? (
                  <AWTextField
                    value={props.answers?.find((a) => a.id === input.id)?.value}
                    setValue={(v) => props.setValue(input.id, v)}
                    placeholder={input.placeholder}
                  />
                ) : input.inputType === "textLong" ? (
                  <AWLongTextField
                    value={props.answers?.find((a) => a.id === input.id)?.value}
                    setValue={(v) => props.setValue(input.id, v)}
                    placeholder={input.placeholder}
                  />
                ) : input.inputType === "multiChoice" ? (
                  <AWMultiChoiceField
                    value={props.answers?.find((a) => a.id === input.id)?.value}
                    setValue={(v) => props.setValue(input.id, v)}
                    options={input.options}
                  />
                ) : input.inputType === "dropdown" ? (
                  <AWDropdown
                    value={props.answers?.find((a) => a.id === input.id)?.value}
                    setValue={(v) => props.setValue(input.id, v)}
                    options={input.options}
                    placeholder={input.placeholder}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function InsuranceApplicationPage() {
  const [committedAnswers, setCommittedAnswers] = useLocalStorage<
    IAWFormInputAnswer[] | undefined
  >("committedAnswers", undefined);
  const [formStarted, setFormStarted] = useState<boolean>(false);
  useEffect(
    () => setFormStarted(!!committedAnswers?.some((a) => a.value)),
    [committedAnswers]
  );

  const [welcomeDone, setWelcomeDone] = useState<boolean>(false);
  const [glossaryDone, setGlossaryDone] = useState<boolean>(false);
  const [TOSDone, setTOSDone] = useState<boolean>(false);

  const [checkPointsDone, setCheckpointsDone] = useState<boolean>(false);

  return (
    <div className="h-screen w-screen py-[98px] flex justify-center overflow-scroll">
      {formStarted ? (
        <InsuranceApplicationForm />
      ) : !welcomeDone ? (
        <InsuranceApplicationWelcome
          nextCallback={() => setWelcomeDone(true)}
        />
      ) : !glossaryDone ? (
        <InsuranceApplicationGlossary
          nextCallback={() => setGlossaryDone(true)}
        />
      ) : !TOSDone ? (
        <InsuranceApplicationTermsOfService
          nextCallback={() => setTOSDone(true)}
        />
      ) : !checkPointsDone ? (
        <InsuranceApplicationCheckpoints
          startCallback={() => setCheckpointsDone(true)}
        />
      ) : (
        <InsuranceApplicationForm />
      )}
    </div>
  );
}
