import { IAllowedTime } from './LimitsTab';
declare const MobileAllowedTimeRow: (props: {
    day: IAllowedTime["day"];
    times: IAllowedTime[];
    addRange: (startTime: number, endTime: number) => void;
    deleteRange: (id: IAllowedTime["id"]) => void;
    reset: () => void;
    setRangeTimes: (id: IAllowedTime["id"], startTime: IAllowedTime["startTime"], endTime: IAllowedTime["endTime"]) => void;
    smallerLabelFont?: boolean;
    halveLabelFrequency?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default MobileAllowedTimeRow;
