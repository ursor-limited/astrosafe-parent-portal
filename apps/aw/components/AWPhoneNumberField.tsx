import { IAWMultiChoiceFieldOption } from "@/app/insurance-application/[flow]/components/form-dialog";
import _, { values } from "lodash";
import { useEffect, useState } from "react";
import AWDropdown from "./AWDropdown";

const MIN_LENGTH = 6;

// function AWPhoneNumberFieldCountryCodeDropdown(props: {}) {
//   const [textFieldValue, setTextFieldValue] = useState<string>("");
//   useEffect(
//     () =>
//       setTextFieldValue(
//         props.options?.find((o) => o.id === props.value)?.text ?? ""
//       ),
//     [props.value, props.options]
//   );
//   const [filteredOptions, setFilteredOptions] = useState<
//     IAWMultiChoiceFieldOption[]
//   >([]);
//   useEffect(() => {
//     props.options &&
//       setFilteredOptions(
//         textFieldValue
//           ? props.options?.filter((o) =>
//               o.text.toLowerCase().includes(textFieldValue.toLowerCase())
//             )
//           : props.options
//       );
//   }, [textFieldValue, props.options]);
// }

export default function AWPhoneNumberField(props: {
  value?: { countryCode: string; countryNumber: string; number: string };
  setValue: (newValue: string) => void;
  setErroneous?: (e: boolean) => void;
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

  const isErroneous = () => props.value?.number.length ?? 0 < MIN_LENGTH;

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
    <div className="gap-lg">
      <div className="w-[200px]">
        <AWDropdown
          value={props.answers?.find((a) => a.inputId === props.id)?.value}
          setValue={(v) => props.setValue(props.id, v)}
          options={props.options}
          placeholder={props.placeholder}
          highlightEmpty={props.highlightEmpty && !props.optional && !value}
        />
      </div>
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
          placeholder="Enter your number"
          value={props.value?.number}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.setValue(event.target.value.replace(/\D/g, ""));
          }}
          style={{
            outline: "none",
          }}
          onBlur={() => props.value && validate()}
        />
        {erroneousValue ? (
          <div className="absolute bottom-[-25px] left-0 text-fields-error">
            {`The number should be at least ${MIN_LENGTH} digits long.`}
          </div>
        ) : null}
      </div>
    </div>
  );
}
