"use client";

import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import ApiController, { IVideo } from "@/app/api";
import dynamic from "next/dynamic";
import { PALETTE, Typography, UrsorButton } from "ui";
import { useWindowSize } from "usehooks-ts";
import { useAuth0 } from "@auth0/auth0-react";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import LinkIcon from "@/images/icons/LinkIcon.svg";
import NotificationContext from "@/app/components/NotificationContext";
import moment from "moment";
import mixpanel from "mixpanel-browser";
import BigCard from "@/app/components/BigCard";
import DeletionDialog from "@/app/components/DeletionDialog";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/components/UserContext";
import { Header } from "@/app/components/header2";

export const MAGICAL_BORDER_THICKNESS = 1.8;
export const HIDE_LOGO_PLAYER_WIDTH_THRESHOLD = 500;

const Player = dynamic(
  () => import("@/app/components/player"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export const CircularButton = (props: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color?: string;
  onClick: () => void;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      height="39px"
      width="39px"
      minHeight="38px"
      minWidth="38px"
      borderRadius="100%"
      border={`2px solid ${props.color || PALETTE.primary.navy}`}
      justifyContent="center"
      alignItems="center"
      sx={{
        svg: {
          path: {
            fill: props.color || PALETTE.primary.navy,
          },
        },
        cursor: "pointer",
        "&:hover": { opacity: 0.6 },
        transition: "0.2s",
      }}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      onClick={props.onClick}
    >
      <props.icon height="20px" width="20px" />
    </Stack>
  );
};

const VIDEO_WIDTH = 845;
const VIDEO_HEIGHT = 475;

const GRADIENT = "linear-gradient(178deg, #F279C5, #FD9B41)";
const SigninPromptBar = (props: { signInCallback: () => void }) => (
  <Stack
    position="fixed"
    zIndex={999999}
    width="100%"
    height="76px"
    justifyContent="center"
    alignItems="center"
    sx={{ background: GRADIENT }}
    direction="row"
    spacing="20px"
  >
    <Typography variant="large" bold color={PALETTE.font.light}>
      Sign in within 30 min to save and share your safe video.
    </Typography>
    <UrsorButton
      dark
      endIcon={PersonIcon}
      fontColor="#F88A83"
      onClick={props.signInCallback}
    >
      Sign in
    </UrsorButton>
  </Stack>
);

function VideoPageContents(props: { details: IVideo }) {
  const { user } = useAuth0();

  const notificationCtx = React.useContext(NotificationContext);

  const provider = props.details?.url.includes("vimeo") ? "vimeo" : "youtube";
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const [playing, setPlaying] = useState<boolean>(false);

  const { width } = useWindowSize();

  const [playerWidthRef, setPlayerWidthRef] = useState<HTMLElement | null>(
    null
  );

  const [playerWidth, setPlayerWidth] = useState<number>(VIDEO_WIDTH);
  useEffect(
    () =>
      setPlayerWidth(
        playerWidthRef?.getBoundingClientRect().width ?? VIDEO_WIDTH
      ),
    [playerWidthRef, width]
  );

  const [mobile, setMobile] = useState<boolean>(false);
  useEffect(() => setMobile(playerWidth < VIDEO_WIDTH), [playerWidth]);

  useEffect(() => {
    moment().diff(props.details.createdAt, "seconds") < 10 &&
      notificationCtx.success("Video created.");
  }, [props.details.createdAt]);

  useEffect(() => {
    mixpanel.init(
      process.env.NEXT_PUBLIC_REACT_APP_MIXPANEL_PROJECT_TOKEN as string,
      {
        debug: true,
        track_pageview: false, // since the video id is in the url, we use the pageview properly, so have to do it manually
        persistence: "localStorage",
      }
    );
  }, []);

  useEffect(() => {
    user?.email && mixpanel.track("video viewing page");
  }, [user?.email]);

  const [sizeRef, setSizeRef] = useState<HTMLElement | null>(null);
  const [videoWidth, setVideoWidth] = useState<number>(0);
  useEffect(() => {
    sizeRef?.getBoundingClientRect().width &&
      setVideoWidth(sizeRef?.getBoundingClientRect().width);
  }, [sizeRef?.getBoundingClientRect().width, width]);

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  const submitDeletion = () =>
    ApiController.deleteVideo(props.details.id).then(() =>
      router.push("/dashboard")
    );

  const userDetails = useUserContext();

  return props.details && provider ? (
    <>
      <Header />
      <BigCard
        title={props.details.title}
        description={props.details.description}
        createdAt={props.details.createdAt}
        rightStuff={
          <Stack direction="row" spacing="12px">
            {userDetails?.user?.id &&
            userDetails?.user?.id === props.details.creatorId ? (
              <CircularButton
                icon={TrashcanIcon}
                color={PALETTE.system.red}
                onClick={() => setDeletionDialogOpen(true)}
              />
            ) : null}
            <UrsorButton
              dark
              variant="tertiary"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                notificationCtx.success("Copied URL to clipboard.");
              }}
              endIcon={LinkIcon}
            >
              Share link
            </UrsorButton>
          </Stack>
        }
      >
        <Stack px="24px" flex={1}>
          <Stack flex={1} pt="30px" ref={setSizeRef}>
            <Player
              url={props.details.url}
              provider={provider}
              width={videoWidth}
              height={videoWidth * (VIDEO_HEIGHT / VIDEO_WIDTH)}
              setDuration={(d) => d && setDuration(d)}
              noKitemark={videoWidth < VIDEO_WIDTH}
              top="120px"
              playingCallback={(p) => setPlaying(p)}
            />
          </Stack>
        </Stack>
      </BigCard>
      <DeletionDialog
        open={deletionDialogOpen}
        closeCallback={() => setDeletionDialogOpen(false)}
        deletionCallback={submitDeletion}
        category="video"
        title={props.details.title}
      />
    </>
  ) : (
    <></>
  );
}

export default VideoPageContents;
