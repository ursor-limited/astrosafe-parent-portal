import { Stack } from "@mui/system";
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
    px="16px"
    alignItems="center"
  >
    <Typography bold>{`Sign in with ${props.name}`}</Typography>
  </Stack>
);

const PROVIDER_BUTTON_DETAILS: IProviderButtonDetails[] = [
  {
    name: "Google",
    logoUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/google_logo.png",
  },
  {
    name: "Apple",
    logoUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/apple_logo.png",
  },
];

const LoginPage = () => {
  return (
    <Stack direction="row">
      <Stack justifyContent="center" alignItems="center">
        <Stack
          bgcolor="rgb(255,255,255)"
          borderRadius="24px"
          p="28px"
          boxSizing="border-box"
          justifyContent="center"
          width="391px"
        >
          <Typography variant="h5" color={PALETTE.secondary.purple[2]}>
            Welcome to AstroSafe
          </Typography>
          <Stack spacing="12px">
            {PROVIDER_BUTTON_DETAILS.map((x, i) => (
              <LoginButton key={i} {...x} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
