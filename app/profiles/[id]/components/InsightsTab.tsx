import { Stack } from '@mui/system';
import { Typography } from '@/ui';
import ChevronRightIcon from '@/images/icons/ChevronRight.svg';
import ChevronLeftIcon from '@/images/icons/ChevronLeft.svg';
import { AstroBentoCard } from '@/filters/[id]/components/AstroBentoCard';
import _ from 'lodash';
import AstroTimeChart from './AstroTimeChart';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import HistorySection from './HistorySection';
import CalendarButton from '@/app/components/CalendarButton';
import ApiController from '@/app/api';
import MostVisitedSitesSection from './MostVisitedSitesSection';
import { IDevice } from '@/filters/[id]/contents/common';
import { useWindowSize } from 'usehooks-ts';
dayjs.extend(advancedFormat);

const SWITCH_TO_COLUMN_WINDOW_WIDTH_THRESHOLD = 1260;

export interface IVisitedSite {
  url: string;
  title: string;
  faviconUrl: string;
  screenTime: number;
}

export interface IDayScreenTime {
  date: string;
  screenTime: number;
  timeLimitReached: boolean;
}

const DevicePageInsightsTab = (props: { deviceId: IDevice['id'] }) => {
  const [times, setTimes] = useState<IDayScreenTime[]>([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0); // days from today
  const [rangeEndDayIndex, setRangeEndDayIndex] = useState<number>(0);
  const [rangeStartDayIndex, setRangeStartDayIndex] = useState<number>(6);
  const [visitedSites, setVisitedSites] = useState<IVisitedSite[]>([]);
  useEffect(() => {
    ApiController.getStats(
      props.deviceId,
      dayjs().utc().subtract(rangeStartDayIndex, 'days').format('YYYY-MM-DD'),
      dayjs().utc().subtract(rangeEndDayIndex, 'days').format('YYYY-MM-DD')
    ).then((stats) => {
      setTimes(stats.screenTime);
      setVisitedSites(
        _.sortBy(
          stats.visitedWebsites?.find(
            (w: any) =>
              w.date ===
              dayjs()
                .utc()
                .subtract(selectedDayIndex, 'days')
                .format('YYYY-MM-DD')
          )?.websites || [],
          (t) => t.screenTime
        )
      );
    });
  }, [props.deviceId, rangeStartDayIndex, rangeEndDayIndex, selectedDayIndex]);

  const [timeSpent, setTimeSpent] = useState<number>(0);
  useEffect(
    () =>
      setTimeSpent(
        times.find(
          (t) =>
            t.date ===
            dayjs()
              .utc()
              .subtract(selectedDayIndex, 'days')
              .format('YYYY-MM-DD')
        )?.screenTime ?? 0
      ),
    [times, selectedDayIndex]
  );

  useEffect(() => {
    if (selectedDayIndex < 4) {
      const shiftNDays = selectedDayIndex - 3;
      setRangeStartDayIndex(selectedDayIndex + 3 - shiftNDays);
      setRangeEndDayIndex(Math.max(0, shiftNDays));
      // }
      // else if (times.length - selectedDayIndex < 4) {
      //   const shiftNDays = times.length - 1 - selectedDayIndex;
      //   setRangeStartDayIndex(Math.min(times.length - 1, selectedDayIndex + 3));
      //   setRangeEndDayIndex(selectedDayIndex - 6 + shiftNDays);
    } else {
      setRangeStartDayIndex(selectedDayIndex + 3);
      setRangeEndDayIndex(selectedDayIndex - 3);
    }
  }, [selectedDayIndex, times]);

  const { width } = useWindowSize();
  const [switchToColumn, setSwitchToColumn] = useState<boolean>(false);
  useEffect(() => {
    setSwitchToColumn(width < SWITCH_TO_COLUMN_WINDOW_WIDTH_THRESHOLD);
  }, [width]);

  return (
    <Stack spacing="24px" pb="32px">
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing="10px" alignItems="center">
          <Stack
            sx={{
              cursor: 'pointer',
              transition: '0.2s',
              '&:hover': { opacity: 0.6 },
            }}
            onClick={() => setSelectedDayIndex(selectedDayIndex + 1)}
          >
            <ChevronLeftIcon height="24px" width="24px" />
          </Stack>
          <Typography variant="h5">
            {`${
              selectedDayIndex === 0
                ? 'Today'
                : selectedDayIndex === 1
                ? 'Yesterday'
                : `${dayjs()
                    .utc()
                    .subtract(selectedDayIndex, 'days')
                    .format('dddd')}`
            }, ${dayjs()
              .utc()
              .subtract(selectedDayIndex, 'days')
              .format('Do MMMM')}`}
          </Typography>
          <Stack
            sx={{
              opacity: selectedDayIndex === 0 ? 0.3 : 1,
              pointerEvents: selectedDayIndex === 0 ? 'none' : undefined,
              cursor: 'pointer',
              transition: '0.2s',
              '&:hover': { opacity: 0.6 },
            }}
            onClick={() => setSelectedDayIndex(selectedDayIndex - 1)}
          >
            <ChevronRightIcon height="24px" width="24px" />
          </Stack>
        </Stack>
        <CalendarButton
          value={dayjs().utc().subtract(selectedDayIndex, 'days').toDate()}
          setValue={(date: Date) =>
            setSelectedDayIndex(dayjs().diff(date, 'days'))
          }
        />
      </Stack>
      <Stack spacing="28px" direction={switchToColumn ? 'column' : 'row'}>
        <Stack width={switchToColumn ? '100%' : '54%'} height="290px">
          <AstroBentoCard
            title={`${Math.floor(timeSpent / 60)}h ${Math.floor(
              timeSpent % 60
            )}m spent on screen`}
            notCollapsible
          >
            <Stack
              mt="33p"
              flex={1}
              borderRadius="12px"
              bgcolor="rgb(255,255,255)"
              py="8px"
              boxSizing="border-box"
              spacing="30px"
            >
              {times.length > 0 ? (
                <AstroTimeChart
                  times={times}
                  selected={dayjs()
                    .utc()
                    .subtract(selectedDayIndex, 'days')
                    .format('YYYY-MM-DD')}
                  setSelectedDatetime={(datetime) =>
                    setSelectedDayIndex(dayjs().utc().diff(datetime, 'days'))
                  }
                />
              ) : null}
            </Stack>
          </AstroBentoCard>
        </Stack>
        <Stack height="290px" flex={1}>
          <MostVisitedSitesSection sites={visitedSites} />
        </Stack>
      </Stack>
      <HistorySection
        deviceId={props.deviceId}
        date={dayjs()
          .utc()
          .subtract(selectedDayIndex, 'days')
          .format('YYYY-MM-DD')}
      />
    </Stack>
  );
};

export default DevicePageInsightsTab;
