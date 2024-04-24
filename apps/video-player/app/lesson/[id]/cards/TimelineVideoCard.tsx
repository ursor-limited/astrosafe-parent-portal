import { Stack, alpha } from "@mui/system";
import Image from "next/image";
import TimelineCard from "./TimelineCard";
import DeletionDialog from "@/app/components/DeletionDialog";
import { useContext, useState } from "react";
import ApiController, { IVideo } from "@/app/api";
import NotificationContext from "@/app/components/NotificationContext";
import { CONTENT_BRANDING } from "@/app/dashboard/DashboardPageContents";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { PALETTE, Typography } from "ui";
import Play from "@/images/play.svg";

const PLACEHOLDER_THUMBNAIL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/Safetubelogo2.png";

export const getFormattedDate = (date: string) =>
  dayjs(date).format("Do MMMM YYYY");

const TimelineVideoCard = (
  props: IVideo & {
    lessonId: string;
    setHeight?: (height: number) => void;
    editingCallback?: () => void;
    deletionCallback?: () => void;
    onDragStart?: () => void;
    dragging?: boolean;
  }
) => {
  const notificationCtx = useContext(NotificationContext);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
  const submitDeletion = () =>
    ApiController.deleteVideo(props.id)
      .then(props.deletionCallback)
      .then(() => notificationCtx.negativeSuccess("Deleted Video."));

  const router = useRouter();

  return (
    <>
      <TimelineCard
        id={props.id}
        setHeight={props.setHeight}
        updatedAt={props.updatedAt}
        color={alpha(CONTENT_BRANDING.video.color, 0.12)}
        onDragStart={props.onDragStart}
        dragging={props.dragging}
        deletionCallback={() => setDeletionDialogOpen(true)}
        editingCallback={props.editingCallback}
      >
        <Stack
          flex={1}
          spacing="8px"
          sx={{
            "&:hover": { opacity: 0.6 },
            transition: "0.2s",
            cursor: "pointer",
          }}
          onClick={() =>
            router.push(
              `/video/${props.id}${
                props.lessonId ? `?lesson=${props.lessonId}` : ""
              }`
            )
          }
        >
          <Stack
            height="331px"
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
        </Stack>
      </TimelineCard>
      {deletionDialogOpen ? (
        <DeletionDialog
          open={deletionDialogOpen}
          closeCallback={() => setDeletionDialogOpen(false)}
          deletionCallback={submitDeletion}
          category="Text"
        />
      ) : null}
    </>
  );
};

export default TimelineVideoCard;
