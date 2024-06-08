export default function AWTextField(props: {
  value?: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <div className="h-[50px] w-full flex items-center px-lg bg-fields-bg rounded-xs">
      <input
        className="w-full text-[18px] bg-transparent placeholder-greyscale-6 text-fields-text-pressed placeholder:text-fields-text-placeholder"
        placeholder={props.placeholder}
        value={props.value ?? ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.setValue(
            props.maxLength
              ? event.target.value.slice(0, props.maxLength)
              : event.target.value
          )
        }
        style={{
          outline: "none",
        }}
      />
    </div>
  );
}
