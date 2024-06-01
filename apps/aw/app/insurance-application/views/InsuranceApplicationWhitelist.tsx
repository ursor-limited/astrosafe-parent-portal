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
import PlusIcon from "@/images/icons/PlusIcon.svg";
import XIcon from "@/images/icons/XIcon.svg";
import { AWButton } from "@/components/AWButton";

interface IWhitelistAddress {
  nickname: string;
  address: string;
}

export const SECTIONS: IAWFormSection[] = [
  {
    id: "665acb83dd53c4b3be623eea",
    custom: true,
  },
];

const INPUT_ID = "665ad25ea88f15e7f1c98af6";

const AddressesSection = (props: IAWFormSectionProps) => {
  const [addresses, setAddresses] = useState<IWhitelistAddress[]>([]);
  const [modified, setModified] = useState<boolean>(false);

  useEffect(() => {
    if (addresses.length === 0 || !modified) {
      const addresses_ = props.answers?.find((a) => a.inputId === INPUT_ID)
        ?.value;
      if (addresses_) {
        setAddresses(addresses_);
        setModified(true);
      } else {
        addRow();
      }
    }
  }, [props.answers]);

  useEffect(() => {
    modified && addresses && props.setValue(INPUT_ID, addresses);
  }, [addresses]);

  const addRow = () => {
    setAddresses((prev) => [...prev, { nickname: "", address: "" }]);
  };

  return (
    <div className={`flex flex-col gap-xl opacity-0 animate-fadeIn`}>
      <div className="text-xl font-medium text-darkTeal-2 flex flex-col gap-3xl">
        <div>{`AnchorWatch enforces a cool down period of at least three days before sending to a new bitcoin address.`}</div>
        <div>{`You can add bitcoin addresses to your whitelist address book now, which will begin the cool down period. Additional addresses can be added after your policy begins.`}</div>
      </div>
      <div className="flex flex-col gap-5xl">
        {addresses?.map((address, i) => (
          <WhitelistAddressRow
            key={i}
            i={i + 1}
            value={address}
            setNickname={(n) =>
              setAddresses([
                ...addresses.slice(0, i),
                { nickname: n, address: address.address },
                ...addresses.slice(i + 1),
              ])
            }
            setAddress={(a) =>
              setAddresses([
                ...addresses.slice(0, i),
                { nickname: address.nickname, address: a },
                ...addresses.slice(i + 1),
              ])
            }
            delete={
              addresses.length > 1
                ? () =>
                    setAddresses([
                      ...addresses.slice(0, i),
                      ...addresses.slice(i + 1),
                    ])
                : undefined
            }
          />
        ))}
      </div>
      <AWButton
        onClick={() => {
          addRow();
          setModified(true);
        }}
        width="100%"
        variant="secondary"
        icon={PlusIcon}
      >
        Add another address
      </AWButton>
    </div>
  );
};

const WhitelistAddressRow = (props: {
  i: number;
  value: IWhitelistAddress;
  setNickname: (n: IWhitelistAddress["nickname"]) => void;
  setAddress: (a: IWhitelistAddress["address"]) => void;
  delete?: () => void;
}) => (
  <div className="flex flex-col gap-xl pt-[42px] animate-fadeIn">
    <div className="flex gap-xl items-center">
      <BitcoinIcon />
      <div className="font-medium text-xl">{`Address ${props.i}`}</div>
    </div>
    <div className="flex gap-lg relative">
      <div className="flex flex-col gap-1 min-w-[200px]">
        <div className="text-lg text-darkTeal-2">Nickname</div>
        <AWTextField
          value={props.value.nickname}
          setValue={props.setNickname}
          placeholder="Up to 15 characters"
        />
      </div>
      <div className="flex flex-col w-full gap-1">
        <div className="text-lg text-darkTeal-2">BTC address</div>
        <AWTextField
          value={props.value.address}
          setValue={props.setAddress}
          placeholder="Default Input Text"
        />
      </div>
      {props.delete ? (
        <div
          onClick={props.delete}
          className="absolute right-[-30px] bottom-[17px] hover:opacity-60 cursor-pointer duration-200"
        >
          <XIcon />
        </div>
      ) : null}
    </div>
  </div>
);

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
      canProceed
      nextCallback={props.nextCallback}
      progress={
        (CHECKPOINT_STEPS.indexOf("whitelist") - 1) / CHECKPOINT_STEPS.length
      }
    />
  );
}
