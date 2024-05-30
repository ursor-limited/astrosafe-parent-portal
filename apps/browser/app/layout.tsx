import { Rubik } from "next/font/google";
import "./globals.css";
import { Stack } from "@mui/system";
import Background from "@/images/background.png";
import { PALETTE } from "ui";
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
      <body
        className={rubik.className}
        style={{
          margin: 0,
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          background: PALETTE.secondary.grey[1],
        }}
      >
        {children}
      </body>
    </html>
  );
}
