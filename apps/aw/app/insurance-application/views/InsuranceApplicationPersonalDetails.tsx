import { CHECKPOINT_STEPS } from "../InsuranceApplicationPage";
import InsuranceApplicationFormDialog, {
  IAWFormSection,
} from "../components/InsuranceApplicationFormDialog";

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
  {
    id: "66561d001124a06d63bbd22b",
    title: "Primary address of residence",
    prefillInputPrompt: "Use same address as residence address above",
    inputs: [
      {
        id: "66561d077be86edef7a7c569",
        prefillInputId: "6655c0fe63a59eef74dfcd2f",
        title: "Address line 1",
        inputType: "text",
        placeholder: "Insert street address",
      },
      {
        id: "66561d1605b212a580f388eb",
        prefillInputId: "6655c1595eb7619ecf4f664c",
        title: "Address line 2",
        inputType: "text",
        placeholder: "Insert apartment or suite number",
      },
      {
        id: "66561d1b4c32d5191c3ae48d",
        prefillInputId: "6655c171a4a4f8c8b3d6a26f",
        title: "City",
        inputType: "text",
        placeholder: "Insert city",
      },
      {
        id: "66561d1f2bdd8d9d05725bb0",
        prefillInputId: "6655c18ff69ad61442a6fa2b",
        title: "State of province",
        inputType: "text",
        placeholder: "Insert state of province",
      },
      {
        id: "66561d25fb1f010c0bd6ace9",
        prefillInputId: "6655c1b04f9526468edc17b0",
        title: "Country",
        inputType: "dropdown",
        placeholder: "Choose your country",
        options: [],
      },
      {
        id: "66561d2a42becad2f5f4f9ed",
        prefillInputId: "6655c1eb44e7da94b593e696",
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
  return (
    <InsuranceApplicationFormDialog
      stepId="personalDetails"
      title="COMPANY LEADER PERSONAL DETAILS"
      sections={SECTIONS}
      nextCallback={props.nextCallback}
      progress={
        (CHECKPOINT_STEPS.indexOf("leaders") - 0.5) / CHECKPOINT_STEPS.length
      }
    />
  );
}
