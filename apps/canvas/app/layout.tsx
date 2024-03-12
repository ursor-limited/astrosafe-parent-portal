import { Rubik } from "next/font/google";
import "./globals.css";
import { Stack } from "@mui/system";
import Background from "@/images/background.png";
import { PALETTE } from "ui";
import NotificationProvider from "./components/NotificationProvider";
import UrsorNotificationBar from "./components/UrsorNotificationBar";
import Image from "next/image";

const rubik = Rubik({
  subsets: ["latin"],
  weight: "variable",
});

// export const metadata: Metadata = {
//   title: "SafeTube - A Safe video player for teachers and schools",
//   description:
//     "The safe video player for classrooms to access youtube and vimeo videos safely. Students get access to distraction free video links.",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ zIndex: 999999999999 }}>
      <meta name="theme-color" content={PALETTE.primary.navy} />
      <body
        className={rubik.className}
        style={{
          margin: 0,
        }}
      >
        <Stack
          height="100vh"
          minHeight="100vh"
          overflow="scroll"
          width="100vw"
          position="relative"
        >
          <Stack
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="114%"
            zIndex={-1}
          >
            <Image
              src={Background.src}
              alt="Astro background"
              layout="fill"
              style={{
                zIndex: -1,
              }}
            />
          </Stack>
          <NotificationProvider>
            <Stack width="100%" justifyContent="center" zIndex={999999999}>
              <UrsorNotificationBar />
            </Stack>
            {children}
          </NotificationProvider>
        </Stack>
      </body>
    </html>
  );
}
