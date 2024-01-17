"use client";

import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import _ from "lodash";
import { useWindowSize } from "usehooks-ts";
import { Header } from "@/app/components/Header";
import { MOBILE_WINDOW_WIDTH_THRESHOLD } from "../c/[pageId]/PediaCollectionPageContents";
import { Typography } from "ui";

export default function PediaLandingPageContents() {
  /* needed for the platform row's proper scrollability */
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);

  return (
    <Stack width="100vw" height="100vh" alignItems="center" overflow="scroll">
      <Header />
      <Stack>
        <Stack
          sx={{
            background: "linear-gradient(172deg, #F279C5, #1D62F6)",
            "-webkit-text-fill-color": "transparent",
            backgroundClip: "text",
            "-webkit-background-clip": "text",
          }}
          alignItems="center"
        >
          <Typography variant="h1">
            AstroPedia - Create some sweet Articles
          </Typography>
        </Stack>
        <Typography
          variant="h5"
          color="rgba(255,255,255,0.8)"
          sx={{ textAlign: "center" }}
        >
          AstroPedia is the safe, focused and magical encyclopedia for kids. Add
          topics below to create an Article, or a Collection of Articles.
        </Typography>
      </Stack>
      <Stack color="rgba(0,0,0,2)" px="24px" py="20px" maxWidth="733px">
        <UrsorInputField
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(event.target.value)
          }
          placeholder="Add a title"
          width="100%"
          backgroundColor={INPUT_FIELD_BACKGROUND_COLOR}
          color={INPUT_FIELD_TEXT_COLOR}
          backgroundBlur="blur(3px)"
          leftAlign
          boldValue
        />
      </Stack>
    </Stack>
  );
}
