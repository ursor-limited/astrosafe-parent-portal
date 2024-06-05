"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import InsuranceApplicationTermsOfService from "./views/terms-of-service";
import InsuranceApplicationGlossary from "./views/glossary";
import InsuranceApplicationWelcome from "./views/welcome";
import { AWCheckbox } from "@/components/AWCheckbox";
import InsuranceApplicationFormInput from "../components/form-input";
import InsuranceApplicationIdentity from "./views/identity/main";
import {
  IAWFormInput,
  IAWFormInputAnswer,
  IAWFormSection,
  IAWFormSectionSubsection,
  IAWMultiChoiceFieldOption,
} from "../components/form-dialog";
import InsuranceApplicationPolicyOwner from "./views/policy-owner";
import InsuranceApplicationBusinessSummary from "./views/business-summary";
import InsuranceApplicationInsuranceNeeds from "./views/insurance-needs";
import InsuranceApplicationGovernance from "./views/governance";
import InsuranceApplicationSpending from "./views/spending";
import AWInfoLine from "@/components/AWInfoLine";
import InsuranceApplicationWhitelist from "./views/whitelist";
import InsuranceApplicationUpload from "./views/upload";
import InsuranceApplicationCheckpointsStart from "./views/checkpoints/start";
import InsuranceApplicationCheckpointsSubmit from "./views/checkpoints/submit";
import InsuranceApplicationLeaders from "./views/leaders";
import _ from "lodash";
import InsuranceApplicationPayment from "./views/payment";
import TestingBar from "../TestingBar";

export type AWInsuranceApplicationFlow =
  | "main"
  | "executive"
  | "digAssMan"
  | "shareholder"
  | "keyholder"
  | "shareholderKeyHolder";

export const awInsuranceApplicationMainFlowSteps = [
  "welcome",
  "glossary",
  "termsOfService",
  "start",
  "policyOwner",
  "businessSummary",
  "leaders",
  "identity",
  "insuranceNeeds",
  "governance",
  "spending",
  "whitelist",
  "upload",
  "submit",
  "payment",
] as const;
export type AWInsuranceApplicationMainFlowStep =
  (typeof awInsuranceApplicationMainFlowSteps)[number];

export const MAIN_FLOW_STEP_TITLES: Record<
  AWInsuranceApplicationMainFlowStep,
  string
> = {
  welcome: "Welcome to your AnchorWatch Insurance Application",
  glossary: "Terms to understand",
  termsOfService: "Terms of Service",
  start: "Start Application",
  policyOwner: "Policy owner information",
  businessSummary: "Business summary",
  identity: "Identity verification",
  leaders: "Company leader details",
  insuranceNeeds: "Insurance needs & history",
  governance: "Internal governance and controls",
  spending: "Spending behavior",
  whitelist: "Whitelist addresses",
  upload: "Upload files",
  submit: "Submit Application",
  payment: "Underwriting and concierge fees payment",
};

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
    i?: number;
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

export type IAWFormSectionProps = IAWFormSection & {
  i?: number;
  answers?: IAWFormInputAnswer[];
  setValue: (
    id: IAWFormInput["id"],
    newValue: IAWFormInputAnswer["value"]
  ) => void;
  prefill?: () => void;
};

export function AWFormSection(props: IAWFormSectionProps) {
  const [checked, setChecked] = useState<boolean>(false);
  useEffect(() => {
    if (checked) {
      props.prefill?.();
    }
  }, [checked]);
  return (
    <div
      className={`flex flex-col ${
        !props.inputs || props.inputs[0].title ? "gap-xl" : "gap-lg"
      } opacity-0 animate-fadeIn`}
      style={{
        animationDelay:
          _.isNumber(props.i) && !props.noNumber
            ? `${props.i * FADEIN_DELAY}ms`
            : undefined,
      }}
    >
      <div className="text-xl font-medium text-darkTeal-2">
        {_.isNumber(props.i) && !props.noNumber
          ? `${props.i}) ${props.title}`
          : props.title}
      </div>
      {props.description && !props.descriptionAtEnd ? (
        <div className="text-lg text-darkTeal-2">{props.description}</div>
      ) : null}
      {props.infos ? (
        <div className="flex flex-col gap-lg">
          {props.infos.map((info, i) => (
            <AWInfoLine key={i} {...info} />
          ))}
        </div>
      ) : null}
      {props.prefillInputPrompt ? (
        <div className={`flex items-center gap-[12px]`}>
          <AWCheckbox checked={checked} callback={() => setChecked(!checked)} />
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
              disabled={checked && props.disablePrefill}
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
      {props.description && props.descriptionAtEnd ? (
        <div className="text-lg text-darkTeal-2">{props.description}</div>
      ) : null}
    </div>
  );
}

const STEP_COMPONENTS: Record<
  AWInsuranceApplicationMainFlowStep,
  React.FC<{ nextCallback: () => void }>
> = {
  welcome: InsuranceApplicationWelcome,
  glossary: InsuranceApplicationGlossary,
  termsOfService: InsuranceApplicationTermsOfService,
  start: InsuranceApplicationCheckpointsStart,
  policyOwner: InsuranceApplicationPolicyOwner,
  businessSummary: InsuranceApplicationBusinessSummary,
  leaders: InsuranceApplicationLeaders,
  identity: InsuranceApplicationIdentity,
  insuranceNeeds: InsuranceApplicationInsuranceNeeds,
  governance: InsuranceApplicationGovernance,
  spending: InsuranceApplicationSpending,
  whitelist: InsuranceApplicationWhitelist,
  upload: InsuranceApplicationUpload,
  submit: InsuranceApplicationCheckpointsSubmit,
  payment: InsuranceApplicationPayment,
};

export default function InsuranceApplicationMainFlowController() {
  const [flow, setFlow] = useLocalStorage<
    AWInsuranceApplicationFlow | undefined
  >("flow", "main");

  const [stepCompletions, setStepCompletions] = useLocalStorage<
    Partial<Record<AWInsuranceApplicationMainFlowStep, boolean>>
  >("stepCompletions", {});

  const [currentStep, setCurrentStep] = useLocalStorage<
    AWInsuranceApplicationMainFlowStep | undefined
  >("currentStep", "welcome");

  const setStepComplete = (step: AWInsuranceApplicationMainFlowStep) => {
    setStepCompletions({ ...stepCompletions, [step]: true });
    setCurrentStep(
      awInsuranceApplicationMainFlowSteps[
        awInsuranceApplicationMainFlowSteps.indexOf(step) + 1
      ]
    );
  };

  const StepView = currentStep ? STEP_COMPONENTS[currentStep] : null;

  return (
    <div className="h-screen w-screen py-[98px] flex justify-center overflow-scroll relative">
      {currentStep && StepView ? (
        <StepView
          key={currentStep}
          nextCallback={() => setStepComplete(currentStep)}
        />
      ) : null}
      <TestingBar flow="main" />
    </div>
  );
}
