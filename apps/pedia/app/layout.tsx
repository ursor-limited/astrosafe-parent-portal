import { Rubik } from "next/font/google";
import "./globals.css";
import { Stack } from "@mui/system";
import Background from "@/images/backgrounds/darkSmall.png";
import { Metadata } from "next";
import SpaceGlow from "@/images/spaceGlow.svg";
import Image from "next/image";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pedia",
  description: "Come here to satisfy your Teacher, stay for the awesomeness.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ zIndex: 999999999999 }}>
      <body className={rubik.className}>
        <Stack
          height="100vh"
          minHeight="100vh"
          overflow="scroll"
          width="100vw"
          position="relative"
        >
          <Image
            src={Background}
            alt="Astro background"
            className="object-cover"
            unoptimized
            fill
          />
          <Stack zIndex={1}>{children}</Stack>
          <Stack width="100%" position="fixed" bottom={0} zIndex={0}>
            <SpaceGlow width="auto" height="auto" />
          </Stack>
        </Stack>
      </body>
    </html>
  );
}
