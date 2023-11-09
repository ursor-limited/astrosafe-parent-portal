"use client";

import { Stack } from "@mui/system";
import { Typography } from "ui";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { VIDEO_WIDTH } from "../create/CreationPageContents";
import Clipboard from "@/images/icons/Clipboard.svg";

const UrlBar = () => {
  const [hovering, setHovering] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const [currentPageUrl, setCurrentPageUrl] = useState<string | undefined>(
    undefined
  );
  useEffect(() => setCurrentPageUrl(window?.location.href), []);
  return currentPageUrl
    ? createPortal(
        <Stack
          zIndex={99998}
          width={VIDEO_WIDTH}
          marginLeft="auto"
          marginRight="auto"
          left={0}
          right={0}
          top="120px"
          position="absolute"
          px="18px"
          py="8px"
          bgcolor={hovering ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)"}
          borderRadius="12px"
          direction="row"
          justifyContent="space-between"
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
            color={
              hovering ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.75)"
            }
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
            <Stack direction="row" spacing="5px" sx={{ opacity: 0.9 }}>
              <Typography variant="small" bold color="rgb(255,255,255)">
                Share
              </Typography>
              <Image src={Clipboard} width={16} alt="Copy" />
            </Stack>
          )}
        </Stack>,
        document.body
      )
    : null;
};

export default UrlBar;
