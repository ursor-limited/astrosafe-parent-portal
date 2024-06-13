import { MAIN_FLOW_STEP_TITLES } from "../controller";
import InsuranceApplicationFormDialog, {
  IAWFormSection,
} from "../../components/form-dialog";
import { CHECKPOINT_STEPS } from "./checkpoints/checkpoint-dialog";

export const SECTIONS: IAWFormSection[] = [
  {
    id: "6652e2c52226b1c9658f4560",
    title: "Name of business entity",
    inputs: [
      {
        id: "6652e53e8e43c301b281f5eb",
        inputType: "text",
        placeholder: "Name with which entity was incorporated",
      },
      {
        id: "6652e5b3fe447585b209b0c9",
        title: "Additional brand, trade names or DBAs",
        inputType: "textLong",
        placeholder: "List additional business names, separated by a comma",
        optional: true,
      },
    ],
  },
  {
    id: "6652f5a9c7abf8317d06e9de",
    title: "Registration type",
    inputs: [
      {
        id: "6652f5de4ae33a26e12ca1c7",
        inputType: "dropdown",
        placeholder: "Choose a type",
        options: [
          {
            id: "6653461b775dd263297ff525",
            text: "Sole proprietorship",
          },
          {
            id: "665346543f251225d05f9c53",
            text: "Partnership",
          },
          {
            id: "6653465f1409cd6fbed1b995",
            text: "Corporation",
          },
          {
            id: "6666bff0bfcd559b29e09911",
            text: "S Corporation",
          },
        ],
      },
    ],
  },
  {
    id: "665346a5e76e5f4fce9dbb7e",
    title: "EIN or Tax ID Number (SSN if an individual)",
    inputs: [
      {
        id: "665346cf1ec61b1354a74f9a",
        inputType: "text",
        placeholder: "Enter number here",
        maxLength: 9,
      },
    ],
  },
  {
    id: "6654b9148d3dfd8a05d588ab",
    title: "Company address",
    inputs: [
      {
        id: "6654b91846789fe0ff2334af",
        title: "Street address",
        inputType: "text",
        placeholder: "Enter address here",
      },
      {
        id: "6654b957c8216094b334a21b",
        title: "City, State and Country",
        inputType: "text",
        placeholder: "Enter City, State and Country",
      },
      {
        id: "6654b97671c74041398d0836",
        title: "Zip or Postal code",
        inputType: "text",
        placeholder: "Enter Zip or Postal Code",
      },
    ],
    subsections: [
      {
        revelationCheckboxPrompt:
          "The business entity has an additional address",
        title: "Company's business address",
        inputs: [
          {
            id: "6654c26dc3f4e07fba23c413",
            title: "Street address",
            optional: true,
            inputType: "text",
            placeholder: "Enter address here",
          },
          {
            id: "6654c271388067a29bb34f0a",
            title: "City, State and Country",
            optional: true,
            inputType: "text",
            placeholder: "Enter City, State and Country",
          },
          {
            id: "6654c275eb925065849228c9",
            title: "Zip or Postal code",
            optional: true,
            inputType: "text",
            placeholder: "Enter Zip or Postal Code",
          },
        ],
      },
    ],
  },
  {
    id: "6654c8304f6d9bc2ccd4203c",
    title: "Industry and business model",
    inputs: [
      {
        id: "6654c84127bd5103ed3efee4",
        title: "Industry sector",
        inputType: "dropdown",
        placeholder: "Choose a sector from the list",
        options: [
          {
            id: "6654c88a854aae42481a4dc7",
            text: "Family or Multi-family Office",
          },
          { id: "6654c894fa0a1762693072d9", text: "Hedge Fund or Similar" },
          { id: "6654c8abaf6e245af0890bf8", text: "Miner" },
          { id: "6654c8bd5dd55c40a86a0dfd", text: "Mining Pool" },
          { id: "6654c8c904d08cccf38ce934", text: "Custodian" },
          { id: "6654c8dccae4c5f9d16aef58", text: "Exchange" },
          {
            id: "6654c8e9d0635af167179bb1",
            text: "Bitcoin Financial Services",
          },
          {
            id: "6654c8f8ba6062bec8e4786c",
            text: "Other Bitcoin Services",
          },
          {
            id: "6654c917ad74d440c2746fa4",
            text: "RIA or Investment Advisor",
          },
          {
            id: "6654c9239d8187cbbcec2f77",
            text: "Traditional Financial Services",
          },
          {
            id: "6654c939d5ea057a13a901ed",
            text: "Other",
          },
        ],
      },
      {
        id: "6654ca486c1a5bba7ad34ad2",
        title: "Primary business model",
        inputType: "textLong",
        placeholder:
          "Describe the primary business model of the entity seeking insurance",
      },
      {
        id: "6654caa262824d0fecf996d9",
        title: "Additional revenue streams",
        inputType: "textLong",
        placeholder:
          "Describe any additional revenue streams that account for at least 10% of the total business revenue",
        optional: true,
      },
      {
        id: "6664aea1158bfa6294b2928f",
        title:
          "What is the business' source of capital, if not primarily from revenue?",
        inputType: "dropdown",
        placeholder: "Choose a type",
        options: [
          {
            id: "6664aeaab81ebd382adccc16",
            text: "Bootstrapped",
          },
          {
            id: "6664aed2c5bff264b4201215",
            text: "Venture Backing",
          },
        ],
      },
      {
        id: "6664af49e91a2c74fd382c6d",
        title: "What is the entity ownership?",
        inputType: "dropdown",
        placeholder: "Choose a type",
        options: [
          {
            id: "6664ae1073753f33fc9e7337",
            text: "Single Private Owner",
          },
          {
            id: "6664ae29159df8c296e4fb03",
            text: "Multiple Private Owner",
          },
          {
            id: "6664ae44e5d8464689cfdd11",
            text: "Venture Backed",
          },
          {
            id: "6664ae575338f2bc541992f0",
            text: "Publicly Traded",
          },
        ],
      },
      {
        id: "6654ca6e45f33d87561374e6",
        title: "Number of employees",
        inputType: "text",
        placeholder: "Enter number here",
      },
    ],
  },
  {
    id: "6654caef5ba58ff4e8861732",
    title: "Does the entity hold any licenses issued by a regulatory body?",
    inputs: [
      {
        id: "6654cb06b933bdbaa3f0ed75",
        inputType: "multiChoice",
        options: [
          {
            id: "6654cb1d8a8dcbe65bdf3fa7",
            text: "Yes",
          },
          {
            id: "6654cb2f221bbece1e0281b8",
            text: "No",
          },
        ],
      },
      {
        id: "6654cb6272a687f9559817a4",
        inputType: "textLong",
        optional: true,
        title:
          "If yes, name the regulatory authority and the licenses held by the entity and Key Holders. You will also need to upload them at the end of the application.",
        placeholder: "List licenses and the issuing regulatory body",
      },
    ],
  },
  {
    id: "6654cc7a0231be789748cbd1",
    title:
      "Does the prospective insured have audited financial statements and as available: 10Ks, prospectus and balance sheet and liabilities etc?",
    inputs: [
      {
        id: "6654cc7682a7a40eb5ba90f1",
        inputType: "multiChoice",
        options: [
          {
            id: "6654cc81bf7346e9d335f97e",
            text: "Yes",
            explanation:
              "If yes, please upload audited financial statements and as available including 10Ks, prospectus and balance sheet, liabilities, pro forma etc in the upload section at the end of application.",
          },
          {
            id: "6654cc842812b8faacf5c303",
            text: "No",
            explanation:
              "If no, please upload a statement of approximate net worth detailed by asset class in the upload section at the end of application.",
          },
        ],
      },
    ],
  },

  {
    id: "6664b0a805feae22b5ae6adc",
    title: "Have the entity or its leaders ever filed for bankruptcy?",
    inputs: [
      {
        id: "6664b0c75b0bd09a293f54a5",
        inputType: "multiChoice",
        options: [
          {
            id: "6664b0cc83a22ae8b722ce2c",
            text: "Yes",
          },
          {
            id: "6664b0d2002fe35a519c0eb4",
            text: "No",
          },
        ],
      },
      {
        id: "6664b113d8abcd247065c75c",
        inputType: "textLong",
        optional: true,
        placeholder: "If yes, please share details",
      },
    ],
  },

  {
    id: "6664b162555030f35574ba67",
    title:
      "Does the entity engage in regular pen testing and/or cybersecurity audits by a third party firm?",
    inputs: [
      {
        id: "6664b1687b24d86a6c1e7673",
        inputType: "multiChoice",
        options: [
          {
            id: "6664b16df540e66af0750603",
            text: "Yes",
          },
          {
            id: "6664b171e771a0565c03d916",
            text: "No",
          },
        ],
      },
      {
        id: "6664b178a0829cf0b935120a",
        inputType: "textLong",
        optional: true,
        placeholder:
          "If yes, share the name of the auditor and the date of the most recent audit.",
      },
    ],
  },

  {
    id: "6654dee53dd280a07d699e1e",
    title: "Beneficiaries",
    subsections: [
      {
        title: "Primary beneficiary details",
        inputs: [
          {
            id: "6654dee124c24611274eb195",
            inputType: "text",
            title: "Name of primary contact",
            placeholder: "Enter full name of contact",
          },
          {
            id: "6654df034b94589494b1f6f3",
            inputType: "text",
            title: "Entity name (if applicable)",
            optional: true,
            placeholder: "Name with which entity was incorporated",
          },
          {
            id: "6654dfb696f4be7b678d7b82",
            inputType: "text",
            title: "Relationship with name insured",
            optional: true,
            placeholder: "Enter relationship here",
          },
          {
            id: "6654e01d4d4537731775de76",
            inputType: "text",
            title: "Email address",
            placeholder: "Enter email address here",
          },
        ],
      },
      {
        title: "Secondary beneficiary details",
        inputs: [
          {
            id: "6654efff746ff44ce754c4b9",
            inputType: "text",
            title: "Name of secondary contact",
            placeholder: "Enter full name of contact",
          },
          {
            id: "6654f004e59414a2e3ca72f2",
            inputType: "text",
            title: "Entity name (if applicable)",
            optional: true,
            placeholder: "Name with which entity was incorporated",
          },
          {
            id: "6654f00807716565788eb85a",
            inputType: "text",
            title: "Relationship with name insured",
            placeholder: "Enter relationship here",
          },
          {
            id: "6654f00cfcea79b7ce5aa11e",
            inputType: "text",
            title: "Email address",
            placeholder: "Enter email address here",
          },
        ],
      },
    ],
  },
];

export default function InsuranceApplicationBusinessSummary(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationFormDialog
      stepId="businessSummary"
      title={MAIN_FLOW_STEP_TITLES.businessSummary}
      sections={SECTIONS}
      nextCallback={props.nextCallback}
      progress={
        CHECKPOINT_STEPS.indexOf("businessSummary") / CHECKPOINT_STEPS.length
      }
    />
  );
}
