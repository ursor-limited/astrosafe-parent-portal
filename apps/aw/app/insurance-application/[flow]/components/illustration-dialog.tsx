import { AWButton } from "@/components/AWButton";
import InsuranceApplicationDialog from "./dialog";
import { IAWInfoLineProps } from "@/components/AWInfoLine";
import dynamic from "next/dynamic";
import { useLottie } from "lottie-react";
import { AWInsuranceApplicationMainFlowStep } from "../mainFlow/controller";
import { AWInsuranceApplicationInvitedFlowStep } from "../invitedFlows/controller";
import { AWInsuranceApplicationPersonalFlowStep } from "../personalFlow/controller";

const AWInfoLine = dynamic(
  () => import("@/components/AWInfoLine"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const VaultLottie = dynamic(() => import("./vault-lottie"), { ssr: false });
export default function InsuranceApplicationIllustrationDialog(props: {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonCallback?: () => void;
  buttonDisabled?: boolean;
  info?: IAWInfoLineProps;
  progress?: number;
  illustration?: React.ReactNode;
  children?: React.ReactNode;
  backbuttonStep?:
    | AWInsuranceApplicationMainFlowStep
    | AWInsuranceApplicationInvitedFlowStep
    | AWInsuranceApplicationPersonalFlowStep;
}) {
  return (
    <InsuranceApplicationDialog
      title={props.title}
      progress={props.progress}
      backbuttonStep={props.backbuttonStep}
    >
      <div className="h-full  w-full flex" style={{ minHeight: "inherit" }}>
        <div
          className="h-full flex flex-col p-3xl gap-[74px] h-full w-[525px] justify-between border-r-2 border-r-greyscale-6"
          style={{ minHeight: "inherit" }}
        >
          <div className="h-full flex flex-col gap-3xl">
            {props.subtitle ? (
              <div className="font-medium text-xl text-darkTeal-2">
                {props.subtitle}
              </div>
            ) : null}
            {props.children}
          </div>
          <div className="flex flex-col gap-lg">
            {props.info ? <AWInfoLine {...props.info} /> : null}
            {props.buttonCallback ? (
              <AWButton
                onClick={props.buttonCallback}
                disabled={props.buttonDisabled}
              >
                {props.buttonText || "Next"}
              </AWButton>
            ) : null}
          </div>
        </div>
        <div className="flex flex-1 justify-center items-center">
          {props.illustration || <VaultLottie />}
        </div>
      </div>
    </InsuranceApplicationDialog>
  );
}
