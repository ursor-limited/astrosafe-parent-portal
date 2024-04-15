import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ApiController, { IVideo } from "../api";
import { PALETTE, Typography } from "ui";
import Play from "@/images/play.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import Image from "next/image";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import UrsorActionButton from "./UrsorActionButton";
import DeletionDialog from "./DeletionDialog";
import NotificationContext from "./NotificationContext";
import { CONTENT_BRANDING } from "../dashboard/DashboardPageContents";
import useOrangeBorder from "./useOrangeBorder";
dayjs.extend(advancedFormat);

const PLACEHOLDER_THUMBNAIL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/Safetubelogo2.png";

export const getFormattedDate = (date: string) =>
  dayjs(date).format("Do MMMM YYYY");

const VideoCard = (
  props: IVideo & {
    editingCallback: () => void;
    deletionCallback: () => void;
  }
) => {
  const router = useRouter();
  const [currentPageUrl, setCurrentPageUrl] = useState<string | undefined>(
    undefined
  );
  useEffect(() => setCurrentPageUrl(window?.location.href), []);

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);

  const notificationCtx = React.useContext(NotificationContext);

  const submitDeletion = () =>
    ApiController.deleteVideo(props.id)
      .then(props.deletionCallback)
      .then(() => notificationCtx.negativeSuccess("Deleted Video Link."));

  const orangeBorderOn = useOrangeBorder(props.updatedAt);

  return (
    <>
      <Stack
        height="260px"
        borderRadius="12px"
        bgcolor="rgb(255,255,255)"
        p="4px"
        overflow="hidden"
        sx={{
          backdropFilter: "blur(4px)",
          outline: orangeBorderOn
            ? `3px solid ${PALETTE.system.orange}`
            : undefined,
        }}
        position="relative"
        boxShadow="0 0 20px rgba(0,0,0,0.08)"
        pb="12px"
      >
        <Stack position="absolute" top="16px" right="16px" zIndex={2}>
          <UrsorActionButton
            size="32px"
            iconSize="16px"
            actions={[
              {
                text: "Edit",
                kallback: props.editingCallback,
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
        </Stack>
        <Stack
          flex={1}
          spacing="8px"
          sx={{
            "&:hover": { opacity: 0.6 },
            transition: "0.2s",
            cursor: "pointer",
          }}
          onClick={() => router.push(`/video/${props.id}`)}
        >
          <Stack
            height="163px"
            width="100%"
            sx={{
              backgroundImage: `url(${props.thumbnailUrl})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            borderRadius="10px 10px 0 0"
            bgcolor={!props.thumbnailUrl ? PALETTE.primary.navy : undefined}
            position="relative"
          >
            {/* <Stack
            position="absolute"
            borderRadius="100%"
            width="32px"
            height="32px"
            justifyContent="center"
            alignItems="center"
            bgcolor={PALETTE.secondary.grey[1]}
            top="12px"
            right="12px"
            zIndex={2}
          >
            <MoreIcon width="20px" height="20px" />
          </Stack> */}
            {!props.thumbnailUrl ? (
              <Stack flex={1} justifyContent="center" alignItems="center">
                <Image
                  src={PLACEHOLDER_THUMBNAIL}
                  width={200}
                  height={100}
                  alt="Intro square"
                />
              </Stack>
            ) : null}
            <Stack
              flex={1}
              justifyContent="center"
              alignItems="center"
              sx={{
                background: "radial-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0))",
              }}
            >
              <Play width="40px" height="40px" />
            </Stack>
          </Stack>
          <Stack flex={1} justifyContent="space-between">
            <Typography variant="medium" bold maxLines={2}>
              {props.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ svg: { path: { fill: CONTENT_BRANDING.video.color } } }}
            >
              <Typography variant="small">
                {getFormattedDate(props.createdAt)}
              </Typography>
              <CirclePlayIcon height="20px" width="20px" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {deletionDialogOpen ? (
        <DeletionDialog
          open={deletionDialogOpen}
          closeCallback={() => setDeletionDialogOpen(false)}
          deletionCallback={submitDeletion}
          category="Safe Video Link"
          title={props.title}
        />
      ) : null}
    </>
  );
};

export default VideoCard;
