import { Stack } from "@mui/system";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import ArrowLeftIcon from "@/images/icons/ArrowLeftIcon.svg";
import { Typography } from "ui";
import {
  FADE_DURATION,
  OnboardingStepCategory,
  STEP_COMPONENTS,
} from "./common";
import { useEffect, useState } from "react";
import IntroStepView from "./views/intro/body-desktop";
import SafetyStepView from "./views/safety/common";
import { fadeIn, fadeOut } from "../../components/UrsorDialog";
import {
  AppsSelectionView,
  ChannelSelectionView,
  VideoSelectionView,
} from "./views/content-selection/common";
import TimeLimitsView from "./views/timelimit/common";
import PinView from "./views/pin/common";
import TopicSelectionView from "./views/topic-selection/common";

const ConfigurationStepButton = (props: {
  text: string;
  selected: boolean;
}) => (
  <Stack
    height="32px"
    borderRadius="32px"
    border="2px solid rgba(255,255,255,0.88)"
    px="12px"
    justifyContent="center"
    alignItems="center"
    sx={{
      opacity: props.selected ? 1 : 0.5,
    }}
  >
    <Typography variant="small" bold color="rgba(255,255,255,0.88)">
      {props.text}
    </Typography>
  </Stack>
);

const OnboardingFlowDesktopBody = () => {
  const [stepCategory, setStepCategory] =
    useState<OnboardingStepCategory>("intro");
  const [stepIndex, setStepIndex] = useState<number>(4);
  useEffect(
    () => setStepCategory(STEP_COMPONENTS[stepIndex].category),
    [stepIndex]
  );
  const [fade, setFade] = useState<"in" | "out">("in");
  const StepView = STEP_COMPONENTS[stepIndex].component;
  return (
    <Stack
      width="100%"
      height="100%"
      justifyContent="space-between"
      alignItems="center"
      zIndex={2}
    >
      <Stack
        width="100%"
        height="80px"
        justifyContent="space-between"
        direction="row"
        alignItems="center"
      >
        <Stack
          height="48px"
          width="48px"
          bgcolor="rgba(255,255,255,0.88)"
          justifyContent="center"
          alignItems="center"
          borderRadius="100%"
          sx={{
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { opacity: 0.7 },
          }}
        >
          <ArrowLeftIcon height="26px" width="26px" />
        </Stack>
        <Stack
          direction="row"
          spacing="8px"
          alignItems="center"
          sx={{
            svg: {
              path: {
                fill: "rgba(255,255,255,0.65)",
              },
            },
          }}
        >
          <ConfigurationStepButton
            text="1. Safety"
            selected={
              stepCategory === "safety" ||
              stepCategory === "content" ||
              stepCategory === "security"
            }
          />
          <ChevronRightIcon height="32px" width="32px" />
          <ConfigurationStepButton
            text="2. Content"
            selected={stepCategory === "content" || stepCategory === "security"}
          />
          <ChevronRightIcon height="32px" width="32px" />
          <ConfigurationStepButton
            text="3. Security"
            selected={stepCategory === "security"}
          />
        </Stack>
        <Stack width="48px" />
      </Stack>
      <Stack
        height="100%"
        width="100%"
        justifyContent="center"
        alignItems="center"
        pt="30px"
        spacing="30px"
        sx={{
          animation: `${
            fade === "in" ? fadeIn : fadeOut
          } ${FADE_DURATION}ms ease-out`,
          animationFillMode: "forwards",
        }}
      >
        <StepView
          onNext={() => {
            setFade("out");
            setTimeout(() => {
              setFade("in");
              setStepIndex(stepIndex + 1);
            }, FADE_DURATION);
          }}
        />
      </Stack>
    </Stack>
  );
};

export default OnboardingFlowDesktopBody;
