import { AWDropdown } from "@/components/AWDropdown";
import {
  AWLongTextField,
  AWMultiChoiceField,
  AWTextField,
} from "./InsuranceApplicationPage";
import {
  IAWFormInput,
  IAWFormInputAnswer,
} from "./views/InsuranceApplicationForm___";

export default function InsuranceApplicationFormInput(
  props: IAWFormInput & {
    answers?: IAWFormInputAnswer[];
    setValue: (
      id: IAWFormInput["id"],
      newValue: IAWFormInputAnswer["value"]
    ) => void;
  }
) {
  return (
    <div key={props.id} className="flex flex-col gap-1">
      {props.title ? (
        <div className="text-lg text-darkTeal-2">{props.title}</div>
      ) : null}
      {props.inputType === "text" ? (
        <AWTextField
          value={props.answers?.find((a) => a.inputId === props.id)?.value}
          setValue={(v) => props.setValue(props.id, v)}
          placeholder={props.placeholder}
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
  );
}
