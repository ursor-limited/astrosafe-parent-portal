import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import { Stack } from "@mui/system";
import _ from "lodash";
import { PALETTE, Typography } from "ui";
import { ITimeLimit } from "./LimitsTab";
import TimeMinusIcon from "@/images/icons/TimeMinusIcon.svg";
import TimePlusIcon from "@/images/icons/TimePlusIcon.svg";

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
        <Stack
          key={day}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="large" bold color={PALETTE.secondary.grey[3]}>
            {_.capitalize(day)}
          </Typography>
          <Stack direction="row" spacing="6px" alignItems="center">
            <Stack
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.6 },
                transition: "0.2s",
              }}
              onClick={() => props.decrement(i)}
            >
              <TimeMinusIcon height="20px" width="20px" />
            </Stack>
            <Stack width="86px" alignItems="center">
              <Typography variant="large" bold>{`${Math.floor(
                Math.min(
                  (props.timeLimits.find((l) => l.day === i)?.allowedMinutes ??
                    0) / 60
                )
              )}:${
                (props.timeLimits.find((l) => l.day === i)?.allowedMinutes ??
                  0) % 60 || "00"
              } hr`}</Typography>
            </Stack>
            <Stack
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.6 },
                transition: "0.2s",
              }}
              onClick={() => props.increment(i)}
            >
              <TimePlusIcon height="20px" width="20px" />
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Stack>
  </AstroBentoCard>
);

export default TimeLimitsSection;
