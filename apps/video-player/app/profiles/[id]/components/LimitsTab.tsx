import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import { Stack } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { PALETTE, Typography, UrsorButton } from "ui";
import FilterIcon from "@/images/icons/FilterIcon.svg";
import SearchIcon from "@/images/icons/SearchIcon.svg";
import _ from "lodash";
import AstroSwitch from "@/app/components/AstroSwitch";
import RequestedSitesSection from "./RequestedSitesSection";
import ApiController from "@/app/api";
import { IDevice } from "@/app/filters/[id]/contents/common";
import { IEnrichedDevice } from "../../contents/common";
import TimeLimitsSection from "./TimeLimitsSection";
import BrowsingTimesSection from "./BrowsingTimesSection";

export interface IRequestedSite {
  id: number;
  url: string;
  title: string;
  faviconUrl: string;
}

export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

const DEFAULT_START = "10:00:00.000Z";
const DEFAULT_END = "16:00:00.000Z";
const DEFAULT_DAILY_LIMIT = 120;
const DAILY_LIMIT_INCREMENT = 15; // minutes

const DUMMY_FILTERS = [
  {
    title: "AstroSafe Filter (6-10yrs)",
    subtitle:
      "Search engine returns content aligned with the device's filter system.",
    image: (
      <Stack sx={{ svg: { path: { fill: PALETTE.system.orange } } }}>
        <FilterIcon height="36px" width="36px" />
      </Stack>
    ),
    id: "astro",
  },
  {
    title: "Lets add some more here, guys",
    subtitle: "Boo",
    image: (
      <Stack sx={{ svg: { path: { fill: PALETTE.system.orange } } }}>
        <FilterIcon height="36px" width="36px" />
      </Stack>
    ),
    id: "more",
  },
];

const DUMMY_SEARCHES = [
  {
    title: "Safe Search (Recommended)",
    subtitle:
      "Search engine returns content aligned with the device’s filter system.",
    image: (
      <Stack sx={{ svg: { path: { fill: PALETTE.system.orange } } }}>
        <SearchIcon height="36px" width="36px" />
      </Stack>
    ),
    id: "safe",
  },
  {
    title: "Encyclopedic - up to 7 yrs.",
    subtitle: "A handful of educational sites to introduce searching safely",
    image: (
      <Stack sx={{ svg: { path: { fill: PALETTE.system.orange } } }}>
        <SearchIcon height="36px" width="36px" />
      </Stack>
    ),
    id: "encyclopedic",
  },
  {
    title: "Off",
    subtitle: "Turn off the search engine to create a more focused experience.",
    image: (
      <Stack sx={{ svg: { path: { fill: PALETTE.system.orange } } }}>
        <SearchIcon height="36px" width="36px" />
      </Stack>
    ),
    id: "off",
  },
];

export interface ITimeLimit {
  day: number;
  allowedMinutes: number;
}

export interface IAllowedTime {
  id: number;
  day: number;
  startTime: string;
  endTime: string;
}

const getDefaultTimeLimit = (day: IAllowedTime["day"]) => ({
  id: Math.round(Math.random() * 10000),
  day,
  startTime: DEFAULT_START,
  endTime: DEFAULT_END,
  dailyLimit: DEFAULT_DAILY_LIMIT,
});

const DevicePageLimitsTab = (props: { deviceId: IDevice["id"] }) => {
  const [allowedTimes, setAllowedTimes] = useState<IAllowedTime[]>([]);
  const [timeLimits, setTimeLimits] = useState<ITimeLimit[]>([]);
  useEffect(() => {
    ApiController.getDeviceWithTimes(props.deviceId).then(
      (d: IEnrichedDevice) => {
        setAllowedTimes(d.allowedTimes as IAllowedTime[]);
        setTimeLimits(d.timeLimits as ITimeLimit[]);
      }
    );
  }, [props.deviceId]);

  const addTimeLimit = (day: IAllowedTime["day"]) =>
    setAllowedTimes([...allowedTimes, getDefaultTimeLimit(day)]);

  const reset = (day: IAllowedTime["day"]) =>
    setAllowedTimes([
      ...allowedTimes.filter((t) => t.day !== day),
      getDefaultTimeLimit(day),
    ]);

  const [schedulesEnabled, setSchedulesEnabled] = useState<boolean>(false);

  //const [dailyLimits, setDailyLimits] = useState<number[]>([]);

  const [dailyLimitsEnabled, setDailyLimitsEnabled] = useState<boolean>(false);

  const [requestedSites, setRequestedSites] = useState<IRequestedSite[]>([]);
  const loadRequestedSites = useCallback(
    () =>
      ApiController.getRequestedSites(props.deviceId).then(setRequestedSites),
    [props.deviceId]
  );
  useEffect(() => {
    loadRequestedSites();
  }, [loadRequestedSites]);

  return (
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
      <Stack direction="row" spacing="24px">
        <Stack width="70%">
          <BrowsingTimesSection
            topRightElement={
              <AstroSwitch
                on={schedulesEnabled}
                callback={() => setSchedulesEnabled(!schedulesEnabled)}
              />
            }
            allowedTimes={allowedTimes}
            setAllowedTimes={(day, startTime, endTime) =>
              setAllowedTimes(
                allowedTimes.map((t) =>
                  t.id === day ? { ...t, startTime, endTime } : t
                )
              )
            }
            addTimeLimit={addTimeLimit}
            reset={reset}
          />
        </Stack>
        <TimeLimitsSection
          topRightElement={
            <AstroSwitch
              on={dailyLimitsEnabled}
              callback={() => setDailyLimitsEnabled(!dailyLimitsEnabled)}
            />
          }
          timeLimits={timeLimits}
          increment={(day) => {
            setTimeLimits(
              timeLimits.map((l) =>
                l.day === day
                  ? {
                      day: l.day,
                      allowedMinutes: l.allowedMinutes + DAILY_LIMIT_INCREMENT,
                    }
                  : l
              )
            );
            ApiController.setTimeLimit(
              props.deviceId,
              day,
              (timeLimits.find((l) => l.day === day)?.allowedMinutes ?? 0) +
                DAILY_LIMIT_INCREMENT
            );
          }}
          decrement={(day) => {
            setTimeLimits(
              timeLimits.map((l) =>
                l.day === day
                  ? {
                      day: l.day,
                      allowedMinutes: l.allowedMinutes - DAILY_LIMIT_INCREMENT,
                    }
                  : l
              )
            );
            ApiController.setTimeLimit(
              props.deviceId,
              day,
              (timeLimits.find((l) => l.day === day)?.allowedMinutes ?? 0) -
                DAILY_LIMIT_INCREMENT
            );
          }}
        />
      </Stack>
    </Stack>
  );
};

export default DevicePageLimitsTab;
