"use client";

import React, { use, useEffect, useState } from "react";
import { Stack } from "@mui/system";
import ApiController, { IVideo } from "@/app/api";
import dynamic from "next/dynamic";
import { PALETTE, Typography, UrsorButton } from "ui";
import { useWindowSize } from "usehooks-ts";
import { useAuth0 } from "@auth0/auth0-react";
import ShareIcon from "@/images/icons/ShareIcon2.svg";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import NotificationContext from "@/app/components/NotificationContext";
import mixpanel from "mixpanel-browser";
import BigCard from "@/app/components/BigCard";
import DeletionDialog from "@/app/components/DeletionDialog";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/components/UserContext";
import { Header } from "@/app/components/header2";
import dayjs from "dayjs";
import { CircularButton } from "./VideoPageContents";
import UrsorActionButton from "@/app/components/UrsorActionButton";
import VideoCreationDialog from "@/app/dashboard/VideoCreationDialog";

export const MAGICAL_BORDER_THICKNESS = 1.8;
export const HIDE_LOGO_PLAYER_WIDTH_THRESHOLD = 500;

const Player = dynamic(
  () => import("@/app/components/player"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

// export const CircularButton = (props: {
//   icon: React.FC<React.SVGProps<SVGSVGElement>>;
//   color?: string;
//   onClick: () => void;
// }) => {
//   const [hovering, setHovering] = useState<boolean>(false);
//   return (
//     <Stack
//       height="39px"
//       width="39px"
//       minHeight="38px"
//       minWidth="38px"
//       borderRadius="100%"
//       border={`2px solid ${props.color || PALETTE.primary.navy}`}
//       justifyContent="center"
//       alignItems="center"
//       sx={{
//         svg: {
//           path: {
//             fill: props.color || PALETTE.primary.navy,
//           },
//         },
//         cursor: "pointer",
//         "&:hover": { opacity: 0.6 },
//         transition: "0.2s",
//       }}
//       onMouseEnter={() => {
//         setHovering(true);
//       }}
//       onMouseLeave={() => {
//         setHovering(false);
//       }}
//       onClick={props.onClick}
//     >
//       <props.icon height="20px" width="20px" />
//     </Stack>
//   );
// };

const VIDEO_WIDTH = 845;
const VIDEO_HEIGHT = 475;

function MobileVideoPageContents(props: {
  details: IVideo;
  lessonId?: string;
}) {
  const [video, setVideo] = useState<IVideo | undefined>(undefined);
  useEffect(() => setVideo(props.details), []);

  const loadVideo = () =>
    ApiController.getVideoDetails(props.details.id).then((v) => setVideo(v));
  useEffect(() => {
    loadVideo();
  }, [props.details.id]);

  const { user } = useAuth0();

  const notificationCtx = React.useContext(NotificationContext);

  const provider = props.details?.url.includes("vimeo") ? "vimeo" : "youtube";
  const [duration, setDuration] = useState<number | undefined>(undefined);

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
    dayjs().diff(props.details.createdAt, "seconds") < 10 &&
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
  const [editingDialogOpen, setEditingDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  const submitDeletion = () =>
    ApiController.deleteVideo(props.details.id).then(() =>
      router.push(
        props.lessonId
          ? `/lesson/${props.lessonId}`
          : userDetails
          ? "/dashboard"
          : "/"
      )
    );

  const userDetails = useUserContext();

  return video && provider ? (
    <>
      <Stack p="20px" spacing="22px" overflow="scroll" flex={1}>
        <Stack spacing="12px">
          <Stack direction="row" justifyContent="space-between">
            <Stack
              direction="row"
              alignItems="center"
              spacing="3px"
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.7 },
                transition: "0.2s",
                svg: {
                  path: { fill: PALETTE.secondary.grey[1] },
                },
              }}
              onClick={() =>
                router.push(
                  props.lessonId
                    ? `/lesson/${props.lessonId}`
                    : userDetails
                    ? "/dashboard"
                    : "/"
                )
              }
            >
              <ChevronLeft width="20px" height="20px" />
              <Typography color={PALETTE.secondary.grey[1]}>
                {props.lessonId ? "Back to Lesson" : "Back to Home"}
              </Typography>
            </Stack>
            <Stack direction="row" spacing="10px">
              {userDetails?.user?.id &&
              userDetails?.user?.id === video?.creatorId ? (
                <UrsorActionButton
                  size="43px"
                  iconSize="17px"
                  //background={PALETTE.secondary.grey[1]}
                  border
                  actions={[
                    {
                      text: "Edit",
                      kallback: () => setEditingDialogOpen(true),
                      icon: PencilIcon,
                    },
                    {
                      text: "Delete",
                      kallback: () => setDeletionDialogOpen(true),
                      icon: TrashcanIcon,
                      color: PALETTE.system.red,
                    },
                  ]}
                />
              ) : null}

              <Stack
                borderRadius="100%"
                border="2px solid rgb(255,255,255)"
                height="39px"
                width="39px"
                justifyContent="center"
                alignItems="center"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  notificationCtx.success("Copied URL to clipboard.");
                }}
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.6 },
                  transition: "0.2s",
                  svg: {
                    path: {
                      fill: "rgb(255,255,255)",
                    },
                  },
                }}
              >
                <ShareIcon width="22px" height="22px" />
              </Stack>
            </Stack>
          </Stack>
          {/* <Stack direction="row" spacing="12px" justifyContent="space-between">
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
          </Stack> */}
          <Stack pt="60px">
            <Typography variant="medium" bold color="rgb(255,255,255)">
              {video.title}
            </Typography>
            <Typography variant="small" color="rgb(255,255,255)">
              {video.description}
            </Typography>
            <Stack pt="30px" ref={setSizeRef} alignItems="center" height="100%">
              <Player
                url={video.url}
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
        </Stack>
      </Stack>
      {editingDialogOpen ? (
        <VideoCreationDialog
          open={true}
          closeCallback={() => setEditingDialogOpen(false)}
          editingCallback={loadVideo}
          video={video}
        />
      ) : null}
      <DeletionDialog
        open={deletionDialogOpen}
        closeCallback={() => setDeletionDialogOpen(false)}
        deletionCallback={submitDeletion}
        category="video"
        title={video.title}
        mobile
      />
    </>
  ) : (
    <></>
  );
}

export default MobileVideoPageContents;
