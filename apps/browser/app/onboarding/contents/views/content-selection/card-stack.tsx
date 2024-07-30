import { Stack, keyframes } from "@mui/system";
import _ from "lodash";

export const getRemoveTopCardAnimation = (
  left?: boolean,
  noFade?: boolean
) => keyframes`
from {
  transform: translateY(0) rotate(0deg);
  ${noFade ? "" : "opacity: 1;"}
}
to {
  transform: translate(${left ? "-" : ""}340px, -180px) rotate(${
    left ? "-" : ""
  }80deg);
    ${noFade ? "" : "opacity: 0;"}
}
`;

const CardStack = (props: {
  cards: React.ReactNode[];
  stackIndex: number;
  latestDecision: "added" | "removed" | undefined;
  isMobile?: boolean;
}) => (
  <Stack
    width={props.isMobile ? "100%" : undefined}
    justifyContent="center"
    alignItems="center"
    position="relative"
    sx={{
      pointerEvents: "none",
      transform: props.isMobile ? undefined : "scale(1.4)",
    }}
  >
    {_.reverse(
      props.cards.map((c, i) => {
        const effectiveIndex = i - props.stackIndex;
        return (
          <Stack
            key={i}
            width={props.isMobile ? "90%" : undefined}
            alignItems="center"
            position="absolute"
            sx={{
              transition: "0.36s ease-out",
              transitionDelay: "0.2s",
              transform: `translateY(${
                effectiveIndex * (42 - effectiveIndex * 4.5)
              }px) scale(${1 - effectiveIndex * 0.1})`,
              opacity:
                effectiveIndex === -1
                  ? 1
                  : effectiveIndex === 0
                  ? 1
                  : effectiveIndex === 1
                  ? 0.9
                  : effectiveIndex === 2
                  ? 0.4
                  : 0,
              animation:
                effectiveIndex === -1
                  ? `${getRemoveTopCardAnimation(
                      props.latestDecision === "removed"
                    )} 0.4s ease-out`
                  : undefined,
              animationFillMode: "forwards",
            }}
            boxShadow={
              props.stackIndex === effectiveIndex
                ? "0 0 25px rgb(0,0,0,0.22)"
                : undefined
            }
          >
            {c}
          </Stack>
        );
      })
    )}
  </Stack>
);

export default CardStack;
