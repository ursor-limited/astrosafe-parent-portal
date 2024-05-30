import React, { useEffect, useState } from "react";
import { Box, Stack, keyframes } from "@mui/system";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import LinkExternalIcon from "@/images/icons/LinkExternalIcon.svg";
import { PALETTE, Typography } from "ui";
import { getAbsoluteUrl } from "@/app/api";
import dynamic from "next/dynamic";

const DynamicallyLoadedPortal = dynamic(
  () => import("../../components/DynamicallyLoadedPortal"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

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

export interface IUrlPopoverProps {
  url: string;
  open: boolean;
  closeCallback: () => void;
}

export default function UrlPopover(props: IUrlPopoverProps) {
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
    // modifiers: [{ name: "flip", enabled:  }],
  });

  const [initialized, setInitialized] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  const [fadingOut, setFadingOut] = useState<boolean>(false);
  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
    } else if (!hovering) {
      setTimeout(() => setFadingOut(false), 300);
    }
  }, [hovering]);

  const [hoveringOnContent, setHoveringOnContent] = useState<boolean>(false);

  return (
    <>
      <Box
        ref={setReferenceElement}
        sx={{
          pointerEvents: props.open ? "none" : "auto",
          opacity: props.open ? 0 : 1,
        }}
        width="fit-content"
        onMouseEnter={() => {
          setHovering(true);
          setFadingOut(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
          setFadingOut(true);
        }}
      >
        <Typography>{props.url}</Typography>
      </Box>

      {hovering || fadingOut ? (
        <DynamicallyLoadedPortal>
          <>
            <Box
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              //zIndex={zIndices.POPUP + 1}
              //height={0}
              sx={{
                animation: `${hovering ? fadeIn : fadeOut} 0.3s ease-out`,
                animationFillMode: "forwards",
                cursor: "pointer",
              }}
            >
              <a
                target="_blank"
                href={getAbsoluteUrl(props.url)}
                style={{
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                <Stack
                  height="36px"
                  px="12px"
                  bgcolor={"rgb(255,255,255)"}
                  borderRadius="12px"
                  direction="row"
                  spacing="8px"
                  alignItems="center"
                  boxSizing="border-box"
                  sx={{
                    svg: {
                      path: {
                        transition: "0.2s",
                        fill: PALETTE.secondary.blue[hoveringOnContent ? 4 : 3],
                      },
                    },
                  }}
                  onMouseEnter={() => {
                    setHovering(true);
                    setHoveringOnContent(true);
                  }}
                  onMouseLeave={() => {
                    setHovering(false);
                    setHoveringOnContent(false);
                  }}
                >
                  <LinkExternalIcon height="16px" width="16px" />
                  <Typography
                    color={PALETTE.secondary.blue[hoveringOnContent ? 4 : 3]}
                    sx={{
                      transition: "0.2s",
                    }}
                  >
                    {props.url}
                  </Typography>
                </Stack>
              </a>
            </Box>
          </>
        </DynamicallyLoadedPortal>
      ) : null}
    </>
  );
}
