"use client";

import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import _ from "lodash";
import { useWindowSize } from "usehooks-ts";
import { Header } from "@/app/components/Header";
import { MOBILE_WINDOW_WIDTH_THRESHOLD } from "../c/[pageId]/PediaCollectionPageContents";
import { PALETTE, Typography } from "ui";
import { CreationBox } from "../components/CreationBox";
import { IntroSquare } from "../components/IntroSquare";
import IntroSquareImage1 from "@/images/IntroSquareImage1.png";
import IntroSquareImage2 from "@/images/IntroSquareImage2.png";
import IntroSquareImage3 from "@/images/IntroSquareImage3.png";
import SpaceGlow from "@/images/spaceGlow.svg";

export default function PediaLandingPageContents() {
  /* needed for the platform row's proper scrollability */
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);

  return (
    <Stack width="100vw" height="100vh" alignItems="center" overflow="scroll">
      <Header />
      <Stack spacing="36px" alignItems="center">
        <Stack maxWidth="780px" spacing="6px">
          <Stack
            sx={{
              background: "linear-gradient(150deg, #F279C5, #FD9B41)",
              "-webkit-text-fill-color": "transparent",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
            }}
            alignItems="center"
          >
            <Typography variant="h1">Create some sweet Articles</Typography>
          </Stack>
          <Typography
            variant="h5"
            color="rgba(255,255,255,0.8)"
            sx={{ textAlign: "center", lineHeight: "28px" }}
          >
            AstroPedia is the safe, focused and magical encyclopedia for kids.
            Add topics below to create an Article, or a Collection of Articles.
          </Typography>
        </Stack>
        <CreationBox />
        <Stack direction="row" spacing="32px">
          <IntroSquare
            image={IntroSquareImage1}
            title="Bespoke knowledge"
            text="Creates a unique set of Articles, using only the topics you want."
            imageHeight="190px"
          />
          <IntroSquare
            image={IntroSquareImage2}
            title="Age-appropriateness"
            text="Toggle between two age-appropriate languages, for younger and older kids."
          />
          <IntroSquare
            image={IntroSquareImage3}
            title="Safe sharing"
            text="Share your Articles by a safe link no one can tamper with or edit without consent."
            imageHeight="190px"
          />
        </Stack>
      </Stack>
      <Stack width="100%">
        <Stack
          sx={{
            transform: "translateY(1px)",
          }}
        >
          <SpaceGlow width="auto" height="auto" />
        </Stack>
        <Stack
          flex={1}
          bgcolor="rgb(255,255,255)"
          py="30px"
          alignItems="center"
          zIndex={1} // covers the SpaceGlow's bottom border
        >
          <Stack spacing="13px" maxWidth="516px" alignItems="center">
            <Stack spacing="6px" alignItems="center">
              <Typography
                variant="large"
                bold
                color={PALETTE.secondary.grey[4]}
              >
                Our collection
              </Typography>
              <Typography
                variant="h3"
                bold
                color={PALETTE.secondary.grey[5]}
                sx={{ textAlign: "center" }}
              >
                Browse our ever-growing collection of content
              </Typography>
            </Stack>
            <Stack maxWidth="455px">
              <Typography
                bold
                color={PALETTE.secondary.grey[4]}
                sx={{ textAlign: "center" }}
              >
                Single Articles and Collections created by the community and
                vetted by our team.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
