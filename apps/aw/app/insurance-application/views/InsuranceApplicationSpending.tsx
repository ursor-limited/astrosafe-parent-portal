import { STEP_TITLES } from "../InsuranceApplicationPage";
import InsuranceApplicationFormDialog, {
  IAWFormSection,
} from "../components/InsuranceApplicationFormDialog";
import { CHECKPOINT_STEPS } from "./InsuranceApplicationCheckpoints";

export const SECTIONS: IAWFormSection[] = [
  {
    id: "665a116e2f6f884dff6c9bc0",
    title:
      "Do you intend to send bitcoin from the vault during the policy term?",
    infos: [
      {
        prompt: "Premium Discount Available",
        content:
          "If you will not move bitcoin at all during the policy, click No, and you will receive a premium discount. If you received the discount, but need to move bitcoin during the policy term anyway, an additional transaction fee will apply.",
      },
    ],
    inputs: [
      {
        id: "665a1174a8f9ec00d62a3762",
        inputType: "multiChoice",
        options: [
          {
            id: "665a1178b419e1c7004c3645",
            text: "Yes",
          },
          {
            id: "665a117d5a1fbc6c8fbe30f4",
            text: "No",
          },
        ],
      },
    ],
  },
  {
    id: "665a126e7423663a5c0fb341",
    title:
      "If you expect to send bitcoin during the policy term, choose a monthly spending limit from the insured vault.",
    description:
      "A spending limit helps AnchorWatch protect you from theft and loss. AnchorWatch will abide by the monthly limit requested during the policy term.",
    infos: [
      {
        prompt: "Premium Discount Available",
        content:
          "The lower the percentage, the higher the premium discount. E.g. a 10% monthly spending limit of your vault's value will have the highest discount, but is the most restricted in ability to send large quantities of bitcoin.",
      },
    ],
    inputs: [
      {
        id: "665a1174a8f9ec00d62a3762",
        inputType: "dropdown",
        placeholder: "Choose a % value from the options",
        options: [
          {
            id: "665a13181a5e6e37d6b5c0c0",
            text: "0 - 10%",
          },
          {
            id: "665a131c5bbb5371668f7cd3",
            text: "10 - 20%",
          },
          {
            id: "665a1344800d28409e60037a",
            text: "20 - 30%",
          },
          {
            id: "665a13529c577c4b70920bb8",
            text: "30 - 40%",
          },
          {
            id: "665a1369bc14f04320d32324",
            text: "40 - 50%",
          },
          {
            id: "665a137f83c2165fa4515709",
            text: "50 - 60%",
          },
          {
            id: "665a1389c3127108a99a58ea",
            text: "60 - 70%",
          },
          {
            id: "665a13917714bb52b0cb767f",
            text: "70 - 80%",
          },
          {
            id: "665a139f0076f3d7a99547bc",
            text: "80 - 90%",
          },
          {
            id: "665a13aa7e952072df597066",
            text: "90 - 100%",
          },
        ],
      },
    ],
  },
  {
    id: "665a13d12460856e17d44dec",
    title:
      "Bitcoin can only be sent to addresses in you whitelisted address book. To send to a new address, you will add the address to your whitelist, which will have a cool down period before becoming active.",
    description:
      "A cool down period helps AnchorWatch protect you from theft and loss. How many days do you want your cool down period?",
    infos: [
      {
        prompt: "Premium Discount Available",
        content:
          "A 7 day cool down period generates a larger premium discount.",
      },
      {
        prompt: "What is a whitelist?",
        content:
          "A whitelist contains pre-approved known bitcoin addresses where you intend to send bitcoin in the future. Because you have already verified that you trust the address, you will not face a cool down period before sending to whitelisted addresses in your address book.",
      },
    ],
    inputs: [
      {
        id: "665a14b483635fdecfa8ee56",
        inputType: "multiChoice",
        options: [
          {
            id: "665a14cc0ff262f34a83d488",
            text: "3 days",
          },
          {
            id: "665a14d3ba320511d60a6349",
            text: "7 days",
          },
        ],
      },
    ],
  },
];

export default function InsuranceApplicationSpending(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationFormDialog
      stepId="spending"
      title={STEP_TITLES.spending}
      sections={SECTIONS}
      nextCallback={props.nextCallback}
      progress={
        (CHECKPOINT_STEPS.indexOf("spending") - 1) / CHECKPOINT_STEPS.length
      }
    />
  );
}
