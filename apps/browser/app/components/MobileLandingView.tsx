import { Stack, textAlign } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import CheckCircleIcon from "@/images/icons/CheckCircleIcon.svg";
import UrsorParticles from "./UrsorParticles";
import { fadeIn } from "./NavbarSearchBar";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { OVERALL_X_PADDING } from "./PageLayout";

const MobileLandingViewCard = (props: {
  title: string;
  items?: string[];
  text?: string;
  buttonCallback: () => void;
  buttonText: string;
  secondaryButton?: boolean;
  smallText?: string;
  color?: string;
  titleWidth: number;
}) => (
  <Stack
    height="381px"
    p="20px"
    borderRadius="12px"
    bgcolor={props.color}
    boxSizing="border-box"
    spacing="20px"
    justifyContent="space-between"
  >
    <Stack width="100%" alignItems="center" spacing="20px">
      <Stack width={props.titleWidth} spacing="20px">
        <Typography variant="medium" bold sx={{ textAlign: "center" }}>
          {props.title}
        </Typography>
      </Stack>
      <Stack spacing="8px" width="100%">
        {props.items?.map((item, i) => (
          <Stack
            key={i}
            direction="row"
            spacing="7px"
            alignItems="center"
            sx={{ svg: { path: { fill: PALETTE.system.green } } }}
          >
            <CheckCircleIcon height="18px" width="18px" />
            <Typography variant="small">{item}</Typography>
          </Stack>
        )) || <Typography variant="small">{props.text}</Typography>}
      </Stack>
    </Stack>

    <Stack spacing="12px" alignItems="center">
      <Typography variant="small">{props.smallText}</Typography>
      <UrsorButton
        dark={!props.secondaryButton}
        variant={props.secondaryButton ? "secondary" : "tertiary"}
        size="large"
        width="100%"
      >
        {props.buttonText}
      </UrsorButton>
    </Stack>
  </Stack>
);

const MobileLandingView = () => {
  const [schoolJoiningDialogOpen, setSchoolJoiningDialogOpen] =
    useState<boolean>(false);
  return (
    <>
      <Stack
        position="absolute"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        bgcolor={PALETTE.primary.navy}
        sx={{
          animation: `${fadeIn} 1000ms ease-out forwards`,
        }}
        zIndex={999}
      >
        <Stack
          position="absolute"
          top={0}
          left={0}
          height="100%"
          width="100%"
          sx={{
            "#tsparticles": {
              height: "100%",
            },
          }}
          zIndex={2}
        >
          <UrsorParticles number={5} />
        </Stack>
        <Stack
          height="100vh"
          justifyContent={isMobile ? undefined : "center"}
          alignItems="center"
          zIndex={3}
          spacing="32px"
          overflow="scroll"
          px={OVERALL_X_PADDING}
          pt="60px"
        >
          <Stack spacing="12px" justifyContent="center">
            <Stack alignItems="center" width="100%">
              <Stack
                sx={{
                  background:
                    "linear-gradient(180deg, rgb(255,255,255), rgba(255,255,255,0.66))",
                  "-webkit-text-fill-color": "transparent",
                  backgroundClip: "text",
                  "-webkit-background-clip": "text",
                }}
              >
                <Typography
                  variant="h3"
                  color={PALETTE.font.light}
                  sx={{ textAlign: "center" }}
                >
                  Welcome to
                </Typography>
              </Stack>
              <Stack
                sx={{
                  background: "linear-gradient(180deg, #6596FF, #7B61FF)",
                  "-webkit-text-fill-color": "transparent",
                  backgroundClip: "text",
                  "-webkit-background-clip": "text",
                }}
              >
                <Typography variant="h3">AstroSafe</Typography>
              </Stack>
            </Stack>
            <Typography
              variant="small"
              color={PALETTE.font.light}
              sx={{ textAlign: "center" }}
            >
              The safe browser for kids age 5 to 18 that keeps them safe, blocks
              adverts, social media, and doesn&apos;t track them.
            </Typography>
          </Stack>
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing="16px"
            width="100%"
            pb="20px"
          >
            <MobileLandingViewCard
              title="Continue in guest mode"
              items={[
                "Block adverts on all pages",
                "Block all social media",
                "Search using our filter",
              ]}
              buttonCallback={() => null}
              buttonText="Continue as guest"
              smallText="You can upgrade later*"
              color={PALETTE.secondary.orange[1]}
              titleWidth={192}
            />
            <MobileLandingViewCard
              title="Continue with a family or school plan"
              items={[
                "Manage with a family plan",
                "Block adverts on all pages",
                "Block all social media",
                "Search using our filter",
                "Monitor history from control app",
                "Curate their YouTube",
                "Manage your browsing filter",
              ]}
              buttonCallback={() => setSchoolJoiningDialogOpen(true)}
              buttonText="Connect to a plan"
              color="#E2DDFF"
              titleWidth={250}
            />
            <MobileLandingViewCard
              title="Don't have a family or school plan?"
              text="Follow this link and get one for secure browsing"
              buttonCallback={() => null}
              buttonText="Buy a plan"
              smallText="You can upgrade later*"
              secondaryButton
              color={PALETTE.secondary.grey[1]}
              titleWidth={230}
            />
          </Stack>
        </Stack>
      </Stack>
      {/* <SchoolJoiningDialog
        open={schoolJoiningDialogOpen}
        closeCallback={() => setSchoolJoiningDialogOpen(false)}
      /> */}
    </>
  );
};

export default MobileLandingView;
