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
import { useUserContext } from "@/app/components/UserContext";
import TimeRange from "@/app/dashboard/TimeRange";
import _ from "lodash";

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
    columnWidth?: number;
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

  //const userDetails = useUserContext();

  const [headerLoaded, setHeaderLoaded] = useState<boolean>(false);
  const [sizeRef, setSizeRef] = useState<HTMLElement | null>(null);
  const [playerWidth, setPlayerWidth] = useState<number>(0);
  const [playerHeight, setPlayerHeight] = useState<number>(0);
  const setDimensions = () => {
    setPlayerWidth(sizeRef?.getBoundingClientRect?.()?.width ?? 0);
    setPlayerHeight(sizeRef?.getBoundingClientRect?.()?.height ?? 0);
  };
  useEffect(() => {
    setTimeout(setDimensions, 1000); // gives time for the card's header to load
  }, [
    sizeRef?.getBoundingClientRect().width,
    sizeRef?.getBoundingClientRect().height,
    headerLoaded, // needed to make sure that the height is taken after the card's header is rendered.
  ]);

  const [provider, zetProvider] = useState<"youtube" | "vimeo" | undefined>(
    undefined
  );
  useEffect(
    () => zetProvider(props.url.includes("vimeo") ? "vimeo" : "youtube"),
    [props.url]
  );

  const [duration, setDuration] = useState<number | undefined>(10);
  const [range, setRange] = useState<[number, number] | undefined>(undefined);

  useEffect(() => {
    if (_.isNumber(props?.startTime) && props.endTime) {
      setRange([props?.startTime, props.endTime]);
      setDuration(props.endTime - props.startTime);
    }
  }, []);

  const [currentTime, setCurrentTime] = useState<number>(0);

  const [currentTimeSetter, setCurrentTimeSetter] = useState<
    undefined | ((time: number) => void)
  >();

  const [playing, setPlaying] = useState<boolean>(false);
  const [playingSetter, setPlayingSetter] = useState<
    undefined | ((playing: boolean) => void)
  >();

  const [selectedComment, setSelectedComment] = useState<string | undefined>();
  useEffect(() => {
    playing && setSelectedComment(undefined);
  }, [playing]);

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
        <Stack flex={1}>
          <Stack
            width="100%"
            flex={props.expanded ? 1 : undefined}
            height={
              props.expanded
                ? undefined
                : playerWidth * (VIDEO_HEIGHT / VIDEO_WIDTH)
            }
            ref={setSizeRef}
          >
            {!props.noPlayer && provider && playerHeight ? (
              <Stack height={props.noPlayer ? 0 : undefined} spacing="12px">
                <Player
                  playerId={`player-${props.id}`}
                  url={props.url}
                  provider={provider}
                  width={playerWidth}
                  height={playerHeight}
                  startTime={props.startTime}
                  endTime={props.endTime}
                  borderRadius="8px"
                  setDuration={(d) => {
                    d && setDuration(d);
                  }}
                  playingCallback={setPlaying}
                  setCurrentTime={setCurrentTime}
                  setCurrentTimeSetter={(f) => setCurrentTimeSetter(() => f)}
                  setPlayingSetter={(f) => setPlayingSetter(() => f)}
                />
              </Stack>
            ) : null}
          </Stack>
        </Stack>
        {props.expanded && duration ? (
          <TimeRange
            range={range}
            duration={duration}
            originalUrl={props.url}
            currentTime={currentTime}
            setCurrentTime={(time) => currentTimeSetter?.(time)}
            comments={props.comments}
            selectedComment={selectedComment}
            setSelectedComment={(id) => {
              setSelectedComment(id);
              if (id) {
                const time = props.comments.find((c) => c.id === id)?.time;
                _.isNumber(time) && currentTimeSetter?.(time);
                playingSetter?.(false);
              }
            }}
          />
        ) : null}
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
