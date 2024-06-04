import { COUNTRIES_ALPHA2 } from "@/components/countries";
import InsuranceApplicationFormDialog, {
  IAWFormSection,
} from "../../components/InsuranceApplicationFormDialog";
import { CHECKPOINT_STEPS } from "../../components/InsuranceApplicationCheckpointDialog";
import {
  IDENTITY_STEP_TITLES,
  awInsuranceApplicationIdentityStepViews,
} from "./main";
import {
  AWTextField,
  IAWFormSectionProps,
} from "../../InsuranceApplicationPage";
import { useEffect } from "react";

const countriesOptions = Object.entries(COUNTRIES_ALPHA2).map(
  ([alpha2, name]) => ({ id: alpha2, text: name })
);

const SECTIONS: IAWFormSection[] = [
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
    // description: `Each Signing Device must be stored at a UNIQUE physical address:
    // Residence
    // Workplace premises
    // Safe Deposit box (e.g. a bank)

    // If the Signing Devices is stored at a residence or workplace, it must be stored in a lockable safe.`,
    // inputs: [
    //   {
    //     id: "6657388a4c8c64cd846d1791",
    //     title: "Provide the zip code of the chosen location",
    //     inputType: "text",
    //     placeholder: "Insert ZIP code",
    //   },
    // ],
  },
];

const SIGNING_DEVICE_INPUT_ID = "665f91c8d7ecc15c7d1c6258";

const SigningDeviceSection = (
  props: IAWFormSectionProps & { setDone: () => void }
) => {
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
          setValue={(zip) => props.setValue(SIGNING_DEVICE_INPUT_ID, zip)}
          placeholder="Insert ZIP code"
        />
      </div>
    </div>
  );
};

export default function InsuranceApplicationPersonalDetails(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationFormDialog
      stepId="identity"
      title={IDENTITY_STEP_TITLES.personalDetails}
      sections={SECTIONS}
      nextCallback={props.nextCallback}
      customSections={{
        "665738851df0c1e04588163f": SigningDeviceSection,
      }}
      progress={
        (CHECKPOINT_STEPS.indexOf("identity") +
          awInsuranceApplicationIdentityStepViews.indexOf("personalDetails") /
            awInsuranceApplicationIdentityStepViews.length) /
        CHECKPOINT_STEPS.length
      }
    />
  );
}
