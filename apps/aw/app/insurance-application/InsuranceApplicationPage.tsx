"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { AWDropdown } from "@/components/AWDropdown";
import InsuranceApplicationForm, {
  IAWFormInput,
  IAWFormInputAnswer,
  IAWFormSection,
  IAWFormSectionSubsection,
  IAWMultiChoiceFieldOption,
} from "./views/InsuranceApplicationForm___";
import InsuranceApplicationCheckpoints from "./views/InsuranceApplicationCheckpoints";
import InsuranceApplicationTermsOfService from "./views/InsuranceApplicationTermsOfService";
import InsuranceApplicationGlossary from "./views/InsuranceApplicationGlossary";
import InsuranceApplicationWelcome from "./views/InsuranceApplicationWelcome";
import { AWCheckbox } from "@/components/AWCheckbox";
import InsuranceApplicationFormInput from "./InsuranceApplicationFormInput";
import InsuranceApplicationIdentity from "./views/InsuranceApplicationIdentity";
import InsuranceApplicationResponsibilities from "./views/InsuranceApplicationResponsibilities";

const FADEIN_DELAY = 66;

// Family or Multi-family Office, Hedge Fund or Similar, Miner, Mining Pool, Custodian, Exchange, Bitcoin Financial Services, Other Bitcoin Services, RIA or Investment Advisor, Traditional Financial Services, Other

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
  return (
    <div
      className={`flex flex-col ${
        !props.inputs || props.inputs[0].title ? "gap-xl" : "gap-1"
      } opacity-0 animate-fadeIn`}
      style={{ animationDelay: `${props.i * FADEIN_DELAY}ms` }}
    >
      <div className="text-xl font-medium text-darkTeal-2">{`${props.i}) ${props.title}`}</div>
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
  const [committedAnswers, setCommittedAnswers] = useLocalStorage<
    IAWFormInputAnswer[] | undefined
  >("committedAnswers", undefined);
  const [formStarted, setFormStarted] = useState<boolean>(false);
  useEffect(
    () => setFormStarted(!!committedAnswers?.some((a) => a.value)),
    [committedAnswers]
  );

  const [welcomeDone, setWelcomeDone] = useState<boolean>(true);
  const [glossaryDone, setGlossaryDone] = useState<boolean>(true);
  const [TOSDone, setTOSDone] = useState<boolean>(true);
  const [checkPointsDone, setCheckpointsDone] = useState<boolean>(true);
  const [formDone, setFormDone] = useState<boolean>(true);
  const [identityDone, setIdentityDone] = useState<boolean>(true);
  const [responsibilitiesDone, setResponsibilitiesDone] =
    useState<boolean>(false);

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
      ) : !formDone ? (
        <InsuranceApplicationForm nextCallback={() => setFormDone(true)} />
      ) : !identityDone ? (
        <InsuranceApplicationIdentity
          nextCallback={() => setIdentityDone(true)}
        />
      ) : !responsibilitiesDone ? (
        <InsuranceApplicationResponsibilities
          nextCallback={() => setResponsibilitiesDone(true)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
