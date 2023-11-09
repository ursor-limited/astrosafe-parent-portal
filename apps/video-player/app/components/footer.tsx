"use client";

import { Stack } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { PALETTE, Typography, UrsorButton } from "ui";
import Logo from "@/images/logo.svg";
import Kitemark from "@/images/kiteMark.svg";
import FooterBackground from "@/images/footerBackground.svg";
import FooterScreenshot from "@/images/footerScreenshot.png";

export const HEADER_HEIGHT = 86;

export const Footer = () => {
  return (
    <Stack
      direction="row"
      width="100%"
      height="720px"
      minHeight="720px"
      alignItems="center"
      justifyContent="center"
      bgcolor={PALETTE.secondary.grey[1]}
    >
      <Stack
        width="1000px"
        height="600px"
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
        <Stack
          sx={{
            background: "linear-gradient(172deg, #F279C5, #1D62F6)",
            "-webkit-text-fill-color": "transparent",
            backgroundClip: "text",
            "-webkit-background-clip": "text",
          }}
        >
          <Typography variant="h0" color={PALETTE.secondary.purple[2]}>
            Book a Demo
          </Typography>
        </Stack>
        <Stack width="280px" sx={{ textAlign: "center" }}>
          <Typography bold variant="large" color={PALETTE.secondary.grey[3]}>
            A Browser for Education that puts Kids first.
          </Typography>
        </Stack>
        <Stack pb="40px" pt="8px">
          <Link href="https://www.astrosafe.co/book-demo" target={"_blank"}>
            <UrsorButton size="large">Start FREE trial</UrsorButton>
          </Link>
        </Stack>
        <Image src={FooterScreenshot} width={660} alt="Footer" />
      </Stack>
    </Stack>
  );
};
