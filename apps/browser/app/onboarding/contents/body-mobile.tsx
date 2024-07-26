import { Stack } from "@mui/system";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import ArrowLeftIcon from "@/images/icons/ArrowLeftIcon.svg";
import { Typography } from "ui";
import { FADE_DURATION, OnboardingStepCategory } from "./common";
import { useEffect, useState } from "react";
import IntroStepView from "./steps/intro/mobile";
import SafetyStepView from "./steps/safety/SafetyStep";
import { CONTENT_STEP_VIEWS } from "./steps/content/ContentStep";
import { fadeIn, fadeOut } from "../../components/UrsorDialog";

const ConfigurationStepButton = (props: {
  text: string;
  selected: boolean;
}) => (
  <Stack
    height="19px"
    borderRadius="32px"
    border="2px solid rgba(255,255,255,0.88)"
    px="8px"
    justifyContent="center"
    alignItems="center"
    sx={{
      opacity: props.selected ? 1 : 0.5,
    }}
  >
    <Typography variant="tiny" bold color="rgba(255,255,255,0.88)">
      {props.text}
    </Typography>
  </Stack>
);

const OnboardingHeader = (props: { stepCategory: OnboardingStepCategory }) => (
  <Stack
    width="100%"
    spacing="10px"
    justifyContent="space-between"
    alignItems="center"
    pt="38px"
  >
    <Stack width="100%" alignItems="flex-start">
      <Stack
        minHeight="32px"
        minWidth="32px"
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
        <ArrowLeftIcon height="17px" width="17px" />
      </Stack>
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
          props.stepCategory === "safety" ||
          props.stepCategory === "content" ||
          props.stepCategory === "security"
        }
      />
      <ChevronRightIcon height="16px" width="16px" />
      <ConfigurationStepButton
        text="2. Content"
        selected={
          props.stepCategory === "content" || props.stepCategory === "security"
        }
      />
      <ChevronRightIcon height="16px" width="16px" />
      <ConfigurationStepButton
        text="3. Security"
        selected={props.stepCategory === "security"}
      />
    </Stack>
    <Stack width="48px" />
  </Stack>
);

export const STEP_COMPONENTS: {
  category: OnboardingStepCategory;
  component: React.FC<{ onNext: () => void }>;
}[] = [
  { category: "intro", component: IntroStepView },
  { category: "safety", component: SafetyStepView },
  ...CONTENT_STEP_VIEWS.map((component) => ({
    category: "content" as OnboardingStepCategory,
    component,
  })),
];

const OnboardingFlowMobileBody = () => {
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
      px="20px"
    >
      <OnboardingHeader stepCategory={stepCategory} />
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

export default OnboardingFlowMobileBody;
