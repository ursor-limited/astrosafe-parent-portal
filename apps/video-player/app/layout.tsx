import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Stack } from "@mui/system";
import Background from "@/images/background.png";
import Logo from "@/images/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { UrsorButton } from "ui";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SafeTube - A Safe video player for teachers and schools",
  description: "The safe video player for classrooms to access youtube and vimeo videos safely. Students get access to distraction free video links.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Stack
          height="100vh"
          minHeight="100vh"
          overflow="scroll"
          width="100vw"
          sx={{
            backgroundImage: `url(${Background.src})`,
            backgroundSize: "cover",
            boxSizing: "border-box",
          }}
          spacing="10px"
        >
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
        </Stack>
      </body>
    </html>
  );
}
