import { Stack } from "@mui/system";
import { PALETTE } from "ui";
import DurationLabel from "../video/[videoId]/duration-label";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { IVideoComment } from "../api";
import VideoCommentMarker from "@/images/VideoCommentMarker.svg";
import PlayIcon from "@/images/icons/PlayIcon.svg";
import UnmuteIcon from "@/images/icons/UnmuteIcon.svg";
import MuteIcon from "@/images/icons/MuteIcon.svg";
import PauseIcon from "@/images/icons/PauseIcon.svg";

const DOT_SIZE = 14;

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
}) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  useEffect(() => setCurrentTime(props.currentTime), [props.currentTime]);

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

  // useEffect(() => {
  //   props.setDragging?.(draggingDot || draggingEndLine || draggingStartLine);
  // }, [draggingDot, draggingEndLine, draggingStartLine]);

  const [startLineX, setStartLineX] = useState<number>(0);
  const [endLineX, setEndLineX] = useState<number>(0);

  useEffect(() => {
    if (draggingEndLine) {
      const lineLeftX = lineRef?.getBoundingClientRect?.().left ?? 0;
      setEndLineX(
        Math.min(lineWidth, Math.max(startLineX, mouseX - lineLeftX))
      );
    }
  }, [draggingEndLine, mouseX, startLineX]);

  useEffect(() => {
    if (draggingStartLine) {
      const lineLeftX = lineRef?.getBoundingClientRect?.().left ?? 0;
      setStartLineX(Math.min(endLineX, Math.max(0, mouseX - lineLeftX)));
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
      props.range &&
        props.setRange([
          Math.round((props.duration * startLineX) / lineWidth),
          props.range[1],
        ]);
      setDraggingStartLine(false);
    } else if (draggingEndLine && props.setRange) {
      props.range &&
        props.setRange([
          props.range[0],
          Math.round((props.duration * endLineX) / lineWidth),
        ]);
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

  return (
    <Stack direction="row" spacing="12px" width="100%">
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
          {props.setRange ? (
            <DurationLabel
              value={props.range?.[0] ?? 0}
              incrementCallback={() =>
                props.setRange!(
                  props.duration &&
                    props.range &&
                    _.isNumber(props.range?.[0]) &&
                    _.isNumber(props.range?.[1])
                    ? [
                        Math.min(props.duration, props.range[0] + 1),
                        props.range[1],
                      ]
                    : undefined
                )
              }
              decrementCallback={() =>
                props.setRange!(
                  props.duration &&
                    props.range &&
                    _.isNumber(props.range?.[0]) &&
                    _.isNumber(props.range?.[1])
                    ? [Math.max(0, props.range[0] - 1), props.range[1]]
                    : undefined
                )
              }
            />
          ) : null}
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
                transition: "0.2s",
                background:
                  draggingEndLine || draggingStartLine ? "#c2d5ff" : "#c9c9c9",
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
                  opacity: draggingEndLine || draggingStartLine ? 0 : 1,
                }}
              >
                <Stack
                  position="absolute"
                  sx={{
                    transform: "translateX(-50%)",
                    cursor: draggingDot ? "grabbing" : "grab",
                    transition: "0.2s",
                  }}
                  left={`calc(${startLineX}px + ${
                    100 * currentTimeDotXRatio
                  }%)`}
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
                {props.range
                  ? props.comments
                      ?.filter(
                        (c) =>
                          !props.hideExternalComments ||
                          (c.time >= props.range![0] &&
                            c.time <= props.range![1])
                      )
                      ?.map((c) => (
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
                              props.selectedComment &&
                              props.selectedComment !== c.id
                                ? 0.5
                                : 1,
                          }}
                          left={
                            ((lineWidth - DOT_SIZE) * c.time) / props.duration
                          }
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
                      ))
                  : null}
              </Stack>
            </Stack>
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
          </Stack>
          {props.setRange ? (
            <DurationLabel
              value={props.range?.[1] ?? 0}
              incrementCallback={() =>
                props.setRange!(
                  props.duration &&
                    props.range &&
                    _.isNumber(props.range?.[0]) &&
                    _.isNumber(props.range?.[1])
                    ? [
                        props.range[0],
                        Math.min(props.duration, props.range[1] + 1),
                      ]
                    : undefined
                )
              }
              decrementCallback={() =>
                props.setRange!(
                  props.duration &&
                    props.range &&
                    _.isNumber(props.range?.[0]) &&
                    _.isNumber(props.range?.[1])
                    ? [props.range[0], Math.max(0, props.range[1] - 1)]
                    : undefined
                )
              }
            />
          ) : null}
        </Stack>
      </Stack>
      <Stack
        bgcolor={PALETTE.secondary.grey[1]}
        height="40px"
        width="40px"
        borderRadius="100%"
        justifyContent="center"
        alignItems="center"
        onClick={props.muteCallback}
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.7 },
          transition: "0.2s",
          opacity: props.playing ? 1 : 0.4,
          pointerEvents: props.playing ? undefined : "none",
        }}
      >
        {props.muted || !props.playing ? (
          <UnmuteIcon width="20px" height="20px" />
        ) : (
          <MuteIcon width="20px" height="20px" />
        )}
      </Stack>
    </Stack>
  );
};

export default TimeRange;
