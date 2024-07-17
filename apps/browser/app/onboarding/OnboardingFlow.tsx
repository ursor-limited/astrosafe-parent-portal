"use client";

import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import ShieldLockIcon from "@/images/icons/ShieldLockIcon.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import ArrowLeftIcon from "@/images/icons/ArrowLeftIcon.svg";
import UrsorParticles from "../components/UrsorParticles";
import { useState } from "react";
import _ from "lodash";

const ConfigurationStepCard = (props: {
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

const AgeCard = (props: {
  title: string;
  ages: string;
  selected: boolean;
  faded: boolean;
  subtitle: string;
  onClick: () => void;
}) => (
  <Stack
    width="251px"
    height="317px"
    borderRadius="12px"
    alignItems="center"
    p="16px"
    boxSizing="border-box"
    bgcolor="rgba(255,255,255,0.95)"
    sx={{
      opacity: props.faded ? 0.6 : 1,
      cursor: "pointer",
      "&:hover": { opacity: 0.8 },
      transition: "0.2s",
      pointerEvents: props.selected ? "none" : undefined,
      outline: `2px solid ${
        props.selected ? PALETTE.secondary.purple[2] : "transparent"
      }`,
    }}
    spacing="12px"
    onClick={props.onClick}
    boxShadow={`0 0 30px ${props.selected ? "#A594FF" : undefined}`}
  >
    <Typography variant="h4" color={PALETTE.secondary.purple[2]}>
      {props.title}
    </Typography>
    <Typography bold variant="small" color={PALETTE.secondary.grey[5]}>
      {props.ages}
    </Typography>
    <Typography bold variant="small" color={PALETTE.secondary.grey[5]}>
      {props.subtitle}
    </Typography>
  </Stack>
);

const INTRO_STEP_TITLE = "Lets configure your browser in 3 steps";
const IntroStepView = () => (
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
    <ConfigurationStepCard
      icon={ShieldLockIcon}
      n={1}
      title="Configure your security settings"
    />
    <ChevronRightIcon height="32px" width="32px" />
    <ConfigurationStepCard
      icon={VerifiedIcon}
      n={2}
      title="Select your approved Content"
    />
    <ChevronRightIcon height="32px" width="32px" />
    <ConfigurationStepCard
      icon={GlobeIcon}
      n={3}
      title="Set up your personal Browser"
    />
  </Stack>
);

const SECURITY_STEP_TITLE = "Set up the Browser, the basics...";
const SecurityStepView = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<
    number | undefined
  >();
  return (
    <Stack direction="row" spacing="32px">
      <AgeCard
        title="Adventurer"
        ages="For age 3 to 6"
        subtitle="Provide access to a safe version of the internet with safe links."
        selected={selectedCardIndex === 0}
        faded={_.isNumber(selectedCardIndex) && selectedCardIndex !== 0}
        onClick={() => setSelectedCardIndex(0)}
      />
      <AgeCard
        title="Explorer"
        ages="For age 7 to 10"
        subtitle="Provide access to a safe version of the internet with safe links."
        selected={selectedCardIndex === 1}
        faded={_.isNumber(selectedCardIndex) && selectedCardIndex !== 1}
        onClick={() => setSelectedCardIndex(1)}
      />
      <AgeCard
        title="Navigator"
        ages="For ages 11+"
        subtitle="Provide access to a safe version of the internet with safe links."
        selected={selectedCardIndex === 2}
        faded={_.isNumber(selectedCardIndex) && selectedCardIndex !== 2}
        onClick={() => setSelectedCardIndex(2)}
      />
    </Stack>
  );
};

const CONTENT_STEP_VIEWS: { title: string; component: React.ReactNode }[] = [
  {
    title: "",
    component: <Stack />,
  },
];

export default function OnBoardingFlow(props: { mobile: boolean }) {
  const [step, setStep] = useState<number | undefined>(0);
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
        <Stack width="523px">
          <Typography
            color="rgba(255,255,255,0.88)"
            variant="h3"
            sx={{ textAlign: "center" }}
          >
            {!_.isNumber(step)
              ? INTRO_STEP_TITLE
              : step === 0
              ? SECURITY_STEP_TITLE
              : ""}
          </Typography>
        </Stack>
        {!_.isNumber(step) ? (
          <IntroStepView />
        ) : step === 0 ? (
          <SecurityStepView />
        ) : (
          ""
        )}
        <UrsorButton
          dark
          variant="tertiary"
          size="large"
          endIcon={ChevronRightIcon}
        >
          Let's get started
        </UrsorButton>
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
