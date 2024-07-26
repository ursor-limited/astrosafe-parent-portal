import { PALETTE, Typography, UrsorButton } from "ui";
import { useState } from "react";
import { Stack } from "@mui/system";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import TimeLimitSelector from "./selector";
import { DesktopOnBoardingViewLayout } from "../../layout/desktop";
import { MAX_DURATION, getFormattedDuration } from "./common";

const TimeLimitViewDesktopBody = (props: { onNext: () => void }) => {
  const [selectorValue, setSelectorValue] = useState<number>(35);
  return (
    <DesktopOnBoardingViewLayout
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
        <TimeLimitSelector
          width="546px"
          value={selectorValue}
          setValue={setSelectorValue}
        />
      </Stack>
    </DesktopOnBoardingViewLayout>
  );
};

export default TimeLimitViewDesktopBody;
