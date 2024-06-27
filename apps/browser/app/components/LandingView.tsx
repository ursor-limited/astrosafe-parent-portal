import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import CheckCircleIcon from "@/images/icons/CheckCircleIcon.svg";
import UrsorParticles from "./UrsorParticles";
import { fadeIn } from "./NavbarSearchBar";
import SchoolJoiningDialog from "./SchoolJoiningDialog";
import { useState } from "react";
import { isMobile } from "react-device-detect";

const LandingViewCard = (props: {
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
    width="321px"
    height="381px"
    borderRadius="12px"
    bgcolor={props.color}
    p="20px"
    boxSizing="border-box"
    spacing="20px"
    justifyContent="space-between"
  >
    <Stack width="100%" alignItems="center" spacing="20px">
      <Stack width={props.titleWidth} spacing="20px">
        <Typography variant="h5" sx={{ textAlign: "center" }}>
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

    <Stack width="100%" spacing="12px" alignItems="center">
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

const LandingView = () => {
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
          width="100vw"
          height="100vh"
          justifyContent={isMobile ? undefined : "center"}
          alignItems="center"
          zIndex={3}
          spacing="24px"
          overflow="scroll"
        >
          <Stack spacing="12px">
            <Stack
              direction="row"
              spacing="8px"
              width="100%"
              justifyContent="center"
            >
              <Stack
                sx={{
                  background:
                    "linear-gradient(180deg, rgb(255,255,255), rgba(255,255,255,0.66))",
                  "-webkit-text-fill-color": "transparent",
                  backgroundClip: "text",
                  "-webkit-background-clip": "text",
                }}
              >
                <Typography variant="h3" color={PALETTE.font.light}>
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
            <Stack width="100%" justifyContent="center">
              <Typography variant="medium" color={PALETTE.font.light}>
                The safe browser for kids age 5 to 18 that keeps them safe,
              </Typography>
              <Stack
                direction="row"
                spacing="8px"
                width="100%"
                justifyContent="center"
              >
                <Stack direction="row">
                  <Stack
                    sx={{
                      background: "linear-gradient(180deg, #6596FF, #7B61FF)",
                      "-webkit-text-fill-color": "transparent",
                      backgroundClip: "text",
                      "-webkit-background-clip": "text",
                    }}
                  >
                    <Typography variant="medium">blocks adverts</Typography>
                  </Stack>
                  <Typography variant="medium" color={PALETTE.font.light}>
                    ,
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Stack
                    sx={{
                      background: "linear-gradient(180deg, #F279C5, #FD9B41)",
                      "-webkit-text-fill-color": "transparent",
                      backgroundClip: "text",
                      "-webkit-background-clip": "text",
                    }}
                  >
                    <Typography variant="medium">social media</Typography>
                  </Stack>
                  <Typography variant="medium" color={PALETTE.font.light}>
                    ,
                  </Typography>
                </Stack>
                <Typography variant="medium" color={PALETTE.font.light}>
                  and
                </Typography>
                <Stack direction="row">
                  <Stack
                    sx={{
                      background: "linear-gradient(180deg, #0AE799, #1D62F6)",
                      "-webkit-text-fill-color": "transparent",
                      backgroundClip: "text",
                      "-webkit-background-clip": "text",
                    }}
                  >
                    <Typography variant="medium">
                      doesn&apos;t track them
                    </Typography>
                  </Stack>
                  <Typography variant="medium" color={PALETTE.font.light}>
                    .
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction={isMobile ? "column" : "row"} spacing="32px">
            <LandingViewCard
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
            <LandingViewCard
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
            <LandingViewCard
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

export default LandingView;
