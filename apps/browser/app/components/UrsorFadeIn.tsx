import React from "react";
import FadeIn from "react-fade-in";
import { Stack } from "@mui/system";

export const FULL_SIZE_CLASSNAME = "fullSize";

export interface IUrsorFadeInProps {
  duration?: number;
  delay?: number;
  fullWidth?: boolean;
  fullHeight?: boolean;
  centerAlign?: boolean;
  children: React.ReactNode;
}

export default function UrsorFadeIn(props: IUrsorFadeInProps) {
  return (
    <Stack
      height={props.fullHeight ? "100%" : "auto"}
      width={props.fullWidth ? "100%" : "auto"}
      sx={{
        [`& .${FULL_SIZE_CLASSNAME}`]: {
          height: props.fullHeight ? "100%" : "auto",
          width: props.fullWidth ? "100%" : "auto",
          overflow: "visible",
          display: props.centerAlign ? "flex" : undefined,
          justifyContent: props.centerAlign ? "center" : undefined,
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
    </Stack>
  );
}
