import { useEffect, useState } from "react";
import { IAllowedTime } from "./LimitsTab";
import dayjs from "dayjs";
import _ from "lodash";

const MIN_ALLOWED_TIME_ADDITION_PERIOD = 0.75; // hour

const useNewSegmentTimes = (times: IAllowedTime[]) => {
  const [newSegmentTimes, setNewSegmentTimes] = useState<
    [number, number] | null
  >(null);
  useEffect(() => {
    if (times && times.length > 0) {
      var possibleStartTime = 0;
      var possibleEndTime =
        dayjs(times[0].startTime).utc().hour() +
        (dayjs(times[0].startTime).utc().minute() - 30) / 60;
      var finalizedStartTime;
      var finalizedEndTime;
      for (let i = 0; i < times.length + 1; i++) {
        if (
          possibleStartTime < possibleEndTime &&
          possibleEndTime - possibleStartTime >=
            MIN_ALLOWED_TIME_ADDITION_PERIOD
        ) {
          finalizedStartTime = possibleStartTime;
          finalizedEndTime = possibleEndTime;
          break;
        } else if (i + 1 < times.length) {
          possibleStartTime =
            dayjs(times[i].endTime).utc().hour() +
            (dayjs(times[i].endTime).utc().minute() + 30) / 60;
          possibleEndTime =
            dayjs(times[i + 1].startTime)
              .utc()
              .hour() +
            (dayjs(times[i + 1].startTime)
              .utc()
              .minute() -
              30) /
              60;
        } else if (
          i + 1 === times.length &&
          dayjs(times[i].endTime).utc().hour() > 0 // if the end time's hour is 0 at this point, it is at midnight so there is no space
        ) {
          possibleStartTime =
            dayjs(times[i].endTime).utc().hour() +
            (dayjs(times[i].endTime).utc().minute() + 30) / 60;
          possibleEndTime = 24;
        }
      }
      if (_.isNumber(finalizedStartTime) && finalizedEndTime) {
        setNewSegmentTimes([finalizedStartTime, finalizedEndTime]);
      } else {
        setNewSegmentTimes(null);
      }
    }
  }, [times]);

  return {
    newSegmentTimes,
    clearNewSegmentTimes: () => setNewSegmentTimes(null),
  };
};

export default useNewSegmentTimes;
