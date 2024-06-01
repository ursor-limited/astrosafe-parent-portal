import _ from "lodash";
//import InsuranceApplicationCheckpointDialog from "../../components/InsuranceApplicationCheckpointDialog";
import { STEP_TITLES } from "../../InsuranceApplicationPage";
import dynamic from "next/dynamic";

const InsuranceApplicationCheckpointDialog = dynamic(
  () => import("../../components/InsuranceApplicationCheckpointDialog"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export default function InsuranceApplicationCheckpointsStart(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationCheckpointDialog
      title={STEP_TITLES.start}
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
