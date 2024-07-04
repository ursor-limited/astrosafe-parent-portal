import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import AstroToggleCard from "@/app/filters/[id]/components/AstroToggleCard";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { PALETTE, Typography, UrsorButton } from "ui";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import FilterIcon from "@/images/icons/FilterIcon.svg";
import SearchIcon from "@/images/icons/SearchIcon.svg";
import AstroDropdownCard from "./AstroDropdownCard";
import BrowsingTimeSelector from "./BrowsingTimeSelector";
import _ from "lodash";
import AstroSwitch from "@/app/components/AstroSwitch";

export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

const DEFAULT_START = 10;
const DEFAULT_END = 16;

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
  id: number;
  deviceId: number;
  day: number;
  startTime: number; // currently in hours, 0 - 24 //////////////////////////////////////////////
  endTime: number;
}

const getDefaultTimeLimit = (day: ITimeLimit["day"]) => ({
  id: Math.round(Math.random() * 10000),
  deviceId: 1,
  day,
  startTime: DEFAULT_START,
  endTime: DEFAULT_END,
});

const DUMMY_TIME_LIMITS: ITimeLimit[] = [
  getDefaultTimeLimit(0),
  getDefaultTimeLimit(1),
  getDefaultTimeLimit(2),
  getDefaultTimeLimit(3),
  getDefaultTimeLimit(4),
  getDefaultTimeLimit(5),
  getDefaultTimeLimit(6),
];

const DevicePageSettingsTab = () => {
  const [browsingEnabled, setBrowsingEnabled] = useState<boolean>(false);
  const [videoEnabled, setVideoEnabled] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>(
    DUMMY_FILTERS[0].id
  );
  const [selectedSearch, setSelectedSearch] = useState<string>(
    DUMMY_SEARCHES[0].id
  );
  const [times, setTimes] = useState<ITimeLimit[]>(DUMMY_TIME_LIMITS);

  const addTimeLimit = (day: ITimeLimit["day"]) =>
    setTimes([...times, getDefaultTimeLimit(day)]);

  const reset = (day: ITimeLimit["day"]) =>
    setTimes([...times.filter((t) => t.day !== day), getDefaultTimeLimit(day)]);

  const [schedulesEnabled, setSchedulesEnabled] = useState<boolean>(false);

  return (
    <Stack spacing="24px" pb="33px">
      <Typography variant="h5">Device controls</Typography>
      <Stack direction="row" spacing="24px">
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
      </Stack>
      <Stack direction="row" spacing="24px">
        <Stack width="70%">
          <AstroBentoCard
            title="Allowed browsing time"
            subtitle="Select when you want the browser to be online. Turn this off to remove schedules."
            notCollapsible
            topRightStuff={
              <AstroSwitch
                on={schedulesEnabled}
                callback={() => setSchedulesEnabled(false)}
              />
            }
          >
            {times ? (
              <Stack spacing="36px" pb="12px">
                {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map(
                  (day, i) => (
                    <Stack key={day} direction="row" alignItems="center">
                      <Stack width="120px">
                        <Typography bold color={PALETTE.secondary.grey[3]}>
                          {_.capitalize(day)}
                        </Typography>
                      </Stack>
                      <BrowsingTimeSelector
                        times={times.filter((t) => t.day === i)}
                        setTimes={(id, startTime, endTime) =>
                          setTimes(
                            times.map((t) =>
                              t.id === id ? { ...t, startTime, endTime } : t
                            )
                          )
                        }
                      />
                      <Stack pl="60px" direction="row" spacing="8px">
                        <UrsorButton
                          size="small"
                          variant="secondary"
                          backgroundColor="rgb(255,255,255)"
                          onClick={() => addTimeLimit(i)}
                        >
                          Add
                        </UrsorButton>
                        <UrsorButton
                          size="small"
                          variant="secondary"
                          backgroundColor={PALETTE.secondary.grey[1]}
                          borderColor={PALETTE.secondary.grey[1]}
                          onClick={() => reset(i)}
                        >
                          Reset
                        </UrsorButton>
                      </Stack>
                    </Stack>
                  )
                )}
              </Stack>
            ) : null}
          </AstroBentoCard>
        </Stack>
        <AstroBentoCard
          title="Daily limits"
          subtitle="Set a daily browsing limit"
          notCollapsible
        >
          <></>
        </AstroBentoCard>
      </Stack>
    </Stack>
  );
};

export default DevicePageSettingsTab;
