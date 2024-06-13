import { IAWFormInput } from "@/app/insurance-application/[flow]/components/form-dialog";
import _, { values } from "lodash";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const getFormattedDate = (value: string) =>
  _.compact([value.slice(0, 2), value.slice(2, 4), value.slice(4)]).join("/");

export type AWTextFieldErrorFormat = "min" | "date";

export default function AWTextField(props: {
  //inputId?: string;
  value?: string;
  setValue: (newValue: string) => void;
  //erroneous?: boolean;
  setErroneous?: (e: boolean) => void;
  placeholder?: string;
  maxLength?: number;
  numeric?: boolean;
  date?: boolean;
  error?: IAWFormInput["error"];
  highlightEmpty?: boolean;
}) {
  const [erroneousValue, setErroneousValue] = useState<boolean>(false);

  useEffect(() => {
    if (props.value) {
      validate();
    }
  }, []);

  useEffect(() => {
    if (erroneousValue && props.value) {
      validate();
    }
  }, [props.value]);

  // const [erroneousValueInputIds, setErroneousValueInputIds] = useLocalStorage<
  //   string[]
  // >("erroneousValueInputIds", []);

  // useEffect(() => {
  //   props.inputId &&
  //     erroneousValue &&
  //     !isErroneous() &&
  //     setErroneousValueInputIds(
  //       erroneousValueInputIds.filter((id) => id !== props.inputId)
  //     );
  // }, [props.value, erroneousValue]);

  const isErroneous = () => {
    if (!props.value) return false;
    if (props.error?.format === "min") {
      return (props.value.length ?? 0) < (props.error.minLength ?? 0);
    } else if (props.error?.format === "date") {
      const month = parseInt(props.value.slice(0, 2), 10);
      const day = parseInt(props.value.slice(2, 4), 10);
      return month > 12 || day > 31 || props.value.length < 8;
    }
  };

  const validate = () => {
    if (isErroneous()) {
      setErroneousValue(true);
      props.setErroneous?.(true);
    } else {
      setErroneousValue(false);
      props.setErroneous?.(false);
    }
  };

  return (
    <div
      className="h-[50px] w-full flex items-center px-lg bg-fields-bg rounded-xs relative"
      style={{
        border:
          erroneousValue || props.highlightEmpty
            ? `1px solid #F50000`
            : undefined,
      }}
    >
      <input
        className={`w-full text-[18px] bg-transparent placeholder-greyscale-6 ${
          erroneousValue || props.highlightEmpty
            ? "text-fields-error"
            : "text-fields-text-pressed"
        } placeholder:text-fields-text-placeholder`}
        placeholder={props.placeholder}
        value={
          props.value
            ? props.date
              ? getFormattedDate(props.value)
              : props.value
            : ""
        }
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const possiblyNumericValue =
            props.numeric || props.date
              ? event.target.value.replace(/\D/g, "")
              : event.target.value;
          props.setValue(
            props.maxLength
              ? possiblyNumericValue.slice(0, props.maxLength)
              : possiblyNumericValue
          );
        }}
        style={{
          outline: "none",
        }}
        onBlur={() => props.value && props.error && validate()}
      />
      {erroneousValue ? (
        <div className="absolute bottom-[-25px] left-0 text-fields-error">
          {props.error?.message}
        </div>
      ) : null}
    </div>
  );
}
