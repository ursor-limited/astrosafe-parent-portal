import CheckIcon from "@/images/icons/CheckIcon.svg";

export function AWCheckbox(props: { checked: boolean; callback: () => void }) {
  return (
    <div
      className={`h-[24px] w-[24px] rounded-[4px] border-[1px] border-solid duration-200 ${
        props.checked ? "border-yellow-1" : "border-lightTeal-0"
      } flex justify-center items-center cursor-pointer hover:opacity-70`}
      onClick={props.callback}
    >
      <CheckIcon
        height="15px"
        width="15px"
        style={{ opacity: props.checked ? 1 : 0, transition: "0.2s" }}
      />
    </div>
  );
}
