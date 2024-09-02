import { Stack } from '@mui/system';
import { useCallback, useContext, useEffect, useState } from 'react';
import { PALETTE, Typography, UrsorButton } from './../../ui';
import SearchIcon from './../../images/SearchIcon.svg';
import _ from 'lodash';
import AstroSwitch from './../../components/AstroSwitch';
import RequestedSitesSection from './RequestedSitesSection';
import ApiController from './../../api';
import { IDevice, IDeviceConfig } from './../../filter/contents/common';
import { IEnrichedDevice } from '../../profiles/contents/common';
import TimeLimitsSection from './TimeLimitsSection';
import AllowedTimesSection from './AllowedTimesSection';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useWindowSize } from 'usehooks-ts';
import MobileAllowedTimesSection from './MobileAllowedTimesSection';
import ProfilePageTabLayout from './ProfilePageTabLayout';
import NotificationContext from './../../components/NotificationContext';
dayjs.extend(utc);

export const getISODateString = (day: number, hours: number, minutes: number) =>
  dayjs
    .utc()
    .day(day)
    .hour(hours)
    .minute(minutes)
    .second(0)
    .millisecond(0)
    .toISOString();

export interface IRequestedSite {
  id: number;
  url: string;
  title: string;
  faviconUrl: string;
}

export type Weekday = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export const DAILY_LIMIT_INCREMENT = 15; // minutes

const ALLOWED_TIMES_LABELS_SMALLER_FONT_SIZE_WINDOW_WIDTH_THRESHOLD = 1536;
const HALVE_LABEL_FREQUENCY_WINDOW_WIDTH_THRESHOLD = 1450;
const SWITCH_TO_COLUMN_WINDOW_WIDTH_THRESHOLD = 1080;

export interface ITimeLimit {
  id: number;
  day: number;
  allowedMinutes: number;
}

export interface IAllowedTime {
  id: number;
  day: number;
  startTime: string;
  endTime: string;
}

const DevicePageLimitsTab = (props: {
  deviceId: IDevice['id'];
  isMobile?: boolean;
}) => {
  const [allowedTimes, setAllowedTimes] = useState<IAllowedTime[]>([]);
  const [timeLimits, setTimeLimits] = useState<ITimeLimit[]>([]);
  const [deviceConfig, setDeviceConfig] = useState<IDeviceConfig | undefined>();
  const loadData = useCallback(
    () =>
      ApiController.getDeviceWithTimesAndConfig(props.deviceId).then(
        (d: IEnrichedDevice) => {
          setAllowedTimes(d.allowedTimes as IAllowedTime[]);
          setTimeLimits(d.timeLimits as ITimeLimit[]);
          setDeviceConfig(d.config as IDeviceConfig);
        }
      ),
    [props.deviceId]
  );
  useEffect(() => {
    loadData();
  }, [loadData]);

  const addAllowedTime = (
    day: IAllowedTime['day'],
    startTime: number,
    endTime: number
  ) => {
    ApiController.addAllowedTimeRange(
      props.deviceId,
      day,
      getISODateString(
        day,
        Math.floor(startTime),
        Math.floor((startTime % 1) * 60)
      ),
      getISODateString(day, Math.floor(endTime), Math.floor((endTime % 1) * 60))
    ).then(loadData);
  };

  const reset = (day: IAllowedTime['day']) => {
    ApiController.resetAllowedTimes(props.deviceId, day).then(loadData);
  };

  const deleteRange = (id: IAllowedTime['id']) => {
    ApiController.removeAllowedTimeRange(id).then(loadData);
  };

  const [allowedTimesEnabled, setAllowedTimesEnabled] =
    useState<boolean>(false);
  const [timeLimitsEnabled, setTimeLimitsEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (deviceConfig) {
      !_.isUndefined(deviceConfig?.allowedTimesEnabled) &&
        setAllowedTimesEnabled(deviceConfig.allowedTimesEnabled);
      !_.isUndefined(deviceConfig?.timeLimitsEnabled) &&
        setTimeLimitsEnabled(deviceConfig.timeLimitsEnabled);
    }
  }, [deviceConfig]);

  const [requestedSites, setRequestedSites] = useState<IRequestedSite[]>([]);
  const loadRequestedSites = useCallback(
    () =>
      ApiController.getRequestedSites(props.deviceId).then(setRequestedSites),
    [props.deviceId]
  );
  useEffect(() => {
    loadRequestedSites();
  }, [loadRequestedSites]);

  const { width } = useWindowSize();

  const [
    allowedTimesLabelsSmallerFontSize,
    setAllowedTimesLabelsSmallerFontSize,
  ] = useState<boolean>(false);
  useEffect(
    () =>
      setAllowedTimesLabelsSmallerFontSize(
        width < ALLOWED_TIMES_LABELS_SMALLER_FONT_SIZE_WINDOW_WIDTH_THRESHOLD &&
          width > SWITCH_TO_COLUMN_WINDOW_WIDTH_THRESHOLD
      ),
    [width]
  );

  const [switchToColumn, setSwitchToColumn] = useState<boolean>(false);
  useEffect(
    () => setSwitchToColumn(width < SWITCH_TO_COLUMN_WINDOW_WIDTH_THRESHOLD),
    [width]
  );

  const [halveLabelFrequency, setHalveLabelFrequency] =
    useState<boolean>(false);
  useEffect(
    () =>
      setHalveLabelFrequency(
        width < HALVE_LABEL_FREQUENCY_WINDOW_WIDTH_THRESHOLD
      ),
    [width]
  );

  const notificationCtx = useContext(NotificationContext);

  return (
    <ProfilePageTabLayout
      title="Limits"
      info={{
        title: 'How do limits work?',
        text: "For each day you can choose what time you want the Browser to be accessible and set the total amount of time you want your child to be able to spend online. If you don't want to use these features just toggle them off in the top right corner of their respective box!",
      }}
    >
      <Stack spacing="24px" pb="33px">
        {requestedSites.length > 0 ? (
          <RequestedSitesSection
            sites={requestedSites}
            onUpdate={loadRequestedSites}
          />
        ) : null}
        {/* <Typography variant="h5">Device controls</Typography> */}
        {/* <Stack direction="row" spacing="24px">
        <AstroBentoCard
          title="General settings"
          subtitle="Control features for your Browser"
          notCollapsible
        >
          <Stack spacing="12px">
            <AstroToggleCard
              on={browsingEnabled}
              callback={() => setBrowsingEnabled(!browsingEnabled)}
              title={`Browsing is ${browsingEnabled ? "enabled" : "disabled"}`}
              subtitle={`Your kids can${
                browsingEnabled ? "" : "not"
              } access the Browser on this Device`}
              image={
                <Stack
                  sx={{ svg: { path: { fill: PALETTE.secondary.purple[2] } } }}
                >
                  <GlobeIcon height="36px" width="36px" />
                </Stack>
              }
            />
            <AstroToggleCard
              on={videoEnabled}
              callback={() => setVideoEnabled(!videoEnabled)}
              title={`Video content is ${
                browsingEnabled ? "enabled" : "disabled"
              }`}
              subtitle={`Your kids can${
                browsingEnabled ? "" : "not"
              } access video content on this Device`}
              image={
                <Stack sx={{ svg: { path: { fill: PALETTE.system.red } } }}>
                  <CirclePlayIcon height="36px" width="36px" />
                </Stack>
              }
            />
          </Stack>
        </AstroBentoCard>
        <AstroBentoCard
          title="Search and Filter settings"
          subtitle="Select a safety filter and search setting for this device"
          notCollapsible
        >
          <Stack spacing="12px">
            <AstroDropdownCard
              title={
                DUMMY_FILTERS.find((f) => f.id === selectedFilter)?.title ?? ""
              }
              subtitle={
                DUMMY_FILTERS.find((f) => f.id === selectedFilter)?.subtitle ??
                ""
              }
              items={DUMMY_FILTERS}
              image={DUMMY_FILTERS.find((f) => f.id === selectedFilter)?.image}
              selected={selectedFilter}
              select={setSelectedFilter}
            />
            <AstroDropdownCard
              title={
                DUMMY_SEARCHES.find((f) => f.id === selectedSearch)?.title ?? ""
              }
              subtitle={
                DUMMY_SEARCHES.find((f) => f.id === selectedSearch)?.subtitle ??
                ""
              }
              items={DUMMY_SEARCHES}
              image={DUMMY_SEARCHES.find((f) => f.id === selectedSearch)?.image}
              selected={selectedSearch}
              select={setSelectedSearch}
            />
          </Stack>
        </AstroBentoCard>
      </Stack> */}
        <Stack direction={switchToColumn ? 'column' : 'row'} spacing="24px">
          <Stack width={switchToColumn ? undefined : '70%'}>
            {props.isMobile ? (
              <MobileAllowedTimesSection
                topRightElement={
                  <AstroSwitch
                    on={allowedTimesEnabled}
                    callback={() => {
                      setAllowedTimesEnabled(!allowedTimesEnabled);
                      ApiController.flipAllowedTimesEnabled(
                        props.deviceId,
                        !allowedTimesEnabled
                      );
                    }}
                  />
                }
                allowedTimes={allowedTimes}
                setAllowedTime={(id, startTime, endTime) => {
                  setAllowedTimes(
                    allowedTimes.map((t) =>
                      t.id === id ? { ...t, startTime, endTime } : t
                    )
                  );
                  ApiController.changeAllowedTimeRange(id, startTime, endTime);
                }}
                deleteRange={deleteRange}
                addTimeLimit={addAllowedTime}
                reset={reset}
                smallerLabelFont={allowedTimesLabelsSmallerFontSize}
                disabled={!allowedTimesEnabled}
              />
            ) : (
              <AllowedTimesSection
                topRightElement={
                  <AstroSwitch
                    on={allowedTimesEnabled}
                    callback={() => {
                      setAllowedTimesEnabled(!allowedTimesEnabled);
                      ApiController.flipAllowedTimesEnabled(
                        props.deviceId,
                        !allowedTimesEnabled
                      );
                      notificationCtx.success(
                        `Switched allowed times ${
                          allowedTimesEnabled ? 'off' : 'on'
                        } on this Device`
                      );
                    }}
                  />
                }
                allowedTimes={allowedTimes}
                setAllowedTimes={(id, startTime, endTime) => {
                  setAllowedTimes(
                    allowedTimes.map((t) =>
                      t.id === id ? { ...t, startTime, endTime } : t
                    )
                  );
                  ApiController.changeAllowedTimeRange(id, startTime, endTime);
                }}
                addTimeLimit={addAllowedTime}
                reset={reset}
                deleteRange={deleteRange}
                smallerLabelFont={allowedTimesLabelsSmallerFontSize}
                halveLabelFrequency={halveLabelFrequency}
                disabled={!allowedTimesEnabled}
              />
            )}
          </Stack>
          <TimeLimitsSection
            topRightElement={
              <AstroSwitch
                on={timeLimitsEnabled}
                callback={() => {
                  setTimeLimitsEnabled(!timeLimitsEnabled);
                  ApiController.flipTimeLimitsEnabled(
                    props.deviceId,
                    !timeLimitsEnabled
                  );
                  notificationCtx.success(
                    `Switched time limits ${
                      timeLimitsEnabled ? 'off' : 'on'
                    } on this Device`
                  );
                }}
              />
            }
            isMobile={props.isMobile}
            timeLimits={timeLimits}
            increment={(day) => {
              const limitId = timeLimits.find((l) => l.day === day)?.id;
              if (limitId) {
                setTimeLimits(
                  timeLimits.map((l) =>
                    l.day === day
                      ? {
                          id: limitId,
                          day: l.day,
                          allowedMinutes:
                            l.allowedMinutes + DAILY_LIMIT_INCREMENT,
                        }
                      : l
                  )
                );
                ApiController.setTimeLimit(
                  limitId,
                  (timeLimits.find((l) => l.day === day)?.allowedMinutes ?? 0) +
                    DAILY_LIMIT_INCREMENT
                );
              }
            }}
            decrement={(day) => {
              const limitId = timeLimits.find((l) => l.day === day)?.id;
              if (limitId) {
                setTimeLimits(
                  timeLimits.map((l) =>
                    l.day === day
                      ? {
                          id: limitId,
                          day: l.day,
                          allowedMinutes:
                            l.allowedMinutes - DAILY_LIMIT_INCREMENT,
                        }
                      : l
                  )
                );
                ApiController.setTimeLimit(
                  limitId,
                  (timeLimits.find((l) => l.day === day)?.allowedMinutes ?? 0) -
                    DAILY_LIMIT_INCREMENT
                );
              }
            }}
            disabled={!timeLimitsEnabled}
          />
        </Stack>
      </Stack>
    </ProfilePageTabLayout>
  );
};

export default DevicePageLimitsTab;
