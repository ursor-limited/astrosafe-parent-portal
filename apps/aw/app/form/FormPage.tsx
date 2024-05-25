"use client";

import { useState } from "react";

const BG_COLOR = "#F8F8F8";

export function AWInputField(props: {
  value: string;
  setValue: (newValue: string) => void;
}) {
  return (
    <div className="h-[50px] w-full flex items-center px-lg bg-fields-bg rounded-xs">
      <input
        className="text-base/[18px] bg-transparent placeholder-greyscale-6 text-fields-text-pressed placeholder:text-fields-text-placeholder"
        placeholder="Boo"
        value={props.value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.setValue(event.target.value)
        }
      />
    </div>
  );
}

export function AWFormItem(props: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-spacing-1">
      <div className="font-medium">{`${props.n}) ${props.title}`}</div>
      {props.children}
    </div>
  );
}

export default function FormPage() {
  const [value, setValue] = useState<string>("");
  return (
    <div className="h-screen w-screen bg-background-primary flex justify-center items-center">
      <div className="bg-greyscale-white w-[1050px] h-[706px] border-2 border-solid border-greyscale-6 flex justify-center items-center">
        <div className="w-[600px] flex flex-col gap-spacing-xl">
          <AWFormItem n={1} title="Full name">
            <AWInputField value={value} setValue={setValue} />
          </AWFormItem>
        </div>
      </div>
    </div>
  );
}
