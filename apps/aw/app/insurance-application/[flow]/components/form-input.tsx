import AWTextField from "@/components/AWTextField";
import { IAWFormInput, IAWFormInputAnswer } from "./form-dialog";
import dynamic from "next/dynamic";
import AWLongTextField from "@/components/AWLongTextField";
import AWMultiChoiceField from "@/components/AWMultiChoiceField";

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
    disabled?: boolean;
  }
) {
  return (
    <div key={props.id} className="flex flex-col gap-1">
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
            value={props.answers?.find((a) => a.inputId === props.id)?.value}
            setValue={(v) => props.setValue(props.id, v)}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
          />
        ) : props.inputType === "textLong" ? (
          <AWLongTextField
            value={props.answers?.find((a) => a.inputId === props.id)?.value}
            setValue={(v) => props.setValue(props.id, v)}
            placeholder={props.placeholder}
          />
        ) : props.inputType === "multiChoice" ? (
          <AWMultiChoiceField
            value={props.answers?.find((a) => a.inputId === props.id)?.value}
            setValue={(v) => props.setValue(props.id, v)}
            options={props.options}
          />
        ) : props.inputType === "dropdown" ? (
          <AWDropdown
            value={props.answers?.find((a) => a.inputId === props.id)?.value}
            setValue={(v) => props.setValue(props.id, v)}
            options={props.options}
            placeholder={props.placeholder}
          />
        ) : null}
      </div>
    </div>
  );
}
