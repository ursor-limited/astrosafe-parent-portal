import { Stack } from "@mui/system";
import { useCallback, useContext, useEffect, useState } from "react";
import ApiController, { IVideo, IVideoComment } from "@/app/api";
import NotificationContext from "@/app/components/NotificationContext";
import dayjs from "dayjs";
import Player from "@/app/components/player";
import { VIDEO_HEIGHT, VIDEO_WIDTH } from "@/app/dashboard/VideoCreationDialog";
import { PALETTE, Typography, UrsorButton } from "ui";
import CommentIcon from "@/images/icons/CommentIcon.svg";
import PlayIcon from "@/images/icons/PlayIcon.svg";
import TimeRange from "@/app/dashboard/TimeRange";
import _ from "lodash";
import { VideoCommentCard } from "@/app/dashboard/VideoDialogCommentsTab";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import UrsorPopover from "@/app/components/UrsorPopover";
import { isMobile } from "react-device-detect";

export const COMMENT_PAUSE_THRESHOLD = 1;

function useClientRect() {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const ref = useCallback((node: HTMLElement) => {
    if (!node) return;
    const resizeObserver = new ResizeObserver(() => {
      setRect(node.getBoundingClientRect?.());
      // Do what you want to do when the size of the element changes
    });
    resizeObserver.observe(node);
  }, []);
  return [rect, ref];
}

export const getFormattedDate = (date: string) =>
  dayjs(date).format("Do MMMM YYYY");

export const TimelineCardCommentsButton = (props: {
  comments: IVideoComment[];
  selectedCommentId?: string;
  shortList?: boolean;
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
      top
      maxHeight={props.shortList ? "312px" : "460px"}
      content={
        <Stack
          width="264px"
          justifyContent="space-between"
          p="12px"
          spacing="12px"
          overflow="scroll"
          bgcolor={PALETTE.secondary.grey[1]}
          borderRadius="12px"
        >
          <Typography bold color={PALETTE.secondary.grey[3]}>{`${props.comments
            ?.length} Comment${
            props.comments?.length === 1 ? "" : "s"
          }`}</Typography>
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
        height="40px"
        width="40px"
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

export const TimelineVideoCardCommentDisplayCard = (
  props: IVideoComment & { resumeCallback: () => void }
) => (
  <Stack
    width={isMobile ? "300px" : "518px"}
    borderRadius="12px"
    bgcolor="rgb(255,255,255)"
    p="10px"
    boxSizing="border-box"
    spacing="8px"
    maxHeight="260px"
  >
    <Stack flex={1} overflow="hidden">
      <Typography variant={isMobile ? "medium" : "h5"} bold>
        {props.value}
      </Typography>
    </Stack>
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

const MoonsafeKidsVideoCard = (
  props: IVideo & {
    setHeight?: (height: number) => void;
    editingCallback?: () => void;
    deletionCallback?: () => void;
    duplicationCallback?: () => void;
    onDragStart?: () => void;
    setCurrentTime?: (time: number) => void;
    dragging?: boolean;
    columnWidth?: number;
    expanded?: boolean;
    noPlayer?: boolean;
    noButtons?: boolean;
    expansionCallback?: () => void;
    hideLimits?: boolean;
    play?: boolean;
  }
) => {
  const notificationCtx = useContext(NotificationContext);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
  const submitDeletion = () =>
    ApiController.deleteVideo(props.id)
      .then(props.deletionCallback)
      .then(() => notificationCtx.negativeSuccess("Deleted Video."));

  const [playerWidth, setPlayerWidth] = useState<number>(0);
  const [playerHeight, setPlayerHeight] = useState<number>(0);

  const [playerContainerRect, playerContainerRef] = useClientRect();
  useEffect(() => {
    setPlayerHeight((playerContainerRect as DOMRect)?.height ?? 0);
    setPlayerWidth((playerContainerRect as DOMRect)?.width ?? 0);
  }, [playerContainerRect]);

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
    }
  }, [props.startTime, props.endTime]);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currentTimeSetter, setCurrentTimeSetter] = useState<
    undefined | ((time: number) => void)
  >();
  useEffect(() => {
    props.setCurrentTime(currentTime);
  }, [currentTime]);

  const [playing, setPlaying] = useState<boolean>(false);
  const [playingSetter, setPlayingSetter] = useState<
    undefined | ((playing: boolean) => void)
  >();

  useEffect(() => {
    if (playingSetter) {
      setPlaying(!!props.play);
      playingSetter(!!props.play);
    }
  }, [props.play, playingSetter]);

  const [muted, setMuted] = useState<boolean>(false);
  const [muteSetter, setMuteSetter] = useState<undefined | (() => void)>();

  const [commentGroups, setCommentGroups] = useState<IVideoComment[][]>([]);
  useEffect(
    () =>
      setCommentGroups(
        Object.values(
          _.groupBy(
            _.sortBy(props.comments, (c) => c.time),
            (c) => c.time
          )
        )
      ),
    [props.comments]
  );

  const [currentCommentIndex, setCurrentCommentIndex] = useState<number>(0);
  const [currentCommentGroup, setCurrentCommentGroup] = useState<
    IVideoComment[]
  >([]);
  const [currentComment, setCurrentComment] = useState<
    IVideoComment | undefined
  >();
  useEffect(
    () => setCurrentComment(currentCommentGroup?.[currentCommentIndex]),
    [currentCommentIndex, currentCommentGroup]
  );

  useEffect(() => {
    playing && setCurrentComment(undefined);
  }, [playing]);
  const [resumedFromCommentGroup, setResumedFromCommentGroup] = useState<
    number | undefined
  >();
  const [sortedComments, setSortedComments] = useState<IVideoComment[]>([]);
  useEffect(
    () => setSortedComments(_.reverse(_.sortBy(props.comments, (c) => c.time))),
    [props.comments]
  );

  useEffect(() => {
    if (currentCommentGroup.length > 1) return;
    const newCurrentCommentGroup = commentGroups.find(
      (cg) =>
        currentTime - cg[0].time > 0 &&
        currentTime - cg[0].time < COMMENT_PAUSE_THRESHOLD
    );
    if (
      newCurrentCommentGroup &&
      resumedFromCommentGroup !== newCurrentCommentGroup[0]?.time
    ) {
      setCurrentCommentGroup(newCurrentCommentGroup);
      setCurrentCommentIndex(0);
      setResumedFromCommentGroup(newCurrentCommentGroup[0].time);
      playingSetter?.(false);
    }
  }, [currentTime, commentGroups]);

  return (
    <>
      <Stack
        p="12px"
        borderRadius="20px"
        bgcolor="rgb(255,255,255)"
        boxShadow="0 0 20px rgba(0,0,0,0.08)"
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
              ref={playerContainerRef as (node: HTMLElement | null) => void}
            >
              {!props.noPlayer && provider && playerHeight ? (
                <Stack height={props.noPlayer ? 0 : undefined} spacing="12px">
                  <Player
                    playerId={`kids-player-${props.id}`}
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
                    mutedCallback={setMuted}
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
                    if (currentCommentIndex < currentCommentGroup.length - 1) {
                      setCurrentCommentIndex((prev) => prev + 1);
                    } else {
                      playingSetter?.(true);
                      setCurrentComment(undefined);
                    }
                  }}
                />
              </Stack>
            ) : null}
          </Stack>
          {duration && !isMobile ? (
            <Stack pb="8px">
              <TimeRange
                range={range}
                duration={duration}
                originalUrl={props.url}
                currentTime={currentTime}
                setCurrentTime={(time) => currentTimeSetter?.(time)}
                comments={props.comments}
                selectedComment={currentComment?.id}
                setSelectedComment={(id) => {
                  const currentComment = props.comments.find(
                    (c) => c.id === id
                  );
                  setCurrentCommentGroup(
                    props.comments.filter(
                      (c) => c.time === currentComment?.time
                    )
                  );
                  setCurrentCommentIndex(0);
                  setResumedFromCommentGroup(currentCommentGroup[0]?.time);
                  if (id) {
                    const time = currentComment?.time;
                    _.isNumber(time) && currentTimeSetter?.(time);
                    playingSetter?.(false);
                  }
                }}
                playing={playing}
                playingCallback={() => playingSetter?.(!playing)}
                muted={muted}
                muteCallback={() => {
                  setMuted(true);
                  muteSetter?.();
                }}
                greyLines
                hideExternalComments
                commentsButton={!props.noButtons}
                shortCommentsList={!props.expanded}
                noSpacing
                hideLimits
                white
              />
            </Stack>
          ) : null}
          <Typography variant="h5" maxLines={1}>
            {props.title}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default MoonsafeKidsVideoCard;
