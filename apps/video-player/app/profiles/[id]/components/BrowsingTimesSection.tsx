import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import { Stack } from "@mui/system";
import BrowsingTimeSelector from "./BrowsingTimeSelector";
import { PALETTE, Typography, UrsorButton } from "ui";
import _ from "lodash";
import { IAllowedTime } from "./LimitsTab";

const BrowsingTimesSection = (props: {
  allowedTimes: IAllowedTime[];
  setAllowedTimes: (day: number, startTime: string, endTime: string) => void;
  addTimeLimit: (day: number) => void;
  reset: (day: number) => void;
  topRightElement?: React.ReactNode;
}) => (
  <AstroBentoCard
    title="Allowed browsing time"
    subtitle="Select when you want the Browser to be online. Turn this off to remove schedules."
    info={{
      title: "Buu",
      body: "Maybe not the best char in Smash Bros, but Kirby is defo much better than Jigglypuff.",
    }}
    notCollapsible
    topRightStuff={props.topRightElement}
  >
    {props.allowedTimes ? (
      <Stack spacing="36px" pb="12px">
        {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day, i) => (
          <Stack key={day} direction="row" alignItems="center">
            <Stack width="120px">
              <Typography bold color={PALETTE.secondary.grey[3]}>
                {_.capitalize(day)}
              </Typography>
            </Stack>
            <BrowsingTimeSelector
              times={props.allowedTimes.filter((t) => t.day === i)}
              setTimes={props.setAllowedTimes}
            />
            <Stack pl="60px" direction="row" spacing="8px">
              <UrsorButton
                size="small"
                variant="secondary"
                backgroundColor="rgb(255,255,255)"
                onClick={() => props.addTimeLimit(i)}
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
        ))}
      </Stack>
    ) : null}
  </AstroBentoCard>
);

export default BrowsingTimesSection;
