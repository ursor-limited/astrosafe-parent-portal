import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import AstroToggleCard from "@/app/filters/[id]/components/AstroToggleCard";
import { Stack } from "@mui/system";
import { useState } from "react";
import { PALETTE, Typography, UrsorButton } from "ui";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import FilterIcon from "@/images/icons/FilterIcon.svg";
import SearchIcon from "@/images/icons/SearchIcon.svg";
import AstroDropdownCard from "./AstroDropdownCard";
import BrowsingTimeSelector from "./BrowsingTimeSelector";
import _ from "lodash";

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

const DevicePageSettingsTab = () => {
  const [browsingEnabled, setBrowsingEnabled] = useState<boolean>(false);
  const [videoEnabled, setVideoEnabled] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>(
    DUMMY_FILTERS[0].id
  );
  const [selectedSearch, setSelectedSearch] = useState<string>(
    DUMMY_SEARCHES[0].id
  );
  return (
    <Stack spacing="24px">
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
          >
            <Stack spacing="36px" pb="12px">
              {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
                <Stack key={day} direction="row" alignItems="center">
                  <Stack width="140px">
                    <Typography variant="h5" bold color="#d1d1d1">
                      {day.toUpperCase()}
                    </Typography>
                  </Stack>
                  <BrowsingTimeSelector />
                  <Stack pl="60px" direction="row" spacing="8px">
                    <UrsorButton
                      size="small"
                      variant="secondary"
                      backgroundColor="rgb(255,255,255)"
                    >
                      Add
                    </UrsorButton>
                    <UrsorButton
                      size="small"
                      variant="secondary"
                      backgroundColor={PALETTE.secondary.grey[1]}
                      borderColor={PALETTE.secondary.grey[1]}
                    >
                      Reset
                    </UrsorButton>
                  </Stack>
                </Stack>
              ))}
            </Stack>
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
