import React, { useEffect, useState } from 'react'
import { Box, Stack, keyframes } from '@mui/system'
import { Backdrop } from '@mui/material'
import { createPortal } from 'react-dom'
import { usePopper } from 'react-popper'
import { useWindowSize } from 'usehooks-ts'

export const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`

export const fadeOut = keyframes`
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`

export const DEFAULT_CORNER_RADIUS = '12px'
export const PADDING = '16px'

/* We unfortunately have two methods of raising the reference element above the backdrop. 
   Disadvantage of raising the z-index: does not work when it is inside a dialog, which has its own z stack.
   Disadvantage of duplicating: in some cases it can get misaligned from the original. */
type ButtonFloat = 'zIndex' | 'duplicate'

export interface IUrsorPopoverProps {
  open: boolean
  width?: number | string
  fieldWidth?: string
  buttonWidth?: boolean
  closeCallback: () => any
  maxHeight?: string
  yOffset?: number // px
  placement?: 'right' | 'left'
  cornerRadius?: string
  floatButton?: ButtonFloat // whether to keep the button above the backdrop
  noFloatButton?: boolean
  clickableFloatedButton?: boolean
  animation?: string
  fadedOut?: boolean
  content: React.ReactNode
  externalElement?: React.ReactNode
  noPadding?: boolean
  noCard?: boolean
  noBackdrop?: boolean
  disabled?: boolean
  zIndex?: number
  margin?: string
  flip?: boolean
  top?: boolean
  flexButton?: boolean
  // fullWidth?: boolean;
  children: React.ReactNode // the button
}

export default function UrsorPopover(props: IUrsorPopoverProps) {
  const [width, setWidth] = useState<number | undefined>(undefined)

  const [yOffset, setYOffset] = useState<number | undefined>(undefined)
  const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined)
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined)

  const [referenceElement, setReferenceElement] =
    React.useState<HTMLElement | null>(null)
  const [popperElement, setPopperElement] = React.useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement:
      props.placement === 'left' || props.buttonWidth
        ? `${props.top ? 'top' : 'bottom'}-start`
        : props.placement === 'right'
        ? `${props.top ? 'top' : 'bottom'}-end`
        : `${props.top ? 'top' : 'bottom'}`,
    modifiers: [{ name: 'flip', enabled: props.flip }],
  })

  const [buttonRef, setButtonRef] = useState<HTMLDivElement | null>(null)

  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  useEffect(
    () =>
      setIsFlipped(
        !!attributes.popper?.['data-popper-placement'].includes('top')
      ),
    [attributes.popper]
  )

  useEffect(() => {
    buttonRef?.focus()
  }, [buttonRef])

  const { width: windowWidth, height } = useWindowSize()

  useEffect(() => {
    setYOffset((props.yOffset ?? 0) - (referenceElement?.offsetHeight ?? 0))
    setWidth(referenceElement?.offsetWidth)
    setMaxWidth(
      (width ?? window.innerWidth) -
        (referenceElement?.getBoundingClientRect().left ?? 0)
    )
    setMaxHeight(
      (height ?? window.innerHeight) -
        (referenceElement?.getBoundingClientRect().top ?? 0) -
        62
    )
  }, [
    width,
    referenceElement,
    referenceElement?.offsetTop,
    referenceElement?.getBoundingClientRect().top,
    props.yOffset,
    height,
    windowWidth,
  ])

  return (
    <>
      <Stack
        ref={setReferenceElement}
        flex={props.flexButton ? 1 : undefined}
        // zIndex={
        //   props.open && props.floatButton === "zIndex"
        //     ? zIndices.POPUP + 1
        //     : "inherit"
        // }
        sx={{
          pointerEvents: props.disabled //|| (props.open && !props.noFloatButton)
            ? 'none'
            : 'auto',
          //opacity: props.open && !props.noFloatButton ? 0 : 1,
          zIndex: 2,
        }}
        width={props.fieldWidth}
        // width={props.width || "fit-content"}
      >
        {props.children}
      </Stack>

      {props.open
        ? createPortal(
            <>
              {!props.noBackdrop ? (
                <Backdrop
                  sx={{
                    background: 'transparent',
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
              >
                <Stack
                  //spacing={props.margin ?? "10px"}
                  pt={props.margin ?? '8px'}
                  // sx={{
                  //   // transform: `translateY(${
                  //   //   (isFlipped ? -1 : 1) * (props.margin ?? 0)
                  //   // }px)`,
                  //   transform: `translateY(${props.margin}px)`,
                  // }}
                  justifyContent="center"
                  alignItems={
                    props.placement === 'right'
                      ? 'flex-end'
                      : props.placement === 'left'
                      ? 'flex-start'
                      : 'center'
                  }
                  ref={setButtonRef}
                  sx={{
                    opacity: 0,
                    animation: `${fadeIn} 0.2s ease-out`,
                    animationFillMode: 'forwards',
                  }}
                >
                  {/* {!isFlipped ? (
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
                  ) : null} */}
                  {/* {props.externalElement ? (
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
                  ) : null} */}

                  {props.content ? (
                    <Box
                      width={
                        props.width ?? (props.buttonWidth ? width : undefined)
                      }
                      boxSizing="border-box"
                      borderRadius={props.cornerRadius ?? DEFAULT_CORNER_RADIUS}
                      p={props.noCard || props.noPadding ? undefined : PADDING}
                      sx={{
                        background: props.noCard ? undefined : 'white',
                        pointerEvents: props.open ? 'auto' : 'none',
                        opacity: props.open && !props.fadedOut ? 1 : 0,
                        transition: '0.3s',
                        animation: props.animation,
                        boxShadow: '0 0 90px rgba(0,0,0,0.15)',
                      }}
                      height="100%"
                      maxHeight={
                        props.maxHeight || (!props.flip ? maxHeight : undefined)
                      }
                      overflow="scroll"
                    >
                      {props.content}
                    </Box>
                  ) : null}
                </Stack>
              </Box>
            </>,
            document.body
          )
        : null}
    </>
  )
}
