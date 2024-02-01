import { Rubik } from "next/font/google";
import "./globals.css";
import { Stack } from "@mui/system";
import Background from "@/images/background.png";
import { Metadata } from "next";
import { PALETTE } from "ui";
import NotificationProvider from "./components/NotificationProvider";
import UrsorNotificationBar from "./components/UrsorNotificationBar";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SafeTube - A Safe video player for teachers and schools",
  description:
    "The safe video player for classrooms to access youtube and vimeo videos safely. Students get access to distraction free video links.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ zIndex: 999999999999 }}>
      <meta name="theme-color" content={PALETTE.primary.navy} />
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
          position="relative"
        >
          {/* <Header /> */}

          <NotificationProvider>
            <Stack width="100%" justifyContent="center">
              <UrsorNotificationBar />
            </Stack>
            {children}
          </NotificationProvider>
          {/* <Footer /> */}
        </Stack>
      </body>
    </html>
  );
}
