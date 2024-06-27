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
import InsuranceApplicationWhitelist from "./views/whitelist";
import InsuranceApplicationUpload from "./views/upload";
import InsuranceApplicationCheckpointsStart from "./views/checkpoints/start";
import InsuranceApplicationCheckpointsSubmit from "./views/checkpoints/submit";
import InsuranceApplicationLeaders from "./views/leaders";
import _ from "lodash";
import InsuranceApplicationPayment from "./views/payment";
import TestingBar from "../TestingBar";
import dynamic from "next/dynamic";

export const SCROLLABLE_PAGE_ID = "scrollable-page";

const AWInfoLine = dynamic(
  () => import("@/components/AWInfoLine"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export type AWInsuranceApplicationFlow =
  | "main"
  | "executive"
  | "digAssMan"
  | "shareholder"
  | "keyholder"
  | "shareholderKeyHolder"
  | "personal";

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
  glossary: "Terms to Understand",
  termsOfService: "Terms of Service",
  start: "Start Application",
  policyOwner: "Policy Owner Information",
  businessSummary: "Business Summary",
  identity: "Identity Verification",
  leaders: "Company Leader Details",
  insuranceNeeds: "Insurance Needs & History",
  governance: "Internal Governance and Controls",
  spending: "Spending Behavior",
  whitelist: "Whitelist Addresses",
  upload: "Upload Files",
  submit: "Submit Application",
  payment: "Underwriting and Concierge Fees Payment",
};

const FADEIN_DELAY = 66;

export function AWFormSectionSubsection(
  props: IAWFormSectionSubsection & {
    i?: number;
    j: number;
    answers?: IAWFormInputAnswer[];
    setValue: (
      id: IAWFormInput["id"],
      newValue: IAWFormInputAnswer["value"]
    ) => void;
    setErroneous: (id: IAWFormInput["id"], e: boolean) => void;
    highlightEmpties?: boolean;
    dependantInputsVisible?: IAWFormInput["id"][];
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
    <div className={`flex flex-col gap-xl`}>
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
            {props.inputs
              .filter(
                (input) =>
                  !input.visibilityAndOptionalityDependence ||
                  props.dependantInputsVisible?.includes(input.id)
              )
              .map((input, index) => (
                <InsuranceApplicationFormInput
                  key={index}
                  {...input}
                  setValue={props.setValue}
                  setErroneous={props.setErroneous}
                  highlightEmpty={props.highlightEmpties}
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
  setErroneous: (id: IAWFormInput["id"], e: boolean) => void;
  dependantInputsVisible?: IAWFormInput["id"][];
  prefill?: () => void;
  highlightEmpties?: boolean;
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
          {props.inputs
            .filter(
              (input) =>
                !input.visibilityAndOptionalityDependence ||
                props.dependantInputsVisible?.includes(input.id)
            )
            .map((input, index) => (
              <InsuranceApplicationFormInput
                key={index}
                {...input}
                setValue={props.setValue}
                setErroneous={props.setErroneous}
                highlightEmpty={props.highlightEmpties}
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
              setErroneous={props.setErroneous}
              highlightEmpties={props.highlightEmpties}
              dependantInputsVisible={props.dependantInputsVisible}
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
  useLocalStorage<AWInsuranceApplicationFlow | undefined>("flow", "main");

  const [stepCompletions, setStepCompletions] = useLocalStorage<
    Partial<Record<AWInsuranceApplicationMainFlowStep, boolean>>
  >("stepCompletions", {});

  const [currentStep, setCurrentStep] = useLocalStorage<
    AWInsuranceApplicationMainFlowStep | undefined
  >("currentStep", "welcome");

  const [previousStep, setPreviousStep] = useLocalStorage<
    AWInsuranceApplicationMainFlowStep | undefined
  >("previousStep", undefined);

  const setStepComplete = (step: AWInsuranceApplicationMainFlowStep) => {
    setStepCompletions({ ...stepCompletions, [step]: true });
    setPreviousStep(step);
    setCurrentStep(
      awInsuranceApplicationMainFlowSteps[
        awInsuranceApplicationMainFlowSteps.indexOf(step) + 1
      ]
    );
  };

  const StepView = currentStep ? STEP_COMPONENTS[currentStep] : null;

  const [ref, setRef] = useState<HTMLElement | null>(null);
  useEffect(() => ref?.scrollTo(0, 0), [currentStep]);

  return (
    <div
      id={SCROLLABLE_PAGE_ID}
      className="h-screen w-screen py-[98px] flex justify-center overflow-scroll relative"
      ref={setRef}
    >
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
