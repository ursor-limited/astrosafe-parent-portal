import { Stack, alpha } from "@mui/system";
import Image from "next/image";
import TimelineCard from "./TimelineCard";
import DeletionDialog from "@/app/components/DeletionDialog";
import { useContext, useEffect, useState } from "react";
import ApiController, { IVideo } from "@/app/api";
import NotificationContext from "@/app/components/NotificationContext";
import { CONTENT_BRANDING } from "@/app/dashboard/DashboardPageContents";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import Player from "@/app/components/player";
import { VIDEO_HEIGHT, VIDEO_WIDTH } from "@/app/dashboard/VideoCreationDialog";
import { UrsorButton } from "ui";
import ArrowUpRight from "@/images/icons/ArrowUpRight.svg";

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
    duplicationCallback?: () => void;
    onDragStart?: () => void;
    dragging?: boolean;
    columnWidth: number;
    expanded?: boolean;
    noPlayer?: boolean;
    expansionCallback?: () => void;
  }
) => {
  const notificationCtx = useContext(NotificationContext);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
  const submitDeletion = () =>
    ApiController.deleteVideo(props.id)
      .then(props.deletionCallback)
      .then(() => notificationCtx.negativeSuccess("Deleted Video."));

  const submitDuplication = () =>
    ApiController.duplicateVideo(props.id, props.lessonId)
      .then(props.duplicationCallback)
      .then(() => notificationCtx.success("Duplicated Video."));

  const router = useRouter();

  const [sizeRef, setSizeRef] = useState<HTMLElement | null>(null);
  const [playerWidth, setPlayerWidth] = useState<number>(0);
  useEffect(() => {
    setPlayerWidth(sizeRef?.getBoundingClientRect?.()?.width ?? 0);
  }, [sizeRef?.getBoundingClientRect().width]);

  const [provider, zetProvider] = useState<"youtube" | "vimeo" | undefined>(
    undefined
  );
  useEffect(
    () => zetProvider(props.url.includes("vimeo") ? "vimeo" : "youtube"),
    [props.url]
  );

  return (
    <>
      <TimelineCard
        id={props.id}
        title={props.title}
        description={props.description}
        setHeight={props.setHeight}
        updatedAt={props.updatedAt}
        color={alpha(CONTENT_BRANDING.video.color, 0.12)}
        onDragStart={props.onDragStart}
        dragging={props.dragging}
        deletionCallback={() => setDeletionDialogOpen(true)}
        editingCallback={props.editingCallback}
        duplicationCallback={submitDuplication}
        width={props.columnWidth}
        creatorId={props.creatorId}
        expanded={props.expanded}
        expansionCallback={props.expansionCallback}
        useExpandedHeight
        leftElement={
          <UrsorButton
            dark
            size="small"
            endIcon={ArrowUpRight}
            onClick={() =>
              router.push(
                `/video/${props.id}${
                  props.lessonId ? `?lesson=${props.lessonId}` : ""
                }`
              )
            }
          >
            View page
          </UrsorButton>
        }
      >
        <Stack
          flex={1}
          height={props.expanded ? "100%" : undefined}
          spacing="8px"
        >
          <Stack
            width="100%"
            height={playerWidth * (VIDEO_HEIGHT / VIDEO_WIDTH)}
            ref={setSizeRef}
          >
            {!props.noPlayer && provider ? (
              <Player
                playerId={`player-${props.url}`}
                url={props.url}
                provider={provider}
                width={playerWidth}
                height={playerWidth * (VIDEO_HEIGHT / VIDEO_WIDTH)}
                startTime={props.startTime}
                endTime={props.endTime}
                noKitemark
                borderRadius="8px"
              />
            ) : null}
          </Stack>
        </Stack>
      </TimelineCard>
      {deletionDialogOpen ? (
        <DeletionDialog
          open={deletionDialogOpen}
          closeCallback={() => setDeletionDialogOpen(false)}
          deletionCallback={submitDeletion}
          category="Video"
        />
      ) : null}
    </>
  );
};

export default TimelineVideoCard;
