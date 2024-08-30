import { Stack } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { PALETTE, Typography, UrsorButton } from './../../ui';
import { IAllowedTime, getISODateString } from './LimitsTab';
import _ from 'lodash';
import dayjs from 'dayjs';
import useNewSegmentTimes from './useNewSegmentTimes';
import TrashcanIcon from './../../images/icons/TrashcanIcon.svg';

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
  delete: () => void;
  noDeletion?: boolean;
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
    window.addEventListener('mouseup', handleDraggingEnd);
    return () => {
      window.removeEventListener('mouseup', handleDraggingEnd);
    };
  }, [handleDraggingEnd]);
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <>
      <Stack position="absolute" left={dot1X} zIndex={3}>
        <Stack flex={1} position="relative">
          <Stack
            position="absolute"
            top={0}
            left={0}
            sx={{
              transform: 'translate(-50%, -35%)',
              cursor: draggingDot1 ? 'grabbing' : 'grab',
            }}
            height="14px"
            width="14px"
            bgcolor={PALETTE.secondary.blue[2]}
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
              transform: 'translate(-50%, -35%)',
              cursor: draggingDot2 ? 'grabbing' : 'grab',
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
        height="20px"
        alignItems="center"
        zIndex={2}
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
      >
        <Stack
          height="4px"
          width="100%"
          bgcolor={PALETTE.secondary.blue[1]}
          position="relative"
        >
          {!props.noDeletion ? (
            <Stack
              position="absolute"
              left={props.mouseX - props.lineLeftX - dot1X}
              top="-26px"
              zIndex={3}
              sx={{
                transform: 'translate(-50%)',
                opacity: hovering && !draggingDot1 && !draggingDot2 ? 1 : 0,
                transition: '0.2s',
                svg: {
                  path: {
                    fill: PALETTE.system.red,
                  },
                },
                cursor: 'pointer',
                '&:hover': { opacity: 0.6 },
                pointerEvents: hovering ? undefined : 'none',
              }}
              pb="6px"
              onClick={props.delete}
            >
              <TrashcanIcon height="20px" width="20px" />
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </>
  );
};

const BrowsingTimeSelector = (props: {
  ranges?: IAllowedTime[];
  setRangeTimes: (id: IAllowedTime['id'], start: string, end: string) => void;
  deleteRange: (id: IAllowedTime['id']) => void;
  smallerLabelFont?: boolean;
  halveLabelFrequency?: boolean;
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
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
        {props.ranges?.map((allowedTimeRange, i) => {
          const decimalStartTime =
            dayjs(allowedTimeRange.startTime).utc().hour() +
            dayjs(allowedTimeRange.startTime).utc().minute() / 60;
          const decimalEndTime =
            dayjs(allowedTimeRange.endTime).utc().hour() +
            dayjs(allowedTimeRange.endTime).utc().minute() / 60;
          const endTimeIsMidnight =
            dayjs(allowedTimeRange.endTime).utc().day() >
            dayjs(allowedTimeRange.startTime).utc().day();
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
                return props.setRangeTimes(
                  allowedTimeRange.id,
                  getISODateString(
                    allowedTimeRange.day,
                    Math.floor(start),
                    Math.floor((start % 1) * 60)
                  ),
                  getISODateString(
                    allowedTimeRange.day,
                    Math.floor(end),
                    Math.floor((end % 1) * 60)
                  )
                );
              }}
              delete={() => props.deleteRange(allowedTimeRange.id)}
              noDeletion={props.ranges?.length === 1}
            />
          );
        })}
        <Stack flex={1} justifyContent="space-between" direction="row">
          {[...Array(1 + 24 / DISPLAY_INTERVAL).keys()]
            .filter((x) => !props.halveLabelFrequency || (x - 1) % 2)
            .map((i) => i * DISPLAY_INTERVAL)
            .map((hour) => {
              return (
                <Stack
                  key={`${hour}${props.halveLabelFrequency}`}
                  height="4px"
                  width="2px"
                  bgcolor={
                    PALETTE.secondary.grey[3]
                    // i > 0 && i < 24 / DISPLAY_INTERVAL
                    //   ? PALETTE.secondary.grey[3]
                    //   : undefined
                  }
                  position="relative"
                >
                  <Stack
                    position="absolute"
                    bottom="-20px"
                    sx={{ transform: 'translateX(-50%)' }}
                  >
                    <Typography
                      sx={{ fontSize: props.smallerLabelFont ? 8 : 10 }}
                      variant="tiny"
                      bold
                    >{`${hour % 12 || 12}:00${
                      hour === 24 || hour < 12 ? 'am' : 'pm'
                    }`}</Typography>
                  </Stack>
                </Stack>
              );
            })}
        </Stack>
      </Stack>
    </Stack>
  );
};

const AllowedTimeRow = (props: {
  dayName: string;
  times: IAllowedTime[];
  addAllowedTime: (startTime: number, endTime: number) => void;
  reset: () => void;
  deleteRange: (id: IAllowedTime['id']) => void;
  setAllowedTimes: (
    id: IAllowedTime['id'],
    startTime: IAllowedTime['startTime'],
    endTime: IAllowedTime['endTime']
  ) => void;
  smallerLabelFont?: boolean;
  halveLabelFrequency?: boolean;
}) => {
  const [sortedTimes, setSortedTimes] = useState<IAllowedTime[]>([]);
  useEffect(
    () => setSortedTimes(_.sortBy(props.times, (t) => new Date(t.startTime))),
    [props.times]
  );
  const { newSegmentTimes, clearNewSegmentTimes } =
    useNewSegmentTimes(sortedTimes);
  return (
    <Stack direction="row" alignItems="center">
      <Stack width="120px">
        <Typography bold color={PALETTE.secondary.grey[3]}>
          {_.capitalize(props.dayName)}
        </Typography>
      </Stack>
      <BrowsingTimeSelector
        ranges={sortedTimes}
        setRangeTimes={props.setAllowedTimes}
        deleteRange={props.deleteRange}
        smallerLabelFont={props.smallerLabelFont}
        halveLabelFrequency={props.halveLabelFrequency}
      />
      <Stack pl="60px" direction="row" spacing="8px">
        <UrsorButton
          size="small"
          variant="secondary"
          backgroundColor="rgb(255,255,255)"
          onClick={() => {
            newSegmentTimes &&
              props.addAllowedTime(newSegmentTimes[0], newSegmentTimes[1]);
            clearNewSegmentTimes();
          }}
          disabled={!newSegmentTimes}
        >
          Add
        </UrsorButton>
        <UrsorButton
          size="small"
          variant="secondary"
          backgroundColor={PALETTE.secondary.grey[1]}
          borderColor={PALETTE.secondary.grey[1]}
          onClick={props.reset}
        >
          Reset
        </UrsorButton>
      </Stack>
    </Stack>
  );
};

export default AllowedTimeRow;
