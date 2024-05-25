"use client";

import { useState } from "react";

type AWFormItemInput = "text" | "dropdown" | "multiChoice" | "phoneNumber";

interface IAWFormItem {
  id: string;
  title: string;
  inputType: AWFormItemInput;
  placeholder?: string;
}

interface IAWFormItemAnswer {
  id: string;
  value: string;
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
  ],
];

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
      <div className="font-medium">{`${props.i}) ${props.title}`}</div>
      {props.inputType === "text" ? (
        <AWTextField
          value={props.value}
          setValue={props.setValue}
          placeholder={props.placeholder}
        />
      ) : null}
    </div>
  );
}

export default function FormPage() {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<IAWFormItemAnswer[]>([]);
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
