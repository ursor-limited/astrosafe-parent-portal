"use client";

import { Stack } from "@mui/system";
import UrsorParticles from "../../components/UrsorParticles";
import React from "react";
import _ from "lodash";
import OnboardingFlowDesktopBody from "./body-desktop";
import OnboardingFlowMobileBody from "./body-mobile";
import IntroStepView from "./views/intro/common";
import SafetyStepView from "./views/safety/common";
import TopicSelectionView from "./views/topic-selection/common";
import {
  AppsSelectionView,
  ChannelSelectionView,
  VideoSelectionView,
} from "./views/content-selection/common";
import TimeLimitView from "./views/timelimit/common";
import PinView from "./views/pin/common";

export type OnboardingStepCategory =
  | "intro"
  | "safety"
  | "content"
  | "security";

export const FADE_DURATION = 700;

export const STEP_COMPONENTS: {
  category: OnboardingStepCategory;
  component: React.FC<{ onNext: () => void; isMobile?: boolean }>;
}[] = [
  { category: "intro", component: IntroStepView },
  { category: "safety", component: SafetyStepView },
  { category: "content", component: TopicSelectionView },
  { category: "content", component: VideoSelectionView },
  { category: "content", component: ChannelSelectionView },
  { category: "content", component: AppsSelectionView },
  { category: "content", component: TimeLimitView },
  { category: "security", component: PinView },
];

export default function OnBoardingFlow(props: { mobile: boolean }) {
  // this is a wrapper around the actual onboarding flow, in order to keep the particles above it, as otherwise they would get rerendered on every change of the step
  return (
    <>
      {props.mobile ? (
        <OnboardingFlowMobileBody />
      ) : (
        <OnboardingFlowDesktopBody />
      )}
      <Stack
        position="absolute"
        top={0}
        left={0}
        height="100%"
        width="100%"
        sx={{
          "#tsparticles": {
            height: "100%",
          },
        }}
      >
        <UrsorParticles number={5} />
      </Stack>
    </>
  );
}
