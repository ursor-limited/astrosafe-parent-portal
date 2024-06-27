import { MAIN_FLOW_STEP_TITLES } from "../controller";
import InsuranceApplicationFormDialog, {
  IAWFormSection,
} from "../../components/form-dialog";
import { CHECKPOINT_STEPS } from "./checkpoints/checkpoint-dialog";

const COMPLIANCE_INPUT_ID = "665a0100501f2efd6a31fcc9";
const COMPLIANCE_YES_OPTION_ID = "665a01050750ac467bae89e0";
const CERTIFICATIONS_INPUT_ID = "665a04102f5af77711a28381";
const CERTIFICATIONS_YES_OPTION_ID = "665a04147c51b5c12fe1aabd";
const AUDITS_INPUT_ID = "665a04c55ed612bd152fd70a";
const AUDITS_YES_OPTION_ID = "665a04c9dbe666685b488ac6";
const PREVENTION_INPUT_ID = "665a052feebbc832aa1341e8";
const PREVENTION_YES_OPTION_ID = "665a0534c61a254d988cce3d";
const RISK_INPUT_ID = "665a056d490b2744654d955a";
const RISK_YES_OPTION_ID = "665a0570bbbe724fa5d4be1a";
const AWARENESS_INPUT_ID = "665a05a27dfe5926b5aa230d";
const AWARENESS_YES_OPTION_ID = "665a05a549551fe138f9ffd0";
const NETWORK_INPUT_ID = "665a05e8e8a6bc1a354c7df6";
const NETWORK_YES_OPTION_ID = "665a05ec33ad60b40b729866";
const SENSITIVE_INPUT_ID = "665a063960fe08b39306e39a";
const SENSITIVE_YES_OPTION_ID = "665a063d0dc14b16fe2499c6";

export const SECTIONS: IAWFormSection[] = [
  {
    id: "665a0153cc2ebcd9ab9f703f",
    title:
      "Does the entity have documented internal compliance documentation and procedures (including but not limited to company standards or policies on Business ethics, Conflicts of interests, Separation of duties)?",
    description:
      "If yes, please upload the relevant documentation at the end of the application in the ‘Upload documents’ section.",
    descriptionAtEnd: true,
    inputs: [
      {
        id: "665a0158d6c6ade52d1cea54",
        inputType: "multiChoice",
        options: [
          {
            id: "665a015cc8eeff4e073b9e92",
            text: "Yes",
          },
          {
            id: "665a015f2c5116a71bde32b4",
            text: "No",
          },
        ],
      },
    ],
  },
  {
    id: "665a00fb08267156d35ca0e6",
    title:
      "Does the entity provide employees with required compliance training?",
    inputs: [
      {
        id: COMPLIANCE_INPUT_ID,
        inputType: "multiChoice",
        options: [
          {
            id: COMPLIANCE_YES_OPTION_ID,
            text: "Yes",
          },
          {
            id: "665a0109048eec8ad76d44d3",
            text: "No",
          },
        ],
      },
      {
        id: "665a010df4c32d0d514909e5",
        inputType: "textLong",
        placeholder: "Insert details",
        title:
          "Please provide the topics covered, frequency of training and the process for tracking employee completion of the training.",
        visibilityAndOptionalityDependence: {
          inputId: COMPLIANCE_INPUT_ID,
          answer: COMPLIANCE_YES_OPTION_ID,
        },
      },
    ],
  },
  {
    id: "665a040c25bc38841c6e70f6",
    title: "Has your company attained SOC1, SOC2 or similar certification?",
    description:
      "If yes, please also upload documentation of these certifications in the upload section at the end of the application.",
    descriptionAtEnd: true,
    inputs: [
      {
        id: CERTIFICATIONS_INPUT_ID,
        inputType: "multiChoice",
        options: [
          {
            id: CERTIFICATIONS_YES_OPTION_ID,
            text: "Yes",
          },
          {
            id: "665a0419f19371558263c0f9",
            text: "No",
          },
        ],
      },
      {
        id: "665a041d88de1163106563aa",
        inputType: "text",
        placeholder:
          "Insert type, like SOC 1 or SOC 2, type 1 or type 2, ISO, etc",
        title: "Which certifications has the entity completed?",
        visibilityAndOptionalityDependence: {
          inputId: CERTIFICATIONS_INPUT_ID,
          answer: COMPLIANCE_YES_OPTION_ID,
        },
      },
    ],
  },
  {
    id: "665a04c1515ae65b10155d51",
    title:
      "Does the prospective insured participate in compliance and governance external audits?",
    inputs: [
      {
        id: AUDITS_INPUT_ID,
        inputType: "multiChoice",
        options: [
          {
            id: AUDITS_YES_OPTION_ID,
            text: "Yes",
          },
          {
            id: "665a04cda7d2fedd36022d70",
            text: "No",
          },
        ],
      },
      {
        id: "665a04d280534eb3f03e4d68",
        inputType: "textLong",
        placeholder: "Insert details",
        title:
          "Which procedures were audited and what was the outcome of the review?",
        visibilityAndOptionalityDependence: {
          inputId: AUDITS_INPUT_ID,
          answer: AUDITS_YES_OPTION_ID,
        },
      },
    ],
  },
  {
    id: "665a0527908dd0d975ee5c99",
    title:
      "Does the prospective insured have internal procedures to prevent internal collusion and financial crimes?",
    inputs: [
      {
        id: PREVENTION_INPUT_ID,
        inputType: "multiChoice",
        options: [
          {
            id: PREVENTION_YES_OPTION_ID,
            text: "Yes",
          },
          {
            id: "665a053924814ba43d05a659",
            text: "No",
          },
        ],
      },
      {
        id: "665a053e0c0ff948d34fa06e",
        inputType: "textLong",
        placeholder: "Insert details",
        title: "Describe the technology and procedures.",
        visibilityAndOptionalityDependence: {
          inputId: PREVENTION_INPUT_ID,
          answer: PREVENTION_YES_OPTION_ID,
        },
      },
    ],
  },
  {
    id: "665a05697e0fe5e8321225fb",
    title:
      "Does the prospective insured have a formalized vendor risk management program in place for evaluating and monitoring third party service providers?",
    inputs: [
      {
        id: RISK_INPUT_ID,
        inputType: "multiChoice",
        options: [
          {
            id: RISK_YES_OPTION_ID,
            text: "Yes",
          },
          {
            id: "665a057489f1be897b91b985",
            text: "No",
          },
        ],
      },
      {
        id: "665a0579ceeb3409221fe39a",
        inputType: "textLong",
        placeholder: "Insert details",
        title:
          "How are third party vendors audited or assessed for their security practices?",
        visibilityAndOptionalityDependence: {
          inputId: RISK_INPUT_ID,
          answer: RISK_YES_OPTION_ID,
        },
      },
    ],
  },
  {
    id: "665a059e0479f40c3c4a5693",
    title: "Are employees required to undergo security awareness training?",
    inputs: [
      {
        id: AWARENESS_INPUT_ID,
        inputType: "multiChoice",
        options: [
          {
            id: AWARENESS_YES_OPTION_ID,
            text: "Yes",
          },
          {
            id: "665a05a9d6c6f1cd1e03b6c1",
            text: "No",
          },
        ],
      },
      {
        id: "665a05ac0660b8cc360316fb",
        inputType: "textLong",
        placeholder: "Insert details",
        title:
          "Please provide the topics covered, frequency of training and the process for tracking employee completion of the securty awareness training.",
        visibilityAndOptionalityDependence: {
          inputId: AWARENESS_INPUT_ID,
          answer: AWARENESS_YES_OPTION_ID,
        },
      },
    ],
  },
  {
    id: "665a05e454335c88f157629e",
    title:
      "Does the prospective insured have a documented network security policy in place, including the use of firewalls, intrusion detection/prevention systems and secure configurations?",
    inputs: [
      {
        id: NETWORK_INPUT_ID,
        inputType: "multiChoice",
        options: [
          {
            id: NETWORK_YES_OPTION_ID,
            text: "Yes",
          },
          {
            id: "665a05efd0426b097be4b5dc",
            text: "No",
          },
        ],
      },
      {
        id: "665a05f3a3dfd09c4add68f7",
        inputType: "textLong",
        placeholder: "Insert details",
        title: "Please summarize below.",
        visibilityAndOptionalityDependence: {
          inputId: NETWORK_INPUT_ID,
          answer: NETWORK_YES_OPTION_ID,
        },
      },
    ],
  },
  {
    id: "665a06363edc454449f03629",
    title:
      "Does the prospective insured have controls in place to ensure that access to sensitive information and systems is granted only to authorized individuals?",
    inputs: [
      {
        id: SENSITIVE_INPUT_ID,
        inputType: "multiChoice",
        options: [
          {
            id: SENSITIVE_YES_OPTION_ID,
            text: "Yes",
          },
          {
            id: "665a0640344f1ba9a7a91c97",
            text: "No",
          },
        ],
      },
      {
        id: "665a0644f41cd268009ae18c",
        inputType: "textLong",
        placeholder: "Insert details",
        title: "Please summarize below.",
        visibilityAndOptionalityDependence: {
          inputId: SENSITIVE_INPUT_ID,
          answer: SENSITIVE_YES_OPTION_ID,
        },
      },
      {
        id: "665a0661dfcaac17a5c44a1e",
        inputType: "text",
        placeholder: "Describe process to review and revoke unused access",
        title:
          "How frequently is access periodically reviewed and revoked when no longer needed?",
        visibilityAndOptionalityDependence: {
          inputId: SENSITIVE_INPUT_ID,
          answer: SENSITIVE_YES_OPTION_ID,
        },
      },
    ],
  },
  {
    id: "665a06c5ee5ade46d477435d",
    title:
      "Do you operate in, or provide services to any entity in any OFAC sanctioned jurisdiction, including but not limited to: Iran, North Korea, Syria, Cuba, and specific regions of Ukraine (Crimea, Donetsk and Luhansk)?",
    inputs: [
      {
        id: "665a06c99c59bfc01eb3a463",
        inputType: "multiChoice",
        options: [
          {
            id: "665a06cddc4d6ab515c461f6",
            text: "Yes",
          },
          {
            id: "665a06d18746a944f330a29c",
            text: "No",
          },
        ],
      },
    ],
  },
];

export default function InsuranceApplicationGovernance(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationFormDialog
      stepId="governance"
      title={MAIN_FLOW_STEP_TITLES.governance}
      sections={SECTIONS}
      nextCallback={props.nextCallback}
      progress={
        CHECKPOINT_STEPS.indexOf("governance") / CHECKPOINT_STEPS.length
      }
    />
  );
}
