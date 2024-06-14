import { COUNTRIES_ALPHA2 } from "@/components/countries";
import InsuranceApplicationFormDialog, {
  IAWFormSection,
} from "../../../components/form-dialog";
import { CHECKPOINT_STEPS } from "../checkpoints/checkpoint-dialog";
import {
  IDENTITY_STEP_TITLES,
  awInsuranceApplicationIdentityStepViews,
} from "./main";
import {
  AWInsuranceApplicationFlow,
  IAWFormSectionProps,
} from "../../controller";
import AWTextField from "@/components/AWTextField";
import { useEffect } from "react";

const countriesOptions = Object.entries(COUNTRIES_ALPHA2).map(
  ([alpha2, name]) => ({ id: alpha2, text: name })
);

export const PERSONAL_DETAILS_NAME_INPUT_ID = "6655be2de0735e8450474863";
export const PERSONAL_DETAILS_BIRTHDAY_INPUT_ID = "6655c02aab2c63b1bea64cd8";
export const PERSONAL_DETAILS_EMAIL_INPUT_ID = "6666d36213b43594dd02e69b";
export const PROFESSION_INPUT_ID = "6666d3176639e924e5c46ac5";

const MAIN_FLOW_SECTIONS: IAWFormSection[] = [
  {
    id: "6655be26fe62c4cb7d4efba6",
    title: "Legal name",
    inputs: [
      {
        id: PERSONAL_DETAILS_NAME_INPUT_ID,
        prefill: {
          step: "policyOwner",
          inputId: "6652e4a2214b3b8b436dc33d",
        },
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
        id: PERSONAL_DETAILS_BIRTHDAY_INPUT_ID,
        inputType: "text",
        placeholder: "MM/DD/YYYY",
        date: true,
        maxLength: 8,
        error: {
          format: "date",
          message: "The date should be in the format 01/31/2024",
        },
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
        numeric: true,
        placeholder: "Enter your 9 digit SSN here",
        maxLength: 9,
        error: {
          format: "min",
          minLength: 9,
          message: "Enter your 9-digit number",
        },
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
        optional: true,
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
        title: "State or province",
        inputType: "text",
        placeholder: "Insert state or province",
      },
      {
        id: "6655c1b04f9526468edc17b0",
        title: "Country",
        inputType: "dropdown",
        placeholder: "Choose your country",
        options: countriesOptions,
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
    title: "Mailing address",
    description:
      "Key Holders will receive their Signing Device in the mail. Please provide a mailing address.",
    prefillInputPrompt: "Use same address as residence address above",
    disablePrefill: true,
    inputs: [
      {
        id: "66561d077be86edef7a7c569",
        prefill: {
          step: "identity",
          inputId: "6655c0fe63a59eef74dfcd2f",
        },
        title: "Address line 1",
        inputType: "text",
        placeholder: "Insert street address",
      },
      {
        id: "66561d1605b212a580f388eb",
        prefill: {
          step: "identity",
          inputId: "6655c1595eb7619ecf4f664c",
        },
        title: "Address line 2",
        inputType: "text",
        optional: true,
        placeholder: "Insert apartment or suite number",
      },
      {
        id: "66561d1b4c32d5191c3ae48d",
        prefill: {
          step: "identity",
          inputId: "6655c171a4a4f8c8b3d6a26f",
        },
        title: "City",
        inputType: "text",
        placeholder: "Insert city",
      },
      {
        id: "66561d1f2bdd8d9d05725bb0",
        prefill: {
          step: "identity",
          inputId: "6655c18ff69ad61442a6fa2b",
        },
        title: "State or province",
        inputType: "text",
        placeholder: "Insert state or province",
      },
      {
        id: "66561d25fb1f010c0bd6ace9",
        prefill: {
          step: "identity",
          inputId: "6655c1b04f9526468edc17b0",
        },
        title: "Country",
        inputType: "dropdown",
        placeholder: "Choose your country",
        options: countriesOptions,
      },
      {
        id: "66561d2a42becad2f5f4f9ed",
        prefill: {
          step: "identity",
          inputId: "6655c1eb44e7da94b593e696",
        },
        title: "ZIP code",
        inputType: "text",
        placeholder: "Enter postal code",
      },
    ],
  },
  {
    id: "665738851df0c1e04588163f",
    custom: true,
  },
];

const KEYHOLDER_PURE_FLOW_SECTIONS: IAWFormSection[] = [
  {
    id: "6655be26fe62c4cb7d4efba6",
    title: "Legal name",
    inputs: [
      {
        id: PERSONAL_DETAILS_NAME_INPUT_ID,
        prefill: {
          step: "policyOwner",
          inputId: "6652e4a2214b3b8b436dc33d",
        },
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
        id: PERSONAL_DETAILS_BIRTHDAY_INPUT_ID,
        inputType: "text",
        placeholder: "MM/DD/YYYY",
        date: true,
        maxLength: 8,
        error: {
          format: "date",
          message: "The date should be in the format 01/31/2024",
        },
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
        optional: true,
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
        title: "State or province",
        inputType: "text",
        placeholder: "Insert state or province",
      },
      {
        id: "6655c1b04f9526468edc17b0",
        title: "Country",
        inputType: "dropdown",
        placeholder: "Choose your country",
        options: countriesOptions,
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
    title: "Mailing address",
    description:
      "Key Holders will receive their Signing Device in the mail. Please provide a mailing address.",
    prefillInputPrompt: "Use same address as residence address above",
    disablePrefill: true,
    inputs: [
      {
        id: "66561d077be86edef7a7c569",
        prefill: {
          step: "identity",
          inputId: "6655c0fe63a59eef74dfcd2f",
        },
        title: "Address line 1",
        inputType: "text",
        placeholder: "Insert street address",
      },
      {
        id: "66561d1605b212a580f388eb",
        prefill: {
          step: "identity",
          inputId: "6655c1595eb7619ecf4f664c",
        },
        title: "Address line 2",
        inputType: "text",
        optional: true,
        placeholder: "Insert apartment or suite number",
      },
      {
        id: "66561d1b4c32d5191c3ae48d",
        prefill: {
          step: "identity",
          inputId: "6655c171a4a4f8c8b3d6a26f",
        },
        title: "City",
        inputType: "text",
        placeholder: "Insert city",
      },
      {
        id: "66561d1f2bdd8d9d05725bb0",
        prefill: {
          step: "identity",
          inputId: "6655c18ff69ad61442a6fa2b",
        },
        title: "State or province",
        inputType: "text",
        placeholder: "Insert state or province",
      },
      {
        id: "66561d25fb1f010c0bd6ace9",
        prefill: {
          step: "identity",
          inputId: "6655c1b04f9526468edc17b0",
        },
        title: "Country",
        inputType: "dropdown",
        placeholder: "Choose your country",
        options: countriesOptions,
      },
      {
        id: "66561d2a42becad2f5f4f9ed",
        prefill: {
          step: "identity",
          inputId: "6655c1eb44e7da94b593e696",
        },
        title: "ZIP code",
        inputType: "text",
        placeholder: "Enter postal code",
      },
    ],
  },
  {
    id: "665738851df0c1e04588163f",
    custom: true,
  },
];

const KEYHOLDER_25_FLOW_SECTIONS: IAWFormSection[] = [
  {
    id: "6655be26fe62c4cb7d4efba6",
    title: "Legal name",
    inputs: [
      {
        id: "6655be2de0735e8450474863",
        prefill: {
          step: "policyOwner",
          inputId: "6652e4a2214b3b8b436dc33d",
        },
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
        date: true,
        maxLength: 8,
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
        optional: true,
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
        title: "State or province",
        inputType: "text",
        placeholder: "Insert state or province",
      },
      {
        id: "6655c1b04f9526468edc17b0",
        title: "Country",
        inputType: "dropdown",
        placeholder: "Choose your country",
        options: countriesOptions,
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
    title: "Mailing address",
    description:
      "Key Holders will receive their Signing Device in the mail. Please provide a mailing address.",
    prefillInputPrompt: "Use same address as residence address above",
    disablePrefill: true,
    inputs: [
      {
        id: "66561d077be86edef7a7c569",
        prefill: {
          step: "identity",
          inputId: "6655c0fe63a59eef74dfcd2f",
        },
        title: "Address line 1",
        inputType: "text",
        placeholder: "Insert street address",
      },
      {
        id: "66561d1605b212a580f388eb",
        prefill: {
          step: "identity",
          inputId: "6655c1595eb7619ecf4f664c",
        },
        title: "Address line 2",
        optional: true,
        inputType: "text",
        placeholder: "Insert apartment or suite number",
      },
      {
        id: "66561d1b4c32d5191c3ae48d",
        prefill: {
          step: "identity",
          inputId: "6655c171a4a4f8c8b3d6a26f",
        },
        title: "City",
        inputType: "text",
        placeholder: "Insert city",
      },
      {
        id: "66561d1f2bdd8d9d05725bb0",
        prefill: {
          step: "identity",
          inputId: "6655c18ff69ad61442a6fa2b",
        },
        title: "State or province",
        inputType: "text",
        placeholder: "Insert state or province",
      },
      {
        id: "66561d25fb1f010c0bd6ace9",
        prefill: {
          step: "identity",
          inputId: "6655c1b04f9526468edc17b0",
        },
        title: "Country",
        inputType: "dropdown",
        placeholder: "Choose your country",
        options: countriesOptions,
      },
      {
        id: "66561d2a42becad2f5f4f9ed",
        prefill: {
          step: "identity",
          inputId: "6655c1eb44e7da94b593e696",
        },
        title: "ZIP code",
        inputType: "text",
        placeholder: "Enter postal code",
      },
    ],
  },
];

const SHAREHOLDER_FLOW_SECTIONS: IAWFormSection[] = [
  {
    id: "6655be26fe62c4cb7d4efba6",
    title: "Legal name",
    inputs: [
      {
        id: "6655be2de0735e8450474863",
        prefill: {
          step: "policyOwner",
          inputId: "6652e4a2214b3b8b436dc33d",
        },
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
        date: true,
        maxLength: 8,
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
        numeric: true,
        maxLength: 9,
        error: {
          format: "min",
          minLength: 9,
          message: "Enter your 9-digit number",
        },
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
        optional: true,
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
        title: "State or province",
        inputType: "text",
        placeholder: "Insert state or province",
      },
      {
        id: "6655c1b04f9526468edc17b0",
        title: "Country",
        inputType: "dropdown",
        placeholder: "Choose your country",
        options: countriesOptions,
      },
      {
        id: "6655c1eb44e7da94b593e696",
        title: "ZIP code",
        inputType: "text",
        placeholder: "Enter postal code",
      },
    ],
  },
];

const EXECUTIVE_AND_ASSET_MANAGER_FLOW_SECTIONS: IAWFormSection[] = [
  {
    id: "6655be26fe62c4cb7d4efba6",
    title: "Legal name",
    inputs: [
      {
        id: "6655be2de0735e8450474863",
        prefill: {
          step: "policyOwner",
          inputId: "6652e4a2214b3b8b436dc33d",
        },
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
        date: true,
        maxLength: 8,
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
        optional: true,
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
        title: "State or province",
        inputType: "text",
        placeholder: "Insert state or province",
      },
      {
        id: "6655c1b04f9526468edc17b0",
        title: "Country",
        inputType: "dropdown",
        placeholder: "Choose your country",
        options: countriesOptions,
      },
      {
        id: "6655c1eb44e7da94b593e696",
        title: "ZIP code",
        inputType: "text",
        placeholder: "Enter postal code",
      },
    ],
  },
];

const PERSONAL_FLOW_SECTIONS: IAWFormSection[] = [
  {
    id: "6655be26fe62c4cb7d4efba6",
    title: "Legal name",
    inputs: [
      {
        id: PERSONAL_DETAILS_NAME_INPUT_ID,
        prefill: {
          step: "policyOwner",
          inputId: "6652e4a2214b3b8b436dc33d",
        },
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
        id: PERSONAL_DETAILS_BIRTHDAY_INPUT_ID,
        inputType: "text",
        placeholder: "MM/DD/YYYY",
        date: true,
        maxLength: 8,
        error: {
          format: "date",
          message: "The date should be in the format 01/31/2024",
        },
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
        numeric: true,
        maxLength: 9,
        error: {
          format: "min",
          minLength: 9,
          message: "Enter your 9-digit number",
        },
      },
    ],
  },
  {
    id: "6666d312ab5df41063ec2df7",
    title: "Profession",
    inputs: [
      {
        id: PROFESSION_INPUT_ID,
        inputType: "text",
        placeholder: "Insert your profession here",
      },
    ],
  },
  {
    id: "6666d349dd1334878e26a78c",
    title: "Cell phone number",
    inputs: [
      {
        id: "6666d34c462f61a6575c85bf",
        inputType: "phoneNumber",
        numeric: true,
        placeholder: "Enter your phone number here",
      },
    ],
  },
  {
    id: "6666d35fc8f1599979af91ba",
    title: "Email",
    inputs: [
      {
        id: PERSONAL_DETAILS_EMAIL_INPUT_ID,
        inputType: "text",
        placeholder: "Enter email address here",
        error: {
          format: "email",
          message: "The address should be in the format bob@xxx.com",
        },
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
        optional: true,
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
        title: "State or province",
        inputType: "text",
        placeholder: "Insert state or province",
      },
      {
        id: "6655c1b04f9526468edc17b0",
        title: "Country",
        inputType: "dropdown",
        placeholder: "Choose your country",
        options: countriesOptions,
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
    title: "Mailing address",
    description:
      "Key Holders will receive their Signing Device in the mail. Please provide a mailing address.",
    prefillInputPrompt: "Use same address as residence address above",
    disablePrefill: true,
    inputs: [
      {
        id: "66561d077be86edef7a7c569",
        prefill: {
          step: "identity",
          inputId: "6655c0fe63a59eef74dfcd2f",
        },
        title: "Address line 1",
        inputType: "text",
        placeholder: "Insert street address",
      },
      {
        id: "66561d1605b212a580f388eb",
        prefill: {
          step: "identity",
          inputId: "6655c1595eb7619ecf4f664c",
        },
        title: "Address line 2",
        optional: true,
        inputType: "text",
        placeholder: "Insert apartment or suite number",
      },
      {
        id: "66561d1b4c32d5191c3ae48d",
        prefill: {
          step: "identity",
          inputId: "6655c171a4a4f8c8b3d6a26f",
        },
        title: "City",
        inputType: "text",
        placeholder: "Insert city",
      },
      {
        id: "66561d1f2bdd8d9d05725bb0",
        prefill: {
          step: "identity",
          inputId: "6655c18ff69ad61442a6fa2b",
        },
        title: "State or province",
        inputType: "text",
        placeholder: "Insert state or province",
      },
      {
        id: "66561d25fb1f010c0bd6ace9",
        prefill: {
          step: "identity",
          inputId: "6655c1b04f9526468edc17b0",
        },
        title: "Country",
        inputType: "dropdown",
        placeholder: "Choose your country",
        options: countriesOptions,
      },
      {
        id: "66561d2a42becad2f5f4f9ed",
        prefill: {
          step: "identity",
          inputId: "6655c1eb44e7da94b593e696",
        },
        title: "ZIP code",
        inputType: "text",
        placeholder: "Enter postal code",
      },
    ],
  },
];

const FLOW_SECTIONS: Record<AWInsuranceApplicationFlow, IAWFormSection[]> = {
  main: MAIN_FLOW_SECTIONS,
  executive: EXECUTIVE_AND_ASSET_MANAGER_FLOW_SECTIONS,
  digAssMan: EXECUTIVE_AND_ASSET_MANAGER_FLOW_SECTIONS,
  keyholderPure: KEYHOLDER_PURE_FLOW_SECTIONS,
  keyholder25: KEYHOLDER_25_FLOW_SECTIONS,
  shareholder: SHAREHOLDER_FLOW_SECTIONS,
  shareholderKeyHolder25: MAIN_FLOW_SECTIONS,
  personal: PERSONAL_FLOW_SECTIONS,
};

const SIGNING_DEVICE_INPUT_ID = "665f91c8d7ecc15c7d1c6258";

const SigningDeviceSection = (
  props: IAWFormSectionProps & { setDone: () => void }
) => {
  useEffect(() => {
    props.answers?.find((a) => a.inputId === SIGNING_DEVICE_INPUT_ID)?.value &&
      props.setDone();
  }, [props.answers]);
  return (
    <div className={`flex flex-col gap-xl opacity-0 animate-fadeIn text-xl`}>
      <div className="font-medium text-darkTeal-2">{`${props.i}) Signing Device`}</div>
      <div className="flex flex-col gap-xl">
        <div className="flex flex-col gap-1">
          Each Signing Device must be stored at a UNIQUE physical address:
          <div className="flex flex-col gap-1">
            {[
              "Residence",
              "Workplace premises",
              "Safe Deposit box (e.g. a bank)",
            ].map((b, i) => (
              <div key={i} className="flex gap-lg pl-[15px]">
                <div className="pt-[10px]">
                  <div className="min-h-[6px] min-w-[6px] bg-darkTeal-5 rounded-full" />
                </div>
                <div>{b}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          If the Signing Devices is stored at a residence or workplace, it must
          be stored in a lockable safe.
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div>Provide the zip code of the chosen location:</div>
        <AWTextField
          value={
            props.answers?.find((a) => a.inputId === SIGNING_DEVICE_INPUT_ID)
              ?.value
          }
          setValue={(zip) => {
            props.setValue(SIGNING_DEVICE_INPUT_ID, zip);
            zip && props.setDone();
          }}
          placeholder="Insert ZIP code"
        />
      </div>
    </div>
  );
};

export default function InsuranceApplicationPersonalDetails(props: {
  nextCallback: () => void;
  progress?: number;
  flow?: AWInsuranceApplicationFlow;
}) {
  return (
    <InsuranceApplicationFormDialog
      stepId="identity"
      title={IDENTITY_STEP_TITLES.personalDetails}
      subtitle={
        props.flow !== "personal"
          ? "As a company leader, please input your application information and proceed to identity verification KYC/AML."
          : undefined
      }
      sections={FLOW_SECTIONS[props.flow || "main"]}
      nextCallback={props.nextCallback}
      customSections={
        !props.flow ||
        ["main", "keyholderPure", "shareholderKeyHolder25"].includes(props.flow)
          ? {
              "665738851df0c1e04588163f": SigningDeviceSection,
            }
          : undefined
      }
      progress={
        props.flow === "main"
          ? props.progress ||
            (CHECKPOINT_STEPS.indexOf("identity") +
              awInsuranceApplicationIdentityStepViews.indexOf(
                "personalDetails"
              ) /
                awInsuranceApplicationIdentityStepViews.length) /
              CHECKPOINT_STEPS.length
          : 0.08 // this is for the Personal Flow
      }
      backbuttonStep={
        props.flow === "main"
          ? CHECKPOINT_STEPS[CHECKPOINT_STEPS.indexOf("identity") - 1]
          : props.flow === "personal"
          ? "start"
          : "responsibilities"
      }
    />
  );
}
