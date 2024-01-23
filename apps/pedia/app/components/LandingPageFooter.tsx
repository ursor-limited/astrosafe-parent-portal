import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { PALETTE, Typography } from "ui";
import Logo from "@/images/logoDark.svg";
import { FooterList } from "../components/FooterList";
import Image from "next/image";

const PAGES_URLS = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Blog",
    url: "/blog",
  },
  {
    title: "Tutorials",
    url: "/tutorials",
  },
  {
    title: "Tools",
    url: "/tools",
  },
  {
    title: "Compare",
    url: "/compare",
  },
];

const COMPANY_URLS = [
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Privacy",
    url: "/privacy",
  },
  {
    title: "FAQ's",
    url: "/faqs",
  },
  {
    title: "TSC's",
    url: "/terms-and-conditions",
  },
  {
    title: "Child Privacy Policy",
    url: "/child-privacy-policy",
  },
];

export const LandingPageFooter = () => {
  const router = useRouter();
  return (
    <Stack
      width="100%"
      alignItems="center"
      justifyContent="center"
      bgcolor="rgb(255,255,255)"
    >
      <Stack
        direction="row"
        height="236px"
        width="100%"
        maxWidth="1320px"
        px="5px"
        py="35px"
        justifyContent="space-between"
      >
        <Stack width="280px" height="100%" justifyContent="space-between">
          <Stack spacing="12px">
            <Logo width="85px" height="30px" />
            <Typography
              sx={{
                fontWeight: 400,
              }}
            >
              A safe space for kids to discover, learn, and play online.
            </Typography>
          </Stack>
          <Stack direction="row" spacing="9px">
            <Stack
              onClick={() => router.push("https://www.linkedin.com/astrosafe/")}
            >
              <Image
                src="https://assets-global.website-files.com/60f56c56947f0f11b1881929/619bd4f34eb206d77199d60e_LinkedIN_white.png"
                width={30}
                height={30}
                loader={({ src }) => {
                  return src;
                }}
                alt="Linkedin link"
                style={{
                  borderRadius: "100%",
                  background: PALETTE.primary.navy,
                }}
              />
            </Stack>
            <Stack
              onClick={() =>
                router.push("https://www.facebook.com/astrosafeco")
              }
            >
              <Image
                src="https://assets-global.website-files.com/60f56c56947f0f11b1881929/619bd4f3e6d738f557cae3b2_Facebook_white.png"
                width={30}
                height={30}
                loader={({ src }) => {
                  return src;
                }}
                alt="Facebook link"
                style={{
                  borderRadius: "100%",
                  background: PALETTE.primary.navy,
                }}
              />
            </Stack>
            <Stack
              onClick={() =>
                router.push("https://www.instagram.com/astrosafebrowser/")
              }
            >
              <Image
                src="https://assets-global.website-files.com/60f56c56947f0f11b1881929/619bd4f26e765647afa2a993_Instagram_white.png"
                width={30}
                height={30}
                loader={({ src }) => {
                  return src;
                }}
                alt="Instagram link"
                style={{
                  borderRadius: "100%",
                  background: PALETTE.primary.navy,
                }}
              />
            </Stack>
            <Stack
              onClick={() => router.push("https://twitter.com/astrosafebrowse")}
            >
              <Image
                src="https://assets-global.website-files.com/60f56c56947f0f11b1881929/619bd4f3ffe78e45ab0d4527_Twitter_white.png"
                width={30}
                height={30}
                loader={({ src }) => {
                  return src;
                }}
                alt="Instagram link"
                style={{
                  borderRadius: "100%",
                  background: PALETTE.primary.navy,
                }}
              />
            </Stack>
            <Stack
              onClick={() =>
                (window.location.href = "mailto:hello@astrosafe.co")
              }
            >
              <Image
                src="https://assets-global.website-files.com/60f56c56947f0f11b1881929/619bd4f3fda9947f5b91d938_Telegram_white.png"
                width={30}
                height={30}
                loader={({ src }) => {
                  return src;
                }}
                alt="Instagram link"
                style={{
                  borderRadius: "100%",
                  background: PALETTE.primary.navy,
                }}
              />
            </Stack>
          </Stack>
          <Typography variant="small" color={PALETTE.secondary.grey[4]}>
            All rights reserved 2024™
          </Typography>
        </Stack>
        <Stack width="50%" direction="row" justifyContent="space-between">
          <FooterList title="Pages" items={PAGES_URLS} />
          <FooterList title="Company" items={COMPANY_URLS} />
          <Stack spacing="15px">
            <Typography
              variant="medium"
              sx={{
                fontWeight: 500,
              }}
            >
              Contact
            </Typography>
            <Stack spacing="7px">
              <Stack
                onClick={() =>
                  (window.location.href = "mailto:hello@astrosafe.co")
                }
                spacing="7px"
              >
                <Typography
                  variant="small"
                  color={PALETTE.secondary.grey[4]}
                  sx={{
                    fontWeight: 390,
                    "&:hover": { color: PALETTE.secondary.purple[2] },
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                >
                  hello@astrosafe.co
                </Typography>
                <Stack>
                  <Typography
                    variant="small"
                    color={PALETTE.secondary.grey[4]}
                    sx={{
                      fontWeight: 390,
                    }}
                  >
                    URSOR LIMITED, Company
                  </Typography>
                  <Typography
                    variant="small"
                    color={PALETTE.secondary.grey[4]}
                    sx={{
                      fontWeight: 390,
                    }}
                  >
                    number 13594628
                  </Typography>
                  <Typography
                    variant="small"
                    color={PALETTE.secondary.grey[4]}
                    sx={{
                      fontWeight: 390,
                    }}
                  >
                    404, 301 Kingsland Road,
                  </Typography>
                  <Typography
                    variant="small"
                    color={PALETTE.secondary.grey[4]}
                    sx={{
                      fontWeight: 390,
                    }}
                  >
                    E8 4DS, UK
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
