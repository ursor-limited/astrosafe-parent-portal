"use client";

import { Stack, keyframes } from "@mui/system";
import Image from "next/image";
import { IntroBox } from "./IntroBox";
import Wave from "@/images/Wave.png";
import ShootingStarMobile from "@/images/ShootingStarMobile.png";

export const getPulse = (
  center: number,
  amplitude: number,
  dim: "x" | "y"
) => keyframes`
  from {
    transform: translate${dim.toUpperCase()}(${center - amplitude}px)
  }
  to {
    transform: translate${dim.toUpperCase()}(${center + amplitude}px)
  }
`;

export const IntroSteps = (props: {
  step1: { body: string; title: string };
  step2: { body: string; title: string };
  step3: { body: string; title: string };
  mobile: boolean;
  backgroundOpacity?: number;
}) => {
  return (
    <Stack width="100%" position="relative" alignItems="center">
      {!props.mobile ? (
        <>
          <Stack
            width="100%"
            height="110px"
            position="absolute"
            left={0}
            right={0}
            top="15px"
            marginLeft="auto"
            marginRight="auto"
          >
            <Image src={Wave.src} fill alt="Wave" />
          </Stack>
          <Stack
            position="absolute"
            left={0}
            width="500px"
            height="100px"
            sx={{
              background:
                "linear-gradient(90deg, rgb(255,255,255), rgba(255,255,255,0))",
            }}
          />
          <Stack
            position="absolute"
            right={0}
            width="500px"
            height="100px"
            sx={{
              background:
                "linear-gradient(-90deg, rgb(255,255,255), rgba(255,255,255,0))",
            }}
          />

          <Stack
            direction="row"
            spacing="50px"
            position="relative"
            width="100%"
            justifyContent="center"
            zIndex={2}
          >
            <Stack
              sx={{
                animation: `${getPulse(0, 10, "y")} 3.2s ease-in-out`,
                animationDirection: "alternate",
                animationIterationCount: "infinite",
              }}
            >
              <IntroBox
                title={props.step1.title}
                content={props.step1.body}
                backgroundOpacity={props.backgroundOpacity}
              />
            </Stack>
            <Stack
              sx={{
                // transform: "translateY(57px)",
                animation: `${getPulse(55, 12, "y")} 3s ease-in-out`,
                animationDelay: 0.5,
                animationDirection: "alternate",
                animationIterationCount: "infinite",
              }}
            >
              <IntroBox
                title={props.step2.title}
                content={props.step2.body}
                backgroundOpacity={props.backgroundOpacity}
              />
            </Stack>
            <Stack
              sx={{
                // transform: "translateY(57px)",
                animation: `${getPulse(20, 15, "y")} 4s ease-in-out`,
                animationDirection: "alternate",
                animationIterationCount: "infinite",
              }}
            >
              <IntroBox
                title={props.step3.title}
                content={props.step3.body}
                backgroundOpacity={props.backgroundOpacity}
              />
            </Stack>
          </Stack>
        </>
      ) : (
        <Stack width="92%" position="relative">
          <Stack
            width="fit-content"
            position="absolute"
            zIndex={-1}
            top="-60px"
            left={0}
            right={0}
            marginLeft="auto"
            marginRight="auto"
          >
            <Image
              src={ShootingStarMobile.src}
              width={266}
              height={253}
              alt="Intro square"
            />
          </Stack>
          <Stack
            width="100%"
            pt="15px"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing="10%"
          >
            <Stack
              sx={{
                animation: `${getPulse(0, 10, "y")} 3.2s ease-in-out`,
                animationDirection: "alternate",
                animationIterationCount: "infinite",
              }}
              spacing="20px"
            >
              <IntroBox
                title="Select"
                content="Enter the titles of the Articles you want to create and click the +"
                mobile
                backgroundOpacity={0.13}
              />
              <Stack
                sx={{
                  // transform: "translateY(57px)",
                  animation: `${getPulse(10, 12, "y")} 3s ease-in-out`,
                  animationDelay: 0.5,
                  animationDirection: "alternate",
                  animationIterationCount: "infinite",
                }}
              >
                <IntroBox
                  title="Create"
                  content="Once you’ve got a collection of articles, click Create."
                  mobile
                  backgroundOpacity={0.13}
                />
              </Stack>
            </Stack>
            <Stack
              sx={{
                animation: `${getPulse(0, 15, "y")} 4s ease-in-out`,
                animationDirection: "alternate",
                animationIterationCount: "infinite",
              }}
            >
              <IntroBox
                title="Generate"
                content="Your Articles will take a few minutes to generate and voila!"
                mobile
                backgroundOpacity={0.13}
              />
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
