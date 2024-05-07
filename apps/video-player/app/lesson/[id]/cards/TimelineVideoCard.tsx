import { Stack, alpha } from "@mui/system";
import TimelineCard from "./TimelineCard";
import DeletionDialog from "@/app/components/DeletionDialog";
import { useContext, useEffect, useState } from "react";
import ApiController, { IVideo, IVideoComment } from "@/app/api";
import NotificationContext from "@/app/components/NotificationContext";
import { CONTENT_BRANDING } from "@/app/dashboard/DashboardPageContents";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import Player from "@/app/components/player";
import { VIDEO_HEIGHT, VIDEO_WIDTH } from "@/app/dashboard/VideoCreationDialog";
import { PALETTE, Typography, UrsorButton } from "ui";
import ArrowUpRight from "@/images/icons/ArrowUpRight.svg";
import CommentIcon from "@/images/icons/CommentIcon.svg";
import PlayIcon from "@/images/icons/PlayIcon.svg";
import TimeRange from "@/app/dashboard/TimeRange";
import _ from "lodash";
import { VideoCommentCard } from "@/app/dashboard/VideoDialogCommentsTab";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import UrsorPopover from "@/app/components/UrsorPopover";
import { isMobile } from "react-device-detect";

const COMMENT_PAUSE_THRESHOLD = 1;

export const getFormattedDate = (date: string) =>
  dayjs(date).format("Do MMMM YYYY");

const TimelineCardCommentsButton = (props: {
  comments: IVideoComment[];
  selectedCommentId?: string;
  callback: (id: string) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <UrsorPopover
      open={open}
      closeCallback={() => setOpen(false)}
      placement="right"
      zIndex={9999}
      noPadding
      content={
        <Stack
          width="264px"
          justifyContent="space-between"
          p="12px"
          spacing="12px"
          overflow="scroll"
          bgcolor={PALETTE.secondary.grey[1]}
          borderRadius="12px"
          maxHeight="460px"
        >
          <Typography
            bold
            color={PALETTE.secondary.grey[3]}
          >{`${props.comments?.length} Comments`}</Typography>
          {props.comments?.map((c) => (
            <UrsorFadeIn key={c.id} duration={800}>
              <Stack
                id={c.id}
                sx={{
                  transition: "0.2s",
                  cursor: "pointer",
                }}
                onClick={() => props.callback(c.id)}
              >
                <VideoCommentCard
                  {...c}
                  selected={props.selectedCommentId === c.id}
                />
              </Stack>
            </UrsorFadeIn>
          ))}
        </Stack>
      }
    >
      <Stack
        height="32px"
        width="32px"
        bgcolor="rgb(255,255,255)"
        borderRadius="100%"
        justifyContent="center"
        alignItems="center"
        sx={{
          "&:hover": { opacity: 0.7 },
          transition: "0.2s",
          cursor: "pointer",
        }}
        onClick={() => setOpen(true)}
      >
        <CommentIcon height="18px" width="18px" />
      </Stack>
    </UrsorPopover>
  );
};

const TimelineVideoCardCommentDisplayCard = (
  props: IVideoComment & { resumeCallback: () => void }
) => (
  <Stack
    width={isMobile ? "300px" : "518px"}
    borderRadius="12px"
    bgcolor="rgb(255,255,255)"
    p="10px"
    boxSizing="border-box"
    spacing="8px"
  >
    <Typography variant={isMobile ? "medium" : "h5"} bold>
      {props.value}
    </Typography>
    <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
      <Typography bold variant="small" color={PALETTE.secondary.grey[3]}>
        {`${Math.floor(props.time / 60)
          .toString()
          .padStart(2, "0")}:${Math.floor(props.time % 60)
          .toString()
          .padStart(2, "0")}`}
      </Typography>
      <UrsorButton
        size="small"
        variant="tertiary"
        dark
        endIcon={PlayIcon}
        onClick={props.resumeCallback}
      >
        Resume
      </UrsorButton>
    </Stack>
  </Stack>
);

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
    noButtons?: boolean;
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
      //setDuration(props.endTime - props.startTime);
    }
  }, [props.startTime, props.endTime]);

  const [currentTime, setCurrentTime] = useState<number>(0);

  const [currentTimeSetter, setCurrentTimeSetter] = useState<
    undefined | ((time: number) => void)
  >();

  const [playing, setPlaying] = useState<boolean>(false);
  const [playingSetter, setPlayingSetter] = useState<
    undefined | ((playing: boolean) => void)
  >();

  const [muteSetter, setMuteSetter] = useState<undefined | (() => void)>();

  const [currentComment, setCurrentComment] = useState<
    IVideoComment | undefined
  >();
  useEffect(() => {
    playing && setCurrentComment(undefined);
  }, [playing]);
  const [resumedFromCommentId, setResumedFromCommentId] = useState<
    string | undefined
  >();
  const [sortedComments, setSortedComments] = useState<IVideoComment[]>([]);
  useEffect(
    () => setSortedComments(_.reverse(_.sortBy(props.comments, (c) => c.time))),
    [props.comments]
  );
  useEffect(() => {
    if (draggingOnTimeLine) return;
    const newCurrentComment = sortedComments.find(
      (c) =>
        currentTime - c.time > 0 &&
        currentTime - c.time < COMMENT_PAUSE_THRESHOLD
    );
    if (
      resumedFromCommentId !== newCurrentComment?.id &&
      newCurrentComment &&
      newCurrentComment?.id !== currentComment?.id
    ) {
      setCurrentComment(newCurrentComment);
      setResumedFromCommentId(newCurrentComment.id);
      playingSetter?.(false);
    }
  }, [currentTime]);

  const [draggingOnTimeLine, setDraggingOnTimeLine] = useState<boolean>(false);

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
        comments={sortedComments}
        noButtons={props.noButtons}
        extraButton={
          !props.noPlayer && props.comments ? (
            <TimelineCardCommentsButton
              comments={props.comments}
              selectedCommentId={currentComment?.id}
              callback={(id) => {
                setCurrentComment(props.comments.find((c) => c.id === id));
                const newCurrentTime = sortedComments.find((c) => c.id === id)
                  ?.time;
                newCurrentTime && currentTimeSetter?.(newCurrentTime);
                playingSetter?.(false);
              }}
            />
          ) : undefined
        }
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
        <Stack spacing="8px" flex={1}>
          <Stack flex={1} position="relative">
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
                    setMuteSetter={(f) => setMuteSetter(() => f)}
                  />
                </Stack>
              ) : null}
            </Stack>
            {currentComment ? (
              <Stack
                position="absolute"
                bottom="16px"
                left={0}
                right={0}
                marginLeft="auto"
                marginRight="auto"
                alignItems="center"
              >
                <TimelineVideoCardCommentDisplayCard
                  {...currentComment}
                  resumeCallback={() => {
                    playingSetter?.(true);
                    setCurrentComment(undefined);
                  }}
                />
              </Stack>
            ) : null}
          </Stack>
          {duration && !isMobile ? (
            <Stack
              borderBottom={`2px solid ${PALETTE.secondary.grey[2]}`}
              pb="6px"
            >
              <TimeRange
                range={range}
                duration={duration}
                originalUrl={props.url}
                currentTime={currentTime}
                setCurrentTime={(time) => currentTimeSetter?.(time)}
                comments={props.comments}
                selectedComment={currentComment?.id}
                setSelectedComment={(id) => {
                  setCurrentComment(props.comments.find((c) => c.id === id));
                  setResumedFromCommentId(id);
                  if (id) {
                    const time = props.comments.find((c) => c.id === id)?.time;
                    _.isNumber(time) && currentTimeSetter?.(time);
                    playingSetter?.(false);
                  }
                }}
                playing={playing}
                playingCallback={() => playingSetter?.(!playing)}
                muteCallback={() => muteSetter?.()}
                //setDragging={(d) => setDraggingOnTimeLine(d)}
              />
            </Stack>
          ) : null}
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
