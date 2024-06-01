import {
  AWTextField,
  IAWFormSectionProps,
  STEP_TITLES,
} from "../InsuranceApplicationPage";
import InsuranceApplicationFormDialog, {
  IAWFormSection,
} from "../components/InsuranceApplicationFormDialog";
import { CHECKPOINT_STEPS } from "./InsuranceApplicationCheckpoints";
import { useEffect, useState } from "react";
import BitcoinIcon from "@/images/icons/BitcoinIcon.svg";

export const SECTIONS: IAWFormSection[] = [
  {
    id: "665acb83dd53c4b3be623eea",
    custom: true,
  },
];

const BITCOIN_LOCATION_INPUT_ID = "6658da211e93da88afa9de7b";
const EXCHANGE_CUSTODIAN_INPUT_ID = "6658dacf84e5fe3a6d37739e";
const ADDRESSES_INPUT_ID = "6658dd53d54478910600b2ac";

const ADDRESS_SEPARATOR = "__";

const AddressesSection = (props: IAWFormSectionProps) => {
  const [addressesN, setAddressesN] = useState<number>(2);
  const [addresses, setAddresses] = useState<string[]>([]);

  useEffect(
    () => props.setValue(ADDRESSES_INPUT_ID, addresses.join(ADDRESS_SEPARATOR)),
    [addresses]
  );
  return (
    <div
      className={`flex flex-col gap-xl opacity-0 animate-fadeIn`}
      //style={{ animationDelay: `${props.i * FADEIN_DELAY}ms` }}
    >
      <div className="text-xl font-medium text-darkTeal-2 flex flex-col gap-3xl">
        <div>{`AnchorWatch enforces a cool down period of at least three days before sending to a new bitcoin address.`}</div>
        <div>{`You can add bitcoin addresses to your whitelist address book now, which will begin the cool down period. Additional addresses can be added after your policy begins.`}</div>
      </div>
      <div className="flex flex-col gap-xl pt-[42px]">
        <div className="flex gap-xl items-center">
          <BitcoinIcon />
          <div className="font-medium text-xl">Address 1</div>
        </div>
        <div className="flex gap-lg">
          <div key={props.id} className="flex flex-col gap-1 min-w-[200px]">
            <div className="text-lg text-darkTeal-2">Nickname</div>
            <AWTextField
              value={
                props.answers?.find(
                  (a) => a.inputId === EXCHANGE_CUSTODIAN_INPUT_ID
                )?.value
              }
              setValue={(v) => props.setValue(EXCHANGE_CUSTODIAN_INPUT_ID, v)}
              placeholder="Up to 15 characters"
            />
          </div>
          <div key={props.id} className="flex flex-col w-full gap-1">
            <div className="text-lg text-darkTeal-2">BTC address</div>
            <AWTextField
              value={
                props.answers?.find(
                  (a) => a.inputId === EXCHANGE_CUSTODIAN_INPUT_ID
                )?.value
              }
              setValue={(v) => props.setValue(EXCHANGE_CUSTODIAN_INPUT_ID, v)}
              placeholder="Default Input Text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function InsuranceApplicationWhitelist(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationFormDialog
      stepId="whitelist"
      title={STEP_TITLES.insuranceNeeds}
      sections={SECTIONS}
      customSections={{
        "665acb83dd53c4b3be623eea": AddressesSection,
      }}
      nextCallback={props.nextCallback}
      progress={
        (CHECKPOINT_STEPS.indexOf("whitelist") - 1) / CHECKPOINT_STEPS.length
      }
    />
  );
}
