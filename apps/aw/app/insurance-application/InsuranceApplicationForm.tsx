import { AWFormSection, STEPS } from "./InsuranceApplicationPage";

export interface IAWFormSection {
  id: string;
  title: string;
  inputs: IAWFormInput[];
}

type AWFormInput =
  | "text"
  | "textLong"
  | "dropdown"
  | "multiChoice"
  | "phoneNumber";

export interface IAWFormInput {
  id: string;
  inputType: AWFormInput;
  optional?: boolean;
  title?: string;
  placeholder?: string;
  options?: IAWMultiChoiceFieldOption[];
}

export interface IAWMultiChoiceFieldOption {
  id: string;
  text: string;
}

export interface IAWFormInputAnswer {
  id: IAWFormInput["id"];
  value?: string;
}

export default function InsuranceApplicationForm(props: {
  stepIndex: number;
  answers: IAWFormInputAnswer[];
  setValue: (
    id: IAWFormInput["id"],
    newValue: IAWFormInputAnswer["value"]
  ) => void;
  children: React.ReactNode; // the buttons
}) {
  return (
    <div className="w-[600px] h-full justify-center flex flex-col gap-[32px] py-[64px]">
      <div className="w-full flex flex-col gap-[32px]">
        {STEPS[props.stepIndex].sections.map((section, i) => (
          <AWFormSection
            key={section.id}
            {...section}
            i={i + 1}
            answers={props.answers}
            setValue={props.setValue}
          />
        ))}
      </div>
      {props.children}
    </div>
  );
}
