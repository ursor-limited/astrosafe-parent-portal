import React from "react";
import FadeIn from "react-fade-in";
import { Box } from "@mui/material";

export const FULL_SIZE_CLASSNAME = "fullSize";

export interface IUrsorFadeInProps {
  duration?: number;
  delay?: number;
  fullWidth?: boolean;
  disable?: boolean;
  children: React.ReactNode;
}

export default function UrsorFadeIn(props: IUrsorFadeInProps) {
  return (
    <Box
      height="100%"
      width={props.fullWidth ? "100%" : "auto"}
      sx={{
        [`& .${FULL_SIZE_CLASSNAME}`]: {
          height: "100%",
          width: props.fullWidth ? "100%" : "auto",
          overflow: "visible",
        },
      }}
      overflow="visible"
    >
      {props.disable ? (
        props.children
      ) : (
        <FadeIn
          transitionDuration={props.duration}
          delay={props.delay}
          className={FULL_SIZE_CLASSNAME}
          childClassName={FULL_SIZE_CLASSNAME}
        >
          {props.children}
        </FadeIn>
      )}
    </Box>
  );
}
