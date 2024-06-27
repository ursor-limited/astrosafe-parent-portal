import { Stack, keyframes } from "@mui/system";
import { PALETTE, Typography } from "ui";
import DurationLabel from "../video/[videoId]/duration-label";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { IVideoComment } from "../api";
import VideoCommentMarker from "@/images/VideoCommentMarker.svg";
import PlayIcon from "@/images/icons/PlayIcon.svg";
import UnmuteIcon from "@/images/icons/UnmuteIcon.svg";
import MuteIcon from "@/images/icons/MuteIcon.svg";
import PauseIcon from "@/images/icons/PauseIcon.svg";
import { TimelineCardCommentsButton } from "../lesson/[subdirectory]/cards/TimelineVideoCard";
import { getFormattedTime } from "./VideoDialogCommentsTab";

export const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

const DOT_SIZE = 14;
const MIN_RANGE = 5;

const TimeRange = (props: {
  originalUrl?: string;
  setRange?: (range: [number, number] | undefined) => void;
  range?: [number, number];
  currentTime: number;
  duration: number;
  comments: IVideoComment[];
  selectedComment?: string;
  setSelectedComment: (id?: string) => void;
  setCurrentTime: (time: number) => void;
  playing: boolean;
  playingCallback: () => void;
  muted: boolean;
  muteCallback: () => void;
  greyLines?: boolean;
  hideExternalComments?: boolean;
  commentsButton?: boolean;
  shortCommentsList?: boolean;
  noSpacing?: boolean;
  hideLimits?: boolean;
}) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  useEffect(() => {
    setCurrentTime(props.currentTime); // using props.currentTime !== 0 to prevent the Player's setting the time just after setting it after dragging the start line, as the value tends to be stale
  }, [props.currentTime]);

  // const [externalTimeSettingPaused, setExternalTimeSettingPaused] =
  //   useState<boolean>(false); // need to prevent the Player's setting the time just after setting it after dragging, as the value tends to be stale
  // useEffect(() => {
  //   externalTimeSettingPaused &&
  //     setTimeout(() => setExternalTimeSettingPaused(false), 500);
  // }, [externalTimeSettingPaused]);

  const [mouseX, setMouseX] = useState<number>(0);

  const handleMouseMove = useCallback((event: any) => {
    setMouseX(event.pageX);
  }, []);
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const [lineRef, setLineRef] = useState<HTMLElement | null>(null);
  const [lineWidth, setLineWidth] = useState<number>(0);
  useEffect(
    () => setLineWidth(lineRef?.getBoundingClientRect?.().width ?? 0),
    [lineRef?.getBoundingClientRect?.().width]
  );

  const [draggingDot, setDraggingDot] = useState<boolean>(false);
  const [draggingStartLine, setDraggingStartLine] = useState<boolean>(false);
  const [draggingEndLine, setDraggingEndLine] = useState<boolean>(false);

  const [startLineX, setStartLineX] = useState<number>(0);
  const [endLineX, setEndLineX] = useState<number>(0);

  useEffect(() => {
    if (draggingEndLine) {
      const lineLeftX = lineRef?.getBoundingClientRect?.().left ?? 0;
      const newEndLineX = Math.min(
        lineWidth,
        Math.max(
          startLineX + MIN_RANGE * (lineWidth / props.duration),
          mouseX - lineLeftX
        )
      );
      setEndLineX(newEndLineX);
      //setCurrentTime((props.duration * newEndLineX) / lineWidth);
    }
  }, [draggingEndLine, mouseX, startLineX]);

  useEffect(() => {
    if (draggingStartLine) {
      const lineLeftX = lineRef?.getBoundingClientRect?.().left ?? 0;
      const newStartLineX = Math.min(
        endLineX - MIN_RANGE * (lineWidth / props.duration),
        Math.max(0, mouseX - lineLeftX)
      );
      setStartLineX(newStartLineX);
      //setCurrentTime((props.duration * newStartLineX) / lineWidth);
    }
  }, [draggingStartLine, mouseX, endLineX]);

  const [currentTimeDotXRatio, setCurrentTimeDotXRatio] = useState<number>(0);
  useEffect(() => {
    if (draggingDot) {
      const lineLeftX = lineRef?.getBoundingClientRect?.().left ?? 0;
      setCurrentTimeDotXRatio(
        props.range
          ? Math.min(
              1,
              Math.max(
                0,
                (mouseX - lineLeftX - startLineX - DOT_SIZE / 2) /
                  (endLineX - startLineX - DOT_SIZE)
              )
            )
          : 0
      );
    } else {
      setCurrentTimeDotXRatio(
        props.range
          ? Math.min(
              1,
              Math.max(
                0,
                (currentTime - props.range[0]) /
                  (props.range[1] - props.range[0])
              )
            )
          : 0
      );
    }
  }, [
    lineWidth,
    mouseX,
    currentTime,
    props.duration,
    draggingDot,
    lineRef,
    endLineX,
    startLineX,
    props.range,
  ]);

  useEffect(() => {
    setStartLineX(lineWidth * ((props.range?.[0] ?? 0) / props.duration));
    setEndLineX(lineWidth * ((props.range?.[1] ?? 0) / props.duration));
  }, [lineWidth, props.range, props.duration]);

  const handleDraggingEnd = useCallback(() => {
    if (draggingDot && props.range) {
      props.setCurrentTime(
        props.range[0] +
          currentTimeDotXRatio * (props.range[1] - props.range[0])
      );
      setCurrentTime(
        props.range[0] +
          currentTimeDotXRatio * (props.range[1] - props.range[0])
      );
      setDraggingDot(false);
    } else if (draggingStartLine && props.setRange) {
      const newTime = Math.round((props.duration * startLineX) / lineWidth);
      props.range && props.setRange([newTime, props.range[1]]);
      props.setCurrentTime(newTime);
      setCurrentTime(newTime);
      setDraggingStartLine(false);
    } else if (draggingEndLine && props.setRange) {
      const newTime = Math.round((props.duration * endLineX) / lineWidth);
      props.range && props.setRange([props.range[0], newTime]);
      props.setCurrentTime(newTime);
      setCurrentTime(newTime);
      setDraggingEndLine(false);
    }
  }, [
    draggingDot,
    draggingEndLine,
    draggingStartLine,
    startLineX,
    endLineX,
    props.duration,
    currentTimeDotXRatio,
    lineWidth,
    props.setCurrentTime,
    props.range,
    props.setRange,
  ]);

  useEffect(() => {
    window.addEventListener("mouseup", handleDraggingEnd);
    return () => {
      window.removeEventListener("mouseup", handleDraggingEnd);
    };
  }, [handleDraggingEnd]);

  const [filteredSortedComments, setFilteredSortedComments] = useState<
    IVideoComment[]
  >([]);
  useEffect(() => {
    props.comments &&
      props.range &&
      setFilteredSortedComments(
        _.sortBy(
          props.comments.filter(
            (c) =>
              !props.hideExternalComments ||
              (c.time >= props.range![0] - 1 && c.time <= props.range![1] + 1)
          ),
          (c) => c.time
        )
      );
  }, [props.comments, props.range]);

  const [muted, setMuted] = useState<boolean>(false);
  useEffect(() => setMuted(props.muted), [props.muted]);

  return (
    <Stack
      direction="row"
      width="100%"
      spacing={props.noSpacing ? undefined : "12px"}
    >
      <Stack
        bgcolor={PALETTE.secondary.grey[1]}
        height="40px"
        width="40px"
        borderRadius="100%"
        justifyContent="center"
        alignItems="center"
        onClick={props.playingCallback}
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.7 },
          transition: "0.2s",
        }}
      >
        {props.playing ? (
          <PauseIcon width="20px" height="20px" />
        ) : (
          <PlayIcon width="20px" height="20px" />
        )}
      </Stack>
      <Stack
        bgcolor={PALETTE.secondary.grey[1]}
        borderRadius="8px"
        height="40px"
        justifyContent="center"
        px="10px"
        flex={1}
      >
        <Stack
          direction="row"
          spacing={"20px"}
          justifyContent="center"
          width="100%"
        >
          <Stack justifyContent="center" alignItems="center" width="60px">
            <Typography variant="small" bold color={PALETTE.secondary.grey[5]}>
              {getFormattedTime(
                draggingDot && !!props.range
                  ? props.range[0] +
                      currentTimeDotXRatio * (props.range[1] - props.range[0])
                  : draggingStartLine
                  ? props.duration * (startLineX / lineWidth)
                  : draggingEndLine
                  ? props.duration * (endLineX / lineWidth)
                  : currentTime
              )}
            </Typography>
          </Stack>
          <Stack
            position="relative"
            width="100%"
            height="42px"
            ref={setLineRef}
          >
            <Stack
              position="absolute"
              height="4px"
              width="100%"
              top={0}
              bottom={0}
              marginTop="auto"
              marginBottom="auto"
              sx={{
                transition: "0.2s",
                background:
                  draggingEndLine || draggingStartLine
                    ? "#c2d5ff"
                    : "linear-gradient(90deg,#F279C5,#FD9B41)",
              }}
            />
            <Stack
              position="absolute"
              sx={{
                opacity: 0,
                transition: "0.2s",
                background:
                  draggingEndLine || draggingStartLine ? "#c2d5ff" : "#c9c9c9",
                animation: `${fadeIn} 2s ease-in-out`,
                animationFillMode: "forwards",
                animationDelay: "1s",
              }}
              height="4px"
              width={(1 - currentTimeDotXRatio) * (endLineX - startLineX)}
              left={currentTimeDotXRatio * (endLineX - startLineX) + startLineX}
              top={0}
              bottom={0}
              marginTop="auto"
              marginBottom="auto"
            />
            <Stack
              position="absolute"
              bgcolor={PALETTE.secondary.grey[2]}
              height="4px"
              width={`${startLineX}px`}
              left={0}
              top={0}
              bottom={0}
              marginTop="auto"
              marginBottom="auto"
            />
            <Stack
              position="absolute"
              bgcolor={PALETTE.secondary.grey[2]}
              height="4px"
              width={`${Math.max(0, lineWidth - endLineX)}px`}
              left={endLineX}
              top={0}
              bottom={0}
              marginTop="auto"
              marginBottom="auto"
            />
            <Stack
              position="absolute"
              left={0}
              top={0}
              bottom={0}
              marginTop="auto"
              marginBottom="auto"
              height="100%"
              width={endLineX - startLineX}
              alignItems="center"
            >
              <Stack
                flex={1}
                position="relative"
                width={`calc(100% - ${DOT_SIZE}px)`}
                sx={{
                  transition: "0.2s",
                }}
              >
                <Stack
                  position="absolute"
                  sx={{
                    transform: "translateX(-50%)",
                    cursor: draggingDot ? "grabbing" : "grab",
                    transition: "0.2s",
                  }}
                  left={
                    draggingEndLine
                      ? endLineX - DOT_SIZE
                      : draggingStartLine
                      ? startLineX
                      : `${
                          startLineX +
                          (endLineX - startLineX - DOT_SIZE) *
                            currentTimeDotXRatio
                        }px`
                  }
                  top={0}
                  bottom={0}
                  marginTop="auto"
                  marginBottom="auto"
                  width={`${DOT_SIZE}px`}
                  height={`${DOT_SIZE}px`}
                  bgcolor={PALETTE.secondary.grey[4]}
                  borderRadius="100%"
                  onMouseDown={(e) => {
                    setDraggingDot(true);
                    props.setSelectedComment(undefined);
                    e.preventDefault();
                  }}
                />
              </Stack>
            </Stack>
            <Stack
              position="absolute"
              left={0}
              top={0}
              height="33%"
              alignItems="center"
              width="100%"
            >
              <Stack
                flex={1}
                position="relative"
                width={`calc(100% - ${DOT_SIZE}px)`}
              >
                {filteredSortedComments.map((c) => (
                  <Stack
                    key={c.id}
                    position="absolute"
                    top="2px"
                    onClick={() => {
                      props.setSelectedComment(c.id);
                      document.getElementById(c.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    sx={{
                      cursor: "pointer",
                      transform: "translateX(-50%)",
                      opacity:
                        props.selectedComment && props.selectedComment !== c.id
                          ? 0.5
                          : 1,
                    }}
                    left={((lineWidth - DOT_SIZE) * c.time) / props.duration}
                  >
                    <Stack
                      sx={{
                        "&:hover": {
                          //opacity: 0.7,
                          transform: "scale(1.3) translateY(-3px)",
                          transition: "0.2s",
                          transformOrigin: "center",
                        },
                      }}
                    >
                      <VideoCommentMarker height="12px" width="12px" />
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Stack>
            {!props.hideLimits ? (
              <Stack width={0}>
                <Stack
                  position="absolute"
                  height="20px"
                  width="4px"
                  bgcolor={
                    props.greyLines
                      ? PALETTE.secondary.grey[3]
                      : PALETTE.secondary.blue[2]
                  }
                  borderRadius="2px"
                  top={0}
                  bottom={0}
                  marginTop="auto"
                  marginBottom="auto"
                  sx={{
                    pointerEvents: props.setRange ? undefined : "none",
                    transform: "translateX(-50%)",
                    cursor: props.setRange
                      ? draggingStartLine
                        ? "grabbing"
                        : "grab"
                      : undefined,
                  }}
                  left={startLineX}
                  onMouseDown={(e) => {
                    setDraggingStartLine(true);
                    e.preventDefault();
                  }}
                />
                <Stack
                  position="absolute"
                  height="20px"
                  width="4px"
                  bgcolor={
                    props.greyLines
                      ? PALETTE.secondary.grey[3]
                      : PALETTE.secondary.blue[2]
                  }
                  borderRadius="2px"
                  top={0}
                  bottom={0}
                  marginTop="auto"
                  marginBottom="auto"
                  sx={{
                    pointerEvents: props.setRange ? undefined : "none",
                    transform: "translateX(-50%)",
                    cursor: props.setRange
                      ? draggingEndLine
                        ? "grabbing"
                        : "grab"
                      : undefined,
                  }}
                  left={endLineX}
                  onMouseDown={(e) => {
                    setDraggingEndLine(true);
                    e.preventDefault();
                  }}
                />
              </Stack>
            ) : null}
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row">
        <Stack
          bgcolor={PALETTE.secondary.grey[1]}
          height="40px"
          width="40px"
          borderRadius="100%"
          justifyContent="center"
          alignItems="center"
          onClick={() => {
            props.muteCallback?.();
            setMuted(!muted);
          }}
          sx={{
            cursor: "pointer",
            "&:hover": { opacity: 0.7 },
            transition: "0.2s",
            // opacity: props.playing ? 1 : 0.4,
            // pointerEvents: props.playing ? undefined : "none",
          }}
        >
          {muted ? (
            <MuteIcon width="20px" height="20px" />
          ) : (
            <UnmuteIcon width="20px" height="20px" />
          )}
        </Stack>
        {props.commentsButton &&
        filteredSortedComments &&
        filteredSortedComments.length > 0 ? (
          <TimelineCardCommentsButton
            comments={filteredSortedComments}
            selectedCommentId={props.selectedComment}
            callback={props.setSelectedComment}
            shortList={props.shortCommentsList}
          />
        ) : undefined}
      </Stack>
    </Stack>
  );
};

export default TimeRange;
