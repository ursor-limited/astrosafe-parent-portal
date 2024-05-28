import { useEffect, useState } from "react";
import InsuranceApplicationDialog from "./InsuranceApplicationDialog";
import {
  AWFormSection,
  AWInsuranceApplicationStep,
} from "../InsuranceApplicationPage";
import { AWButton } from "@/components/AWButton";
import { useLocalStorage } from "usehooks-ts";

export interface IAWFormSection {
  id: string;
  title: string;
  inputs?: IAWFormInput[];
  subsections?: IAWFormSectionSubsection[];
}

export interface IAWFormSectionSubsection {
  title: string;
  inputs: IAWFormInput[];
  revelationCheckboxPrompt?: string;
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
  prefillInputId?: string;
}

export interface IAWMultiChoiceFieldOption {
  id: string;
  text: string;
  explanation?: string;
}

export interface IAWFormInputAnswer {
  inputId: IAWFormInput["id"];
  value?: string;
}

export interface IAWFormStepAnswers {
  stepId: string;
  answers: IAWFormInputAnswer[];
}

export default function InsuranceApplicationFormDialog(props: {
  stepId: AWInsuranceApplicationStep;
  title: string;
  sections: IAWFormSection[];
  progress: number;
  nextCallback: () => void;
  //rightArrowFaded: boolean;
}) {
  const [answers, setAnswers] = useState<IAWFormInputAnswer[]>([]);

  const setValue = (id: string, newValue?: string) => {
    setAnswers((prev) =>
      answers.find((a) => a.inputId === id)
        ? prev.map((a) =>
            a.inputId === id ? { inputId: id, value: newValue } : a
          )
        : [...answers, { inputId: id, value: newValue }]
    );
  };

  const [committedAnswers, setCommittedAnswers] = useLocalStorage<
    IAWFormInputAnswer[]
  >(`${props.stepId}-committedAnswers`, []);
  useEffect(() => setAnswers(committedAnswers), [committedAnswers]);

  const [canProceed, setCanProceed] = useState<boolean>(false);
  useEffect(
    () =>
      setCanProceed(
        props.sections
          .flatMap((s) => [
            ...(s.inputs || []),
            ...(s.subsections ? s.subsections.flatMap((ss) => ss.inputs) : []),
          ])
          .every(
            (input) =>
              input.optional ||
              answers.find((a) => a.inputId === input?.id)?.value
          )
      ),
    [answers]
  );

  const commitAnswers = () => setCommittedAnswers(answers);

  return (
    <InsuranceApplicationDialog
      title={props.title}
      // leftCallback={() => setStepIndex(stepIndex - 1)}
      // rightCallback={() => setStepIndex(stepIndex + 1)}
      rightArrowFaded={!canProceed}
      progress={props.progress}
      // stepper={{
      //   n: STEPS.length,
      //   current: stepIndex,
      // }}
    >
      <div className="w-[600px] h-full justify-center flex flex-col gap-[32px] py-[64px]">
        <div className="w-full flex flex-col gap-[46px]">
          {props.sections.map((section, i) => (
            <AWFormSection
              key={section.id}
              {...section}
              i={i + 1}
              answers={answers}
              setValue={setValue}
            />
          ))}
        </div>
        <div className="w-full justify-center flex gap-[16px]">
          <AWButton width={182} variant="secondary" onClick={commitAnswers}>
            Save
          </AWButton>
          <AWButton
            width={182}
            disabled={!canProceed}
            onClick={() => {
              commitAnswers();
              //setStepIndex(stepIndex + 1);
              props.nextCallback();
            }}
          >
            Next
          </AWButton>
        </div>
      </div>
    </InsuranceApplicationDialog>
  );
}
