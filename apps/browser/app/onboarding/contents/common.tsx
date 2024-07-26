"use client";

import { Stack } from "@mui/system";
import UrsorParticles from "../../components/UrsorParticles";
import React from "react";
import _ from "lodash";
import OnboardingFlowDesktopBody from "./body-desktop";
import OnboardingFlowMobileBody from "./body-mobile";

export type OnboardingStepCategory =
  | "intro"
  | "safety"
  | "content"
  | "security";

export const FADE_DURATION = 700;

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
