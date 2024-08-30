import { IAllowedTime } from './LimitsTab';
declare const useNewSegmentTimes: (times: IAllowedTime[]) => {
    newSegmentTimes: [number, number] | null;
    clearNewSegmentTimes: () => void;
};
export default useNewSegmentTimes;
