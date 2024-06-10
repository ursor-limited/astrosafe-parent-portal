import _ from "lodash";
import dynamic from "next/dynamic";
import { PERSONAL_FLOW_STEP_TITLES } from "./controller";

const InsuranceApplicationCheckpointDialog = dynamic(
  () => import("./checkpoint-dialog"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export default function InsuranceApplicationPersonalCheckpointsStart(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationCheckpointDialog
      title={PERSONAL_FLOW_STEP_TITLES.start}
      subtitle="The application intake form consists of the following sections."
      buttonText="Start"
      buttonCallback={props.nextCallback}
      info={{
        prompt: "You can come back anytime",
        content:
          "We automatically save your progress. So you can leave and come back to this application as you wish.",
      }}
    />
  );
}
