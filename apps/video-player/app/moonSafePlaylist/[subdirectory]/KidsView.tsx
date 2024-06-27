import { IVideo } from "@/app/api";
import { Dialog } from "@mui/material";
import { Stack } from "@mui/system";
import MoonsafeKidsVideoCard from "./MoonsafeKidsVideoCard";
import { PALETTE, Typography, UrsorButton } from "ui";
import { useEffect, useState } from "react";
import Image from "next/image";
import Star from "@/images/Star.svg";
import SearchIcon from "@/images/icons/SearchIcon.svg";
import MoonsafeIcon from "@/images/icons/MoonsafeIcon.svg";
import StarIcon from "@/images/icons/StarIcon.svg";
import SyncIcon from "@/images/icons/Sync.svg";
import { MoonsafeDurationIndicator } from "./MoonsafePageCard";
import _ from "lodash";

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
          Time&apos;s up!
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

const MenuBar = (props: { durationLeft: number }) => (
  <Stack
    height="80px"
    minHeight="80px"
    bgcolor="rgb(255,255,255)"
    direction="row"
    spacing="14px"
    alignItems="center"
    px="28px"
    boxShadow="0 0 20px rgba(0,0,0,0.05)"
    zIndex={999}
  >
    <Stack
      height="48px"
      width="48px"
      borderRadius="100%"
      bgcolor={PALETTE.secondary.grey[1]}
      sx={{
        svg: {
          path: {
            fill: PALETTE.secondary.blue[3],
          },
        },
      }}
      justifyContent="center"
      alignItems="center"
    >
      <MoonsafeIcon height="24px" width="24px" />
    </Stack>
    <Stack
      direction="row"
      height="48px"
      bgcolor={PALETTE.secondary.grey[1]}
      alignItems="center"
      flex={1}
      borderRadius="24px"
      pl="20px"
      justifyContent="space-between"
    >
      <Stack
        direction="row"
        sx={{
          svg: {
            path: {
              fill: PALETTE.secondary.grey[3],
            },
          },
        }}
        alignItems="center"
        spacing="8px"
      >
        <SearchIcon height="18px" width="18px" />
        <Typography variant="medium" bold color={PALETTE.secondary.grey[3]}>
          Search an idea...
        </Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          svg: {
            path: {
              fill: PALETTE.primary.navy,
            },
          },
        }}
      >
        <Stack width="48px">
          <StarIcon width="26px" height="26px" />
        </Stack>
        <Stack width="48px">
          <SyncIcon width="26px" height="26px" />
        </Stack>
      </Stack>
    </Stack>
    <MoonsafeDurationIndicator vibrantText value={props.durationLeft} small />
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
    setTimeout(() => setShowIntroDialog(true), 1500);
  }, []);
  const [showEndDialog, setShowEndDialog] = useState<boolean>(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<
    number | undefined
  >(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
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
          maxHeight: "90%",
          height: HEIGHT,
          borderRadius: "32px",
          margin: "20px",
          boxSizing: "border-box",
          border: "39px solid rgba(10,10,10)",
          background: PALETTE.secondary.grey[1],
          position: "relative",
          overflow: "hidden",
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
        top={0}
        left={0}
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
          src="https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+(5).png"
          style={{
            objectFit: "cover",
          }}
          fill
          alt="moonsafe intros"
        />
      </Stack>
      <Stack
        zIndex={9999}
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
        zIndex={9999}
        sx={{
          opacity: showEndDialog ? 1 : 0,
          pointerEvents: showEndDialog ? undefined : "none",
          transition: "1s",
        }}
      >
        <EndDialog onClick={props.onClose} />
      </Stack>
      <MenuBar
        durationLeft={
          _.sum(
            _.compact(
              props.videos.slice(currentVideoIndex).map((v) => v.endTime)
            )
          ) - currentTime
        }
      />
      <Stack overflow="scroll">
        <Stack spacing="20px" padding="32px">
          {props.videos.map((v, i) => (
            <Stack
              key={i}
              onClick={() => {
                setCurrentVideoIndex(i);
              }}
            >
              <MoonsafeKidsVideoCard
                {...v}
                play={!showBackgroundView && currentVideoIndex === i}
                setCurrentTime={setCurrentTime}
              />
            </Stack>
          ))}
        </Stack>
        <UrsorButton
          variant="secondary"
          size="small"
          onClick={() => {
            setShowBackgroundView(true);
            setShowEndDialog(true);
            setCurrentVideoIndex(undefined);
          }}
        >
          Simulate end
        </UrsorButton>
      </Stack>
    </Dialog>
  );
};

export default KidsView;
