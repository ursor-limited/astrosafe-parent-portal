import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import { Stack } from "@mui/system";
import _ from "lodash";
import { IAllowedTime } from "./LimitsTab";
import AllowedTimeRow from "./AllowedTimeRow";

const AllowedTimesSection = (props: {
  allowedTimes: IAllowedTime[];
  setAllowedTimes: (
    id: IAllowedTime["id"],
    startTime: IAllowedTime["startTime"],
    endTime: IAllowedTime["endTime"]
  ) => void;
  addTimeLimit: (day: number, startTime: number, endTime: number) => void;
  reset: (day: IAllowedTime["day"]) => void;
  topRightElement?: React.ReactNode;
  smallerLabelFont?: boolean;
  halveLabelFrequency?: boolean;
}) => (
  <AstroBentoCard
    title="Allowed browsing time"
    subtitle="Select when you want the Browser to be online. Turn this off to remove schedules."
    info={{
      title: "Set when the Browser can be used",
      body: "Select the times of the day when you want the Browser to be accessible. Click add to create a new time period if you want an offline period in the middle of the day. Turn this off to allow the Browser to be accessible 24/7.",
    }}
    notCollapsible
    topRightStuff={props.topRightElement}
  >
    {props.allowedTimes ? (
      <Stack spacing="36px" pb="12px">
        {["sun"].map((day, i) => (
          <AllowedTimeRow
            key={day}
            dayName={day}
            times={props.allowedTimes.filter((t) => t.day === i)}
            reset={() => props.reset(i)}
            addAllowedTime={(startTime, endTime) =>
              props.addTimeLimit(i, startTime, endTime)
            }
            setAllowedTimes={props.setAllowedTimes}
          />
        ))}
      </Stack>
    ) : null}
  </AstroBentoCard>
);

export default AllowedTimesSection;
