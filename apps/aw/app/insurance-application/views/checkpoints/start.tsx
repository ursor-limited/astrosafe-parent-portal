import _ from "lodash";
import InsuranceApplicationCheckpointDialog from "../../components/InsuranceApplicationCheckpointDialog";
import { STEP_TITLES } from "../../InsuranceApplicationPage";

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
