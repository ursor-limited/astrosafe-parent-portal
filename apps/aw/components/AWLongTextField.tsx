export default function AWLongTextField(props: {
  value?: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="h-[100px] w-full flex items-center pl-lg bg-fields-bg rounded-xs py-[14px]">
      <textarea
        className="w-full h-full text-base/[18px] bg-transparent placeholder-greyscale-6 text-fields-text-pressed placeholder:text-fields-text-placeholder"
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
