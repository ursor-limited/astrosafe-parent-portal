import { IAllowedTime } from './LimitsTab';
declare const AllowedTimesSection: (props: {
    allowedTimes: IAllowedTime[];
    setAllowedTimes: (id: IAllowedTime["id"], startTime: IAllowedTime["startTime"], endTime: IAllowedTime["endTime"]) => void;
    addTimeLimit: (day: number, startTime: number, endTime: number) => void;
    reset: (day: IAllowedTime["day"]) => void;
    deleteRange: (id: IAllowedTime["id"]) => void;
    topRightElement?: React.ReactNode;
    smallerLabelFont?: boolean;
    halveLabelFrequency?: boolean;
    disabled: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default AllowedTimesSection;
