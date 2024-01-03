"use client";

import { Stack } from "@mui/system";
import Kitemark from "@/images/kiteMark.svg";
import Image from "next/image";
import Link from "next/link";
import { PALETTE, Typography, UrsorButton } from "ui";
import Logo from "@/images/logo.svg";
import FooterBackground from "@/images/footerBackground.png";
import FooterScreenshot from "@/images/footerScreenshot.png";

export const HEADER_HEIGHT = 86;

export const Footer = () => {
  return (
    <Stack
      direction="row"
      width="100%"
      height="100vh"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        width="1100px"
        height="670px"
        pt="80px"
        borderRadius="16px"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          backgroundImage: `url(${FooterBackground.src})`,
          backgroundSize: "cover",
          boxSizing: "border-box",
        }}
      >
        <Stack spacing="20px" alignItems="center">
          <Stack
            sx={{
              background: "linear-gradient(172deg, #F279C5, #1D62F6)",
              "-webkit-text-fill-color": "transparent",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
            }}
          >
            <Stack width="750px" sx={{ textAlign: "center" }}>
              <Typography variant="h2" color={PALETTE.secondary.purple[2]}>
                SafeTube is a free tool developed by Astro, the safe Browser
                built for the Classroom
              </Typography>
            </Stack>
          </Stack>
          <Stack width="600px" sx={{ textAlign: "center" }}>
            <Typography bold variant="large" color={PALETTE.secondary.grey[4]}>
              Astro allows you to monitor your students online, and curate an
              internet specifically for their learning.
            </Typography>
          </Stack>
        </Stack>
        <Stack pt="12px" alignItems="center" spacing="3px">
          <Link href="https://www.astrosafe.co/book-demo" target={"_blank"}>
            <UrsorButton
              size="large"
              endIcon={Kitemark}
              startIcon={Kitemark}
              iconSize="3px"
              iconColor="rgba(255,255,255,0.6)"
            >
              Try Astro for free
            </UrsorButton>
          </Link>
          <Typography variant="small" color="rgba(0,0,0,0.4)">
            No payment or credit card required.
          </Typography>
        </Stack>
        <Image src={FooterScreenshot} width={700} alt="Footer" />
      </Stack>
    </Stack>
  );
};
