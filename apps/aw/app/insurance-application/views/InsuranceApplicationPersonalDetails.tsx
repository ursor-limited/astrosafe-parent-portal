import { useEffect, useState } from "react";
import InsuranceApplicationDialog from "../components/InsuranceApplicationDialog";
import { AWFormSection } from "../InsuranceApplicationPage";
import { AWButton } from "@/components/AWButton";
import { useLocalStorage } from "usehooks-ts";
import {
  IAWFormInputAnswer,
  IAWFormSection,
} from "./InsuranceApplicationPolicyOwner";

const STEP_ID = "6655c3db9ad76128d7b9fc3a";

const SECTIONS: IAWFormSection[] = [
  {
    id: "6655be26fe62c4cb7d4efba6",
    title: "Legal name",
    inputs: [
      {
        id: "6655be2de0735e8450474863",
        prefillInputId: "6651d2bb1aaa5843d82bc607",
        inputType: "text",
        placeholder: "Insert name here",
      },
    ],
  },
  {
    id: "6655c01a3c825d234588dd21",
    title: "Date of birth",
    inputs: [
      {
        id: "6655c02aab2c63b1bea64cd8",
        inputType: "text",
        placeholder: "MM/DD/YYYY",
      },
    ],
  },
  {
    id: "6655c0b45c7eb689c350c15d",
    title: "Social security number (SSN)",
    inputs: [
      {
        id: "6655c0b839dd2e99a8b4135f",
        inputType: "text",
        placeholder: "Enter your 9 digit SSN here",
      },
    ],
  },
  {
    id: "6655c0ea700a54316acc765d",
    title: "Primary address of residence",
    inputs: [
      {
        id: "6655c0fe63a59eef74dfcd2f",
        title: "Address line 1",
        inputType: "text",
        placeholder: "Insert street address",
      },
      {
        id: "6655c1595eb7619ecf4f664c",
        title: "Address line 2",
        inputType: "text",
        placeholder: "Insert apartment or suite number",
      },
      {
        id: "6655c171a4a4f8c8b3d6a26f",
        title: "City",
        inputType: "text",
        placeholder: "Insert city",
      },
      {
        id: "6655c18ff69ad61442a6fa2b",
        title: "State of province",
        inputType: "text",
        placeholder: "Insert state of province",
      },
      {
        id: "6655c1b04f9526468edc17b0",
        title: "Country",
        inputType: "dropdown",
        placeholder: "Choose your country",
        options: [],
      },
      {
        id: "6655c1eb44e7da94b593e696",
        title: "ZIP code",
        inputType: "text",
        placeholder: "Enter postal code",
      },
    ],
  },
];

export default function InsuranceApplicationPersonalDetails(props: {
  nextCallback: () => void;
}) {
  const [committedAnswers, setCommittedAnswers] = useLocalStorage<
    IAWFormInputAnswer[] | undefined
  >("committedAnswers", undefined);
  useEffect(
    () => committedAnswers && setAnswers(committedAnswers),
    [committedAnswers]
  );

  const [answers, setAnswers] = useState<IAWFormInputAnswer[]>([]);
  useEffect(
    () =>
      setAnswers(
        SECTIONS.map((section) => section.inputs)
          .flat()
          .map((input) => ({
            inputId: input!.id,
          }))
      ),
    []
  );

  const setValue = (id: string, newValue?: string) => {
    setAnswers((prev) =>
      prev.map((a) => (a.inputId === id ? { ...a, value: newValue } : a))
    );
  };

  const [canProceed, setCanProceed] = useState<boolean>(false);
  useEffect(
    () =>
      setCanProceed(
        SECTIONS.flatMap((s) => [
          ...(s.inputs || []),
          ...(s.subsections ? s.subsections.flatMap((ss) => ss.inputs) : []),
        ]).every(
          (input) =>
            input.optional ||
            answers.find((a) => a.inputId === input?.id)?.value
        )
      ),
    [answers]
  );

  const commitAnswers = () =>
    setCommittedAnswers(
      committedAnswers?.find((step) => step.inputId === STEP_ID)
        ? committedAnswers?.map((step) =>
            step.inputId === STEP_ID ? { inputId: STEP_ID, answers } : step
          )
        : [...(committedAnswers ?? []), { inputId: STEP_ID, answers }]
    );

  return (
    <InsuranceApplicationDialog
      title="COMPANY LEADER PERSONAL DETAILS"
      // leftCallback={() => setStepIndex(stepIndex - 1)}
      // rightCallback={() => setStepIndex(stepIndex + 1)}
      rightArrowFaded={!canProceed}
      stepper={{
        n: 1,
        current: 0,
      }}
    >
      <div className="w-[600px] h-full justify-center flex flex-col gap-[32px] py-[64px]">
        <div className="w-full flex flex-col gap-[46px]">
          {SECTIONS.map((section, i) => (
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
