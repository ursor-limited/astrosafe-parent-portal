import React from "react";
import { useState } from "react";
import { Stack } from "@mui/system";
import { Dialog } from "@mui/material";
import Fire from "../../images/Fire.png";
import { BACKDROP_STYLE } from "../components/UrsorDialog";
import { PALETTE, Typography } from "ui";
import { IntroSteps } from "../landing/[urlId]/IntroSteps";
import { createPortal } from "react-dom";

const ILLUST_SIZE = "14px";

export interface IStepperOverlayProps {
  open: boolean;
  closeCallback: () => void;
}

export default function StepperOverlay(props: IStepperOverlayProps) {
  return props.open ? (
    createPortal(
      <Stack
        position="absolute"
        top={0}
        left={0}
        height="100vh"
        width="100vw"
        zIndex={99999999}
        onClick={props.closeCallback}
      >
        <Stack
          height="100%"
          width="100%"
          position="relative"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            position="absolute"
            top={0}
            left={0}
            height="100%"
            width="100%"
            bgcolor="rgba(0,0,0,0.5)"
            sx={{ backdropFilter: "blur(3px)" }}
          />
          <IntroSteps
            step1={{
              title: "BRO",
              body: "Dwayne Johnson is the best.",
            }}
            step2={{
              title: "BAAAA",
              body: "Not gonna lie, this is some awesome trash.",
            }}
            step3={{
              title: "FOOOOOO",
              body: "Bro, who do ya think ya are.",
            }}
            mobile={false}
            backgroundOpacity={0.72}
          />
        </Stack>
      </Stack>,
      document.body
    )
  ) : (
    <></>
  );
}
