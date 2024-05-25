"use client";

import { useEffect, useState } from "react";
import ChevronLeftIcon from "@/images/icons/ChevronLeftIcon.svg";
import ChevronRightIcon from "@/images/icons/ChevronRightIcon.svg";
import { DM_Mono } from "next/font/google";

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: "500",
});

type AWFormItemInput = "text" | "dropdown" | "multiChoice" | "phoneNumber";

interface IAWFormItem {
  id: string;
  title: string;
  inputType: AWFormItemInput;
  placeholder?: string;
  options?: IAWMultiChoiceFieldOption[];
}

interface IAWMultiChoiceFieldOption {
  id: string;
  text: string;
}

interface IAWFormItemAnswer {
  id: string;
  value?: string;
}

const STEPS: { title: string; items: IAWFormItem[] }[] = [
  {
    title: "POLICY OWNER INFORMATION",
    items: [
      {
        id: "6651d2bb1aaa5843d82bc607",
        title: "Full name",
        inputType: "text",
        placeholder: "Insert name here",
      },
      {
        id: "6651d2d30bc6c109d2a97aed",
        title: "Job title",
        inputType: "text",
        placeholder: "Insert title of role played in organization",
      },
      {
        id: "6651d2db9af2d8a25e707374",
        title: "Email",
        inputType: "text",
        placeholder: "Insert email address here",
      },
      {
        id: "6651d885120e45915573a535",
        title: "Will you be a Key Holder in the vault?",
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
      />
    </div>
  );
}

export function AWFormItem(
  props: IAWFormItem & {
    i: number;
    value?: string;
    setValue: (newValue: string) => void;
  }
) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-lg font-medium text-darkTeal-2">{`${props.i}) ${props.title}`}</div>
      {props.inputType === "text" ? (
        <AWTextField
          value={props.value}
          setValue={props.setValue}
          placeholder={props.placeholder}
        />
      ) : props.inputType === "multiChoice" ? (
        <AWMultiChoiceField
          value={props.value}
          setValue={props.setValue}
          options={props.options}
        />
      ) : null}
    </div>
  );
}

export default function FormPage() {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<IAWFormItemAnswer[]>([]);
  useEffect(
    () =>
      setAnswers(
        STEPS.map((s) => s.items)
          .flat()
          .map((item) => ({
            id: item.id,
          }))
      ),
    []
  );

  const [canProceed, setCanProceed] = useState<boolean>(false);
  useEffect(
    () =>
      setCanProceed(
        STEPS[stepIndex].items.every(
          (item) => !!answers.find((a) => a.id === item.id)?.value
        )
      ),
    [answers, stepIndex]
  );

  return (
    <div className="h-screen w-screen bg-background-primary flex justify-center items-center">
      <div
        className="bg-greyscale-white w-[1050px] h-[706px] flex flex-col border-2 border-solid border-greyscale-6 justify-center items-center"
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
          <div className="h-[8px] w-[600px] bg-[#E0E3E6] px-[2px] rounded-[4px] flex justify-between items-center">
            {[...Array(STEPS.length).keys()].map(() => (
              <div className="h-[4px] w-[4px] rounded-full bg-darkTeal-0" />
            ))}
          </div>
          <div
            className="cursor-pointer hover:opacity-60 duration-200"
            onClick={() => setStepIndex(stepIndex - 1)}
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
        <div className="w-[600px] h-full justify-center flex flex-col gap-xl">
          <div className="w-full flex flex-col gap-xl">
            {STEPS[stepIndex].items.map((item, i) => (
              <AWFormItem
                key={item.id}
                {...item}
                i={i + 1}
                value={answers.find((a) => a.id === item.id)?.value}
                setValue={(newValue) =>
                  setAnswers((prev) =>
                    prev.map((a) =>
                      a.id === item.id ? { ...a, value: newValue } : a
                    )
                  )
                }
              />
            ))}
          </div>
          <div className="w-full justify-center flex gap-[16px]">
            <AWButton width={182} variant="secondary" onClick={() => null}>
              Save
            </AWButton>
            <AWButton
              width={182}
              disabled={!canProceed}
              onClick={() => setStepIndex(stepIndex + 1)}
            >
              Next
            </AWButton>
          </div>
        </div>
      </div>
    </div>
  );
}
