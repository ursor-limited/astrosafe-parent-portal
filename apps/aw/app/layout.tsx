import { DM_Sans } from "next/font/google";
import "./globals.css";
import { PALETTE } from "ui";

const dmSans = DM_Sans({
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
      <meta name="theme-color" />
      <body
        className={`bg-background-primary overflow-hidden ${dmSans.className}`}
        id="headerComponent"
      >
        {children}
      </body>
    </html>
  );
}
