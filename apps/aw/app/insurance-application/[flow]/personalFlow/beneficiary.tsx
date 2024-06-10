import InsuranceApplicationFormDialog, {
  IAWFormSection,
} from "../components/form-dialog";
import { CHECKPOINT_STEPS } from "./checkpoint-dialog";
import { PERSONAL_FLOW_STEP_TITLES } from "./controller";

export const SECTIONS: IAWFormSection[] = [
  {
    id: "6665fe926994e8cb8fb11059",
    title: "Beneficiaries",
    description:
      "In the case that a claim needs to be paid to the beneficiary of the insured rather than the named insured, AnchorWatch will contact the primary and secondary beneficiary. Include best contact information.",
    subsections: [
      {
        title: "Primary beneficiary details",
        inputs: [
          {
            id: "6665fed3b86ca09272d03230",
            title: "Name of primary contact",
            inputType: "text",
            placeholder: "Enter full name of contact",
          },
          {
            id: "6665ff62385eb2f7ad5a98bf",
            title: "Entity name (if applicable)",
            optional: true,
            inputType: "text",
            placeholder: "Name with which entity was incorporated",
          },
          {
            id: "6665ff5ca9b05ccb1ad1b58a",
            title: "Relationship with name insured",
            inputType: "text",
            placeholder: "Name with which entity was incorporated",
          },
          {
            id: "6665ff8844e4de2d812f5490",
            title: "Email address",
            inputType: "text",
            placeholder: "Enter email address here",
          },
          {
            id: "6665ffd88c3ddc4d7a84df5d",
            title: "Cell phone number",
            inputType: "text",
            numeric: true,
            placeholder: "Enter phone number here",
          },
        ],
      },
      {
        title: "Secondary beneficiary details",
        inputs: [
          {
            id: "666600223e1b937223680acd",
            title: "Name of secondary contact",
            inputType: "text",
            placeholder: "Enter full name of contact",
          },
          {
            id: "6666002d381ae22636ddb625",
            title: "Entity name (if applicable)",
            optional: true,
            inputType: "text",
            placeholder: "Name with which entity was incorporated",
          },
          {
            id: "6666003551bf463b9ab18667",
            title: "Relationship with name insured",
            inputType: "text",
            placeholder: "Name with which entity was incorporated",
          },
          {
            id: "6666003a79702577cedb13f5",
            title: "Email address",
            inputType: "text",
            placeholder: "Enter email address here",
          },
          {
            id: "6666003fe302e477565c66e1",
            title: "Cell phone number",
            inputType: "text",
            numeric: true,
            placeholder: "Enter phone number here",
          },
        ],
      },
    ],
  },
];

export default function InsuranceApplicationBeneficiary(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationFormDialog
      stepId="beneficiary"
      title={PERSONAL_FLOW_STEP_TITLES.beneficiary}
      sections={SECTIONS}
      nextCallback={props.nextCallback}
      progress={
        CHECKPOINT_STEPS.indexOf("beneficiary") / CHECKPOINT_STEPS.length
      }
    />
  );
}
