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
} from "./InsuranceApplicationForm";
import InsuranceApplicationIntro from "./InsuranceApplicationIntro";

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
    ],
  },
];

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
  return (
    <div
      className="flex flex-col gap-1 opacity-0 animate-fadeIn"
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
    </div>
  );
}

export default function InsuranceApplicationPage() {
  const [showForm, setShowForm] = useState<boolean>(false);
  return showForm ? (
    <InsuranceApplicationForm />
  ) : (
    <InsuranceApplicationIntro startCallback={() => setShowForm(true)} />
  );
}
