"use client";

import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/system";
import { Backdrop } from "@mui/material";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import UrsorFadeIn from "./UrsorFadeIn";

export const DEFAULT_CORNER_RADIUS = "12px";
export const PADDING = "16px";

/* We unfortunately have two methods of raising the reference element above the backdrop. 
   Disadvantage of raising the z-index: does not work when it is inside a dialog, which has its own z stack.
   Disadvantage of duplicating: in some cases it can get misaligned from the original. */
type ButtonFloat = "zIndex" | "duplicate";

export interface IUrsorPopoverProps {
  open: boolean;
  width?: string;
  buttonWidth?: boolean;
  closeCallback: () => void;
  maxHeight?: boolean;
  yOffset?: number; // px
  placement?: "right" | "left";
  cornerRadius?: string;
  floatButton?: ButtonFloat; // whether to keep the button above the backdrop
  noFloatButton?: boolean;
  clickableFloatedButton?: boolean;
  disableOverflowFlip?: boolean;
  animation?: string;
  fadedOut?: boolean;
  content: React.ReactNode;
  externalElement?: React.ReactNode;
  noPadding?: boolean;
  noCard?: boolean;
  noBackdrop?: boolean;
  disabled?: boolean;
  zIndex?: number;
  children: React.ReactNode; // the button
}

export default function UrsorPopover(props: IUrsorPopoverProps) {
  const [width, setWidth] = useState<number | undefined>(undefined);

  const [yOffset, setYOffset] = useState<number | undefined>(undefined);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);

  const [referenceElement, setReferenceElement] =
    React.useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement:
      props.placement === "left"
        ? "bottom-start"
        : props.placement === "right"
        ? "bottom-end"
        : "bottom", ///props.leftAlign ? "bottom-start" : "bottom",
    modifiers: [{ name: "flip", enabled: !props.disableOverflowFlip }],
  });

  const [buttonRef, setButtonRef] = useState<HTMLDivElement | null>(null);

  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  useEffect(
    () =>
      setIsFlipped(
        !!attributes.popper?.["data-popper-placement"].includes("top")
      ),
    [attributes.popper]
  );

  useEffect(() => {
    buttonRef?.focus();
  }, [buttonRef]);

  useEffect(() => {
    setYOffset((props.yOffset ?? 0) - (referenceElement?.offsetHeight ?? 0));
    setWidth(referenceElement?.offsetWidth);
    setMaxHeight(
      window.innerHeight - (referenceElement?.getBoundingClientRect().top ?? 0)
    );
  }, [referenceElement, referenceElement?.offsetTop, window.innerHeight]);

  return (
    <>
      <Stack
        ref={setReferenceElement}
        // zIndex={
        //   props.open && props.floatButton === "zIndex"
        //     ? zIndices.POPUP + 1
        //     : "inherit"
        // }
        sx={{
          pointerEvents:
            props.disabled || (props.open && !props.noFloatButton)
              ? "none"
              : "auto",
          opacity: props.open && !props.noFloatButton ? 0 : 1,
          zIndex: 2,
        }}
        width={props.width || "fit-content"}
      >
        {props.children}
      </Stack>

      {props.open
        ? createPortal(
            <>
              {!props.noBackdrop ? (
                <Backdrop
                  sx={{
                    //background: "rgba(0, 0, 0, 0.2)",
                    //backdropFilter: "blur(3px)",
                    zIndex: props.zIndex || 2,
                  }}
                  open={props.open}
                  onClick={props.closeCallback}
                />
              ) : null}

              <Box
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                zIndex={props.zIndex || 3}
                //height={0}
              >
                <Stack
                  spacing="10px"
                  maxHeight={props.maxHeight && maxHeight ? maxHeight : "auto"}
                  sx={{
                    transform: `translateY(${
                      (isFlipped ? -1 : 1) * (yOffset ?? 0)
                    }px)`,
                  }}
                  justifyContent="center"
                  alignItems={
                    props.placement === "right"
                      ? "flex-end"
                      : props.placement === "left"
                      ? "flex-start"
                      : "center"
                  }
                  ref={setButtonRef}
                >
                  {!isFlipped ? (
                    <Box
                      sx={{
                        opacity: props.noFloatButton ? 0 : 1,
                        pointerEvents: props.clickableFloatedButton
                          ? undefined
                          : "none",
                      }}
                    >
                      {props.children}
                    </Box>
                  ) : null}
                  {props.externalElement ? (
                    <Box
                      width={width}
                      sx={{
                        pointerEvents: props.open ? "auto" : "none",
                        opacity: props.open ? 1 : 0,
                        transition: "0.3s",
                        //animation: props.animation,
                      }}
                    >
                      {props.externalElement}
                    </Box>
                  ) : null}
                  <UrsorFadeIn duration={700}>
                    {props.content ? (
                      <Box
                        width={props.buttonWidth ? width : props.width}
                        borderRadius={
                          props.cornerRadius ?? DEFAULT_CORNER_RADIUS
                        }
                        p={
                          props.noCard || props.noPadding ? undefined : PADDING
                        }
                        sx={{
                          background: props.noCard ? undefined : "white",
                          pointerEvents: props.open ? "auto" : "none",
                          opacity: props.open && !props.fadedOut ? 1 : 0,
                          transition: "0.3s",
                          animation: props.animation,
                        }}
                        height="100%"
                        overflow="scroll"
                      >
                        {props.content}
                      </Box>
                    ) : null}
                    {isFlipped ? (
                      <Box
                        sx={{
                          opacity: props.noFloatButton ? 0 : 1,
                          pointerEvents: props.clickableFloatedButton
                            ? undefined
                            : "none",
                        }}
                      >
                        {props.children}
                      </Box>
                    ) : null}
                  </UrsorFadeIn>
                </Stack>
              </Box>
            </>,
            document.body
          )
        : null}
    </>
  );
}
