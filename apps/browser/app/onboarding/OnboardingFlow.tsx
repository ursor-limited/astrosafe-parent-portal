"use client";

import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import ShieldLockIcon from "@/images/icons/ShieldLockIcon.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import ArrowLeftIcon from "@/images/icons/ArrowLeftIcon.svg";
import UrsorParticles from "../components/UrsorParticles";

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

export default function OnBoardingFlow(props: { mobile: boolean }) {
  return (
    <>
      <Stack
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        p="40px"
        pb="67px"
        boxSizing="border-box"
        spacing="30px"
        zIndex={2}
      >
        <Stack width="100%" height="80px" justifyItems="center">
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
        </Stack>
        <Stack width="523px">
          <Typography
            color="rgba(255,255,255,0.88)"
            variant="h3"
            sx={{ textAlign: "center" }}
          >
            Lets configure your browser in 3 steps
          </Typography>
        </Stack>
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
