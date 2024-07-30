import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import ChevronDownIcon from "@/images/icons/ChevronDown.svg";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import ShieldLockIcon from "@/images/icons/ShieldLockIcon.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import { MobileOnBoardingViewLayout } from "../../layout/mobile";

const ConfigurationIntroStepCard = (props: {
  n: number;
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}) => (
  <Stack
    height="82px"
    width="100%"
    borderRadius="12px"
    border={`2.5px solid ${PALETTE.secondary.purple[1]}`}
    sx={{
      svg: {
        path: {
          fill: PALETTE.secondary.purple[1],
        },
      },
    }}
    justifyContent="space-between"
    alignItems="center"
    spacing="24px"
    direction="row"
    px="24px"
    boxSizing="border-box"
  >
    <Stack direction="row" spacing="22px" alignItems="center">
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
    <props.icon width="29px" height="29px" />
  </Stack>
);

const IntroStepViewMobileBody = (props: { onNext: () => void }) => (
  <MobileOnBoardingViewLayout
    title="Get your browser ready in 3 simple steps"
    subtitle="This will only take a few minutes to make your Browser safe, secure and full of Content that you and your kids love!"
    button={
      <UrsorButton
        dark
        variant="tertiary"
        size="large"
        iconSize={22}
        endIcon={ChevronRightIcon}
        onClick={props.onNext}
      >
        Get started
      </UrsorButton>
    }
  >
    <Stack
      width="100%"
      sx={{
        svg: {
          path: {
            fill: PALETTE.secondary.purple[1],
          },
        },
      }}
      spacing="8px"
      alignItems="center"
    >
      <ConfigurationIntroStepCard
        icon={ShieldLockIcon}
        n={1}
        title="Select the appropriate age"
      />
      <ChevronDownIcon height="32px" width="32px" />
      <ConfigurationIntroStepCard
        icon={VerifiedIcon}
        n={2}
        title="Choose content you love"
      />
      <ChevronDownIcon height="32px" width="32px" />
      <ConfigurationIntroStepCard
        icon={GlobeIcon}
        n={3}
        title="Set your time limits"
      />
    </Stack>
  </MobileOnBoardingViewLayout>
);

export default IntroStepViewMobileBody;
