import { Stack } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { PALETTE, Typography } from "ui";
import { IAllowedTime, getISODateString } from "./LimitsTab";
import _ from "lodash";
import dayjs from "dayjs";

const DISPLAY_INTERVAL = 2; // hours
// const MIN = 0;
// const MAX = 24;
const DRAG_INTERVAL = 0.25; // hours

const BrowsingTimeSelectorRange = (props: {
  lineWidth: number;
  lineLeftX: number;
  mouseX: number;
  start: number;
  end: number;
  dragInterval: number;
  setTimes: (start: number, end: number) => void;
}) => {
  const [draggingDot1, setDraggingDot1] = useState<boolean>(false);
  const [draggingDot2, setDraggingDot2] = useState<boolean>(false);

  const [dot1X, setDot1X] = useState<number>(0);
  const [dot2X, setDot2X] = useState<number>(0);
  useEffect(() => {
    if (_.isNumber(props.start) && _.isNumber(props.end)) {
      setDot1X((props.lineWidth * props.start) / 24);
      setDot2X((props.lineWidth * props.end) / 24);
    }
  }, [props.start, props.end, props.lineWidth]);

  useEffect(() => {
    if (draggingDot1) {
      const newDotX = Math.max(
        0,
        Math.min(props.lineWidth, props.mouseX - props.lineLeftX)
      );
      const lockedEndLineX =
        Math.round(newDotX / props.dragInterval) * props.dragInterval; // the closest interval
      setDot1X(lockedEndLineX);
    }
  }, [draggingDot1, props.mouseX]);

  useEffect(() => {
    if (draggingDot2) {
      const newDotX = Math.max(
        0,
        Math.min(props.lineWidth, props.mouseX - props.lineLeftX)
      );
      const lockedEndLineX =
        Math.round(newDotX / props.dragInterval) * props.dragInterval; // the closest interval
      setDot2X(lockedEndLineX);
    }
  }, [draggingDot2, props.mouseX]);

  const handleDraggingEnd = useCallback(() => {
    if (draggingDot1 || draggingDot2) {
      setDraggingDot1(false);
      setDraggingDot2(false);
      props.setTimes(
        Math.max(0, (Math.min(dot1X, dot2X) / props.lineWidth) * 24),
        Math.min(24, (Math.max(dot1X, dot2X) / props.lineWidth) * 24)
      );
    }
  }, [dot1X, dot2X, props.lineWidth, draggingDot1, draggingDot2]);

  useEffect(() => {
    window.addEventListener("mouseup", handleDraggingEnd);
    return () => {
      window.removeEventListener("mouseup", handleDraggingEnd);
    };
  }, [handleDraggingEnd]);
  return (
    <>
      <Stack position="absolute" left={dot1X} zIndex={3}>
        <Stack flex={1} position="relative">
          <Stack
            position="absolute"
            top={0}
            left={0}
            sx={{
              transform: "translate(-50%, -35%)",
              cursor: draggingDot1 ? "grabbing" : "grab",
            }}
            height="14px"
            width="14px"
            bgcolor={PALETTE.secondary.purple[2]}
            borderRadius="100%"
            onMouseDown={(e) => {
              setDraggingDot1(true);
              e.preventDefault();
            }}
          />
        </Stack>
      </Stack>
      <Stack position="absolute" left={dot2X} zIndex={3}>
        <Stack flex={1} position="relative">
          <Stack
            position="absolute"
            top={0}
            left={0}
            sx={{
              transform: "translate(-50%, -35%)",
              cursor: draggingDot2 ? "grabbing" : "grab",
            }}
            height="14px"
            width="14px"
            bgcolor={PALETTE.secondary.blue[2]}
            borderRadius="100%"
            onMouseDown={(e) => {
              setDraggingDot2(true);
              e.preventDefault();
            }}
          />
        </Stack>
      </Stack>
      <Stack
        position="absolute"
        left={Math.min(dot1X, dot2X)}
        width={Math.abs(dot2X - dot1X)}
        height="4px"
        zIndex={2}
        sx={{
          pointerEvents: "none",
          background: `linear-gradient(90deg, ${PALETTE.secondary.purple[1]}, ${PALETTE.secondary.blue[1]})`,
        }}
      />
    </>
  );
};

const BrowsingTimeSelector = (props: {
  times?: IAllowedTime[];
  setTimes: (id: IAllowedTime["id"], start: string, end: string) => void;
}) => {
  const [lineRef, setLineRef] = useState<HTMLElement | null>(null);
  const [lineWidth, setLineWidth] = useState<number>(0);
  const [lineLeftX, setLineLeftX] = useState<number>(0);
  useEffect(() => {
    setLineWidth(lineRef?.getBoundingClientRect?.().width ?? 0);
    setLineLeftX(lineRef?.getBoundingClientRect?.().left ?? 0);
  }, [
    lineRef?.getBoundingClientRect?.().width,
    lineRef?.getBoundingClientRect?.().left,
  ]);

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

  const [dragInterval, setDragInterval] = useState<number>(1); // px
  useEffect(
    () => setDragInterval((lineWidth * DRAG_INTERVAL) / 24),
    [lineWidth]
  );

  return (
    <Stack width="100%" height="22px">
      <Stack
        width="100%"
        height="4px"
        bgcolor={PALETTE.secondary.grey[2]}
        borderRadius="2px"
        ref={setLineRef}
        position="relative"
      >
        {props.times?.map((timeLimit, i) => {
          const decimalStartTime =
            dayjs(timeLimit.startTime).utc().hour() +
            dayjs(timeLimit.startTime).utc().minute() / 60;
          const decimalEndTime =
            dayjs(timeLimit.endTime).utc().hour() +
            dayjs(timeLimit.endTime).utc().minute() / 60;
          const endTimeIsMidnight =
            dayjs(timeLimit.endTime).utc().day() >
            dayjs(timeLimit.startTime).utc().day();
          return (
            <BrowsingTimeSelectorRange
              key={i}
              lineWidth={lineWidth}
              lineLeftX={lineLeftX}
              dragInterval={dragInterval}
              mouseX={mouseX}
              start={decimalStartTime}
              end={endTimeIsMidnight ? 24 : decimalEndTime}
              setTimes={(start, end) => {
                return props.setTimes(
                  timeLimit.id,
                  getISODateString(
                    timeLimit.day,
                    Math.floor(start),
                    Math.floor((start % 1) * 60)
                  ),
                  getISODateString(
                    timeLimit.day,
                    Math.floor(end),
                    Math.floor((end % 1) * 60)
                  )
                );
              }}
            />
          );
        })}
        <Stack flex={1} justifyContent="space-between" direction="row">
          {[...Array(1 + 24 / DISPLAY_INTERVAL).keys()].map((i) => (
            <Stack
              key={i}
              height="4px"
              width="2px"
              bgcolor={
                i > 0 && i < 24 / DISPLAY_INTERVAL
                  ? PALETTE.secondary.grey[3]
                  : undefined
              }
              position="relative"
            >
              <Stack
                position="absolute"
                bottom="-20px"
                sx={{ transform: "translateX(-50%)" }}
              >
                <Typography variant="tiny" bold>{`${
                  (i * DISPLAY_INTERVAL) % 12 || 12
                }:00${i * DISPLAY_INTERVAL >= 12 ? "pm" : "am"}`}</Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BrowsingTimeSelector;
