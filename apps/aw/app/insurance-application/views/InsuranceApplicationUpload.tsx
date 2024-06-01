import InsuranceApplicationDialog from "../components/InsuranceApplicationDialog";
import { STEP_TITLES } from "../InsuranceApplicationPage";
import { AWButton } from "@/components/AWButton";
import _ from "lodash";
import { CHECKPOINT_STEPS } from "../components/InsuranceApplicationCheckpointDialog";
import DocumentIcon from "@/images/icons/DocumentIcon.svg";

const BULLETPOINTS = [
  "Licenses issued by regulatory body.",
  "Audited financial statements: Form 10-K, prospectus, balance sheet, liabilities, or similar documents.",
  "Business bank statement (must be a USD bank account in the name of your business with a U.S. bank, with the statement within past three months).",
  "W9 Form (signed).",
  "SOC 1, SOC 2 or similar certification.",
  "Internal Compliance Documentation (Including but not limited to company standards or policies on business ethics and conflicts of interest).",
];

export default function InsuranceApplicationUpload(props: {
  nextCallback: () => void;
}) {
  console.log(CHECKPOINT_STEPS.indexOf("upload") / CHECKPOINT_STEPS.length);
  return (
    <InsuranceApplicationDialog
      title={STEP_TITLES.upload}
      // leftCallback={() => setStepIndex(stepIndex - 1)}
      // rightCallback={() => setStepIndex(stepIndex + 1)}
      progress={CHECKPOINT_STEPS.indexOf("upload") / CHECKPOINT_STEPS.length}
    >
      <div className="w-[600px] h-full justify-center flex flex-col gap-8xl py-[64px]">
        <div className="flex flex-col gap-xl font-medium text-xl text-darkTeal-2">
          <div>Upload the following documents to finish your application.</div>
          <div>
            If the documents are available, they are considered mandatory. If
            the company doesn&apos;t have audited financial documents, please
            upload a Pro Forma and Balance Sheet listing assets in their place.
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
