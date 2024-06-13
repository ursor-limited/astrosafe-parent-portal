import { IAWMultiChoiceFieldOption } from "@/app/insurance-application/[flow]/components/form-dialog";

const AWMultiChoiceField = (props: {
  value?: string;
  setValue: (newValue: string) => void;
  options?: IAWMultiChoiceFieldOption[];
  highlightEmpty?: boolean;
}) => (
  <div
    className={`${
      props.options?.some((o) => o.explanation)
        ? "pt-lg flex-col gap-xl"
        : " gap-x-[45px] gap-y-lg"
    } w-full flex  items-center flex-wrap`}
  >
    {props.options?.map((o) => (
      <div key={o.id} className="flex flex-col gap-2">
        <div
          className="flex items-center gap-[16px] cursor-pointer hover:opacity-60 duration-200"
          onClick={() => props.setValue(o.id)}
        >
          <div
            className={`h-[15px] w-[15px] flex items-center justify-center rounded-full ${
              props.highlightEmpty
                ? "border-fields-error"
                : props.value === o.id
                ? "border-fields-checkbox-selected"
                : "border-fields-checkbox-default"
            } border-[1.5px] border-solid duration-300`}
          >
            <div
              className={`h-[7px] w-[7px] rounded-full bg-fields-checkbox-selected duration-300 ${
                props.value === o.id ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
          <div
            className={`${
              props.highlightEmpty ? "text-fields-error" : "text-darkTeal-5"
            } text-xl`}
          >
            {o.text}
          </div>
        </div>
        {o.explanation ? (
          <div className="text-darkTeal-0 text-lg">{o.explanation}</div>
        ) : null}
      </div>
    ))}
  </div>
);

export default AWMultiChoiceField;
