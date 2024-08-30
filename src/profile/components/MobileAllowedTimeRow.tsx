import React, { useEffect, useState } from 'react';
import UrsorDialog from './../../components/UrsorDialog';
import { PALETTE, Typography } from './../../ui';
import { getISODateString, IAllowedTime } from './LimitsTab';
import { alpha, Stack } from '@mui/system';
import dayjs from 'dayjs';
import PlusIcon from './../../images/icons/PlusIcon.svg';
import useNewSegmentTimes from './useNewSegmentTimes';
import _ from 'lodash';
import XIcon from './../../images/icons/X.svg';

const DAY_FULL_NAMES = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 's aturday',
  0: 's unday',
};

const TimeSelectionColumn = (props: {
  day: IAllowedTime['day'];
  time: IAllowedTime['startTime'];
  setTime: (newTime: IAllowedTime['startTime']) => void;
}) => {
  const [gridRef, setGridRef] = useState<HTMLElement | null>(null);
  const [hideTopGradient, setHideTopGradient] = useState<boolean>(true);
  const [hideBottomGradient, setHideBottomGradient] = useState<boolean>(false);
  const handleScroll = () => {
    if (gridRef) {
      const { scrollTop, scrollHeight, clientHeight } = gridRef;
      setHideTopGradient(scrollTop < 3);
      setHideBottomGradient(scrollTop + clientHeight >= scrollHeight);
    }
  };
  return (
    <Stack spacing="12px" alignItems="center">
      <Typography bold variant="h5" color={PALETTE.secondary.grey[5]}>
        {dayjs(props.time).utc().format('hh:mma')}
      </Typography>
      <Stack position="relative" overflow="hidden">
        <Stack
          position="absolute"
          top={-1}
          left={0}
          height="80px"
          width="100%"
          sx={{
            opacity: hideTopGradient ? 0 : 1,
            transition: '0.3s',
            pointerEvents: 'none',
            background: `linear-gradient(rgb(255,255,255), rgba(255,255,255,0))`,
            transform: 'translateY(1px)',
          }}
          zIndex={2}
        />
        <Stack
          position="absolute"
          bottom={-1}
          left={0}
          height="80px"
          width="100%"
          sx={{
            opacity: hideBottomGradient ? 0 : 1,
            transition: '0.3s',
            pointerEvents: 'none',
            background: `linear-gradient(rgba(255,255,255,0), rgb(255,255,255))`,
            transform: 'translateY(1px)',
          }}
          zIndex={2}
        />
        <Stack
          overflow="scroll"
          ref={setGridRef}
          onScroll={handleScroll}
          pt="10px"
        >
          <Stack height="170px" spacing="6px">
            {[
              ...[...Array((24 * 60) / 15).keys()].map((i) => (
                <Stack
                  key={i}
                  alignItems="center"
                  onClick={() =>
                    props.setTime(
                      getISODateString(
                        props.day,
                        Math.floor((i * 15) / 60),
                        (i * 15) % 60
                      )
                    )
                  }
                >
                  <Typography color={PALETTE.secondary.grey[5]}>
                    {dayjs()
                      .utc()
                      .hour(0)
                      .minute(0)
                      .millisecond(0)
                      .add(i * 15, 'minutes')
                      .format('hh:mm a')}
                  </Typography>
                </Stack>
              )),
              <Stack
                key="midnight"
                alignItems="center"
                onClick={() =>
                  props.setTime(
                    getISODateString(props.day < 6 ? props.day + 1 : 0, 24, 0)
                  )
                }
              >
                <Typography color={PALETTE.secondary.grey[5]}>
                  {'00:00am'}
                </Typography>
              </Stack>,
            ]}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const MobileTimeSelectionDialog = (props: {
  day: IAllowedTime['day'];
  open: boolean;
  startTime: IAllowedTime['startTime'];
  setStartTime: (time: IAllowedTime['startTime']) => void;
  endTime: IAllowedTime['endTime'];
  setEndTime: (time: IAllowedTime['endTime']) => void;
  onClose: () => void;
}) => {
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Select times"
      subtitle={[`Choose this browsing period's start and end time.`]}
      width="422px"
      dynamicHeight
      isMobile
    >
      <Stack direction="row" width="100%">
        <Stack flex={1} justifyContent="center">
          <TimeSelectionColumn
            day={props.day}
            time={props.startTime}
            setTime={props.setStartTime}
          />
        </Stack>
        <Typography variant="h5" color={PALETTE.secondary.grey[3]}>
          to
        </Typography>
        <Stack flex={1}>
          <TimeSelectionColumn
            day={props.day}
            time={props.endTime}
            setTime={props.setEndTime}
          />
        </Stack>
      </Stack>
    </UrsorDialog>
  );
};

const MobileAllowedTimeRowDisplayButton = (props: {
  day: IAllowedTime['day'];
  dayName: string;
  startTime: IAllowedTime['startTime'];
  setStartTime: (time: IAllowedTime['startTime']) => void;
  endTime: IAllowedTime['endTime'];
  setEndTime: (time: IAllowedTime['endTime']) => void;
}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <>
      <Stack
        borderRadius="8px"
        bgcolor={PALETTE.secondary.grey[1]}
        alignItems="center"
        justifyContent="center"
        direction="row"
        height="39px"
        width="210px"
        px="14px"
        boxSizing="border-box"
        spacing="10px"
        onClick={() => setDialogOpen(true)}
      >
        <Stack alignItems="center" direction="row" spacing="5px">
          <Typography bold>
            {dayjs(props.startTime).utc().format('hh:mma')}
          </Typography>
          {/* <PencilIcon height="16px" width="16px" /> */}
        </Stack>
        <Typography bold color={PALETTE.secondary.grey[3]}>
          to
        </Typography>
        <Stack alignItems="center" direction="row" spacing="5px">
          <Typography bold>
            {dayjs(props.endTime).utc().format('hh:mma')}
          </Typography>
          {/* <PencilIcon height="16px" width="16px" /> */}
        </Stack>
      </Stack>
      {dialogOpen ? (
        <MobileTimeSelectionDialog
          open
          onClose={() => setDialogOpen(false)}
          day={props.day}
          startTime={props.startTime}
          setStartTime={props.setStartTime}
          endTime={props.endTime}
          setEndTime={props.setEndTime}
        />
      ) : null}
    </>
  );
};

const MobileAllowedTimeRow = (props: {
  day: IAllowedTime['day'];
  times: IAllowedTime[];
  addRange: (startTime: number, endTime: number) => void;
  deleteRange: (id: IAllowedTime['id']) => void;
  reset: () => void;
  setRangeTimes: (
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

  //@ts-ignore
  const dayName = DAY_FULL_NAMES[props.day];
  return (
    <Stack spacing="4px">
      <Typography bold color={PALETTE.secondary.grey[3]}>
        {dayName}
      </Typography>
      <Stack direction="row">
        <Stack spacing="4px">
          {sortedTimes.map((t) => (
            <Stack
              key={t.id}
              direction="row"
              spacing="10px"
              alignItems="center"
              justifyContent="space-between"
            >
              <MobileAllowedTimeRowDisplayButton
                day={props.day}
                dayName={dayName}
                startTime={t.startTime}
                setStartTime={(time) =>
                  props.setRangeTimes(t.id, time, t.endTime)
                }
                endTime={t.endTime}
                setEndTime={(time) =>
                  props.setRangeTimes(t.id, t.startTime, time)
                }
              />
              {sortedTimes.length > 1 ? (
                <Stack
                  sx={{
                    svg: {
                      path: {
                        fill: PALETTE.system.red,
                      },
                    },
                  }}
                  onClick={() => props.deleteRange(t.id)}
                >
                  <XIcon height="20px" width="20px" />
                </Stack>
              ) : null}
            </Stack>
          ))}
        </Stack>
        <Stack
          flex={1}
          justifyContent="flex-end"
          alignItems="flex-end"
          pb="3px"
        >
          <Stack
            width="30px"
            height="30px"
            bgcolor={PALETTE.secondary.purple[2]}
            borderRadius="100%"
            justifyContent="center"
            alignItems="center"
            sx={{
              svg: {
                path: {
                  fill: 'rgb(255,255,255)',
                },
              },
            }}
            onClick={() => {
              newSegmentTimes &&
                props.addRange(newSegmentTimes[0], newSegmentTimes[1]);
              clearNewSegmentTimes();
            }}
          >
            <PlusIcon height="20px" width="20px" />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MobileAllowedTimeRow;
