"use client";

import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import ShieldLockIcon from "@/images/icons/ShieldLockIcon.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import ArrowLeftIcon from "@/images/icons/ArrowLeftIcon.svg";
import UrsorParticles from "../components/UrsorParticles";
import React, { useState } from "react";
import _ from "lodash";
import { Grid } from "@mui/material";
import IntroStepView, { INTRO_STEP_TITLE } from "./IntroStep";
import { CONTENT_STEP_VIEWS } from "./ContentStep";
import SecurityStepView, { SECURITY_STEP_TITLE } from "./SecurityStep";

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
      opacity: props.selected ? 1 : 0.6,
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
  <>
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
  </>
);

export default function OnBoardingFlow(props: { mobile: boolean }) {
  const [step, setStep] = useState<number | undefined>(1);
  const [contentStepIndex, setContentStepIndex] = useState<number>(2);
  const ContentStepView = CONTENT_STEP_VIEWS[contentStepIndex];
  return (
    <>
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
              text="1. Security"
              selected={_.isNumber(step) && step >= 0}
            />
            <ChevronRightIcon height="32px" width="32px" />
            <ConfigurationStepButton
              text="2. Content"
              selected={_.isNumber(step) && step >= 1}
            />
            <ChevronRightIcon height="32px" width="32px" />
            <ConfigurationStepButton
              text="3. Curation"
              selected={_.isNumber(step) && step === 2}
            />
          </Stack>
          <Stack width="48px" />
        </Stack>
        {!_.isNumber(step) ? (
          <IntroStepView onNext={() => setStep(0)} />
        ) : step === 0 ? (
          <SecurityStepView onNext={() => setStep(1)} />
        ) : step === 1 ? (
          <ContentStepView
            onNext={() => setContentStepIndex(contentStepIndex + 1)}
          />
        ) : null}
      </Stack>
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
