import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { Stack } from "@mui/system";
import Image from "next/image";
import { useState } from "react";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import { LabeledInputField } from "ui/labeled-input-field";

interface IProviderButtonDetails {
  name: string;
  logoUrl: string;
}

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

const LoginForkCard = (props: {
  title: string;
  subtitle: string;
  imageUrl: string;
  button: React.ReactNode;
}) => (
  <Stack
    borderRadius="20px"
    width="419px"
    bgcolor="rgb(255,255,255)"
    spacing="26px"
    pt="32px"
    boxSizing="border-box"
  >
    <Stack spacing="8px" alignItems="center">
      <Typography variant="h5">{props.title}</Typography>
      <Stack width="70%">
        <Typography
          variant="medium"
          bold
          sx={{ textAlign: "center" }}
          color={PALETTE.secondary.grey[4]}
        >
          {props.subtitle}
        </Typography>
      </Stack>
      {props.button}
    </Stack>
    <Image
      src={props.imageUrl}
      width={419}
      height={198}
      alt="parental controls"
    />
  </Stack>
);

const ActualLoginView = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <Stack direction="row" height="100%" zIndex={2}>
      <Stack px="8%" height="100%" justifyContent="center">
        <UrsorFadeIn duration={800}>
          <Stack
            bgcolor="rgb(255,255,255)"
            borderRadius="24px"
            p="28px"
            boxSizing="border-box"
            justifyContent="center"
            width="391px"
            boxShadow="0 0 63px #A594FF"
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
              <Stack pb="8px" width="170px" sx={{ textAlign: "center" }}>
                <Typography variant="small">
                  Log in to your account and start Creating.
                </Typography>
              </Stack>
            </Stack>
            <Stack pt="16px" spacing="9px" width="100%">
              {PROVIDER_BUTTON_DETAILS.map((x, i) => (
                <LoginButton key={i} {...x} />
              ))}
            </Stack>
            <Stack
              direction="row"
              height="68px"
              alignItems="center"
              spacing="16px"
              pt="3px"
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
            <Stack spacing="12px">
              <LabeledInputField label="Email">
                <UrsorInputField
                  value={email}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(event.target.value)
                  }
                  placeholder="Enter your email"
                  width="100%"
                  leftAlign
                />
              </LabeledInputField>
              <LabeledInputField label="Password">
                <UrsorInputField
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  width="100%"
                  leftAlign
                />
              </LabeledInputField>
            </Stack>
            <Stack pt="16px" alignItems="center" spacing="10px">
              <UrsorButton width="100%" onClick={() => null}>
                Sign in
              </UrsorButton>
              <Stack direction="row" spacing="6px">
                <Typography>{`Don't have an account?`}</Typography>
                <Stack
                  sx={{
                    cursor: "pointer",
                    transition: "0.2s",
                    "&:hover": { opacity: 0.6 },
                  }}
                >
                  <Typography bold color={PALETTE.secondary.purple[2]}>
                    Sign up
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </UrsorFadeIn>
      </Stack>
      <Stack flex={1} justifyContent="center" alignItems="flex-end">
        <Stack
          height="90%"
          width="104vh"
          position="relative"
          alignItems="flex-end"
        >
          <Image
            src="https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+427321951+(1).png"
            style={{ objectFit: "fill" }}
            fill
            alt="boo"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

const ForkView = (props: { switchToActualLogin: () => void }) => (
  <Stack flex={1} justifyContent="center" alignItems="center" spacing="86px">
    <Stack justifyContent="center" alignItems="center" spacing="32px">
      <Typography variant="h3" color="rgba(255,255,255,0.9)">
        Welcome to AstroSafe
      </Typography>
      <Typography variant="medium" bold color="rgba(255,255,255,0.9)">
        Please select how you would like to proceed with the product.
      </Typography>
    </Stack>
    <Stack direction="row" spacing="24px">
      <LoginForkCard
        title="Set up Your Browser"
        subtitle="First time using AstroSafe, create a safe browser"
        button={
          <UrsorButton
            dark
            variant="tertiary"
            onClick={props.switchToActualLogin}
          >
            Set up Parental Controls
          </UrsorButton>
        }
        imageUrl="https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+1171277663.png"
      />
      <LoginForkCard
        title="Pair with Device"
        subtitle="Scan your QR code to connect to an existing Parent Portal"
        button={<UrsorButton variant="secondary">Scan QR Code</UrsorButton>}
        imageUrl="https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+1171277664.png"
      />
    </Stack>
  </Stack>
);

const SignInPageDesktopBody = () => {
  const [view, setView] = useState<"fork" | "login" | "scan">("fork");
  return (
    <Stack flex={1} justifyContent="center" alignItems="center" zIndex={2}>
      {view === "fork" ? (
        <ForkView switchToActualLogin={() => setView("login")} />
      ) : view === "login" ? (
        <ActualLoginView />
      ) : null}
    </Stack>
  );
};

export default SignInPageDesktopBody;