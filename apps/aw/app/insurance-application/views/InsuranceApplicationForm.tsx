import { useEffect, useState } from "react";
import InsuranceApplicationDialog from "../InsuranceApplicationDialog";
import { AWFormSection, STEPS } from "../InsuranceApplicationPage";
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
}

export interface IAWMultiChoiceFieldOption {
  id: string;
  text: string;
  explanation?: string;
}

export interface IAWFormInputAnswer {
  id: IAWFormInput["id"];
  value?: string;
}

export default function InsuranceApplicationForm(props: {
  nextCallback: () => void;
}) {
  const [stepIndex, setStepIndex] = useState<number>(1);

  const [answers, setAnswers] = useState<IAWFormInputAnswer[]>([]);
  useEffect(
    () =>
      setAnswers(
        STEPS.map((s) => s.sections)
          .flat()
          .map((section) => [
            ...(section.inputs ?? []),
            ...(section.subsections?.flatMap((ss) => ss.inputs) || []),
          ])
          .flat()
          .map((input) => ({
            id: input.id,
          }))
      ),
    []
  );

  const setValue = (id: string, newValue?: string) => {
    setAnswers((prev) =>
      prev.map((a) => (a.id === id ? { ...a, value: newValue } : a))
    );
  };

  const [committedAnswers, setCommittedAnswers] = useLocalStorage<
    IAWFormInputAnswer[] | undefined
  >("committedAnswers", undefined);
  useEffect(
    () => committedAnswers && setAnswers(committedAnswers),
    [committedAnswers]
  );

  const [canProceed, setCanProceed] = useState<boolean>(false);
  useEffect(
    () =>
      setCanProceed(
        STEPS[stepIndex].sections
          .flatMap((s) => [
            ...(s.inputs || []),
            ...(s.subsections ? s.subsections.flatMap((ss) => ss.inputs) : []),
          ])
          .every(
            (input) =>
              input.optional || answers.find((a) => a.id === input?.id)?.value
          )
      ),
    [answers, stepIndex]
  );

  const commitAnswers = () => setCommittedAnswers(answers);

  return (
    <InsuranceApplicationDialog
      title={STEPS[stepIndex].title}
      leftCallback={() => setStepIndex(stepIndex - 1)}
      rightCallback={() => setStepIndex(stepIndex + 1)}
      rightArrowFaded={!canProceed}
      stepper={{
        n: STEPS.length,
        current: stepIndex,
      }}
    >
      <div className="w-[600px] h-full justify-center flex flex-col gap-[32px] py-[64px]">
        <div className="w-full flex flex-col gap-[46px]">
          {STEPS[stepIndex].sections.map((section, i) => (
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
              setStepIndex(stepIndex + 1);
            }}
          >
            Next
          </AWButton>
        </div>
      </div>
    </InsuranceApplicationDialog>
  );
}
