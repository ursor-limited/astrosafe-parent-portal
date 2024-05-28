import { useEffect, useState } from "react";
import InsuranceApplicationDialog from "../InsuranceApplicationDialog";
import { AWFormSection } from "../InsuranceApplicationPage";
import { AWButton } from "@/components/AWButton";
import { useLocalStorage } from "usehooks-ts";

export const SECTIONS: IAWFormSection[] = [
  {
    id: "6651d2bb1aaa5843d82bc607",
    title: "Full name",
    inputs: [
      {
        id: "6652e4a2214b3b8b436dc33d",
        inputType: "text",
        placeholder: "Insert name here",
      },
    ],
  },
  {
    id: "6651d2d30bc6c109d2a97aed",
    title: "Job title",
    inputs: [
      {
        id: "6652e4c66385fa89ff2e7f0e",
        inputType: "text",
        placeholder: "Insert title of role played in organization",
      },
    ],
  },
  {
    id: "6651d2db9af2d8a25e707374",
    title: "Email",
    inputs: [
      {
        id: "6652e4e30ea140b445d02a07",
        inputType: "text",
        placeholder: "Insert email address here",
      },
    ],
  },
  {
    id: "6651d885120e45915573a535",
    title: "Will you be a Key Holder in the vault?",
    inputs: [
      {
        id: "6652e5168e3e3d860c9772e3",
        inputType: "multiChoice",
        options: [
          {
            id: "6651d8968dec75fc382930a1",
            text: "Yes",
          },
          {
            id: "6651d8c083bc0df3082153e3",
            text: "No",
          },
        ],
      },
    ],
  },
];

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

export default function InsuranceApplicationForm(props: {
  stepId: string;
  sections: IAWFormSection[];
  progress: number;
  nextCallback: () => void;
}) {
  const [answers, setAnswers] = useState<IAWFormInputAnswer[]>([]);

  const setValue = (id: string, newValue?: string) => {
    setAnswers((prev) =>
      prev.map((a) => (a.inputId === id ? { ...a, value: newValue } : a))
    );
  };

  const [committedAnswers, setCommittedAnswers] = useLocalStorage<
    IAWFormInputAnswer[]
  >(`${props.stepId}_committedAnswers`, []);
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
      title="POLICY OWNER INFORMATION"
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
