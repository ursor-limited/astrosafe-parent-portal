import _ from "lodash";
import InsuranceApplicationCheckpointDialog from "../../components/InsuranceApplicationCheckpointDialog";
import { STEP_TITLES } from "../../InsuranceApplicationPage";

export default function InsuranceApplicationCheckpointsSubmit(props: {
  nextCallback: () => void;
}) {
  return (
    <InsuranceApplicationCheckpointDialog
      title={STEP_TITLES.submit}
      subtitle="The application is ready to submit. Please proceed to the Underwriting & Concierge Fee"
      buttonText="Proceed to payment"
      buttonCallback={props.nextCallback}
    />
  );
}
