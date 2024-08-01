import { Dialog } from "@mui/material";
import { Stack, keyframes } from "@mui/system";
import { BACKDROP_STYLE } from "../components/UrsorDialog";
import { PALETTE, Typography } from "ui";
import ClockIcon from "@/images/icons/ClockIcon.svg";
import StopIcon from "@/images/icons/StopIcon.svg";
import ScreensIcon from "@/images/icons/ScreensIcon.svg";
import VideoCameraIcon from "@/images/icons/VideoCameraIcon.svg";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import _ from "lodash";
import { useEffect, useState } from "react";
import { getRemoveTopCardAnimation } from "../onboarding/contents/views/content-selection/card-stack";
import Confetti from "./Confetti";

const CARD_PERIOD = 3000;

export const getCardHover = (distance: number) => keyframes`
from {
  transform: translateY(0);
}
to {
  transform: translateY(${distance}px);
}
`;

export const getCardRotationalFidgeting = (angle: number) => keyframes`
from {
  transform: rotate(${angle}deg);
}
to {
  transform: rotate(${-angle}deg);
}
`;

export interface ICreationAnimationCardProps {
  title: string;
  color: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const CreationAnimationCard = (
  props: ICreationAnimationCardProps & { showConfetti: boolean }
) => (
  <Stack position="relative">
    {props.showConfetti ? (
      <Stack position="absolute" left="-70px" top={0}>
        <Confetti side="left" />
      </Stack>
    ) : null}
    <Stack
      width="355px"
      height="176px"
      borderRadius="12px"
      bgcolor={props.color}
      justifyContent="center"
      alignItems="center"
      spacing="12px"
      boxShadow={"0 0 16px rgb(0,0,0,0.17)"}
      sx={{
        svg: {
          path: {
            fill: "rgba(255,255,255,0.84)",
          },
        },
      }}
    >
      <Stack height="100px" justifyContent="center">
        <props.icon height="66px" width="66px" />
      </Stack>
      <Typography variant="large" bold color="rgba(255,255,255,0.84)">
        {props.title}
      </Typography>
    </Stack>
    {props.showConfetti ? (
      <Stack position="absolute" right="-70px" top={0}>
        <Confetti side="right" />
      </Stack>
    ) : null}
  </Stack>
);

const CREATION_ANIMATION_CARDS: ICreationAnimationCardProps[] = [
  {
    title: "Setting Time Limits",
    color: PALETTE.secondary.orange[3],
    icon: ClockIcon,
  },
  {
    title: "Applying Ad Block",
    color: PALETTE.secondary.pink[3],
    icon: StopIcon,
  },
  {
    title: "Sourcing 11,000 Sites for you",
    color: PALETTE.secondary.green[4],
    icon: ScreensIcon,
  },
  {
    title: "Curating Videos for you",
    color: PALETTE.secondary.blue[3],
    icon: VideoCameraIcon,
  },
  {
    title: "Preparing your Browser",
    color: PALETTE.secondary.purple[2],
    icon: GlobeIcon,
  },
];

const CreationAnimationDialog = (props: {
  open: boolean;
  onClose: () => void;
  onNext: () => void;
  isMobile?: boolean;
}) => {
  const [stackIndex, setStackIndex] = useState<number>(0);

  useEffect(() => {
    if (stackIndex < CREATION_ANIMATION_CARDS.length) {
      const intervalId = setInterval(() => {
        setStackIndex((prev) => prev + 1);
      }, CARD_PERIOD);
      return () => {
        clearInterval(intervalId);
      };
    } else {
      props.onNext();
    }
  }, []);

  useEffect(() => {
    stackIndex === CREATION_ANIMATION_CARDS.length && setStackIndex(0);
    //setInterval(props.onNext, 500);
  }, [stackIndex]);

  return (
    <Dialog
      transitionDuration={800}
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        style: {
          width: 746,
          height: 512,
          borderRadius: 32,
          padding: "32px",
          paddingBottom: 0,
          margin: props.isMobile ? "16px" : undefined,
          background: PALETTE.secondary.grey[1],
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE,
      }}
    >
      <Stack height="100%">
        <Stack
          spacing="40px"
          justifyContent="center"
          alignItems="center"
          pt="16px"
        >
          <Stack
            width="240px"
            sx={{
              background: `linear-gradient(${PALETTE.secondary.purple[2]}, ${PALETTE.secondary.blue[2]})`,
              "-webkit-text-fill-color": "transparent",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
            }}
          >
            <Typography
              variant={props.isMobile ? "h5" : "h4"}
              sx={{ textAlign: "center" }}
            >
              Crafting your Browser...
            </Typography>
          </Stack>
        </Stack>

        <Stack
          justifyContent="center"
          alignItems="center"
          position="relative"
          flex={1}
          sx={{
            transform: props.isMobile ? "scale(0.85)" : undefined,
          }}
        >
          {_.reverse(
            CREATION_ANIMATION_CARDS.map((c, i) => {
              const effectiveIndex = i - stackIndex;
              return (
                <Stack
                  key={i}
                  alignItems="center"
                  position="absolute"
                  sx={{
                    transition: "0.36s ease-out",
                    transitionDelay: "0.2s",
                    transform: `translateY(${
                      effectiveIndex * (42 - effectiveIndex * 4.5)
                    }px) scale(${1 - effectiveIndex * 0.1}) rotate(${
                      effectiveIndex === 0 ? 5 : effectiveIndex === 1 ? -3 : 0
                    }deg)`,
                    opacity: effectiveIndex >= 0 && effectiveIndex < 3 ? 1 : 0,
                    animation:
                      effectiveIndex === -1
                        ? `${getRemoveTopCardAnimation(
                            false,
                            true
                          )} 0.4s ease-out`
                        : undefined,
                    animationFillMode: "forwards",
                  }}
                >
                  <Stack
                    sx={{
                      animation: `${getCardHover(
                        (4 + i * 1.2) * (i % 2 ? 1 : -1)
                      )} ${2 + 0.3 * i}s ease-in-out`,
                      animationDirection: "alternate",
                      animationIterationCount: "infinite",
                    }}
                  >
                    <Stack
                      sx={{
                        animation: `${getCardRotationalFidgeting(
                          3 + i * 2
                        )} ${3}s ease-in-out`,
                        animationDirection: "alternate",
                        animationIterationCount: "infinite",
                      }}
                    >
                      <CreationAnimationCard
                        key={i}
                        {...c}
                        showConfetti={effectiveIndex === 0}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              );
            })
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default CreationAnimationDialog;
