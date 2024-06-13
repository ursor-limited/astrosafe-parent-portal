import AWTextField from "@/components/AWTextField";
import { IAWFormInput, IAWFormInputAnswer } from "./form-dialog";
import dynamic from "next/dynamic";
import AWLongTextField from "@/components/AWLongTextField";
import AWMultiChoiceField from "@/components/AWMultiChoiceField";
import { useEffect, useState } from "react";

const AWDropdown = dynamic(
  () => import("@/components/AWDropdown"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export default function InsuranceApplicationFormInput(
  props: IAWFormInput & {
    answers?: IAWFormInputAnswer[];
    setValue: (
      id: IAWFormInput["id"],
      newValue: IAWFormInputAnswer["value"]
    ) => void;
    setErroneous: (id: IAWFormInput["id"], e: boolean) => void;
    highlightEmpty?: boolean;
    disabled?: boolean;
    hidden?: boolean;
  }
) {
  const [value, setValue] = useState<string | undefined>();
  useEffect(
    () => setValue(props.answers?.find((a) => a.inputId === props.id)?.value),
    [props.answers]
  );
  return (
    // the id below is used to for scrolling the page up to this element you click Next and this is erroneous or empty
    <div key={props.id} id={props.id} className="flex flex-col gap-1">
      {props.title ? (
        <div className="text-lg text-darkTeal-2">{props.title}</div>
      ) : null}
      <div
        style={{
          opacity: props.disabled ? 0.4 : 1,
          pointerEvents: props.disabled ? "none" : undefined,
        }}
      >
        {props.inputType === "text" ? (
          <AWTextField
            value={value}
            setValue={(v) => props.setValue(props.id, v)}
            setErroneous={(e: boolean) => props.setErroneous?.(props.id, e)}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            numeric={props.numeric}
            date={props.date}
            error={props.error}
            highlightEmpty={props.highlightEmpty && !props.optional && !value}
          />
        ) : props.inputType === "textLong" ? (
          <AWLongTextField
            value={value}
            setValue={(v) => props.setValue(props.id, v)}
            placeholder={props.placeholder}
            highlightEmpty={props.highlightEmpty && !props.optional && !value}
          />
        ) : props.inputType === "multiChoice" ? (
          <AWMultiChoiceField
            value={props.answers?.find((a) => a.inputId === props.id)?.value}
            setValue={(v) => props.setValue(props.id, v)}
            options={props.options}
            highlightEmpty={props.highlightEmpty && !props.optional && !value}
          />
        ) : props.inputType === "dropdown" ? (
          <AWDropdown
            value={props.answers?.find((a) => a.inputId === props.id)?.value}
            setValue={(v) => props.setValue(props.id, v)}
            options={props.options}
            placeholder={props.placeholder}
            highlightEmpty={props.highlightEmpty && !props.optional && !value}
          />
        ) : null}
      </div>
    </div>
  );
}
