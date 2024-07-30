import { PALETTE, Typography, UrsorButton } from "ui";
import { useState } from "react";
import { Stack } from "@mui/system";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import TimeLimitSelector from "./selector";
import { MobileOnBoardingViewLayout } from "../../layout/mobile";
import { MAX_DURATION, getFormattedDuration } from "./common";

const TimeLimitViewMobileBody = (props: { onNext: () => void }) => {
  const [selectorValue, setSelectorValue] = useState<number>(35);
  return (
    <MobileOnBoardingViewLayout
      title="Set a daily Browser limit"
      subtitle="The Browser will lock once you've reached the time limit.  Don't worry, you can change this later!"
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
      <Stack alignItems="center" spacing="30px" width="100%">
        <Typography variant="h1" color={PALETTE.secondary.purple[1]}>
          {getFormattedDuration((selectorValue / 100) * MAX_DURATION)}
        </Typography>
        <TimeLimitSelector
          value={selectorValue}
          setValue={setSelectorValue}
          width="83%"
          barHeight="20px"
          circleSize="30px"
          spacing="0px"
        />
      </Stack>
    </MobileOnBoardingViewLayout>
  );
};

export default TimeLimitViewMobileBody;
