import { IVideo } from "@/app/api";
import { Dialog } from "@mui/material";
import { Stack } from "@mui/system";
import MoonsafeKidsVideoCard from "./MoonsafeKidsVideoCard";
import { PALETTE, Typography, UrsorButton } from "ui";
import { useEffect, useState } from "react";
import Image from "next/image";
import Star from "@/images/Star.svg";
import { MOONSAFE_ILLUSTRATION_URL } from "@/app/moonsafe/PlaylistCreationDialog";

const PlaylistStep = (props: { videos: IVideo[] }) => (
  <Stack spacing="20px" padding="32px">
    {props.videos.map((v) => (
      <MoonsafeKidsVideoCard {...v} />
    ))}
  </Stack>
);

const HEIGHT = 834;
const WIDTH = 1194;

const IntroDialog = (props: { onClick: () => void }) => (
  <Stack
    position="absolute"
    top={0}
    left={0}
    width="100%"
    height="100%"
    justifyContent="center"
    alignItems="center"
    zIndex={99999999}
  >
    <Stack
      bgcolor="rgb(255,255,255)"
      borderRadius="32px"
      height="541px"
      width="701px"
      alignItems="center"
      justifyContent="space-between"
      p="32px"
      boxSizing="border-box"
    >
      <Image
        src="https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+427321192+(1).png"
        width={637}
        height={314}
        alt="finish illustration"
      />
      <Stack width="413px">
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Dad has prepared a super playlist for you!
        </Typography>
      </Stack>
      <UrsorButton
        size="large"
        dark
        variant="tertiary"
        iconSpin
        endIcon={Star}
        iconColor="rgba(255,255,255,0.7)"
        iconSize={16}
        onClick={props.onClick}
      >
        Start Watching
      </UrsorButton>
    </Stack>
  </Stack>
);

const EndDialog = (props: { onClick: () => void }) => (
  <Stack
    position="absolute"
    top={0}
    left={0}
    width="100%"
    height="100%"
    justifyContent="center"
    alignItems="center"
    zIndex={99999999}
  >
    <Stack
      bgcolor="rgb(255,255,255)"
      borderRadius="32px"
      width="349px"
      alignItems="center"
      justifyContent="space-between"
      p="32px"
      boxSizing="border-box"
      spacing="16px"
    >
      <Stack
        sx={{
          background: "linear-gradient(12deg, #F279C5, #1D62F6)",
          "-webkit-text-fill-color": "transparent",
          backgroundClip: "text",
          "-webkit-background-clip": "text",
        }}
        alignItems="center"
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Time's up!
        </Typography>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          See you next time.
        </Typography>
      </Stack>
      <UrsorButton dark variant="tertiary" iconSpin onClick={props.onClick}>
        Close
      </UrsorButton>
    </Stack>
  </Stack>
);

const KidsView = (props: {
  open: boolean;
  onClose: () => void;
  videos: IVideo[];
}) => {
  const [showIntroDialog, setShowIntroDialog] = useState<boolean>(false);
  const [showBackgroundView, setShowBackgroundView] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setShowIntroDialog(true), 1000);
  }, []);
  const [showEndDialog, setShowEndDialog] = useState<boolean>(true);
  return (
    <Dialog
      transitionDuration={400}
      open={props.open}
      onClose={() => {
        props.onClose?.();
      }}
      PaperProps={{
        style: {
          width: WIDTH,
          maxWidth: WIDTH,
          maxHeight: HEIGHT,
          height: HEIGHT,
          borderRadius: "32px",
          margin: "20px",
          boxSizing: "border-box",
          border: "39px solid rgba(10,10,10)",
          background: PALETTE.secondary.grey[1],
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": {
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(0, 0, 0, 0.3) !important",
        },
      }}
    >
      <Stack
        position="absolute"
        height="100%"
        width="100%"
        zIndex={9999}
        sx={{
          opacity: showBackgroundView ? 1 : 0,
          pointerEvents: showBackgroundView ? undefined : "none",
          transition: "1s",
        }}
      >
        <Image
          src="https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug.png"
          style={{
            objectFit: "cover",
          }}
          fill
          alt="moonsafe intros"
        />
      </Stack>
      <Stack
        sx={{
          opacity: showIntroDialog ? 1 : 0,
          pointerEvents: showIntroDialog ? undefined : "none",
          transition: "1s",
        }}
      >
        <IntroDialog
          onClick={() => {
            setShowBackgroundView(false);
            setShowIntroDialog(false);
          }}
        />
      </Stack>
      <Stack
        sx={{
          opacity: showEndDialog ? 1 : 0,
          pointerEvents: showEndDialog ? undefined : "none",
          transition: "1s",
        }}
      >
        <EndDialog
          onClick={() => {
            setShowBackgroundView(false);
            setShowEndDialog(false);
          }}
        />
      </Stack>
      <PlaylistStep videos={props.videos} />
    </Dialog>
  );
};

export default KidsView;
