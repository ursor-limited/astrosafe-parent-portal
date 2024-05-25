"use client";

import { useEffect, useState } from "react";

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

const ITEMS: IAWFormItem[][] = [
  [
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
            className={`h-[15px] w-[15px] flex items-center justify-center rounded-full border-fields-checkbox-${
              props.value === o.id ? "selected" : "default"
            } border-[1.5px] border-solid duration-300`}
          >
            <div
              className={`h-[7px] w-[7px] rounded-full bg-fields-checkbox-selected duration-300 opacity-${
                props.value === o.id ? 100 : 0
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
        value={props.value}
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
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<IAWFormItemAnswer[]>([]);
  useEffect(
    () =>
      setAnswers(
        ITEMS.flat().map((item) => ({
          id: item.id,
        }))
      ),
    []
  );
  return (
    <div className="h-screen w-screen bg-background-primary flex justify-center items-center">
      <div className="bg-greyscale-white w-[1050px] h-[706px] border-2 border-solid border-greyscale-6 flex justify-center items-center">
        <div className="w-[600px] flex flex-col gap-xl">
          {ITEMS[step].map((item, i) => (
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
      </div>
    </div>
  );
}
