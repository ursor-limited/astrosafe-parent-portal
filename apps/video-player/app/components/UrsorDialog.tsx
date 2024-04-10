import React, { useEffect, useState } from "react";
import { Box, Dialog, keyframes, Stack } from "@mui/material";
import X from "@/images/icons/X.svg";
import ChevronLeft from "@/images/icons/ChevronLeftIcon.svg";
import _ from "lodash";
import { useWindowSize } from "usehooks-ts";
import { ButtonVariant, UrsorButton } from "ui/ursor-button";
import { PALETTE, Typography } from "ui";
import { UrsorTypographyVariant } from "ui/typography";
import dynamic from "next/dynamic";

const ByteStepper = dynamic(
  () => import("./ByteStepper"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const WIDTH = "926px";
const HEIGHT = "630px";
export const BORDER_RADIUS = "24px";
export const PADDING = "45px";
const BUTTON_WIDTH = "280px";
export const DEFAULT_FADEIN_DURATION = 400;
const LONG_FADEIN_DURATION = 2000;
export const Z_INDEX = 999;
const STEPPER_TITLE_SEPARATION = "30px";
export const BACKDROP_STYLE = {
  backdropFilter: "blur(3px)",
  backgroundColor: "rgba(0, 0, 0, 0.3) !important",
};

export const BODY_FADE_DURATION = 850;

export interface IDialogButtonDetails {
  text: string;
  disabled?: boolean;
  callback: () => void;
  variant?: ButtonVariant;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  color?: string;
}

export interface IUrsorDialogProps {
  open: boolean;
  width?: string;
  maxWidth?: string;
  titleMaxWidth?: string;
  height?: string;
  loading?: boolean;
  title?: string;
  subtitle?: (string | JSX.Element)[];
  supertitle?: string;
  titleSize?: UrsorTypographyVariant;
  button?: IDialogButtonDetails | JSX.Element;
  secondaryButton?: IDialogButtonDetails | JSX.Element;
  googleButton?: IDialogButtonDetails | JSX.Element;
  onCloseCallback?: () => void;
  backButtonCallback?: () => void;
  noCloseButton?: boolean;
  noPadding?: boolean;
  noBackdrop?: boolean;
  paddingX?: string;
  paddingTop?: string;
  longFadeIn?: boolean;
  bunchedUpContent?: boolean;
  scrollable?: boolean;
  dynamicHeight?: boolean;
  step?: number;
  nSteps?: number;
  noOverflowHidden?: boolean;
  children?: React.ReactNode; // the contents
  fitContent?: boolean;
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
  const [bodyFadeout, setBodyFadeout] = useState<boolean>(false);
  const [canFade, setCanFade] = useState<boolean>(false);

  useEffect(() => {
    if (canFade && _.isNumber(props.step)) {
      setBodyFadeout(true);
      setTimeout(() => {
        setBodyFadeout(false);
      }, BODY_FADE_DURATION);
    }
    setCanFade(true);
  }, [props.step]);

  const animation = {
    animation: `${bodyFadeout ? fadeOut : fadeIn} ${
      BODY_FADE_DURATION / 1000
    }s ease-in-out`,
  };

  const PrimaryButtonEndIcon = React.isValidElement(props.button)
    ? undefined
    : (props.button as IDialogButtonDetails)?.icon;

  const SecondaryButtonEndIcon = React.isValidElement(props.secondaryButton)
    ? undefined
    : (props.secondaryButton as IDialogButtonDetails)?.icon;

  const { width: windowWidth } = useWindowSize();

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
        style: {
          width: props.width || WIDTH,
          maxWidth: props.maxWidth || WIDTH,
          maxHeight: props.dynamicHeight ? undefined : HEIGHT,
          //minHeight: props.height || HEIGHT,
          height: props.dynamicHeight ? undefined : "100%",
          borderRadius: BORDER_RADIUS,
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": {
          display: props.noBackdrop ? "none" : "visible",
          ...BACKDROP_STYLE,
        },
        // ".MuiDialog-container": {
        //   overflow: "scroll",
        // },
      }}
    >
      <Stack
        position="relative"
        p={props.noPadding ? undefined : PADDING}
        px={props.paddingX}
        pt={props.paddingTop}
        borderRadius="25px"
        overflow={props.scrollable ? "scroll" : "hidden"}
        flex={1}
      >
        {props.backButtonCallback ? (
          <Box
            position="absolute"
            top={PADDING}
            left={PADDING}
            onClick={props.backButtonCallback}
            sx={{
              cursor: "pointer",
              "&:hover": { opacity: 0.6 },
              transition: "0.2s",
              zIndex: Z_INDEX,
            }}
          >
            <ChevronLeft height="27px" />
          </Box>
        ) : null}
        {/* {!props.noCloseButton ? (
          <Box
            position="absolute"
            top={props.noPadding ? "10px" : PADDING}
            right={props.noPadding ? "10px" : PADDING}
            onClick={props.onCloseCallback}
            sx={{
              cursor: "pointer",
              "&:hover": { opacity: 0.6 },
              transition: "0.2s",
              zIndex: Z_INDEX,
            }}
          >
            <X height="27px" />
          </Box>
        ) : null} */}
        {_.isNumber(props.step) && props.nSteps ? (
          <Stack
            width="100%"
            alignItems="center"
            position="relative"
            marginBottom={STEPPER_TITLE_SEPARATION}
            sx={{
              transform: "translateY(1px)",
            }}
          >
            <ByteStepper nSteps={props.nSteps} step={props.step} />
          </Stack>
        ) : null}
        <Stack
          flex={1}
          spacing={props.bunchedUpContent ? "12px" : "25px"}
          justifyContent={props.bunchedUpContent ? undefined : "space-between"}
          alignItems="center"
          sx={_.isNumber(props.step) ? animation : null}
          overflow={props.noOverflowHidden ? undefined : "scroll"}
        >
          {props.subtitle ||
          props.title ||
          props.supertitle ||
          props.onCloseCallback ? (
            <Stack
              spacing="12px"
              width="100%"
              alignItems="center"
              textAlign="center"
              //maxWidth="476px"
              px={props.paddingX}
              boxSizing="border-box"
            >
              {props.supertitle ||
              (props.onCloseCallback && !props.noCloseButton) ? (
                <Stack direction="row" width="100%">
                  <Stack width="100%" alignItems="center">
                    <Typography
                      variant={props.title ? "medium" : "large"}
                      bold
                      color={PALETTE.font.dark}
                    >
                      {props.supertitle}
                    </Typography>
                  </Stack>
                  <Stack width={0} position="relative">
                    <Stack position="absolute" right={0} top={0}>
                      {props.onCloseCallback ? (
                        <Box
                          position="absolute"
                          // top={props.noPadding ? "10px" : PADDING}
                          // right={props.noPadding ? "10px" : PADDING}
                          onClick={props.onCloseCallback}
                          sx={{
                            cursor: "pointer",
                            "&:hover": { opacity: 0.6 },
                            transition: "0.2s",
                            zIndex: Z_INDEX,
                          }}
                        >
                          <X height="27px" />
                        </Box>
                      ) : null}
                    </Stack>
                  </Stack>
                </Stack>
              ) : null}
              {props.title ? (
                <Stack maxWidth={props.titleMaxWidth}>
                  <Typography
                    variant={props.titleSize || "h3"}
                    color={PALETTE.secondary.purple[2]}
                    sx={{ maxWidth: props.titleMaxWidth }}
                  >
                    {props.title}
                  </Typography>
                </Stack>
              ) : null}
              {props.subtitle ? (
                <Stack alignItems="center">
                  {windowWidth < 750 ? (
                    <Typography variant="medium" sx={{ textAlign: "center" }}>
                      {props.subtitle.join(" ")}
                    </Typography>
                  ) : (
                    props.subtitle.map((sentence, index) => (
                      <Typography
                        key={index}
                        variant="medium"
                        sx={{ textAlign: "center" }}
                      >
                        {sentence}
                      </Typography>
                    ))
                  )}
                </Stack>
              ) : null}
            </Stack>
          ) : null}
          <Stack
            flex={1}
            width="100%"
            minHeight={0}
            maxHeight={props.bunchedUpContent ? 0 : undefined}
            alignItems="center"
            justifyContent="start"
            overflow={props.noOverflowHidden ? undefined : "hidden"}
          >
            {props.children}
          </Stack>

          {props.button || props.secondaryButton ? (
            <Stack spacing="8px" width="300px" maxWidth="100%">
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
                    backgroundColor={
                      (props.button as IDialogButtonDetails).color
                    }
                    variant={
                      (props.button as IDialogButtonDetails).variant ??
                      "primary"
                    }
                    endIcon={PrimaryButtonEndIcon}
                    width="100%"
                  >
                    {(props.button as IDialogButtonDetails).text}
                  </UrsorButton>
                )
              ) : null}
              {props.button ||
              props.secondaryButton ||
              props.googleButton ||
              !props.noCloseButton ? (
                <Stack spacing="12px" width="100%" alignItems="center">
                  {/* {!!props.googleButton ? (
                  React.isValidElement(props.googleButton) ? (
                    props.googleButton
                  ) : (
                    <UrsorButton
                      variant="google"
                      disabled={
                        (props.googleButton as IDialogButtonDetails).disabled ||
                        bodyFadeout
                      }
                      onClick={() => {
                        (props.googleButton as IDialogButtonDetails).callback();
                      }}
                      sx={{
                        width: BUTTON_WIDTH,
                      }}
                    >
                      {(props.googleButton as IDialogButtonDetails).text}
                    </UrsorButton>
                  )
                ) : null} */}
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
                        backgroundColor={
                          (props.secondaryButton as IDialogButtonDetails).color
                        }
                        variant={
                          (props.secondaryButton as IDialogButtonDetails)
                            .variant ?? "secondary"
                        }
                        endIcon={SecondaryButtonEndIcon}
                        width="100%"
                      >
                        {(props.secondaryButton as IDialogButtonDetails).text}
                      </UrsorButton>
                    )
                  ) : null}
                </Stack>
              ) : null}
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </Dialog>
  );
}
