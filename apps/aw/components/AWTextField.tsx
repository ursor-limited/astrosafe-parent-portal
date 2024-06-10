import _ from "lodash";

const getFormattedDate = (value: string) =>
  _.compact([value.slice(0, 2), value.slice(2, 4), value.slice(4)]).join("/");

export default function AWTextField(props: {
  value?: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
  maxLength?: number;
  numeric?: boolean;
  date?: boolean;
}) {
  return (
    <div className="h-[50px] w-full flex items-center px-lg bg-fields-bg rounded-xs">
      <input
        className="w-full text-[18px] bg-transparent placeholder-greyscale-6 text-fields-text-pressed placeholder:text-fields-text-placeholder"
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
      />
    </div>
  );
}
