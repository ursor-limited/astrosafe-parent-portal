import { PALETTE, Typography, UrsorButton } from "ui";
import { OnBoardingViewLayout } from "./OnboardingFlow";
import { useState } from "react";
import { Stack } from "@mui/system";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import TimeLimitSelector from "./TimeLimitSelector";

const MAX_DURATION = 5 * 3600;

const getFormattedDuration = (duration: number) =>
  `${Math.floor(duration / 3600)}h ${Math.floor((duration % 3600) / 60)}m`;

const TimeLimitsView = (props: { onNext: () => void }) => {
  const [selectorValue, setSelectorValue] = useState<number>(35);
  return (
    <OnBoardingViewLayout
      title="Set a daily browsing time limit"
      subtitle="After this time is reached, the Browser will be locked. Don't worry, you can change this later!"
      button={
        <UrsorButton
          dark
          variant="tertiary"
          size="large"
          iconSize={22}
          endIcon={ChevronRightIcon}
          onClick={props.onNext}
        >
          Next
        </UrsorButton>
      }
    >
      <Stack alignItems="center" spacing="50px">
        <Typography variant="h0" color={PALETTE.secondary.purple[1]}>
          {getFormattedDuration((selectorValue / 100) * MAX_DURATION)}
        </Typography>
        <TimeLimitSelector value={selectorValue} setValue={setSelectorValue} />
      </Stack>
    </OnBoardingViewLayout>
  );
};

export default TimeLimitsView;
