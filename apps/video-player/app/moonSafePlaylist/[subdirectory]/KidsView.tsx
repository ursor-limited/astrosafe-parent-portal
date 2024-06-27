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

const KidsView = (props: {
  open: boolean;
  onClose: () => void;
  videos: IVideo[];
}) => {
  const [step, setStep] = useState<"intro" | "playlist" | "end">("intro");
  const [showIntroDialog, setShowIntroDialog] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => setShowIntroDialog(true), 1000);
  }, []);
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
      {step === "intro" || step === "end" ? (
        <Stack position="absolute" height="100%" width="100%" zIndex={9999}>
          <Image
            src="https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug.png"
            style={{
              objectFit: "cover",
            }}
            fill
            alt="moonsafe intros"
          />
        </Stack>
      ) : null}
      <Stack
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        sx={{
          opacity: showIntroDialog ? 1 : 0,
          pointerEvents: showIntroDialog ? undefined : "none",
          transition: "1s",
        }}
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
          >
            Start Watching
          </UrsorButton>
        </Stack>
      </Stack>
      <PlaylistStep videos={props.videos} />
    </Dialog>
  );
};

export default KidsView;
