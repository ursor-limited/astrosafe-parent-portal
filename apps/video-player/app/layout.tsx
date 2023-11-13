import { Rubik } from "next/font/google";
import "./globals.css";
import { Stack } from "@mui/system";
import Background from "@/images/background.png";

const rubik = Rubik({ subsets: ["latin"] });

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
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
        </Stack>
      </body>
    </html>
  );
}
