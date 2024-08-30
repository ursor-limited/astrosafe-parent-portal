import { ITimeLimit } from './LimitsTab';
declare const TimeLimitsSection: (props: {
    timeLimits: ITimeLimit[];
    decrement: (day: number) => void;
    increment: (day: number) => void;
    topRightElement?: React.ReactNode;
    disabled: boolean;
    isMobile?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default TimeLimitsSection;
