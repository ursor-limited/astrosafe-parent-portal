import IntroStepViewDesktopBody from "./body-desktop";
import IntroStepViewMobileBody from "./body-mobile";

const IntroStepView = (props: { onNext: () => void; isMobile?: boolean }) =>
  props.isMobile ? (
    <IntroStepViewMobileBody onNext={props.onNext} />
  ) : (
    <IntroStepViewDesktopBody onNext={props.onNext} />
  );

export default IntroStepView;
