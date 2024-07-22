import { Stack } from "@mui/system";
import Image from "next/image";
import { PALETTE, Typography } from "ui";

interface IProviderButtonDetails {
  name: string;
  logoUrl: string;
}

const LoginButton = (props: IProviderButtonDetails) => (
  <Stack
    height="39px"
    bgcolor={PALETTE.secondary.grey[1]}
    borderRadius="20px"
    px="24px"
    alignItems="center"
    direction="row"
    spacing="16px"
    sx={{
      cursor: "pointer",
      "&:hover": { opacity: 0.6 },
      transition: "0.2s",
    }}
  >
    <Image src={props.logoUrl} height={20} width={20} alt="provider logo" />
    <Typography bold>{`Sign in with ${props.name}`}</Typography>
  </Stack>
);

const PROVIDER_BUTTON_DETAILS: IProviderButtonDetails[] = [
  {
    name: "Google",
    logoUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/google_icon.png",
  },
  {
    name: "Apple",
    logoUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/apple_logo.png",
  },
];

const LoginPage = () => {
  return (
    <Stack direction="row" height="100%">
      <Stack px="8%" height="100%" justifyContent="center">
        <Stack
          bgcolor="rgb(255,255,255)"
          borderRadius="24px"
          p="28px"
          boxSizing="border-box"
          justifyContent="center"
          width="391px"
        >
          <Stack alignItems="center" spacing="12px" width="100%">
            <Stack
              sx={{
                background: `linear-gradient(${PALETTE.secondary.purple[2]}, ${PALETTE.secondary.blue[2]})`,
                "-webkit-text-fill-color": "transparent",
                backgroundClip: "text",
                "-webkit-background-clip": "text",
              }}
            >
              <Typography variant="h5" color={PALETTE.secondary.purple[2]}>
                Welcome to AstroSafe
              </Typography>
            </Stack>
            <Typography variant="small">
              Log in to your account and start creating
            </Typography>
          </Stack>
          <Stack pt="16px" spacing="9px" width="100%">
            {PROVIDER_BUTTON_DETAILS.map((x, i) => (
              <LoginButton key={i} {...x} />
            ))}
          </Stack>
          <Stack
            direction="row"
            height="48px"
            alignItems="center"
            spacing="16px"
          >
            <Stack
              height="1px"
              bgcolor={PALETTE.secondary.grey[3]}
              width="100%"
            />
            <Typography color={PALETTE.secondary.grey[3]} variant="small">
              OR
            </Typography>
            <Stack
              height="1px"
              bgcolor={PALETTE.secondary.grey[3]}
              width="100%"
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
