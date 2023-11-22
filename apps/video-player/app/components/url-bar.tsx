"use client";

import { Stack } from "@mui/system";
import { Typography, UrsorButton } from "ui";
import Image from "next/image";
import { useEffect, useState } from "react";
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
      width="100%"
      // marginLeft="auto"
      // marginRight="auto"
      // left={0}
      // right={0}
      //top="120px"
      //position="absolute"
      spacing="20px"
      height="76px"
      px="28px"
      py="8px"
      bgcolor={hovering ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.15)"}
      borderRadius="14px"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      overflow="hidden"
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
        bold
        noWrap
        color={hovering ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.7)"}
        sx={{
          transition: "0.2s",
        }}
      >
        {currentPageUrl}
      </Typography>

      {copied ? (
        <Stack>
          <Typography noWrap bold color="rgba(255,255,255,0.9)">
            Copied to Clipboard
          </Typography>
        </Stack>
      ) : (
        <UrsorButton
          endIcon={
            <Image src={Clipboard.src} width={16} height={16} alt="Copy" />
          }
          dark
          variant="tertiary"
          onClick={() => null}
        >
          Share safe video link
        </UrsorButton>
      )}
    </Stack>
  ) : null;
};

export default UrlBar;
