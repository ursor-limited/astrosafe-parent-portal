import { ITimeLimit } from './LimitsTab';
declare const TimeLimitRow: (props: {
    dayName: string;
    allowedMinutes: ITimeLimit["allowedMinutes"];
    decrement: () => void;
    increment: () => void;
}) => import("react/jsx-runtime").JSX.Element;
export default TimeLimitRow;
