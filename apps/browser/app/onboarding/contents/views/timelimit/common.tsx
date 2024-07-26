import TimeLimitViewMobileBody from "./body-mobile";
import TimeLimitViewDesktopBody from "./body-desktop";

export const MAX_DURATION = 5 * 3600;

export const getFormattedDuration = (duration: number) =>
  `${Math.floor(duration / 3600)}h ${Math.floor((duration % 3600) / 60)}m`;

const TimeLimitView = (props: { onNext: () => void; isMobile?: boolean }) =>
  props.isMobile ? (
    <TimeLimitViewMobileBody onNext={props.onNext} />
  ) : (
    <TimeLimitViewDesktopBody onNext={props.onNext} />
  );

export default TimeLimitView;
