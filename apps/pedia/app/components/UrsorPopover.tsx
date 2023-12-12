import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/system";
import { Backdrop } from "@mui/material";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

export const DEFAULT_CORNER_RADIUS = "12px";
export const PADDING = "16px";

export const HIDE_SCROLLBAR = { "::-webkit-scrollbar": { display: "none" } };

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
  clickableFloatedButton?: boolean;
  disableOverflowFlip?: boolean;
  animation?: string;
  fadedOut?: boolean;
  content: React.ReactNode;
  externalElement?: React.ReactNode;
  noPadding?: boolean;
  noCard?: boolean;
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
      window.innerHeight - (referenceElement?.getBoundingClientRect().top ?? 0) // have to use getBoundingClientRect to get the top relative to the window, and not to the dialog
    );
  }, [referenceElement, referenceElement?.offsetTop, window.innerHeight]);

  return (
    <>
      <Box
        ref={setReferenceElement}
        zIndex={props.open && props.floatButton === "zIndex" ? 9999 : "inherit"}
        sx={{
          //pointerEvents: props.open ? "none" : "auto",
          opacity: props.open ? 0 : 1,
        }}
      >
        {props.children}
      </Box>

      {props.open
        ? createPortal(
            <>
              <Backdrop
                sx={{
                  background: "rgba(0, 0, 0, 0.2)",
                  backdropFilter: "blur(3px)",
                  //zIndex: zIndices.POPUP,
                }}
                open={props.open}
                onClick={props.closeCallback}
              />
              <Box
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                //zIndex={zIndices.POPUP + 1}
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
                  {props.content ? (
                    <Box
                      width={props.buttonWidth ? width : props.width}
                      borderRadius={props.cornerRadius ?? DEFAULT_CORNER_RADIUS}
                      //py={props.noCard || props.noPadding ? undefined : PADDING}
                      sx={{
                        background: props.noCard ? undefined : "white",
                        pointerEvents: props.open ? "auto" : "none",
                        opacity: props.open && !props.fadedOut ? 1 : 0,
                        transition: "0.3s",
                        // "::-webkit-scrollbar": {
                        //   display: "none",
                        // },
                        animation: props.animation,
                        ...HIDE_SCROLLBAR,
                      }}
                      height="100%"
                      overflow="scroll"
                      //width="100%"
                      //sx={HIDE_SCROLLBAR}
                    >
                      {props.content}
                    </Box>
                  ) : null}
                  {isFlipped ? (
                    <Box
                      sx={{
                        pointerEvents: props.clickableFloatedButton
                          ? undefined
                          : "none",
                      }}
                    >
                      {props.children}
                    </Box>
                  ) : null}
                </Stack>
              </Box>
            </>,
            document.body
          )
        : null}
    </>
  );
}
