"use client";

import { Stack } from "@mui/system";
import { Typography, UrsorButton } from "ui";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { VIDEO_WIDTH } from "../video/create/CreationPageContents";
import Clipboard from "@/images/icons/Clipboard.svg";

const UrlBar = () => {
  const [hovering, setHovering] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const [currentPageUrl, setCurrentPageUrl] = useState<string | undefined>(
    undefined
  );
  useEffect(() => setCurrentPageUrl(window?.location.href), []);
  return currentPageUrl ? (
    <Stack
      //zIndex={99998}
      width={VIDEO_WIDTH}
      // marginLeft="auto"
      // marginRight="auto"
      // left={0}
      // right={0}
      //top="120px"
      //position="absolute"
      height="50px"
      px="18px"
      py="8px"
      bgcolor={hovering ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.3)"}
      borderRadius="12px"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      onClick={() => {
        setCopied(true);
        navigator.clipboard.writeText(currentPageUrl);
      }}
      sx={{
        transition: "0.2s",
        cursor: "pointer",
      }}
      onMouseDown={() => {
        setPressed(true);
      }}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
        setPressed(false);
      }}
      onMouseUp={() => {
        setPressed(false);
      }}
    >
      <Typography
        variant="small"
        color={hovering ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.75)"}
        sx={{
          transition: "0.2s",
        }}
      >
        {currentPageUrl}
      </Typography>
      {copied ? (
        <Typography variant="small" bold color="rgba(255,255,255,0.9)">
          Copied to Clipboard
        </Typography>
      ) : (
        <UrsorButton
          endIcon={
            <Image src={Clipboard.src} width={16} height={16} alt="Copy" />
          }
          dark
          variant="tertiary"
          onClick={() => null}
          size="small"
        >
          Share safe video link
        </UrsorButton>
      )}
    </Stack>
  ) : null;
};

export default UrlBar;
