"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import InsuranceApplicationCheckpoints from "./views/InsuranceApplicationCheckpoints";
import InsuranceApplicationTermsOfService from "./views/InsuranceApplicationTermsOfService";
import InsuranceApplicationGlossary from "./views/InsuranceApplicationGlossary";
import InsuranceApplicationWelcome from "./views/InsuranceApplicationWelcome";
import { AWCheckbox } from "@/components/AWCheckbox";
import InsuranceApplicationFormInput from "./components/InsuranceApplicationFormInput";
import InsuranceApplicationIdentity from "./views/InsuranceApplicationIdentity";
import InsuranceApplicationResponsibilities from "./views/InsuranceApplicationResponsibilities";
import {
  IAWFormInput,
  IAWFormInputAnswer,
  IAWFormSection,
  IAWFormSectionSubsection,
  IAWMultiChoiceFieldOption,
} from "./components/InsuranceApplicationFormDialog";
import InsuranceApplicationPolicyOwner from "./views/InsuranceApplicationPolicyOwner";
import InsuranceApplicationBusinessSummary from "./views/InsuranceApplicationBusinessSummary";
import InsuranceApplicationPersonalDetails from "./views/InsuranceApplicationPersonalDetails";

export const awInsuranceApplicationSteps = [
  "welcome",
  "glossary",
  "termsOfService",
  "checkpoints",
  "policyOwner",
  "businessSummary",
  "identity",
  "responsibilities",
  "leaders",
  "personalDetails",
] as const;
export type AWInsuranceApplicationStep =
  (typeof awInsuranceApplicationSteps)[number];

export const CHECKPOINT_STEPS: AWInsuranceApplicationStep[] = [
  "policyOwner",
  "businessSummary",
  "identity",
  "leaders",
];

const FADEIN_DELAY = 66;

export function AWMultiChoiceField(props: {
  value?: string;
  setValue: (newValue: string) => void;
  options?: IAWMultiChoiceFieldOption[];
}) {
  return (
    <div
      className={`${
        props.options?.some((o) => o.explanation)
          ? "pt-lg flex-col gap-xl"
          : "h-[40px] gap-[45px]"
      } w-full flex  items-center`}
    >
      {props.options?.map((o) => (
        <div key={o.id} className="flex flex-col gap-2">
          <div
            className="flex items-center gap-[16px] cursor-pointer hover:opacity-60 duration-200"
            onClick={() => props.setValue(o.id)}
          >
            <div
              className={`h-[15px] w-[15px] flex items-center justify-center rounded-full ${
                props.value === o.id
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
            <div className="text-darkTeal-5 text-xl">{o.text}</div>
          </div>
          {o.explanation ? (
            <div className="text-darkTeal-0 text-lg">{o.explanation}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function AWTextField(props: {
  value?: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="h-[50px] w-full flex items-center px-lg bg-fields-bg rounded-xs">
      <input
        className="w-full text-base/[18px] bg-transparent placeholder-greyscale-6 text-fields-text-pressed placeholder:text-fields-text-placeholder"
        placeholder={props.placeholder}
        value={props.value ?? ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.setValue(event.target.value)
        }
        style={{
          outline: "none",
        }}
      />
    </div>
  );
}

export function AWLongTextField(props: {
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

export function AWFormSectionSubsection(
  props: IAWFormSectionSubsection & {
    i: number;
    j: number;
    answers?: IAWFormInputAnswer[];
    setValue: (
      id: IAWFormInput["id"],
      newValue: IAWFormInputAnswer["value"]
    ) => void;
  }
) {
  const [checked, setChecked] = useState<boolean>(false);
  useEffect(
    () =>
      setChecked(
        !!props.inputs?.some(
          (input) => props.answers?.find((a) => a.inputId === input.id)?.value
        )
      ),
    [props.answers, props.inputs]
  );
  return (
    <div
      className={`flex flex-col gap-xl ${
        props.revelationCheckboxPrompt ? "" : "px-[24px]"
      }`}
    >
      {props.revelationCheckboxPrompt ? (
        <div
          className={`flex items-center gap-[12px] ${checked ? "pb-lg" : ""}`}
        >
          <AWCheckbox checked={checked} callback={() => setChecked(!checked)} />
          <div className="text-lg font-medium text-darkTeal-2">
            {props.revelationCheckboxPrompt}
          </div>
        </div>
      ) : null}
      {!props.revelationCheckboxPrompt || checked ? (
        <>
          <div className="text-xl font-medium text-darkTeal-2">{`${props.i}.${props.j}) ${props.title}`}</div>
          <div className="flex flex-col gap-xl">
            {props.inputs.map((input, index) => (
              <InsuranceApplicationFormInput
                key={index}
                {...input}
                setValue={props.setValue}
                answers={props.answers}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export function AWFormSection(
  props: IAWFormSection & {
    i: number;
    answers?: IAWFormInputAnswer[];
    setValue: (
      id: IAWFormInput["id"],
      newValue: IAWFormInputAnswer["value"]
    ) => void;
  }
) {
  const [prefill, setPrefill] = useState<boolean>(false);
  return (
    <div
      className={`flex flex-col ${
        !props.inputs || props.inputs[0].title ? "gap-xl" : "gap-1"
      } opacity-0 animate-fadeIn`}
      style={{ animationDelay: `${props.i * FADEIN_DELAY}ms` }}
    >
      <div className="text-xl font-medium text-darkTeal-2">{`${props.i}) ${props.title}`}</div>
      {props.prefillInputPrompt ? (
        <div className={`flex items-center gap-[12px]`}>
          <AWCheckbox checked={prefill} callback={() => setPrefill(!prefill)} />
          <div className="text-lg font-medium text-darkTeal-2">
            {props.prefillInputPrompt}
          </div>
        </div>
      ) : null}
      {props.inputs ? (
        <div className="flex flex-col gap-xl">
          {props.inputs.map((input, index) => (
            <InsuranceApplicationFormInput
              key={index}
              {...input}
              setValue={props.setValue}
              answers={props.answers}
            />
          ))}
        </div>
      ) : null}
      {props.subsections ? (
        <div className="flex flex-col gap-3xl">
          {props.subsections.map((subsection, j) => (
            <AWFormSectionSubsection
              key={j}
              {...subsection}
              i={props.i}
              j={j + 1}
              answers={props.answers}
              setValue={props.setValue}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function InsuranceApplicationPage() {
  const [firstFormStepAnswers, setFirstFormStepAnswers] = useLocalStorage<
    IAWFormInputAnswer[] | undefined
  >("policyOwner-committedAnswers", undefined);
  const [formStarted, setFormStarted] = useState<boolean>(false);
  useEffect(
    () => setFormStarted(!!firstFormStepAnswers?.some((a) => a.value)),
    [firstFormStepAnswers]
  );

  const [welcomeDone, setWelcomeDone] = useState<boolean>(true);
  const [glossaryDone, setGlossaryDone] = useState<boolean>(true);
  const [TOSDone, setTOSDone] = useState<boolean>(true);
  const [checkPointsDone, setCheckpointsDone] = useState<boolean>(true);
  const [policyOwnerDone, setPolicyOwnerDone] = useState<boolean>(true);
  const [businessSummaryDone, setBusinessSummaryDone] = useState<boolean>(true);
  const [identityDone, setIdentityDone] = useState<boolean>(true);
  const [responsibilitiesDone, setResponsibilitiesDone] =
    useState<boolean>(true);
  const [leaderDetailsDone, setLeaderDetailsDone] = useState<boolean>(false);

  return (
    <div className="h-screen w-screen py-[98px] flex justify-center overflow-scroll">
      {!welcomeDone ? (
        <InsuranceApplicationWelcome
          nextCallback={() => setWelcomeDone(true)}
        />
      ) : !glossaryDone ? (
        <InsuranceApplicationGlossary
          nextCallback={() => setGlossaryDone(true)}
        />
      ) : !TOSDone ? (
        <InsuranceApplicationTermsOfService
          nextCallback={() => setTOSDone(true)}
        />
      ) : !checkPointsDone ? (
        <InsuranceApplicationCheckpoints
          startCallback={() => setCheckpointsDone(true)}
        />
      ) : !policyOwnerDone ? (
        <InsuranceApplicationPolicyOwner
          nextCallback={() => setPolicyOwnerDone(true)}
        />
      ) : !businessSummaryDone ? (
        <InsuranceApplicationBusinessSummary
          nextCallback={() => setBusinessSummaryDone(true)}
        />
      ) : !identityDone ? (
        <InsuranceApplicationIdentity
          nextCallback={() => setIdentityDone(true)}
        />
      ) : !responsibilitiesDone ? (
        <InsuranceApplicationResponsibilities
          nextCallback={() => setResponsibilitiesDone(true)}
        />
      ) : !leaderDetailsDone ? (
        <InsuranceApplicationPersonalDetails
          nextCallback={() => setLeaderDetailsDone(true)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
