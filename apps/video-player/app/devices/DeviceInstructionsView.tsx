import { Stack, alpha, keyframes } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import Image from "next/image";
import DownloadDialog from "./components/DownloadDialog";
import { useState } from "react";

const PULSE_AMPLITUDE = "12px";

export const pulse = keyframes`
  from {
    transform: translateY(-${PULSE_AMPLITUDE})
  }
  to {
    transform: translateY(${PULSE_AMPLITUDE})
  }
`;

const InstructionCard = (props: {
  stepIndex: number;
  text: string;
  children?: React.ReactNode;
}) => (
  <Stack
    width="260px"
    borderRadius="12px"
    bgcolor="rgb(255,255,255)"
    alignItems="center"
    p="12px"
    boxSizing="border-box"
    justifyContent="space-between"
    // sx={{
    //   cursor: "pointer",
    //   "&:hover": { background: PALETTE.secondary.grey[2] },
    //   transition: "0.2s",
    // }}
    spacing="5px"
  >
    <Typography
      variant="small"
      bold
      color={PALETTE.secondary.grey[3]}
    >{`Step ${props.stepIndex}`}</Typography>
    <Stack width="90%">
      <Typography
        variant="medium"
        bold
        sx={{ textAlign: "center", lineHeight: "25px" }}
      >
        {props.text}
      </Typography>
    </Stack>
    {props.children ? <Stack pt="6px">{props.children}</Stack> : null}
  </Stack>
);

const DeviceInstructionsView = () => {
  const [downloadDialogOpen, setDownloadDialogOpen] = useState<boolean>(false);
  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
        position="relative"
      >
        <Stack
          spacing="8px"
          alignItems="center"
          sx={{
            transform: "translateY(-160px)",
          }}
        >
          <Stack
            sx={{
              background: `linear-gradient(${PALETTE.secondary.purple[2]}, ${PALETTE.secondary.blue[2]})`,
              "-webkit-text-fill-color": "transparent",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
            }}
          >
            <Typography variant="h4">Welcome to AstroSafe</Typography>
          </Stack>
          <Stack width="444px">
            <Typography
              variant="medium"
              bold
              sx={{ textAlign: "center" }}
              color={PALETTE.secondary.grey[4]}
            >
              Connect your child or student’s device to start exploring the
              internet with them safely!
            </Typography>
          </Stack>
        </Stack>
        <Stack
          position="absolute"
          right={0}
          top={0}
          width="230px"
          height="100%"
          sx={{
            background: `linear-gradient(-90deg, ${
              PALETTE.secondary.grey[1]
            }, ${alpha(PALETTE.secondary.grey[1], 0)})`,
          }}
          zIndex={2}
        />
        <Stack
          position="absolute"
          left={0}
          top={0}
          width="230px"
          height="100%"
          sx={{
            background: `linear-gradient(90deg, ${
              PALETTE.secondary.grey[1]
            }, ${alpha(PALETTE.secondary.grey[1], 0)})`,
          }}
          zIndex={2}
        />
        <Stack position="relative">
          <Stack
            direction="row"
            spacing="21px"
            position="absolute"
            sx={{ transform: "translate(-50%, -50%)" }}
          >
            <Image
              src="https://ursorassets.s3.eu-west-1.amazonaws.com/Vector+86.png"
              height={100}
              width={1400}
              alt="wave"
            />
          </Stack>
          <Stack
            position="absolute"
            left="-480px"
            top="-51px"
            sx={{
              transform: `translateY(-${PULSE_AMPLITUDE})`,
              animation: `${pulse} 5s ease-in-out`,
              animationDirection: "alternate",
              animationIterationCount: "infinite",
            }}
          >
            <InstructionCard
              stepIndex={1}
              text="Download the AstroSafe App on child's device"
            >
              <UrsorButton
                onClick={() => setDownloadDialogOpen(true)}
                size="small"
                variant="secondary"
                endIcon={ChevronRightIcon}
                iconSize={16}
              >
                Download options
              </UrsorButton>
            </InstructionCard>
          </Stack>
          <Stack
            position="absolute"
            left="-120px"
            sx={{
              transform: `translateY(-${PULSE_AMPLITUDE})`,
              animation: `${pulse} 5s ease-in-out`,
              animationDirection: "alternate",
              animationDelay: "1.5s",
              animationIterationCount: "infinite",
            }}
          >
            <InstructionCard stepIndex={2} text={"Enter join code to connect."}>
              <Typography
                variant="h3"
                color={PALETTE.secondary.purple[2]}
                sx={{ transform: "translateY(-3px)" }}
              >
                700-008
              </Typography>
            </InstructionCard>
          </Stack>
          <Stack
            position="absolute"
            left="240px"
            top="-40px"
            sx={{
              transform: `translateY(-${PULSE_AMPLITUDE})`,
              animation: `${pulse} 5s ease-in-out`,
              animationDirection: "alternate",
              animationDelay: "3s",
              animationIterationCount: "infinite",
            }}
          >
            <InstructionCard
              stepIndex={3}
              text="Delete all other Browsers on device"
            />
          </Stack>
        </Stack>
      </Stack>
      <DownloadDialog
        open={downloadDialogOpen}
        onClose={() => setDownloadDialogOpen(false)}
      />
    </>
  );
};

export default DeviceInstructionsView;
