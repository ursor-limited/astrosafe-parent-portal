"use client";

import { Stack } from "@mui/system";
import Star from "@/images/Star.svg";
import Image from "next/image";
import Link from "next/link";
import { PALETTE, Typography, UrsorButton } from "ui";
import FooterBackground from "@/images/footerBackground.png";
import FooterScreenshot from "@/images/footerScreenshot.png";

export const HEADER_HEIGHT = 86;

export const Footer = (props: { fontScale?: number }) => {
  return (
    <Stack
      direction="row"
      width="100%"
      height="100vh"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      // px="32px"
    >
      <Stack
        maxWidth="1100px"
        width="100%"
        minHeight={`${(props.fontScale || 1) * 670}px`}
        pt={`${(props.fontScale || 1) * 80}px`}
        borderRadius="16px"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          backgroundImage: `url(${FooterBackground.src})`,
          backgroundSize: "cover",
          boxSizing: "border-box",
        }}
        spacing="12px"
      >
        <Stack spacing="20px" alignItems="center">
          <Stack
            sx={{
              background: "linear-gradient(172deg, #F279C5, #1D62F6)",
              "-webkit-text-fill-color": "transparent",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
            }}
            alignItems="center"
          >
            <Stack width="70%" sx={{ textAlign: "center" }}>
              <Typography
                variant="h2"
                color={PALETTE.secondary.purple[2]}
                scale={props.fontScale}
              >
                SafeTube is a free tool developed by Astro, the safe Browser
                built for the Classroom
              </Typography>
            </Stack>
          </Stack>
          <Stack maxWidth="70%" sx={{ textAlign: "center" }}>
            <Typography
              bold
              variant="large"
              color={PALETTE.secondary.grey[4]}
              scale={props.fontScale}
            >
              Astro allows you to monitor your students online, and curate an
              internet specifically for their learning.
            </Typography>
          </Stack>
        </Stack>
        <Stack
          // pb={
          //   props.fontScale ? Math.max(0, 1 - props.fontScale) * 5 : undefined
          // }
          alignItems="center"
          spacing="3px"
        >
          <Link href="https://www.astrosafe.co/book-demo" target={"_blank"}>
            <UrsorButton
              size="large"
              endIcon={Star}
              startIcon={Star}
              iconSize={10}
              iconColor="rgba(255,255,255,0.6)"
            >
              Try Astro for free
            </UrsorButton>
          </Link>
          <Typography variant="small" color="rgba(0,0,0,0.4)">
            No payment or credit card required.
          </Typography>
        </Stack>
        <Stack width={`${(props.fontScale || 1) * 100}%`} alignItems="center">
          <Image src={FooterScreenshot} width={700} alt="Footer" />
          <Image src={FooterBackground} width={700} alt="Footer" />
          {/* <Stack
            width="700px"
            height="500px"
            // height=''
            sx={{
              backgroundImage: `url(${FooterScreenshot.src})`,
              backgroundSize: "cover",
              boxSizing: "border-box",
            }}
          /> */}
        </Stack>
      </Stack>
    </Stack>
  );
};