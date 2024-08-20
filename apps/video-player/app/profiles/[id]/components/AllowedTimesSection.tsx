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
  deleteRange: (id: IAllowedTime["id"]) => void;
  topRightElement?: React.ReactNode;
  smallerLabelFont?: boolean;
  halveLabelFrequency?: boolean;
  disabled: boolean;
}) => (
  <AstroBentoCard
    title="Time scheduler"
    info={{
      title: "Set when the Browser can be used",
      text: "Select the times of the day when you want the Browser to be accessible. Click add to create a new time period if you want an offline period in the middle of the day. Turn this off to allow the Browser to be accessible 24/7.",
    }}
    notCollapsible
    topRightStuff={props.topRightElement}
  >
    {props.allowedTimes ? (
      <Stack
        spacing="36px"
        pb="12px"
        sx={{
          opacity: props.disabled ? 0.4 : 1,
          pointerEvents: props.disabled ? "none" : undefined,
          transition: "0.2s",
        }}
      >
        {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day, i) => (
          <AllowedTimeRow
            key={day}
            dayName={day}
            times={props.allowedTimes.filter((t) =>
              day === "sun" ? t.day === 0 : t.day === i + 1
            )}
            deleteRange={props.deleteRange}
            reset={() => props.reset(day === "sun" ? 0 : i + 1)}
            addAllowedTime={(startTime, endTime) =>
              props.addTimeLimit(day === "sun" ? 0 : i + 1, startTime, endTime)
            }
            setAllowedTimes={props.setAllowedTimes}
            halveLabelFrequency={props.halveLabelFrequency}
          />
        ))}
      </Stack>
    ) : null}
  </AstroBentoCard>
);

export default AllowedTimesSection;
