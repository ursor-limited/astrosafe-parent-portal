import { Stack } from "@mui/system";
import { isMobile } from "react-device-detect";
import { PALETTE, Typography, UrsorButton, UrsorTextField } from "ui";
import { IVideo } from "./AstroContentColumns";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import LocationIcon from "@/images/icons/LocationIcon.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import { VIDEO_HEIGHT, VIDEO_WIDTH } from "./VideoCreationDialog";
import Player from "../components/player";
import { useCallback, useEffect, useState } from "react";
import TimeRange from "./TimeRange";
import { IVideoComment } from "../api";
import _, { uniqueId } from "lodash";
import UrsorFadeIn from "../components/UrsorFadeIn";

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

const VideoCommentCard = (props: {
  value: string;
  time: number;
  deletionCallback: () => void;
  selected: boolean;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      p="12px"
      pb="6px"
      height="107px"
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
    >
      <Typography variant="small" maxLines={2}>
        {props.value}
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <VideoDialogTimestamp value={props.time} />
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
                fill: PALETTE.system.red,
              },
            },
          }}
          onClick={props.deletionCallback}
        >
          <TrashcanIcon height="16px" width="16px" />
        </Stack>
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
  // setPlaying?: (playing: boolean) => void;
}) => {
  const [playing, setPlaying] = useState<boolean>(false);

  const [playerWidthRef, setPlayerWidthRef] = useState<HTMLElement | null>(
    null
  );

  const [playerWidth, setPlayerWidth] = useState<number>(VIDEO_WIDTH);
  useEffect(
    () =>
      setPlayerWidth(
        playerWidthRef?.getBoundingClientRect().width ?? VIDEO_WIDTH
      ),
    [playerWidthRef?.getBoundingClientRect().width]
  );

  const [currentTime, setCurrentTime] = useState<number>(0);

  const [currentTimeSetter, setCurrentTimeSetter] = useState<
    undefined | ((time: number) => void)
  >();

  const [playingSetter, setPlayingSetter] = useState<
    undefined | ((playing: boolean) => void)
  >();

  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<IVideoComment[]>([]);

  const addComment = () => {
    setComments([
      ...comments,
      { id: uniqueId(), value: comment, time: currentTime },
    ]);
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

  return (
    <Stack
      flex={1}
      direction={isMobile ? "column" : "row"}
      spacing="24px"
      width="100%"
      overflow="hidden"
      boxSizing="border-box"
    >
      <Stack
        width={isMobile ? 0 : VIDEO_WIDTH}
        height={isMobile ? 0 : undefined}
        overflow={isMobile ? "hidden" : undefined}
        spacing="6px"
        position="relative"
        justifyContent="space-between"
      >
        {props.provider ? (
          <Player
            playerId="creation"
            url={props.url}
            provider={props.provider}
            width={Math.min(playerWidth, VIDEO_WIDTH)}
            height={
              Math.min(playerWidth, VIDEO_WIDTH) * (VIDEO_HEIGHT / VIDEO_WIDTH)
            }
            setDuration={(d) => {
              d && props.setDuration(d);
            }}
            startTime={props.range?.[0] ?? 0}
            endTime={props.range?.[1] ?? 10}
            noKitemark
            playingCallback={setPlaying}
            smallPlayIcon
            noBackdrop
            setCurrentTime={setCurrentTime}
            setCurrentTimeSetter={(f) => setCurrentTimeSetter(() => f)}
            setPlayingSetter={(f) => setPlayingSetter(() => f)}
          />
        ) : null}
        {props.duration ? (
          <TimeRange
            range={props.range}
            duration={props.duration}
            setRange={props.setRange}
            originalUrl={props.originalUrl}
            currentTime={currentTime}
            setCurrentTime={(time) => currentTimeSetter?.(time)}
            comments={comments}
          />
        ) : null}
      </Stack>
      <Stack flex={1} spacing="24px">
        <Stack
          p="12px"
          boxSizing="border-box"
          bgcolor={PALETTE.secondary.grey[1]}
          borderRadius="12px"
          flex={1}
          spacing="8px"
          minHeight={`${VIDEO_HEIGHT}px`}
          maxHeight={`${VIDEO_HEIGHT}px`}
          overflow="hidden"
        >
          <Stack onClick={() => playingSetter?.(false)}>
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
              _.reverse(comments.slice()).map((c) => (
                <UrsorFadeIn key={c.id} duration={800}>
                  <Stack
                    sx={{
                      // "&:hover": { opacity: 0.7 },
                      transition: "0.2s",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedComment(c.id)}
                  >
                    <VideoCommentCard
                      {...c}
                      deletionCallback={() =>
                        setComments(
                          comments.filter((comment) => comment.id !== c.id)
                        )
                      }
                      selected={selectedComment === c.id}
                    />
                  </Stack>
                </UrsorFadeIn>
              ))
            }
          </Stack>
        </Stack>
        <UrsorButton
          onClick={props.mainButtonCallback}
          disabled={!props.url}
          dark
          variant="tertiary"
          endIcon={props.video ? PencilIcon : ChevronRightIcon}
          width="100%"
        >
          Publish
        </UrsorButton>
      </Stack>
    </Stack>
  );
};

export default VideoDialogCommentsTab;
