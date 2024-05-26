"use client";

import { useCallback, useEffect, useState } from "react";
import ChevronLeftIcon from "@/images/icons/ChevronLeftIcon.svg";
import ChevronRightIcon from "@/images/icons/ChevronRightIcon.svg";
import { DM_Mono } from "next/font/google";
import { useLocalStorage } from "usehooks-ts";
import useOutsideClick from "@/components/useOutsideClick";
import { AWDropdown } from "@/components/AWDropdown";

const FADEIN_DELAY = 66;

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: "500",
});

interface IAWFormSection {
  id: string;
  title: string;
  inputs: IAWFormInput[];
}

type AWFormInput =
  | "text"
  | "textLong"
  | "dropdown"
  | "multiChoice"
  | "phoneNumber";

interface IAWFormInput {
  id: string;
  inputType: AWFormInput;
  optional?: boolean;
  title?: string;
  placeholder?: string;
  options?: IAWMultiChoiceFieldOption[];
}

export interface IAWMultiChoiceFieldOption {
  id: string;
  text: string;
}

interface IAWFormInputAnswer {
  id: IAWFormInput["id"];
  value?: string;
}

const STEPS: { title: string; sections: IAWFormSection[] }[] = [
  {
    title: "POLICY OWNER INFORMATION",
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
    title: "BUSINESS SUMMARY",
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

type AWButtonVariant = "primary" | "secondary";

export function AWButton(props: {
  width: number;
  variant?: AWButtonVariant;
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      style={{
        width: props.width,
        pointerEvents: props.disabled ? "none" : undefined,
      }}
      className={`h-[48px] flex items-center justify-center rounded-xs ${
        props.disabled ? "" : "border-[1px]"
      } border-solid border-buttons-border ${
        props.disabled
          ? "bg-buttons-disabled-bg"
          : props.variant === "secondary"
          ? "bg-buttons-secondary-bg"
          : "bg-buttons-primary-bg"
      } ${props.disabled ? "" : "cursor-pointer"} duration-200`}
      onClick={props.onClick}
    >
      <div
        className={`font-medium ${
          props.disabled
            ? "text-buttons-disabled-text"
            : props.variant === "secondary"
            ? "text-buttons-secondary-text"
            : "text-buttons-primary-text"
        } duration-200`}
      >
        {props.children}
      </div>
    </div>
  );
}

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

export default function FormPage() {
  const [stepIndex, setStepIndex] = useState<number>(1);
  const [answers, setAnswers] = useState<IAWFormInputAnswer[]>([]);
  useEffect(
    () =>
      setAnswers(
        STEPS.map((s) => s.sections)
          .flat()
          .map((section) => section.inputs)
          .flat()
          .map((input) => ({
            id: input.id,
          }))
      ),
    []
  );

  const [committedAnswers, setCommittedAnswers] = useLocalStorage<
    IAWFormInputAnswer[] | undefined
  >("committedAnswers", undefined);
  useEffect(
    () => committedAnswers && setAnswers(committedAnswers),
    [committedAnswers]
  );

  const commitAnswers = () => setCommittedAnswers(answers);

  const [canProceed, setCanProceed] = useState<boolean>(false);
  useEffect(
    () =>
      setCanProceed(
        STEPS[stepIndex].sections
          .flatMap((s) => s.inputs)
          .every((input) => answers.find((a) => a.id === input.id)?.value)
      ),
    [answers, stepIndex]
  );

  return (
    <div className="h-screen w-screen bg-background-primary flex justify-center items-center">
      <div
        className="bg-greyscale-white w-[1050px] flex flex-col border-2 border-solid border-greyscale-6 justify-center items-center"
        style={{
          boxShadow: "0 0 33px rgba(0,0,0,0.09)",
        }}
      >
        <div className="h-[48px] w-full flex items-center justify-between px-[14px]">
          <div
            className="cursor-pointer hover:opacity-60 duration-200"
            onClick={() => setStepIndex(stepIndex - 1)}
            style={{
              opacity: stepIndex === 0 ? 0 : 1,
              pointerEvents: stepIndex === 0 ? "none" : undefined,
            }}
          >
            <ChevronLeftIcon height="20px" width="20px" />
          </div>
          <div className="h-[8px] w-[600px] bg-[#E0E3E6] px-[2px] rounded-[4px] flex justify-between items-center relative">
            <div
              className="absolute left-0 top-0 h-full rounded-[4px] bg-lightTeal-2"
              style={{
                width: `${(100 * stepIndex) / (STEPS.length - 1)}%`,
                transition: "0.79s cubic-bezier(.47,-0.04,.06,1.01)",
              }}
            />
            {[...Array(STEPS.length).keys()].map((i) => (
              <div
                key={i}
                className={`h-[4px] w-[4px] rounded-full ${
                  i < stepIndex ? "bg-[#E0E3E6]" : "bg-darkTeal-0"
                } z-10`}
              />
            ))}
          </div>
          <div
            className="cursor-pointer hover:opacity-60 duration-200"
            onClick={() => setStepIndex(stepIndex + 1)}
            style={{
              opacity: canProceed ? 1 : 0.35,
              pointerEvents: !canProceed ? "none" : undefined,
            }}
          >
            <ChevronRightIcon height="20px" width="20px" />
          </div>
        </div>
        <div
          className={`h-[50px] w-full box-border bg-[#F0F1F1] px-3xl flex items-center font-medium text-darkTeal-2 text-xl border-y-2 border-y-greyscale-6 ${dmMono.className}`}
        >
          {STEPS[stepIndex].title}
        </div>
        <div className="w-[600px] h-full justify-center flex flex-col gap-[32px] py-[64px]">
          <div className="w-full flex flex-col gap-[32px]">
            {STEPS[stepIndex].sections.map((section, i) => (
              <AWFormSection
                key={section.id}
                {...section}
                i={i + 1}
                answers={answers}
                setValue={(id, newValue) => {
                  console.log(id, newValue, "0-0-0-0-0", answers);
                  setAnswers((prev) =>
                    prev.map((a) =>
                      a.id === id ? { ...a, value: newValue } : a
                    )
                  );
                }}
              />
            ))}
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
                setStepIndex(stepIndex + 1);
              }}
            >
              Next
            </AWButton>
          </div>
        </div>
      </div>
    </div>
  );
}
