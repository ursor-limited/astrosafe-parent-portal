import React, { useEffect } from "react";
import { Box, Dialog, keyframes, Stack } from "@mui/material";
import UrsorButton, { ButtonVariant } from "./UrsorButton";
import Typography from "./Typography";
import ChevronLeftIcon from "../images/icons/ChevronLeftIcon.svg";
import _ from "lodash";
import { PALETTE } from "ui";

const WIDTH = "926px";
const HEIGHT = "630px";
const BORDER_RADIUS = "25px";
const PADDING = "40px";
const BUTTON_WIDTH = "300px";
const DEFAULT_FADEIN_DURATION = 400;
const LONG_FADEIN_DURATION = 2000;
const Z_INDEX = 999;
const STEPPER_TITLE_SEPARATION = "52px";

export const BODY_FADE_DURATION = 1030;

export interface IDialogButtonDetails {
  text: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  callback: () => void;
}

export interface IUrsorDialogProps {
  open: boolean;
  loading?: boolean;
  title?: string;
  subtitle?: (string | JSX.Element)[];
  supertitle?: string;
  button?: IDialogButtonDetails | JSX.Element;
  secondaryButton?: IDialogButtonDetails | JSX.Element;
  onCloseCallback?: () => void;
  backButtonCallback?: () => void;
  noCloseButton?: boolean;
  noBackdrop?: boolean;
  longFadeIn?: boolean;
  scrollable?: boolean;
  step?: number;
  nSteps?: number;
  "data-testid"?: string;
  children?: React.ReactNode; // the contents
}

export const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

export const fadeOut = keyframes`
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`;

export default function UrsorDialog(props: IUrsorDialogProps) {
  const [bodyFadeout, setBodyFadeout] = React.useState<boolean>(false);

  useEffect(() => {
    if (_.isNumber(props.step)) {
      setBodyFadeout(true);
      setTimeout(() => {
        setBodyFadeout(false);
      }, BODY_FADE_DURATION);
    }
  }, [props.step]);

  const animation = {
    animation: `${bodyFadeout ? fadeOut : fadeIn} ${
      BODY_FADE_DURATION / 1000
    }s ease-in-out`,
  };

  const defaultCloseButton = (
    <UrsorButton
      disabled={bodyFadeout}
      onClick={() => props.onCloseCallback?.()}
      sx={{
        width: BUTTON_WIDTH,
      }}
    >
      Close
    </UrsorButton>
  );

  return (
    <Dialog
      transitionDuration={
        props.longFadeIn ? LONG_FADEIN_DURATION : DEFAULT_FADEIN_DURATION
      }
      open={props.open}
      onClose={() => {
        props.onCloseCallback?.();
      }}
      PaperProps={{
        elevation: 0, // removes shadow
        style: {
          zIndex: Z_INDEX,
          width: WIDTH,
          minWidth: WIDTH,
          maxWidth: WIDTH,
          maxHeight: HEIGHT,
          height: HEIGHT,
          borderRadius: BORDER_RADIUS,
          overflow: "visible",
        },
      }}
      sx={{
        ".MuiBackdrop-root": {
          visibility: props.noBackdrop ? "hidden" : undefined,
          backdropFilter: "blur(4px)",
        },
      }}
    >
      <Stack
        position="relative"
        p={PADDING}
        borderRadius="25px"
        overflow="hidden"
        flex={1}
      >
        {props.backButtonCallback ? (
          <Box
            position="absolute"
            top={PADDING}
            left={PADDING}
            onClick={props.backButtonCallback}
            sx={{
              "&:hover": { opacity: 0.7 },
              transition: "0.2s",
              cursor: "pointer",
              zIndex: Z_INDEX,
            }}
          >
            <ChevronLeftIcon height="40px" />
          </Box>
        ) : null}
        <Stack
          height="100%"
          spacing={"25px"}
          justifyContent="space-between"
          alignItems="center"
          sx={_.isNumber(props.step) ? animation : null}
          overflow={props.scrollable ? "scroll" : "visible"}
        >
          <Stack
            spacing={"12px"}
            alignItems="center"
            textAlign="center"
            maxWidth="506px"
          >
            {props.supertitle ? (
              <Typography variant="medium" bold color={PALETTE.font.dark}>
                {props.supertitle}
              </Typography>
            ) : null}
            {props.title ? (
              <Typography variant="h3" color={PALETTE.secondary.purple[2]}>
                {props.title}
              </Typography>
            ) : null}
            {props.subtitle ? (
              <Stack alignItems="center">
                {props.subtitle.map((sentence, index) => (
                  <Typography
                    key={index}
                    variant="medium"
                    sx={{ textAlign: "center" }}
                  >
                    {sentence}
                  </Typography>
                ))}
              </Stack>
            ) : null}
          </Stack>
          <Stack
            width="100%"
            height={!props.scrollable ? "100%" : "auto"}
            alignItems="center"
            justifyContent="start"
          >
            {props.children}
          </Stack>
          {props.button || props.secondaryButton || !props.noCloseButton ? (
            <Stack spacing="7px">
              {!!props.secondaryButton ? (
                React.isValidElement(props.secondaryButton) ? (
                  props.secondaryButton
                ) : (
                  <UrsorButton
                    disabled={
                      (props.secondaryButton as IDialogButtonDetails)
                        .disabled || bodyFadeout
                    }
                    onClick={() => {
                      (
                        props.secondaryButton as IDialogButtonDetails
                      ).callback();
                    }}
                    sx={{
                      width: BUTTON_WIDTH,
                    }}
                    variant={
                      (props.secondaryButton as IDialogButtonDetails).variant ??
                      "secondary"
                    }
                  >
                    {(props.secondaryButton as IDialogButtonDetails).text}
                  </UrsorButton>
                )
              ) : null}
              {!!props.button ? (
                React.isValidElement(props.button) ? (
                  props.button
                ) : (
                  <UrsorButton
                    disabled={
                      (props.button as IDialogButtonDetails).disabled ||
                      bodyFadeout
                    }
                    onClick={() => {
                      (props.button as IDialogButtonDetails).callback();
                    }}
                    sx={{
                      width: BUTTON_WIDTH,
                    }}
                    variant={
                      (props.button as IDialogButtonDetails).variant ??
                      "primary"
                    }
                  >
                    {(props.button as IDialogButtonDetails).text}
                  </UrsorButton>
                )
              ) : !props.noCloseButton ? (
                defaultCloseButton
              ) : null}
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </Dialog>
  );
}
