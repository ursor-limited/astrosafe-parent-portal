export default function AWLongTextField(props: {
  value?: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
  highlightEmpty?: boolean;
}) {
  return (
    <div
      className="h-[100px] w-full flex items-center pl-lg bg-fields-bg rounded-xs py-[14px]"
      style={{
        border: props.highlightEmpty ? `1px solid #F50000` : undefined,
      }}
    >
      <textarea
        className={`w-full h-full text-[18px] leading-6 bg-transparent placeholder-greyscale-6 ${
          props.highlightEmpty
            ? "text-fields-error"
            : "text-fields-text-pressed"
        } placeholder:text-fields-text-placeholder`}
        placeholder={props.placeholder}
        value={props.value ?? ""}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          props.setValue(event.target.value)
        }
        style={{
          resize: "none",
          outline: "none",
        }}
      />
    </div>
  );
}
