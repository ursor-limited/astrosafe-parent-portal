import { IAllowedTime } from './LimitsTab';
declare const AllowedTimeRow: (props: {
    dayName: string;
    times: IAllowedTime[];
    addAllowedTime: (startTime: number, endTime: number) => void;
    reset: () => void;
    deleteRange: (id: IAllowedTime["id"]) => void;
    setAllowedTimes: (id: IAllowedTime["id"], startTime: IAllowedTime["startTime"], endTime: IAllowedTime["endTime"]) => void;
    smallerLabelFont?: boolean;
    halveLabelFrequency?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default AllowedTimeRow;
