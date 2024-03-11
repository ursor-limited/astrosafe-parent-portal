import { Rubik } from "next/font/google";
import "./globals.css";
import { PALETTE } from "ui";

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
        id="headerComponent"
      >
        {children}
      </body>
    </html>
  );
}