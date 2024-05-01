import { Stack } from "@mui/system";
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

  const [currentTimeDotX, setCurrentTimeDotX] = useState<number>(0);
  useEffect(() => {
    if (draggingDot) {
      const lineLeftX = lineRef?.getBoundingClientRect?.().left ?? 0;
      setCurrentTimeDotX(
        Math.min(
          lineWidth - DOT_SIZE,
          Math.max(0, mouseX - lineLeftX - DOT_SIZE / 2)
        )
      );
    } else {
      setCurrentTimeDotX(
        ((lineWidth - DOT_SIZE) * props.currentTime) / props.duration
      );
    }
  }, [
    lineWidth,
    currentTimeDotX,
    mouseX,
    props.currentTime,
    props.duration,
    draggingDot,
    lineRef,
  ]);

  const [startLineX, setStartLineX] = useState<number>(0);
  const [endLineX, setEndLineX] = useState<number>(0);
  useEffect(() => {
    const lineLeftX = lineRef?.getBoundingClientRect?.().left ?? 0;
    if (draggingStartLine) {
      setStartLineX(Math.min(endLineX, Math.max(0, mouseX - lineLeftX)));
    } else {
      setStartLineX(lineWidth * ((props.range?.[0] ?? 0) / props.duration));
    }
    if (draggingEndLine) {
      setEndLineX(
        Math.min(lineWidth, Math.max(startLineX, mouseX - lineLeftX))
      );
    } else {
      setEndLineX(lineWidth * ((props.range?.[1] ?? 0) / props.duration));
    }
  }, [
    mouseX,
    lineWidth,
    props.range,
    props.duration,
    draggingStartLine,
    draggingEndLine,
  ]);

  const handleDraggingEnd = useCallback(() => {
    console.log("fgooog");
    if (draggingDot) {
      props.setCurrentTime(
        (props.duration * currentTimeDotX) / (lineWidth - DOT_SIZE)
      );
    }
    setDraggingDot(false);
    setDraggingStartLine(false);
    setDraggingEndLine(false);
  }, [
    draggingDot,
    props.duration,
    currentTimeDotX,
    lineWidth,
    props.setCurrentTime,
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
            bgcolor="rgba(255,255,255,0.7)"
            height="4px"
            width={startLineX}
            left={0}
            top={0}
            bottom={0}
            marginTop="auto"
            marginBottom="auto"
          />
          <Stack
            position="absolute"
            bgcolor="rgba(255,255,255,0.7)"
            height="4px"
            width={lineWidth - endLineX}
            left={endLineX}
            top={0}
            bottom={0}
            marginTop="auto"
            marginBottom="auto"
          />
          <Stack
            position="absolute"
            bgcolor={PALETTE.secondary.grey[3]}
            height="4px"
            width={endLineX - currentTimeDotX}
            left={currentTimeDotX}
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
          >
            <Stack
              width="100%"
              height="100%"
              position="relative"
              mx={`${DOT_SIZE / 2}px`}
            >
              <Stack
                position="absolute"
                sx={{
                  transform: "translateX(-50%)",
                  cursor: draggingDot ? "grabbing" : "grab",
                }}
                left={currentTimeDotX}
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
              left={endLineX}
              onMouseDown={(e) => {
                setDraggingEndLine(true);
                e.preventDefault();
              }}
            />
          </Stack>
          {/* <Slider
          min={0}
          max={props.duration}
          valueLabelDisplay="off"
          getAriaLabel={() => "Temperature range"}
          value={props.range}
          onChange={(event: Event, newValue: number | number[]) => {
            props.setRange(newValue as [number, number]);
          }}
        /> */}
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
