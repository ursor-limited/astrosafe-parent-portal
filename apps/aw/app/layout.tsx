import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: "variable",
});

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
