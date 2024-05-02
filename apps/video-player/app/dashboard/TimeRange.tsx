import { Stack, alpha } from "@mui/system";
import { PALETTE } from "ui";
import DurationLabel from "../video/[videoId]/duration-label";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";

const DOT_SIZE = 14;

const TimeRange = (props: {
  originalUrl?: string;
  setRange: (range: [number, number] | undefined) => void;
  range?: [number, number];
  currentTime: number;
  duration: number;
  setCurrentTime: (time: number) => void;
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

        // ((lineWidth - DOT_SIZE) * currentTime) / props.duration

        //(lineWidth * currentTime) / props.duration
      );
    }
  }, [
    lineWidth,
    currentTimeDotXRatio,
    mouseX,
    currentTime,
    props.duration,
    draggingDot,
    lineRef,
  ]);

  const [startLineX, setStartLineX] = useState<number>(0);
  const [endLineX, setEndLineX] = useState<number>(0);

  const [startLineDraggingX, setStartLineDraggingX] = useState<number>(0);
  const [endLineDraggingX, setEndLineDraggingX] = useState<number>(0);

  useEffect(() => {
    if (draggingEndLine) {
      const lineLeftX = lineRef?.getBoundingClientRect?.().left ?? 0;
      setEndLineDraggingX(
        Math.min(lineWidth, Math.max(startLineX, mouseX - lineLeftX))
      );
    }
  }, [draggingEndLine, mouseX]);

  useEffect(() => {
    if (draggingStartLine) {
      const lineLeftX = lineRef?.getBoundingClientRect?.().left ?? 0;
      setStartLineDraggingX(
        Math.min(endLineX, Math.max(0, mouseX - lineLeftX))
      );
    }
  }, [draggingStartLine, mouseX]);

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
    } else if (draggingStartLine) {
      props.range &&
        props.setRange([
          Math.round((props.duration * startLineDraggingX) / lineWidth),
          props.range[1],
        ]);
      setStartLineX(startLineDraggingX);
      setDraggingStartLine(false);
    } else if (draggingEndLine) {
      props.range &&
        props.setRange([
          props.range[0],
          Math.round((props.duration * endLineDraggingX) / lineWidth),
        ]);
      setEndLineX(endLineDraggingX);
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
  ]);
  useEffect(() => {
    window.addEventListener("mouseup", handleDraggingEnd);
    return () => {
      window.removeEventListener("mouseup", handleDraggingEnd);
    };
  }, [handleDraggingEnd]);

  return (
    <Stack
      bgcolor={PALETTE.secondary.grey[1]}
      borderRadius="8px"
      height="40px"
      justifyContent="center"
      px="10px"
    >
      <Stack
        direction="row"
        spacing={"20px"}
        justifyContent="center"
        width="100%"
      >
        <DurationLabel
          value={props.range?.[0] ?? 0}
          incrementCallback={() =>
            props.setRange(
              props.duration &&
                props.range &&
                _.isNumber(props.range?.[0]) &&
                _.isNumber(props.range?.[1])
                ? [Math.min(props.duration, props.range[0] + 1), props.range[1]]
                : undefined
            )
          }
          decrementCallback={() =>
            props.setRange(
              props.duration &&
                props.range &&
                _.isNumber(props.range?.[0]) &&
                _.isNumber(props.range?.[1])
                ? [Math.max(0, props.range[0] - 1), props.range[1]]
                : undefined
            )
          }
        />
        <Stack position="relative" width="100%" height="42px" ref={setLineRef}>
          <Stack
            position="absolute"
            height="4px"
            width="100%"
            top={0}
            bottom={0}
            marginTop="auto"
            marginBottom="auto"
            sx={{
              background: "linear-gradient(90deg,#F279C5,#FD9B41)",
            }}
          />
          <Stack
            position="absolute"
            bgcolor={PALETTE.secondary.grey[2]}
            height="4px"
            width={draggingStartLine ? startLineDraggingX : startLineX}
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
            width={lineWidth - (draggingEndLine ? endLineDraggingX : endLineX)}
            left={draggingEndLine ? endLineDraggingX : endLineX}
            top={0}
            bottom={0}
            marginTop="auto"
            marginBottom="auto"
            // sx={{
            //   opacity: draggingEndLine ? 0.4 : 1
            // }}
          />
          <Stack
            position="absolute"
            bgcolor={PALETTE.secondary.grey[3]}
            height="4px"
            width={
              (1 - currentTimeDotXRatio) *
              ((draggingEndLine ? endLineDraggingX : endLineX) - startLineX)
            }
            left={currentTimeDotXRatio * (endLineX - startLineX) + startLineX}
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
            >
              <Stack
                position="absolute"
                sx={{
                  transform: "translateX(-50%)",
                  cursor: draggingDot ? "grabbing" : "grab",
                }}
                left={`calc(${startLineX}px + ${100 * currentTimeDotXRatio}%)`}
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
                  e.preventDefault();
                }}
              />
            </Stack>
          </Stack>
          <Stack width={0}>
            <Stack
              position="absolute"
              height="20px"
              width="4px"
              bgcolor={PALETTE.secondary.blue[2]}
              borderRadius="2px"
              top={0}
              bottom={0}
              marginTop="auto"
              marginBottom="auto"
              sx={{
                transform: "translateX(-50%)",
                cursor: draggingStartLine ? "grabbing" : "grab",
              }}
              left={draggingStartLine ? startLineDraggingX : startLineX}
              onMouseDown={(e) => {
                setDraggingStartLine(true);
                e.preventDefault();
              }}
            />
            <Stack
              position="absolute"
              height="20px"
              width="4px"
              bgcolor={PALETTE.secondary.blue[2]}
              borderRadius="2px"
              top={0}
              bottom={0}
              marginTop="auto"
              marginBottom="auto"
              sx={{
                transform: "translateX(-50%)",
                cursor: draggingEndLine ? "grabbing" : "grab",
              }}
              left={draggingEndLine ? endLineDraggingX : endLineX}
              onMouseDown={(e) => {
                setDraggingEndLine(true);
                e.preventDefault();
              }}
            />
          </Stack>
        </Stack>
        <DurationLabel
          value={props.range?.[1] ?? 0}
          incrementCallback={() =>
            props.setRange(
              props.duration &&
                props.range &&
                _.isNumber(props.range?.[0]) &&
                _.isNumber(props.range?.[1])
                ? [props.range[0], Math.min(props.duration, props.range[1] + 1)]
                : undefined
            )
          }
          decrementCallback={() =>
            props.setRange(
              props.duration &&
                props.range &&
                _.isNumber(props.range?.[0]) &&
                _.isNumber(props.range?.[1])
                ? [props.range[0], Math.max(0, props.range[1] - 1)]
                : undefined
            )
          }
        />
      </Stack>
    </Stack>
  );
};

export default TimeRange;
