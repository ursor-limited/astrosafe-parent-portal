"use client";

import React from "react";
import { Box, keyframes, Stack } from "@mui/system";
import { PALETTE } from "ui/palette";
import { ByteAnimation } from "./Byte";
import { fadeOut } from "./SearchBar";
import dynamic from "next/dynamic";

const Byte = dynamic(
  () => import("@/app/components/Byte"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const SPACING = 62;
const CIRCLE_SIZE = 24;
const CIRCLE_BORDER_THICKNESS = 2;
const ROUNDING = "20px";
const APPEAR_DELAY = 800;
const BAR_DELAY = "0.6s";
const BAR_LENGTH_CHANGE_DURATION = "0.7s";
const BAR_BEZIER = "cubic-bezier(0.64, 0.27, 0.47, 1.53)";
const BAR_Z_INDEX = 2;

const PULSE_AMPLITUDE = "1.5px";
const PULSE_PERIOD = "1.4s";

export interface IByteStepperProps {
  nSteps: number;
  step: number;
  scale?: number;
}

export const pulse = keyframes`
  from {
    transform: translateY(-${PULSE_AMPLITUDE})
  }
  to {
    transform: translateY(${PULSE_AMPLITUDE})
  }
`;

export default function ByteStepper(props: IByteStepperProps) {
  const getCircle = (disappear: boolean) => {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          border: `${CIRCLE_BORDER_THICKNESS}px dashed ${PALETTE.secondary.purple[1]}`,
          borderRadius: "100%",
          background: "white",
          boxShadow: "0 0 20px white",
          animation: disappear ? `${fadeOut} 0.5s ease-in-out` : null,
          animationDelay: `${APPEAR_DELAY}ms`,
          animationFillMode: "forwards",
          boxSizing: "border-box",
        }}
      />
    );
  };
  const getByte = (animation: ByteAnimation, delay?: number) => (
    <Stack
      height="100%"
      width={0}
      position="absolute"
      overflow="visible"
      alignItems="center"
      justifyContent="center"
      sx={{
        transform: "translateY(-3px)",
      }}
      zIndex={BAR_Z_INDEX + 1}
    >
      <Box
        sx={{
          animation: `${pulse} ${PULSE_PERIOD} ease-in-out`,
          animationDirection: "alternate",
          animationIterationCount: "infinite",
        }}
      >
        <Byte
          animation={animation}
          delay={delay} //@ts-ignore
          size={Math.sqrt(props.scale || 1) * 45}
        />
      </Box>
    </Stack>
  );

  return (
    <Box
      position="relative"
      width="fit-content"
      height={(props.scale || 1) * CIRCLE_SIZE}
      overflow="visible"
      sx={{ background: PALETTE.secondary.grey[1] }}
      borderRadius={ROUNDING}
    >
      <Box width="100%" height="100%" position="absolute">
        <Box
          width={`calc(${
            props.step > 0 && props.step < props.nSteps - 1
              ? ((props.scale || 1) * CIRCLE_SIZE) / 2
              : 0
          }px + ${(100 * props.step) / (props.nSteps - 1)}%)`}
          height="100%"
          sx={{
            background: PALETTE.secondary.purple[1],
            transition: BAR_LENGTH_CHANGE_DURATION,
            transitionDelay: BAR_DELAY,
            transitionTimingFunction: BAR_BEZIER,
          }}
          borderRadius={ROUNDING}
          position="relative"
          zIndex={BAR_Z_INDEX}
        />
      </Box>
      <Stack
        direction="row"
        spacing={`${(props.scale || 1) * SPACING}px`}
        overflow="visible"
      >
        {[...Array(props.nSteps).keys()].map((n) => {
          return (
            <Stack key={n} overflow="visible" alignItems="center">
              <Box
                sx={{
                  width: (props.scale || 1) * CIRCLE_SIZE,
                  height: (props.scale || 1) * CIRCLE_SIZE,
                }}
              >
                {getCircle(n === 0)}
              </Box>
              {getByte(
                n === props.step
                  ? n === props.nSteps - 1
                    ? "celebration"
                    : "appear"
                  : "disappear",
                n === props.step ? APPEAR_DELAY : undefined
              )}
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}
