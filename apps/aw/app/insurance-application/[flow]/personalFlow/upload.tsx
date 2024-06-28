import InsuranceApplicationDialog from "../components/dialog";
import { AWButton } from "@/components/AWButton";
import _ from "lodash";
import DocumentIcon from "@/images/icons/DocumentIcon.svg";
import { CHECKPOINT_STEPS } from "./checkpoint-dialog";
import { MAIN_FLOW_STEP_TITLES } from "../mainFlow/controller";

const BULLETPOINTS = [
  "Bank statement (USD bank account in the U.S. bank, with the statement within past three months).",
  "Statement of Approximate Net Worth. Please provide the approximate collar value by Asset Class (Real estate, equities, cash, bonds, bitcoin, crypto, etc.).",
];

export default function InsuranceApplicationPersonalUpload(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationDialog
      title={MAIN_FLOW_STEP_TITLES.upload}
      progress={CHECKPOINT_STEPS.indexOf("upload") / CHECKPOINT_STEPS.length}
      backbuttonStep={CHECKPOINT_STEPS[CHECKPOINT_STEPS.indexOf("upload") - 1]}
    >
      <div className="w-[600px] h-full justify-center flex flex-col gap-8xl py-[64px]">
        <div className="flex flex-col gap-xl font-medium text-xl text-darkTeal-2">
          <div>
            Upload the following documents to finish your application. If the
            documents are available, they are considered mandatory.
          </div>
        </div>
        <div className="flex flex-col gap-xl text-xl text-darkTeal-2">
          <div className="flex gap-lg">
            <DocumentIcon />
            <div className="font-medium">Document list</div>
          </div>
          <div className="flex flex-col gap-lg">
            {BULLETPOINTS.map((b, i) => (
              <div key={i} className="flex gap-lg pl-[15px]">
                <div className="pt-[10px]">
                  <div className="min-h-[6px] min-w-[6px] bg-darkTeal-5 rounded-full" />
                </div>
                <div>{b}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full justify-center flex gap-[16px] items-center">
          <AWButton
            width={182}
            variant="secondary"
            onClick={() => console.log("hook up your snazzy upload func here")}
          >
            Upload
          </AWButton>
          <AWButton width={182} onClick={() => props.nextCallback?.()}>
            Next
          </AWButton>
        </div>
      </div>
    </InsuranceApplicationDialog>
  );
}
