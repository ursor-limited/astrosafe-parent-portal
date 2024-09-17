import React from 'react';
import { IAllowedTime } from './LimitsTab';
declare const MobileAllowedTimesSection: (props: {
    allowedTimes: IAllowedTime[];
    setAllowedTime: (id: IAllowedTime["id"], startTime: IAllowedTime["startTime"], endTime: IAllowedTime["endTime"]) => void;
    deleteRange: (id: IAllowedTime["id"]) => void;
    addTimeLimit: (day: number, startTime: number, endTime: number) => void;
    reset: (day: IAllowedTime["day"]) => void;
    topRightElement?: React.ReactNode;
    smallerLabelFont?: boolean;
    disabled: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default MobileAllowedTimesSection;
