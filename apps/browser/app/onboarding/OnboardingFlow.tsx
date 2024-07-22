"use client";

import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import ArrowLeftIcon from "@/images/icons/ArrowLeftIcon.svg";
import UrsorParticles from "../components/UrsorParticles";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import IntroStepView, { INTRO_STEP_TITLE } from "./IntroStep";
import { CONTENT_STEP_VIEWS } from "./ContentStep";
import SafetyStepView, { SAFETY_STEP_TITLE } from "./SafetyStep";
import { fadeIn, fadeOut } from "../components/UrsorDialog";

type OnboardingStepCategory = "intro" | "safety" | "content" | "security";

const STEP_COMPONENTS: {
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

export const FADE_DURATION = 700;

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

export const OnBoardingViewLayout = (props: {
  title: string;
  button?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Stack
    width="100%"
    height="100%"
    justifyContent="center"
    alignItems="center"
    spacing="30px"
  >
    <Stack width="523px">
      <Typography
        color="rgba(255,255,255,0.88)"
        variant="h3"
        sx={{ textAlign: "center" }}
      >
        {props.title}
      </Typography>
    </Stack>
    {props.children}
    <Stack>{props.button}</Stack>
  </Stack>
);

const ActualOnboardingFlow = () => {
  const [stepCategory, setStepCategory] =
    useState<OnboardingStepCategory>("intro");
  const [stepIndex, setStepIndex] = useState<number>(0);
  useEffect(() => setStepCategory(STEP_COMPONENTS[stepIndex].category));
  const [fade, setFade] = useState<"in" | "out">("in");
  const StepView = STEP_COMPONENTS[stepIndex].component;
  return (
    <Stack
      width="100%"
      height="100%"
      justifyContent="space-between"
      alignItems="center"
      p="40px"
      pb="67px"
      boxSizing="border-box"
      spacing="30px"
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

export default function OnBoardingFlow(props: { mobile: boolean }) {
  // this is a wrapper around the actual onboarding flow, in order to keep the particles above it, as otherwise they would get rerendered on every change of the step
  return (
    <>
      <ActualOnboardingFlow />
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
