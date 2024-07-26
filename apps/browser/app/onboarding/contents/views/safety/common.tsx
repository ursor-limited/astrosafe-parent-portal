import _ from "lodash";
import SafetyStepViewDesktopBody from "./body-desktop";
import SafetyStepViewMobileBody from "./body-mobile";

const SafetyStepView = (props: { onNext: () => void; isMobile?: boolean }) => {
  return props.isMobile ? (
    <SafetyStepViewMobileBody onNext={props.onNext} />
  ) : (
    <SafetyStepViewDesktopBody onNext={props.onNext} />
  );
};

export default SafetyStepView;
