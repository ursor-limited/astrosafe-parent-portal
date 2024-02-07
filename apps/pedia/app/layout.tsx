import { Rubik } from "next/font/google";
import "./globals.css";
import { Stack } from "@mui/system";
import Background from "@/images/backgrounds/darkSmall.png";
import { Metadata } from "next";
import Image from "next/image";
import { Auth0Provider } from "@auth0/auth0-react";
import AuthWrapper from "./components/AuthWrapper";
import NotificationProvider from "./components/NotificationProvider";
import UrsorNotificationBar from "./components/UrsorNotificationBar";

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
        <AuthWrapper>
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
            <NotificationProvider>
              <Stack width="100%" justifyContent="center" zIndex={999999999}>
                <UrsorNotificationBar />
              </Stack>
              <Stack zIndex={1}>{children}</Stack>
            </NotificationProvider>
          </Stack>
        </AuthWrapper>
      </body>
    </html>
  );
}
