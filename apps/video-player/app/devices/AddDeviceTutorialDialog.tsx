import React, { useEffect, useState } from "react";
import { Stack, keyframes } from "@mui/material";
import IntroScreenshot from "../../images/IntroScreenshot.png";
import Wave from "../../images/Wave.png";
import ChromeDeviceIllustration from "../../images/ChromeDeviceIllustration.png";
import WonderingIllustration from "../../images/WonderingIllustration.svg";
import iPadIllustration from "../../images/iPadIllustration.png";
import AppsRow from "../../images/AppsRow.png";
import ChromeCornerIllustration from "../../images/ChromeCornerIllustration.png";
import _ from "lodash";
import { PALETTE, Typography, UrsorButton } from "ui";
import BrowserApiController, { IDevice, ISchool } from "../browserApi";
import { useBrowserUserContext } from "../components/BrowserUserContext";
import StepDialog, { IDialogStepDetails } from "../components/StepDialog";

const PULSE_AMPLITUDE = "12px";
const EXTENSION_URL =
  "https://chrome.google.com/webstore/detail/astrosafe/bgmnmkccofmfpgfbamfklejbjboddbep";
const APP_STORE_URL = "https://apps.apple.com/app/astrosafe/id6444488742";

export const MONITORING_UPDATE_PERIOD = 10000;

export const pulse = keyframes`
  from {
    transform: translateY(-${PULSE_AMPLITUDE})
  }
  to {
    transform: translateY(${PULSE_AMPLITUDE})
  }
`;

export const AddDeviceDialogContent = (props: { device?: IDevice }) => (
  <Stack alignItems="center" justifyContent="center" flex={1}>
    {props.device ? (
      <Stack
        width="246px"
        height="200px"
        borderRadius="12px"
        bgcolor={PALETTE.secondary.grey[1]}
        alignItems="center"
        boxSizing="border-box"
        justifyContent="center"
        sx={{
          cursor: "pointer",
          "&:hover": { background: PALETTE.secondary.grey[2] },
          transition: "0.2s",
        }}
        spacing="12px"
      >
        <img
          height="109px"
          width="179px"
          src={
            (props.device.type === "chrome"
              ? ChromeDeviceIllustration
              : iPadIllustration
            ).src
          }
        />
        <Typography variant="medium" bold>
          {props.device.name}
        </Typography>
      </Stack>
    ) : (
      <>
        <img
          height="132px"
          width="170px"
          src={WonderingIllustration.src}
          style={{ opacity: 0.3 }}
        />
        <Typography variant="medium" bold color={PALETTE.secondary.grey[3]}>
          No Device
        </Typography>
      </>
    )}
  </Stack>
);

const DeviceButton = (props: { text: string; image: React.ReactNode }) => (
  <Stack
    height="285px"
    width="246px"
    borderRadius="12px"
    bgcolor={PALETTE.secondary.grey[1]}
    alignItems="center"
    py="18px"
    pt="22px"
    boxSizing="border-box"
    justifyContent="space-between"
    sx={{
      cursor: "pointer",
      "&:hover": { background: PALETTE.secondary.grey[2] },
      transition: "0.2s",
    }}
  >
    {props.image}
    <Stack width="155px">
      <Typography variant="medium" bold sx={{ textAlign: "center" }}>
        {props.text}
      </Typography>
    </Stack>
    <Stack width="75px">
      <UrsorButton size="small" onClick={() => null}>
        Select
      </UrsorButton>
    </Stack>
  </Stack>
);

export const DeviceSelectionStepContent = (props: {
  callback: (type: "ipad" | "chrome") => void;
}) => (
  <Stack direction="row" spacing="21px">
    <Stack onClick={() => props.callback("chrome")}>
      <DeviceButton
        text="I'm installing on a Chrome Browser"
        image={
          <img
            height="140px"
            width="230px"
            src={ChromeDeviceIllustration.src}
          />
        }
      />
    </Stack>
    <Stack onClick={() => props.callback("ipad")}>
      <DeviceButton
        text="I'm installing on an iPad Device"
        image={<img height="144px" width="230px" src={iPadIllustration.src} />}
      />
    </Stack>
  </Stack>
);

const InstructionCard = (props: {
  title: string;
  text: string;
  children?: React.ReactNode;
}) => (
  <Stack
    width="241px"
    borderRadius="12px"
    bgcolor={PALETTE.secondary.grey[1]}
    alignItems="center"
    p="12px"
    boxSizing="border-box"
    justifyContent="space-between"
    sx={{
      cursor: "pointer",
      "&:hover": { background: PALETTE.secondary.grey[2] },
      transition: "0.2s",
    }}
    spacing="5px"
  >
    <Typography
      variant="medium"
      bold
      sx={{ textAlign: "center", wdith: "90%" }}
    >
      {props.title}
    </Typography>
    <Typography variant="small" sx={{ textAlign: "center" }}>
      {props.text}
    </Typography>
    {props.children ? <Stack pt="6px">{props.children}</Stack> : null}
  </Stack>
);

export const DeviceInstructionsStepContent = (props: {
  type: "chrome" | "ipad";
}) => (
  <>
    <Stack
      width="100%"
      direction="row"
      spacing="21px"
      pt="60px"
      position="absolute"
    >
      {/* <Wave width="100%" /> */}
      <img
        //height="58px"
        width="100%"
        //style={{ position: "absolute", left: "-12px", bottom: "-12px" }}
        src={Wave.src}
      />
    </Stack>
    <a
      target="_blank"
      href={props.type === "chrome" ? EXTENSION_URL : APP_STORE_URL}
    >
      <Stack
        position="absolute"
        top="250px"
        left="69px"
        sx={{
          transform: `translateY(-${PULSE_AMPLITUDE})`,
          animation: `${pulse} 5s ease-in-out`,
          animationDirection: "alternate",
          animationIterationCount: "infinite",
        }}
      >
        <InstructionCard
          title={`1. Download ${props.type === "chrome" ? "Extension" : "App"}`}
          text="If you use MDM tools, ASTROSafe might have to be distributed using them!"
        >
          <UrsorButton onClick={() => null} size="small">
            {props.type === "chrome" ? "Open Store" : "Open App Store"}
          </UrsorButton>
        </InstructionCard>
      </Stack>
    </a>
    <Stack
      position="absolute"
      top="305px"
      left="343px"
      sx={{
        transform: `translateY(-${PULSE_AMPLITUDE})`,
        animation: `${pulse} 5s ease-in-out`,
        animationDirection: "alternate",
        animationDelay: "1.5s",
        animationIterationCount: "infinite",
      }}
    >
      <InstructionCard
        title={
          props.type === "chrome"
            ? "2. Activate the Extension"
            : "2. Open the App"
        }
        text={
          props.type === "chrome"
            ? "Click the puzzle icon in the top right and click the AstroIcon."
            : "Open the App on your iOS device to continue."
        }
      >
        {props.type === "chrome" ? (
          <Stack height="46px" width="217px" position="relative">
            <img
              height="58px"
              width="217px"
              style={{ position: "absolute", left: "-12px", bottom: "-12px" }}
              src={ChromeCornerIllustration.src}
            />
          </Stack>
        ) : (
          <img height="49px" width="169px" src={AppsRow.src} />
        )}
      </InstructionCard>
    </Stack>
    <Stack
      position="absolute"
      top="250px"
      right="69px"
      sx={{
        transform: `translateY(-${PULSE_AMPLITUDE})`,
        animation: `${pulse} 5s ease-in-out`,
        animationDirection: "alternate",
        animationDelay: "3s",
        animationIterationCount: "infinite",
      }}
    >
      <InstructionCard
        title="3. Delete other Browsers"
        text="You can now delete all other browsers from the student’s device!"
      />
    </Stack>
  </>
);

export interface IAddDeviceTutorialDialogProps {
  open: boolean;
  closeCallback: () => void;
}

type IntroTutorialViews =
  | "intro"
  | "deviceType"
  | "instructions"
  | "connect"
  | "success";

export default function AddDeviceTutorialDialog(
  props: IAddDeviceTutorialDialogProps
) {
  const userCtx = useBrowserUserContext();

  const [step, setStep] = useState<number>(0);
  const [deviceType, setDeviceType] = useState<"chrome" | "ipad">("chrome");
  const [device, setDevice] = useState<IDevice | undefined>(undefined);
  const [school, setSchool] = useState<ISchool | undefined>(undefined);

  const loadSchool = () => {
    userCtx.userDetails?.schoolId &&
      BrowserApiController.getSchool(userCtx.userDetails?.schoolId).then(
        (school) => {
          setSchool(school);
        }
      );
  };

  useEffect(() => {
    loadSchool();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => loadSchool(), MONITORING_UPDATE_PERIOD);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  useEffect(
    () => school && setDevice(school.devices.find((d) => !d.connected)),
    [school?.devices]
  );

  const introStepContent = (
    <Stack
      alignItems="center"
      position="absolute"
      bottom="138px"
      width="100%"
      height="19vh"
    >
      <img height="380px" width="auto" src={IntroScreenshot.src} />
    </Stack>
  );

  const steps: IDialogStepDetails[] = [
    {
      title: "Welcome to AstroSafe",
      subtitle: [
        "Astrosafe lets you share links with your students inside a safe Browser that lives on",
        "their devices. Follow these instructions to get started.",
      ],
      //supertitle: "Get started",
      button: {
        text: "Install browser",
      },
      bunchedUpContent: true,
      content: introStepContent,
    },
    {
      title: "Select your Device",
      subtitle: [
        "Select the device you want to install Astrosafe on.",
        "Only Chrome Browsers and iPad devices are supported.",
      ],
      //supertitle: "Installation",
      button: {
        text: "Skip to Device pairing",
        // variant: "ghost",
        callback: () => setStep(step + 2),
      },
      content: (
        <DeviceSelectionStepContent
          callback={(type) => {
            setStep(step + 1);
            setDeviceType(type);
          }}
        />
      ),
    },
    {
      title: `Install on ${
        deviceType === "chrome" ? "a Chrome Browser" : "an iPad Device"
      }`,
      subtitle: [
        `Complete the below actions on the student ${
          deviceType === "chrome" ? "Chrome Browser" : "iPad device"
        }`,
        "you wish to install Astrosafe on.",
      ],
      //supertitle: "Installation",
      button: {
        text: "I'm ready",
      },
      // secondaryButton: {
      //   text: "I need help",
      //   variant: "ghost",
      // },
      content: <DeviceInstructionsStepContent type={deviceType} />,
    },
    {
      title: school?.joinCode
        ? _.chunk(school.joinCode, 3).join("-").replaceAll(",", "")
        : "",
      subtitle: [
        "In one of the student Apps, click",
        <Typography variant="medium" bold>
          Connect to school
        </Typography>,
        "and enter the join code above.",
      ],
      //supertitle: "Installation",
      button: {
        hidden: !device,
        text: "Accept",
        // variant: "green",
        callback: () => {
          setStep(step + 1);
          BrowserApiController.approveDevice(
            device?.id ?? "",
            userCtx.userDetails?.id ?? ""
          ).then(loadSchool);
        },
      },
      secondaryButton: {
        hidden: !device,
        text: "Reject",
        // variant: "nippon",
        callback: () => {
          BrowserApiController.rejectDevice(
            device?.id ?? "",
            userCtx.userDetails?.id ?? ""
          ).then(loadSchool);
        },
      },
      content: <AddDeviceDialogContent device={device} />,
    },
    {
      title: "You're all set!",
      subtitle: [
        "Start sharing links with your students,",
        "or add another device.",
      ],
      //supertitle: "Get started",
      button: {
        text: "Go to portal",
      },
      bunchedUpContent: true,
      content: introStepContent,
    },
  ];

  return (
    <StepDialog
      open={props.open}
      steps={steps}
      step={step}
      callback={(newStep: number) => setStep(newStep)}
      closeCallback={() => {
        props.closeCallback();
      }}
    />
  );
}
