import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import { Stack } from "@mui/system";
import BrowsingTimeSelector from "./AllowedTimeSelector";
import { PALETTE, Typography, UrsorButton } from "ui";
import _ from "lodash";
import { IAllowedTime } from "./LimitsTab";
import dayjs from "dayjs";

const AllowedTimesSection = (props: {
  allowedTimes: IAllowedTime[];
  setAllowedTimes: (
    id: IAllowedTime["id"],
    startTime: IAllowedTime["startTime"],
    endTime: IAllowedTime["endTime"]
  ) => void;
  addTimeLimit: (day: number) => void;
  reset: (day: IAllowedTime["day"]) => void;
  topRightElement?: React.ReactNode;
  smallerLabelFont?: boolean;
  halveLabelFrequency?: boolean;
}) => {
  return (
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
          {["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map((day, i) => {
            const times = props.allowedTimes.filter((t) => t.day === i);
            return (
              <Stack key={day} direction="row" alignItems="center">
                <Stack width="120px">
                  <Typography bold color={PALETTE.secondary.grey[3]}>
                    {_.capitalize(day)}
                  </Typography>
                </Stack>
                <BrowsingTimeSelector
                  times={times}
                  setTimes={props.setAllowedTimes}
                  smallerLabelFont={props.smallerLabelFont}
                  halveLabelFrequency={props.halveLabelFrequency}
                />
                <Stack pl="60px" direction="row" spacing="8px">
                  <UrsorButton
                    size="small"
                    variant="secondary"
                    backgroundColor="rgb(255,255,255)"
                    onClick={() => props.addTimeLimit(i)}
                    disabled={
                      times.length === 1 &&
                      dayjs(times[0].endTime).diff(
                        times[0].startTime,
                        "hours"
                      ) >= 23
                    }
                  >
                    Add
                  </UrsorButton>
                  <UrsorButton
                    size="small"
                    variant="secondary"
                    backgroundColor={PALETTE.secondary.grey[1]}
                    borderColor={PALETTE.secondary.grey[1]}
                    onClick={() => props.reset(i)}
                  >
                    Reset
                  </UrsorButton>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      ) : null}
    </AstroBentoCard>
  );
};

export default AllowedTimesSection;
