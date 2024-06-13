import { useEffect, useState } from "react";
import InsuranceApplicationDialog from "./dialog";
import {
  AWFormSection,
  AWInsuranceApplicationFlow,
  AWInsuranceApplicationMainFlowStep,
  IAWFormSectionProps,
} from "../mainFlow/controller";
import { AWButton } from "@/components/AWButton";
import { useLocalStorage } from "usehooks-ts";
import { IAWInfoLineProps } from "@/components/AWInfoLine";
import _ from "lodash";
import { AWInsuranceApplicationPersonalFlowStep } from "../personalFlow/controller";

export interface IAWFormSection {
  id: string;
  title?: string;
  description?: string;
  descriptionAtEnd?: boolean;
  inputs?: IAWFormInput[];
  subsections?: IAWFormSectionSubsection[];
  custom?: boolean;
  prefillInputPrompt?: string;
  disablePrefill?: boolean;
  infos?: IAWInfoLineProps[];
  noNumber?: boolean;
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
  prefill?: {
    step: AWInsuranceApplicationMainFlowStep;
    inputId: IAWFormInput["id"];
  };
  visibilityAndOptionalityDependence?: {
    inputId: string;
    answer: string;
  };
  error?: {
    minLength?: number;
    message: string;
    format: "min" | "date";
  };
  maxLength?: number;
  numeric?: boolean;
  date?: boolean;
}

export interface IAWMultiChoiceFieldOption {
  id: string;
  text: string;
  explanation?: string;
}

export interface IAWFormInputAnswer {
  inputId: IAWFormInput["id"];
  value?: any;
}

export interface IAWFormStepAnswers {
  stepId: string;
  answers: IAWFormInputAnswer[];
}

export default function InsuranceApplicationFormDialog(props: {
  stepId:
    | AWInsuranceApplicationMainFlowStep
    | AWInsuranceApplicationPersonalFlowStep;
  title: string;
  subtitle?: string;
  sections: IAWFormSection[];
  progress: number;
  nextCallback: () => void;
  customSections?: Record<
    IAWFormSection["id"],
    React.FC<IAWFormSectionProps & { setDone: () => void }>
  >;
  canProceed?: boolean;
}) {
  const [answers, setAnswers] = useState<IAWFormInputAnswer[]>([]);

  const setValue = (id: string, newValue?: string) => {
    setAnswers((prev) =>
      prev.find((a) => a.inputId === id)
        ? prev.map((a) =>
            a.inputId === id ? { inputId: id, value: newValue } : a
          )
        : [...prev, { inputId: id, value: newValue }]
    );
  };

  const [committedAnswers, setCommittedAnswers] = useLocalStorage<
    Partial<
      Record<
        | AWInsuranceApplicationMainFlowStep
        | AWInsuranceApplicationPersonalFlowStep,
        IAWFormInputAnswer[]
      >
    >
  >("committedAnswers", {});
  useEffect(
    () => setAnswers(committedAnswers[props.stepId] || []),
    [committedAnswers, props.stepId]
  );

  const commitAnswers = () =>
    setCommittedAnswers({ ...committedAnswers, [props.stepId]: answers });

  const prefill = (section: IAWFormSection) =>
    section.inputs?.forEach((input) => {
      if (input.prefill) {
        const newValue = (
          input.prefill.step === props.stepId
            ? answers
            : committedAnswers[input.prefill.step]
        )?.find((a) => a.inputId === input.prefill!.inputId)?.value;
        if (newValue) {
          setValue(input.id, newValue);
        }
      }
    });

  useEffect(
    // prefill the prefillable fields that are not bound by a switch
    () =>
      answers &&
      props.sections.forEach((section) => {
        if (
          !section.prefillInputPrompt &&
          section.inputs?.some((input) => input.prefill)
        ) {
          prefill(section);
        }
      }),
    [answers]
  );

  const [highlightEmpties, setHighlightEmpties] = useState<boolean>(false);

  const [erroneousValueInputIds, setErroneousValueInputIds] = useState<
    IAWFormInput["id"][]
  >([]);

  const setErroneous = (id: string, e: boolean) => {
    setErroneousValueInputIds(
      e
        ? _.uniq([...erroneousValueInputIds, id])
        : erroneousValueInputIds.filter((eviid) => id !== eviid)
    );
  };

  const [dependantInputsVisible, setDependantInputsVisible] = useState<
    IAWFormInput["id"][]
  >([]);

  useEffect(() => {
    setDependantInputsVisible(
      props.sections
        .filter((s) => !s.custom)
        .flatMap((s) => [
          ...(s.inputs || []),
          ...(s.subsections ? s.subsections.flatMap((ss) => ss.inputs) : []),
        ])
        .filter((input) => {
          if (input.visibilityAndOptionalityDependence) {
            const value = answers.find(
              (a) =>
                a.inputId === input.visibilityAndOptionalityDependence?.inputId
            )?.value;
            return (
              value && value === input.visibilityAndOptionalityDependence.answer
            );
          }
        })
        .map((input) => input.id)
    );
  }, [answers]);

  const [emptyRequiredInputIds, setEmptyRequiredInputIds] = useState<
    IAWFormInput["id"][]
  >([]);
  useEffect(() => {
    setEmptyRequiredInputIds(
      props.sections
        .filter((s) => !s.custom)
        .flatMap((s) => [
          ...(s.inputs || []),
          ...(s.subsections ? s.subsections.flatMap((ss) => ss.inputs) : []),
        ])
        .filter(
          (input) =>
            !input.optional &&
            (!input.visibilityAndOptionalityDependence ||
              dependantInputsVisible.includes(input.id))
        )
        .filter((input) => !answers.find((a) => a.inputId === input?.id)?.value)
        .map((input) => input.id)
    );
  }, [props.sections, dependantInputsVisible, answers]);

  const [customSectionsDone, setCustomSectionsDone] = useState<
    IAWFormSection["id"][]
  >([]);

  console.log("lok", emptyRequiredInputIds.length);

  const [canProceed, setCanProceed] = useState<boolean>(false);
  useEffect(() => {
    setCanProceed(
      erroneousValueInputIds.length === 0 &&
        customSectionsDone.length >=
          props.sections.filter((s) => s.custom).length &&
        emptyRequiredInputIds.length === 0
    );
  }, [
    emptyRequiredInputIds,
    customSectionsDone,
    props.sections,
    erroneousValueInputIds,
    dependantInputsVisible,
  ]);
  return (
    <InsuranceApplicationDialog title={props.title} progress={props.progress}>
      <div className="w-[600px] h-full justify-center flex flex-col gap-[32px] py-[64px]">
        {props.subtitle ? (
          <div className="font-medium text-xl text-darkTeal-2 pb-xl">
            {props.subtitle}
          </div>
        ) : null}
        <div className="w-full flex flex-col gap-[46px]">
          {props.sections.map((section, i) =>
            section.custom ? (
              <div key={section.id}>
                {props.customSections?.[section.id]({
                  ...section,
                  i: i + 1,
                  answers,
                  setValue,
                  setErroneous,
                  prefill: () => prefill(section),
                  setDone: () =>
                    setCustomSectionsDone((prev) =>
                      _.uniq([...prev, section.id])
                    ),
                })}
              </div>
            ) : (
              <AWFormSection
                key={section.id}
                {...section}
                i={i + 1}
                answers={answers}
                setValue={setValue}
                setErroneous={setErroneous}
                highlightEmpties={highlightEmpties}
                prefill={() => prefill(section)}
                dependantInputsVisible={dependantInputsVisible}
              />
            )
          )}
        </div>
        <div className="w-full justify-center flex gap-[16px]">
          <AWButton width={182} variant="secondary" onClick={commitAnswers}>
            Save
          </AWButton>
          <AWButton
            width={182}
            onClick={() => {
              commitAnswers();
              if (canProceed) {
                props.nextCallback();
              } else {
                setHighlightEmpties(true);
                document
                  .getElementById(
                    emptyRequiredInputIds[0] || erroneousValueInputIds[0]
                  )
                  ?.parentElement?.parentElement?.scrollIntoView({
                    behavior: "smooth",
                  });
              }
            }}
          >
            Next
          </AWButton>
        </div>
      </div>
    </InsuranceApplicationDialog>
  );
}
