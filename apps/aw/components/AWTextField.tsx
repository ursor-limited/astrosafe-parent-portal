import { IAWFormInput } from "@/app/insurance-application/[flow]/components/form-dialog";
import _, { values } from "lodash";
import { useEffect, useState } from "react";

const getFormattedDate = (value: string) =>
  _.compact([value.slice(0, 2), value.slice(2, 4), value.slice(4)]).join("/");

export default function AWTextField(props: {
  value?: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
  maxLength?: number;
  numeric?: boolean;
  date?: boolean;
  error?: IAWFormInput["error"];
}) {
  const [erroneousValue, setErroneousValue] = useState<boolean>(false);

  useEffect(() => {
    erroneousValue && checkError();
  }, [props.value]);

  const checkError = () =>
    setErroneousValue(
      props.error?.format === "min" &&
        (props.value?.length ?? 0) < (props.error.minLength ?? 0)
    );
  return (
    <div
      className="h-[50px] w-full flex items-center px-lg bg-fields-bg rounded-xs relative"
      style={{
        border: erroneousValue ? `1px solid #F50000` : undefined,
      }}
    >
      <input
        className={`w-full text-[18px] bg-transparent placeholder-greyscale-6 ${
          erroneousValue ? "text-fields-error" : "text-fields-text-pressed"
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
        onBlur={() => props.value && props.error && checkError()}
      />
      {erroneousValue ? (
        <div className="absolute bottom-[-25px] left-0 text-fields-error">
          {props.error?.message}
        </div>
      ) : null}
    </div>
  );
}
