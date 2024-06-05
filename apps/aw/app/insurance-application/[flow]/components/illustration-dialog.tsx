import { AWButton } from "@/components/AWButton";
import InsuranceApplicationDialog from "./dialog";
import VaultIllustration from "@/images/VaultIllustration.svg";
import AWInfoLine, { IAWInfoLineProps } from "@/components/AWInfoLine";

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
}) {
  return (
    <InsuranceApplicationDialog title={props.title} progress={props.progress}>
      <div className="h-full w-full flex">
        <div className="flex flex-col p-3xl gap-[74px] h-full w-[525px] items-between border-r-2 border-r-greyscale-6">
          <div className="flex flex-col gap-3xl">
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
          {props.illustration || <VaultIllustration />}
        </div>
      </div>
    </InsuranceApplicationDialog>
  );
}
