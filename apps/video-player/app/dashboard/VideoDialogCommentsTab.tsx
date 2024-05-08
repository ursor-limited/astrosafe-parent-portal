import { Stack } from "@mui/system";
import { isMobile } from "react-device-detect";
import { PALETTE, Typography, UrsorButton, UrsorTextField } from "ui";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import X from "@/images/icons/X.svg";
import LocationIcon from "@/images/icons/LocationIcon.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import CheckIcon from "@/images/icons/CheckIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import { VIDEO_HEIGHT, VIDEO_WIDTH } from "./VideoCreationDialog";
import Player from "../components/player";
import { useCallback, useEffect, useState } from "react";
import TimeRange from "./TimeRange";
import { IVideo, IVideoComment } from "../api";
import _, { uniqueId } from "lodash";
import UrsorFadeIn from "../components/UrsorFadeIn";
import DeletionDialog from "../components/DeletionDialog";

const VideoDialogTimestamp = (props: { value: number }) => (
  <Stack
    direction="row"
    spacing="4px"
    sx={{ svg: { path: { fill: PALETTE.secondary.grey[3] } } }}
  >
    <LocationIcon height="18px" width="18px" />
    <Typography color={PALETTE.secondary.grey[3]} variant="small" bold>
      {`${Math.floor(props.value / 60)
        .toString()
        .padStart(2, "0")}:${Math.floor(props.value % 60)
        .toString()
        .padStart(2, "0")}`}
    </Typography>
  </Stack>
);

export const VideoCommentCard = (props: {
  value: string;
  time: number;
  deletionCallback?: () => void;
  saveCallback?: (newValue: string) => void;
  selected: boolean;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  useEffect(() => setValue(props.value), [props.value]);
  useEffect(() => {
    !props.selected && setEditing(false);
  }, [props.selected]);
  return (
    <Stack
      p="12px"
      pb="6px"
      minHeight="107px"
      boxSizing="border-box"
      justifyContent="space-between"
      bgcolor="rgb(255,255,255)"
      borderRadius="8px"
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      sx={{
        transition: "0.2s",
        border: `2px solid ${
          // eslint-disable-next-line no-nested-ternary -- idiotic rule
          props.selected
            ? PALETTE.secondary.purple[2]
            : hovering
            ? PALETTE.secondary.purple[1]
            : "transparent"
        }`,
      }}
      spacing="6px"
    >
      {editing ? (
        <UrsorTextField
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setValue(event.target.value)
          }
          placeholder="Write a comment"
          width="100%"
          height="111px"
          boldValue
          noBorder
        />
      ) : (
        <Typography variant="small" maxLines={2}>
          {props.value}
        </Typography>
      )}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <VideoDialogTimestamp value={props.time} />
        {props.deletionCallback || props.saveCallback ? (
          <Stack direction="row" spacing="8px">
            <Stack
              height="30px"
              width="30px"
              bgcolor={PALETTE.secondary.grey[1]}
              borderRadius="100%"
              justifyContent="center"
              alignItems="center"
              sx={{
                "&:hover": { opacity: 0.7 },
                transition: "0.2s",
                cursor: "pointer",
                svg: {
                  path: {
                    fill: PALETTE.primary.navy,
                  },
                },
              }}
              onClick={() => {
                if (editing) {
                  setEditing(false);
                  props.saveCallback?.(value);
                } else {
                  setEditing(true);
                }
              }}
            >
              {editing ? (
                <CheckIcon height="16px" width="16px" />
              ) : (
                <PencilIcon height="16px" width="16px" />
              )}
            </Stack>
            <Stack
              height="30px"
              width="30px"
              bgcolor={PALETTE.secondary.grey[1]}
              borderRadius="100%"
              justifyContent="center"
              alignItems="center"
              sx={{
                "&:hover": { opacity: 0.7 },
                transition: "0.2s",
                cursor: "pointer",
                svg: {
                  path: {
                    fill: editing ? PALETTE.primary.navy : PALETTE.system.red,
                  },
                },
              }}
              onClick={() =>
                editing ? setEditing(false) : props.deletionCallback?.()
              }
            >
              {editing ? (
                <X height="16px" width="16px" />
              ) : (
                <TrashcanIcon height="16px" width="16px" />
              )}
            </Stack>
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  );
};

const VideoDialogCommentsTab = (props: {
  url: string;
  originalUrl: string;
  setOriginalUrl: (url: string) => void;
  video?: IVideo;
  mainButtonCallback: () => void;
  provider?: "youtube" | "vimeo";
  duration?: number;
  setDuration: (duration: number) => void;
  range?: [number, number];
  setRange: (range?: [number, number]) => void;
  setThumbnailUrl: (url: string) => void;
  comments: IVideoComment[];
  setComments: (comments: IVideoComment[]) => void;
  // setPlaying?: (playing: boolean) => void;
}) => {
  const [playing, setPlaying] = useState<boolean>(false);

  const [currentTime, setCurrentTime] = useState<number>(0);

  const [currentTimeSetter, setCurrentTimeSetter] = useState<
    undefined | ((time: number) => void)
  >();

  const [playingSetter, setPlayingSetter] = useState<
    undefined | ((playing: boolean) => void)
  >();
  useEffect(() => {
    if (playingSetter) {
      playingSetter(true); // have to set it playing so that the annoying auto-resume can be let loose before the user clicks anything
    }
  }, [playingSetter]);

  const [muted, setMuted] = useState<boolean>(false);
  const [muteSetter, setMuteSetter] = useState<undefined | (() => void)>();

  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<IVideoComment[]>([]);
  useEffect(() => setComments(props.comments), [props.comments]);

  const [sortedComments, setSortedComments] = useState<IVideoComment[]>([]);
  useEffect(
    () => setSortedComments(_.sortBy(comments, (c) => c.time)),
    [comments]
  );

  const addComment = () => {
    const newComments = [
      ...comments,
      { id: uniqueId(), value: comment, time: currentTime },
    ];
    setComments(newComments);
    props.setComments(newComments);
    setComment("");
  };

  const handleUserKeyPress = useCallback(
    (event: any) => {
      if (event.code === "Return") {
        !!comment && addComment();
      }
    },
    [!!comment]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const [selectedComment, setSelectedComment] = useState<string | undefined>();
  useEffect(() => {
    playing && setSelectedComment(undefined);
  }, [playing]);

  const [deletionCommentId, setDeletionCommentId] = useState<
    string | undefined
  >();

  const [playerContainerRef, setPlayerContainerRef] =
    useState<HTMLElement | null>(null);

  const [playerContainerWidth, setPlayerContainerWidth] =
    useState<number>(VIDEO_WIDTH);
  const [playerContainerHeight, setPlayerContainerHeight] =
    useState<number>(VIDEO_HEIGHT);
  useEffect(() => {
    setPlayerContainerWidth(
      playerContainerRef?.getBoundingClientRect().width ?? VIDEO_WIDTH
    );
    setPlayerContainerHeight(
      playerContainerRef?.getBoundingClientRect().height ?? VIDEO_HEIGHT
    );
  }, [
    playerContainerRef?.getBoundingClientRect().width,
    playerContainerRef?.getBoundingClientRect().height,
  ]);

  return (
    <>
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing="24px"
        width="100%"
        flex={1}
        overflow="hidden"
        boxSizing="border-box"
      >
        <Stack spacing="12px" width="100%" height="100%">
          <Stack
            ref={setPlayerContainerRef}
            width="100%"
            height="100%"
            position="relative"
          >
            <Stack position="absolute" top={0} left={0}>
              <Player
                playerId="creation"
                url={props.url}
                provider={props.provider}
                // width={Math.min(playerWidth, VIDEO_WIDTH)}
                // height={
                //   Math.min(playerWidth, VIDEO_WIDTH) *
                //   (VIDEO_HEIGHT / VIDEO_WIDTH)
                // }
                width={Math.min(VIDEO_WIDTH, playerContainerWidth)}
                height={Math.min(VIDEO_HEIGHT, playerContainerHeight)}
                setDuration={(d) => {
                  d && props.setDuration(d);
                }}
                startTime={props.range?.[0] ?? 0}
                endTime={props.range?.[1] ?? 10}
                noKitemark
                playingCallback={setPlaying}
                smallPlayIcon
                noBackdrop
                noUrlStartTime
                setCurrentTime={setCurrentTime}
                setMuteSetter={(f) => setMuteSetter(() => f)}
                setCurrentTimeSetter={(f) => setCurrentTimeSetter(() => f)}
                setPlayingSetter={(f) => setPlayingSetter(() => f)}
              />
            </Stack>
          </Stack>
          <Stack pt="15px" maxWidth={`${playerContainerWidth}px`}>
            {props.duration ? (
              <TimeRange
                range={props.range}
                duration={props.duration}
                setRange={props.setRange}
                originalUrl={props.originalUrl}
                currentTime={currentTime}
                setCurrentTime={(time) => currentTimeSetter?.(time)}
                comments={comments}
                selectedComment={selectedComment}
                setSelectedComment={(id) => {
                  setSelectedComment(id);
                  if (id) {
                    const time = comments.find((c) => c.id === id)?.time;
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
              />
            ) : null}
          </Stack>
        </Stack>
        <Stack
          flex={1}
          justifyContent="space-between"
          spacing="24px"
          width="318px"
          minWidth="318px"
        >
          <Stack
            p="12px"
            boxSizing="border-box"
            bgcolor={PALETTE.secondary.grey[1]}
            borderRadius="12px"
            flex={1}
            spacing="8px"
            height={`${playerContainerHeight}px`}
            maxHeight={`${VIDEO_HEIGHT}px`}
            overflow="hidden"
          >
            <Stack
              onClick={() => {
                playingSetter?.(false);
                setSelectedComment(undefined);
              }}
            >
              <UrsorTextField
                value={comment}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setComment(event.target.value)
                }
                placeholder="Write a comment"
                width="100%"
                height="106px"
                boldValue
                white
              />
            </Stack>
            <Stack
              direction="row"
              width="100%"
              alignItems="center"
              justifyContent="space-between"
            >
              <VideoDialogTimestamp value={currentTime} />
              <UrsorButton
                dark
                variant="tertiary"
                size="small"
                onClick={addComment}
                disabled={!comment}
              >
                Add
              </UrsorButton>
            </Stack>
            <Stack
              spacing="12px"
              overflow="scroll"
              borderTop={`2px solid ${PALETTE.secondary.grey[2]}`}
              pt="12px"
            >
              {
                //_.sortBy(comments, (c) => c.time).map((c) => (
                sortedComments.map((c) => (
                  <UrsorFadeIn key={c.id} duration={800}>
                    <Stack
                      id={c.id}
                      sx={{
                        // "&:hover": { opacity: 0.7 },
                        transition: "0.2s",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedComment(c.id);
                        currentTimeSetter?.(c.time);
                        playingSetter?.(false);
                      }}
                    >
                      <VideoCommentCard
                        {...c}
                        deletionCallback={() => setDeletionCommentId(c.id)}
                        selected={!!selectedComment && selectedComment === c.id}
                        saveCallback={(value) => {
                          const newComments = comments.map((comment) =>
                            comment.id === c.id
                              ? { ...comment, value }
                              : comment
                          );
                          setComments(newComments);
                          props.setComments(newComments);
                        }}
                      />
                    </Stack>
                  </UrsorFadeIn>
                ))
              }
            </Stack>
          </Stack>
          <Stack justifyContent="flex-end">
            <UrsorButton
              onClick={props.mainButtonCallback}
              disabled={!props.url}
              dark
              variant="tertiary"
              endIcon={props.video ? PencilIcon : ChevronRightIcon}
              width="100%"
            >
              {props.video ? "Update" : "Publish"}
            </UrsorButton>
          </Stack>
        </Stack>
      </Stack>
      <DeletionDialog
        open={!!deletionCommentId}
        closeCallback={() => setDeletionCommentId(undefined)}
        deletionCallback={() => {
          const newComments = comments.filter(
            (comment) => comment.id !== deletionCommentId
          );
          setComments(newComments);
          setDeletionCommentId(undefined);
          props.setComments(newComments);
        }}
        category="Comment"
      />
    </>
  );
};

export default VideoDialogCommentsTab;
