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
import UsersIllustration1 from "@/images/UsersIllustration1.png";
import UsersIllustration2 from "@/images/UsersIllustration2.png";
import UsersIllustration3 from "@/images/UsersIllustration3.png";
import BenefitsIllustration1 from "@/images/BenefitsIllustration1.png";
import SpaceGlow from "@/images/spaceGlow.svg";
import LandingPageViewport from "./LandingPageViewport";
import { IntroSquare2 } from "../components/IntroSquare2";
import { useRouter } from "next/navigation";
import { LandingPageFooter } from "../components/LandingPageFooter";
import { LandingPageFAQSection } from "../components/LandingPageFAQSection";

export default function PediaLandingPageSignedOutView() {
  /* needed for the platform row's proper scrollability */
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);

  const router = useRouter();

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
        <Stack spacing="100px" bgcolor="rgb(255,255,255)">
          <LandingPageViewport
            supertitle="Our collection"
            subtitle="Single Articles and Collections created by the community and vetted
          by our team."
            title="Browse our ever-growing collection of content"
          >
            <Stack />
          </LandingPageViewport>
          <LandingPageViewport
            supertitle="Benefits"
            subtitle="Lets add some engaging copy here, guys."
            title="Why use AstroPedia?"
          >
            <Stack direction="row" spacing="22px">
              <IntroSquare2
                image={BenefitsIllustration1}
                title="Create your own Articles"
                text="Choose the topics you want to create Wikipedia articles on!"
              />
              <IntroSquare2
                image={IntroSquareImage1}
                title="Engaging content"
                text="The Articles contain facts, stats, images and quizzes. And a toggle to change the reading age!"
              />
              <IntroSquare2
                image={IntroSquareImage3}
                title="Share your goodies"
                text="Once the Articles are created you can share the link to spread the knowledge!"
              />
            </Stack>
          </LandingPageViewport>
          <LandingPageViewport
            supertitle="Who uses AstroPedia"
            subtitle="AstroPedia was built with the education environment in mind."
            title="AstroPedia keeps kids engaged"
          >
            <Stack direction="row" spacing="22px">
              <IntroSquare2
                image={UsersIllustration1}
                title="Teachers"
                text="Teachas tend to luv os."
              />
              <IntroSquare2
                image={UsersIllustration2}
                title="Schools"
                text="AstroPedia be perfect for Skools."
              />
              <IntroSquare2
                image={UsersIllustration3}
                title="Parents"
                text="Parents too luv os."
              />
            </Stack>
          </LandingPageViewport>
          <Stack width="100%">
            <LandingPageFAQSection />
            <LandingPageFooter />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
