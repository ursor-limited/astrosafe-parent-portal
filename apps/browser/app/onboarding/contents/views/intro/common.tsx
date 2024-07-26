import IntroStepViewDesktopBody from "./body-desktop";
import IntroStepViewMobileBody from "./body-mobile";

const IntroStepView = (props: { onNext: () => void; isMobile?: boolean }) =>
  props.isMobile ? (
    <IntroStepViewDesktopBody onNext={props.onNext} />
  ) : (
    <IntroStepViewMobileBody onNext={props.onNext} />
  );

export default IntroStepView;
