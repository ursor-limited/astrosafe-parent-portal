import { Rubik } from "next/font/google";
import "./globals.css";
import { Stack } from "@mui/system";
import Background from "@/images/backgrounds/dark.png";
import { Metadata } from "next";
import SpaceGlow from "@/images/spaceGlow.svg";

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
          sx={{
            backgroundImage: `url(${Background.src})`,
            backgroundSize: "cover",
            boxSizing: "border-box",
          }}
          spacing="10px"
        >
          {children}
        </Stack>
        <Stack width="100%" position="fixed" bottom={0} zIndex={0}>
          <SpaceGlow width="100%" height="auto" />
        </Stack>
      </body>
    </html>
  );
}
