import _, { values } from "lodash";
import { useEffect, useState } from "react";
import AWDropdown, { IAWDropdownOption } from "./AWDropdown";
import countryCodes from "country-codes-list";
import { IAWMultiChoiceFieldOption } from "@/app/insurance-application/[flow]/components/form-dialog";

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

export interface IAWPhoneNumber {
  countryCode: string;
  countryCallingCode: string;
  number: string;
}

export default function AWPhoneNumberField(props: {
  value?: IAWPhoneNumber;
  setValue: (newValue: IAWPhoneNumber) => void;
  setErroneous?: (e: boolean) => void;
  highlightEmpty?: boolean;
}) {
  const [erroneousValue, setErroneousValue] = useState<boolean>(false);

  const [countryCodesOptions, setCountryCodesOptions] = useState<
    IAWDropdownOption["options"]
  >([]);
  useEffect(() => {
    const countryNames = countryCodes.customList(
      //@ts-ignore
      "countryCode",
      "{countryNameEn}"
    );
    const countryCallingCodes = countryCodes.customList(
      //@ts-ignore
      "countryCode",
      "{countryCallingCode}"
    );
    setCountryCodesOptions(
      Object.keys(countryNames).map((countryCode) => ({
        id: countryCode,
        displayKey: countryCode, //@ts-ignore
        text: `+${countryCallingCodes[countryCode]}`, //@ts-ignore
        searchableStrings: [countryNames[countryCode]],
      }))
    );
  }, []);

  const [countryCode, setCountryCode] = useState<string | undefined>();
  const [number, setNumber] = useState<string>("");
  useEffect(() => {
    if (props.value) {
      setCountryCode(props.value.countryCode);
      setNumber(props.value.number);
    }
  }, [props.value?.countryCode, props.value?.number]);
  useEffect(() => {
    const countryCallingCode = countryCodesOptions?.find(
      (o) => o.id === countryCode
    )?.text;
    countryCode &&
      countryCallingCode &&
      props.setValue({
        countryCode,
        countryCallingCode,
        number,
      });
  }, [countryCode, number]);

  useEffect(() => {
    if (props.value) {
      validate();
    }
  }, []);

  useEffect(() => {
    if (erroneousValue && number) {
      validate();
    }
  }, [number]);

  const isErroneous = () => (number.length ?? 0) < MIN_LENGTH;

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
    <div className="gap-lg flex">
      <div className="w-[200px]">
        <AWDropdown
          value={countryCode}
          displayKey={countryCode}
          setValue={setCountryCode}
          options={countryCodesOptions}
          placeholder={"+0"}
          highlightEmpty={props.highlightEmpty && !countryCode}
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
          value={number}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNumber(event.target.value.replace(/\D/g, ""));
          }}
          style={{
            outline: "none",
          }}
          onBlur={() => number && validate()}
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
