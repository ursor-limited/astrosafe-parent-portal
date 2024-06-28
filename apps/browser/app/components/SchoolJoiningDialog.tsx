import { Input } from "@mui/material";
import { Box, Stack, keyframes } from "@mui/system";
import { useEffect, useState } from "react";
import Wave from "@/images/Wave.svg";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import { useLocalStorage } from "usehooks-ts";
import ApiController from "../api";
import UrsorDialog from "./UrsorDialog";
import UrsorFadeIn from "./UrsorFadeIn";
import _ from "lodash";
import { isMobile } from "react-device-detect";
import useNativeDeviceId from "./useDeviceId";

const JOIN_CODE_LENGTH = 6;
const FAILURE_DURATION = 2000;
const PULSE_AMPLITUDE = "12px";
const LIMIT_REACHED_ERROR_CODE = 507;

export const pulse = keyframes`
  from {
    transform: translateY(-${PULSE_AMPLITUDE})
  }
  to {
    transform: translateY(${PULSE_AMPLITUDE})
  }
`;

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

export const DeviceInstructionsStepContent = () => (
  <>
    <Stack direction="row" spacing="21px" pt="60px" position="absolute">
      <Wave width="100%" />
    </Stack>
    <a target="_blank" href="https://app.astrosafe.co">
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
          title="1. Open Teacher App"
          text="Open your browser and navigate to app.astrosafe.co"
        >
          <UrsorButton onClick={() => null} size="small">
            Open App
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
        title="2. Create an account"
        text={
          "Create a free account where you can manage content on connected devices."
        }
      />
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
        title="3. Get Join School Code"
        text="Follow the instructions in the app to get your join school code and connect a device."
      />
    </Stack>
  </>
);

export interface ISchoolJoiningDialogProps {
  closeCallback: () => void;
  open: boolean;
}

export default function SchoolJoiningDialog(props: ISchoolJoiningDialogProps) {
  const nativeDeviceId = useNativeDeviceId();

  const [deviceId, setDeviceId] = useLocalStorage<string | undefined>(
    "deviceId",
    undefined
  );

  const [schoolId, setSchoolId] = useLocalStorage<string | undefined>(
    "schoolId",
    undefined
  );

  const [inputedCode, setInputedCode] = useState<string>("");
  const [codeInputActive, setCodeInputActive] = useState<boolean>(true);
  const [inputedDeviceName, setInputedDeviceName] = useState<string>("");
  const [showFailure, setShowFailure] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const [instructionsViewOpen, setInstructionsViewOpen] =
    useState<boolean>(false);

  const [limitReached, setLimitReached] = useState<boolean>(false);

  useEffect(() => {
    inputedCode.length === JOIN_CODE_LENGTH &&
      ApiController.verifyJoinCode(inputedCode)
        .then((school) => {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            setSchoolId(school.id);
          }, 1000);
        })
        .catch((error) => {
          if (error.response.status === LIMIT_REACHED_ERROR_CODE) {
            setLimitReached(true);
          }
          setShowFailure(true);
          setTimeout(() => {
            setShowFailure(false);
            setCodeInputActive(true);
            setInputedCode("");
          }, FAILURE_DURATION);
        });
  }, [inputedCode.length]);

  const submitAddition = () =>
    ApiController.addDeviceToSchool(
      schoolId ?? "",
      inputedDeviceName,
      nativeDeviceId ?? ""
    ).then((device) => {
      setDeviceId(device.id);
      props.closeCallback();
      if (
        (window as any).webkit &&
        (window as any).webkit.messageHandlers &&
        (window as any).webkit.messageHandlers.websiteToiOSDetails
      ) {
        const data = {
          schoolId,
          deviceId: device.id,
        };
        const jsonData = JSON.stringify(data);
        (window as any).webkit.messageHandlers.websiteToiOSDetails.postMessage(
          jsonData
        );
        window.postMessage(
          // sharing the new answers with the app too; needed for the worksheet cards
          {
            connectToSchool: true,
          },
          "*"
        );
      }
    });

  return (
    <UrsorDialog
      title={
        instructionsViewOpen
          ? "Create a Teacher Account"
          : "Connect to a School"
      }
      subtitle={
        instructionsViewOpen
          ? [
              "You need an Astrosafe teacher account to get a join code.",
              "Follow these instructions.",
            ]
          : schoolId
          ? ["Add a Device name."]
          : [
              "Ask your Teacher to give you a join code.",
              "They will find one in their Teacher account.",
            ]
      }
      titleSize={isMobile ? "h4" : "h3"}
      supertitle={isMobile ? undefined : "Connect to a School"}
      open={props.open}
      onCloseCallback={props.closeCallback}
      noOverflowHidden={isMobile}
      paddingX={isMobile ? "12px" : undefined}
      paddingY={isMobile ? "12px" : undefined}
      backButtonCallback={
        isMobile
          ? undefined
          : () => (!schoolId ? setInstructionsViewOpen(false) : undefined)
      }
      button={{
        text: instructionsViewOpen ? "Got it!" : "Connect",
        callback: async () => {
          instructionsViewOpen
            ? setInstructionsViewOpen(false)
            : submitAddition();
        },
        disabled:
          !instructionsViewOpen &&
          (schoolId
            ? !inputedDeviceName
            : inputedCode.length !== JOIN_CODE_LENGTH),
      }}
    >
      {codeInputActive ? (
        <Box height={0} sx={{ opacity: 0, pointerEvents: "none" }}>
          <Input
            autoFocus
            value={inputedCode}
            onChange={(event) =>
              event.target.value.length <= JOIN_CODE_LENGTH &&
              setInputedCode(event.target.value.toUpperCase())
            }
            onBlur={() => setCodeInputActive(false)}
          />
        </Box>
      ) : null}
      {!schoolId ? (
        instructionsViewOpen ? (
          <DeviceInstructionsStepContent />
        ) : (
          <Stack height="100%" justifyContent="center">
            <UrsorFadeIn duration={800} fullHeight>
              <Stack
                direction="row"
                spacing={isMobile ? "16px" : "42px"}
                height="100%"
                alignItems="center"
              >
                {_.chunk([...Array(JOIN_CODE_LENGTH).keys()], 3).map(
                  (indices, chunkI) => (
                    <Stack
                      key={chunkI}
                      height="100%"
                      alignItems="center"
                      direction="row"
                      spacing={isMobile ? "3px" : "14px"}
                      onClick={() => setCodeInputActive(true)}
                    >
                      {indices.map((i) => (
                        <Stack
                          key={i}
                          width={isMobile ? "31px" : "60px"}
                          height={isMobile ? "39px" : "74px"}
                          bgcolor={PALETTE.secondary.grey[2]}
                          borderRadius="12px"
                          justifyContent="center"
                          alignItems="center"
                          border="3px solid white"
                          sx={{
                            outline: showFailure
                              ? `3px solid ${PALETTE.system.red}`
                              : showSuccess
                              ? `3px solid ${PALETTE.system.green}`
                              : codeInputActive && inputedCode.length === i
                              ? `3px solid ${PALETTE.secondary.purple[2]}`
                              : undefined,
                            "&:hover": { opacity: codeInputActive ? 1 : 0.6 },
                            transition: "0.2s",
                            cursor: codeInputActive ? "default" : "pointer",
                          }}
                        >
                          <Typography bold variant={isMobile ? "normal" : "h4"}>
                            {inputedCode.split("")[i] ?? ""}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  )
                )}
              </Stack>
            </UrsorFadeIn>
            <Stack
              width="100%"
              alignItems="center"
              onClick={() => setInstructionsViewOpen(true)}
              sx={{
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { opacity: 0.6 },
              }}
            >
              <Typography bold>How do I get a join code?</Typography>
            </Stack>
          </Stack>
        )
      ) : (
        <Stack
          height="100%"
          width={isMobile ? "100%" : "80%"}
          justifyContent="center"
        >
          <UrsorFadeIn duration={800} key="device-name">
            <UrsorInputField
              value={inputedDeviceName}
              placeholder="Mickey's Mac"
              width="100%"
              height="74px"
              fontSize={isMobile ? "24px" : "28px"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setInputedDeviceName(event.target.value)
              }
              onEnterKey={() => inputedDeviceName && submitAddition()}
            />
          </UrsorFadeIn>
        </Stack>
      )}
      {limitReached && !schoolId ? (
        <Stack
          position="absolute"
          bottom="150px"
          spacing="3px"
          alignItems="center"
          justifyContent="center"
          flex={1}
        >
          <Typography variant="medium" bold color={PALETTE.system.red}>
            The Device limit has been reached in this School.
          </Typography>
          <Typography variant="medium" color={PALETTE.system.red}>
            Please contact your school administrator.
          </Typography>
        </Stack>
      ) : null}
    </UrsorDialog>
  );
}
