import { Stack, keyframes } from "@mui/system";
import Image from "next/image";
import ShootingStar from "@/images/ShootingStar.png";
import ShootingStarMobile from "@/images/ShootingStarMobile.png";
import { IntroBox } from "./IntroBox";

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

export const IntroSteps = (props: { mobile: boolean }) => {
  return (
    <Stack width="100%" position="relative" alignItems="center">
      {!props.mobile ? (
        <>
          <Stack
            width="fit-content"
            position="absolute"
            zIndex={-1}
            left={0}
            right={0}
            top="41px"
            marginLeft="auto"
            marginRight="auto"
          >
            <Image
              src={ShootingStar.src}
              width={1321}
              height={110}
              loader={({ src }) => {
                return src;
              }}
              alt="Intro square"
            />
          </Stack>

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
                title="Select"
                content="Enter the titles of the Articles you want to create and click the +"
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
                title="Create"
                content="Once you’ve got a collection of articles, click Create."
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
                title="Generate"
                content="Your Articles will take a few minutes to generate and voila!"
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
            top="-40px"
            left={0}
            right={0}
            marginLeft="auto"
            marginRight="auto"
          >
            <Image
              src={ShootingStarMobile.src}
              width={266}
              height={253}
              loader={({ src }) => {
                return src;
              }}
              alt="Intro square"
            />
          </Stack>
          <Stack
            width="100%"
            pt="5px"
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
              />
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
