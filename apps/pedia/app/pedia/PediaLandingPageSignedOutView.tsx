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
import Logo from "@/images/logoDark.svg";
import LandingPageViewport from "./LandingPageViewport";
import { IntroSquare2 } from "../components/IntroSquare2";
import { useRouter } from "next/navigation";
import { FooterList } from "../components/FooterList";
import Image from "next/image";

const PAGES_URLS = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Blog",
    url: "/blog",
  },
  {
    title: "Tutorials",
    url: "/tutorials",
  },
  {
    title: "Tools",
    url: "/tools",
  },
  {
    title: "Compare",
    url: "/compare",
  },
];

const COMPANY_URLS = [
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Privacy",
    url: "/privacy",
  },
  {
    title: "FAQ's",
    url: "/faqs",
  },
  {
    title: "TSC's",
    url: "/terms-and-conditions",
  },
  {
    title: "Child Privacy Policy",
    url: "/child-privacy-policy",
  },
];

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
          <Stack
            width="100%"
            bgcolor={PALETTE.secondary.grey[1]}
            alignItems="center"
            justifyContent="center"
          >
            <Stack
              direction="row"
              height="236px"
              width="100%"
              maxWidth="1320px"
              px="160px"
              py="35px"
              justifyContent="space-between"
            >
              <Stack width="280px" height="100%" justifyContent="space-between">
                <Stack spacing="10px">
                  <Logo width="80px" height="28px" />
                  <Typography
                    sx={{
                      fontWeight: 400,
                    }}
                  >
                    A safe space for kids to discover, learn, and play online.
                  </Typography>
                </Stack>
                <Stack direction="row" spacing="9px">
                  <Stack
                    onClick={() =>
                      router.push("https://www.linkedin.com/astrosafe/")
                    }
                  >
                    <Image
                      src="https://assets-global.website-files.com/60f56c56947f0f11b1881929/619bd4f34eb206d77199d60e_LinkedIN_white.png"
                      width={30}
                      height={30}
                      loader={({ src }) => {
                        return src;
                      }}
                      alt="Linkedin link"
                      style={{
                        borderRadius: "100%",
                        background: PALETTE.primary.navy,
                      }}
                    />
                  </Stack>
                  <Stack
                    onClick={() =>
                      router.push("https://www.facebook.com/astrosafeco")
                    }
                  >
                    <Image
                      src="https://assets-global.website-files.com/60f56c56947f0f11b1881929/619bd4f3e6d738f557cae3b2_Facebook_white.png"
                      width={30}
                      height={30}
                      loader={({ src }) => {
                        return src;
                      }}
                      alt="Facebook link"
                      style={{
                        borderRadius: "100%",
                        background: PALETTE.primary.navy,
                      }}
                    />
                  </Stack>
                  <Stack
                    onClick={() =>
                      router.push("https://www.instagram.com/astrosafebrowser/")
                    }
                  >
                    <Image
                      src="https://assets-global.website-files.com/60f56c56947f0f11b1881929/619bd4f26e765647afa2a993_Instagram_white.png"
                      width={30}
                      height={30}
                      loader={({ src }) => {
                        return src;
                      }}
                      alt="Instagram link"
                      style={{
                        borderRadius: "100%",
                        background: PALETTE.primary.navy,
                      }}
                    />
                  </Stack>
                  <Stack
                    onClick={() =>
                      router.push("https://twitter.com/astrosafebrowse")
                    }
                  >
                    <Image
                      src="https://assets-global.website-files.com/60f56c56947f0f11b1881929/619bd4f3ffe78e45ab0d4527_Twitter_white.png"
                      width={30}
                      height={30}
                      loader={({ src }) => {
                        return src;
                      }}
                      alt="Instagram link"
                      style={{
                        borderRadius: "100%",
                        background: PALETTE.primary.navy,
                      }}
                    />
                  </Stack>
                  <Stack
                    onClick={() =>
                      (window.location.href = "mailto:hello@astrosafe.co")
                    }
                  >
                    <Image
                      src="https://assets-global.website-files.com/60f56c56947f0f11b1881929/619bd4f3fda9947f5b91d938_Telegram_white.png"
                      width={30}
                      height={30}
                      loader={({ src }) => {
                        return src;
                      }}
                      alt="Instagram link"
                      style={{
                        borderRadius: "100%",
                        background: PALETTE.primary.navy,
                      }}
                    />
                  </Stack>
                </Stack>
                <Typography variant="small" color={PALETTE.secondary.grey[4]}>
                  All rights reserved 2024™
                </Typography>
              </Stack>
              <Stack width="50%" direction="row" justifyContent="space-between">
                <FooterList title="Pages" items={PAGES_URLS} />
                <FooterList title="Company" items={COMPANY_URLS} />
                <Stack spacing="15px">
                  <Typography
                    variant="medium"
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    Contact
                  </Typography>
                  <Stack spacing="7px">
                    <Stack
                      onClick={() =>
                        (window.location.href = "mailto:hello@astrosafe.co")
                      }
                      spacing="7px"
                    >
                      <Typography
                        variant="small"
                        color={PALETTE.secondary.grey[4]}
                        sx={{
                          fontWeight: 390,
                          "&:hover": { color: PALETTE.secondary.purple[2] },
                          cursor: "pointer",
                          transition: "0.2s",
                        }}
                      >
                        hello@astrosafe.co
                      </Typography>
                      <Stack>
                        <Typography
                          variant="small"
                          color={PALETTE.secondary.grey[4]}
                          sx={{
                            fontWeight: 390,
                          }}
                        >
                          URSOR LIMITED, Company
                        </Typography>
                        <Typography
                          variant="small"
                          color={PALETTE.secondary.grey[4]}
                          sx={{
                            fontWeight: 390,
                          }}
                        >
                          number 13594628
                        </Typography>
                        <Typography
                          variant="small"
                          color={PALETTE.secondary.grey[4]}
                          sx={{
                            fontWeight: 390,
                          }}
                        >
                          404, 301 Kingsland Road,
                        </Typography>
                        <Typography
                          variant="small"
                          color={PALETTE.secondary.grey[4]}
                          sx={{
                            fontWeight: 390,
                          }}
                        >
                          E8 4DS, UK
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
