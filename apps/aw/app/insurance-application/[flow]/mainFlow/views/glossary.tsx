import { MAIN_FLOW_STEP_TITLES } from "../controller";
import InsuranceApplicationIllustrationDialog from "../../components/illustration-dialog";

const TERMS = [
  {
    term: "Vault",
    explanation:
      "A Trident Vault is the on-chain location of your insured bitcoin. It is protected by multiple Signing Devices held by you and AnchorWatch. You can view your vaults in the Trident dashboard.",
  },
  {
    term: "Signing Device",
    explanation:
      "Signing Devices are commonly known as Hardware Wallets and are physical devices used to sign transactions and send bitcoin from your vault. They must be stored according to AnchorWatch's policies.",
  },
  {
    term: "Key Holder",
    explanation:
      "Key Holders are the individuals who hold and are responsible for the storage and use of Signing Devices. Each vault has three Signing Devices. You will assign Key Holders during the application process.",
  },
];

export default function InsuranceApplicationGlossary(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationIllustrationDialog
      title={MAIN_FLOW_STEP_TITLES.glossary}
      subtitle="The application will refer to the following terms."
      buttonCallback={props.nextCallback}
    >
      <div className="flex flex-col gap-[16px]">
        {TERMS.map((t, i) => (
          <div key={i} className="flex flex-col gap-[6px]">
            <div className="flex items-center h-[40px] font-medium text-xl text-darkTeal-2">
              {t.term}
            </div>
            <div className="text-lg text-darkTeal-5">{t.explanation}</div>
          </div>
        ))}
      </div>
    </InsuranceApplicationIllustrationDialog>
  );
}
