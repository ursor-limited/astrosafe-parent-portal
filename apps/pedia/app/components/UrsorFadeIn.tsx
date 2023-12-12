import React from "react";
import FadeIn from "react-fade-in";
import { Box } from "@mui/material";

export const FULL_SIZE_CLASSNAME = "fullSize";

export interface IUrsorFadeInProps {
  duration?: number;
  delay?: number;
  fullWidth?: boolean;
  fullHeight?: boolean;
  children: React.ReactNode;
}

export default function UrsorFadeIn(props: IUrsorFadeInProps) {
  return (
    <Box
      height={props.fullHeight ? "100%" : "auto"}
      width={props.fullWidth ? "100%" : "auto"}
      sx={{
        [`& .${FULL_SIZE_CLASSNAME}`]: {
          height: props.fullHeight ? "100%" : "auto",
          width: props.fullWidth ? "100%" : "auto",
          overflow: "visible",
        },
      }}
      overflow="visible"
    >
      <FadeIn
        transitionDuration={props.duration}
        delay={props.delay}
        className={FULL_SIZE_CLASSNAME}
        childClassName={FULL_SIZE_CLASSNAME}
      >
        {props.children}
      </FadeIn>
    </Box>
  );
}
