import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import ShieldLockIcon from "@/images/icons/ShieldLockIcon.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";

const ConfigurationIntroStepCard = (props: {
  n: number;
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}) => (
  <Stack
    width="202px"
    height="185px"
    borderRadius="12px"
    border={`2.5px solid ${PALETTE.secondary.purple[1]}`}
    sx={{
      svg: {
        path: {
          fill: PALETTE.secondary.purple[1],
        },
      },
    }}
    justifyContent="center"
    alignItems="center"
    spacing="24px"
  >
    <props.icon width="34px" height="34px" />
    <Stack spacing="4px" alignItems="center" width="162px">
      <Typography variant="h5" color="rgba(255,255,255,0.9)">
        {props.n}
      </Typography>
      <Typography
        variant="medium"
        bold
        color="rgba(255,255,255,0.9)"
        sx={{ textAlign: "center" }}
      >
        {props.title}
      </Typography>
    </Stack>
  </Stack>
);

export const INTRO_STEP_TITLE = "Let's configure your browser in 3 steps";
const IntroStepView = (props: { onNext: () => void }) => (
  <>
    <Stack
      flex={1}
      sx={{
        svg: {
          path: {
            fill: PALETTE.secondary.purple[1],
          },
        },
      }}
      direction="row"
      spacing="18px"
      alignItems="center"
    >
      <ConfigurationIntroStepCard
        icon={ShieldLockIcon}
        n={1}
        title="Configure your security settings"
      />
      <ChevronRightIcon height="32px" width="32px" />
      <ConfigurationIntroStepCard
        icon={VerifiedIcon}
        n={2}
        title="Select your approved Content"
      />
      <ChevronRightIcon height="32px" width="32px" />
      <ConfigurationIntroStepCard
        icon={GlobeIcon}
        n={3}
        title="Set up your personal Browser"
      />
    </Stack>
    <UrsorButton
      dark
      variant="tertiary"
      size="large"
      iconSize={22}
      endIcon={ChevronRightIcon}
      onClick={props.onNext}
    >
      Let's get started
    </UrsorButton>
  </>
);

export default IntroStepView;
