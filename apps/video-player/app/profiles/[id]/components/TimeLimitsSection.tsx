import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import { Stack } from "@mui/system";
import _ from "lodash";
import { ITimeLimit } from "./LimitsTab";
import TimeLimitRow from "./TimeLimitRow";

const TimeLimitsSection = (props: {
  timeLimits: ITimeLimit[];
  decrement: (day: number) => void;
  increment: (day: number) => void;
  topRightElement?: React.ReactNode;
}) => (
  <AstroBentoCard
    title="Daily limits"
    subtitle="Set a daily browsing limit"
    notCollapsible
    info={{
      title: "Setting your daily limits",
      body: "This is the total amount of time you are happy with being spent on the Browser for the specific day. Turn this off to remove all time limits.",
    }}
    topRightStuff={props.topRightElement}
  >
    <Stack spacing="36px" pb="12px">
      {["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map((day, i) => (
        <TimeLimitRow
          key={day}
          dayName={day}
          decrement={() => props.decrement(i)}
          increment={() => props.increment(i)}
          allowedMinutes={
            props.timeLimits.find((l) => l.day === i)?.allowedMinutes ?? 0
          }
        />
      ))}
    </Stack>
  </AstroBentoCard>
);
export default TimeLimitsSection;
