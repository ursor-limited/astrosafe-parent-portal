import { MAIN_FLOW_STEP_TITLES } from "../controller";
import InsuranceApplicationFormDialog, {
  IAWFormSection,
} from "../../components/form-dialog";
import { CHECKPOINT_STEPS } from "./checkpoints/checkpoint-dialog";

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
];

export default function InsuranceApplicationPolicyOwner(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationFormDialog
      stepId="policyOwner"
      title={MAIN_FLOW_STEP_TITLES.policyOwner}
      sections={SECTIONS}
      nextCallback={props.nextCallback}
      progress={
        CHECKPOINT_STEPS.indexOf("policyOwner") / CHECKPOINT_STEPS.length
      }
    />
  );
}
