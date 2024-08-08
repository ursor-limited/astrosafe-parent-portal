import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import ChevronLeftIcon from "@/images/icons/ChevronLeft.svg";
import Image from "next/image";
import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import _ from "lodash";
import AstroTimeChart from "./AstroTimeChart";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import HistorySection from "./HistorySection";
import Link from "next/link";
import CalendarButton from "@/app/components/CalendarButton";
import { IFilterDomain, IFilterUrl } from "@/app/filters/contents/common";
import { DUMMY_GROUP_ID } from "@/app/filters/contents/body-mobile";
import ApiController from "@/app/api";
import AllMostVisitedSitesDialog from "./AllMostVisitedSitesDialog";
import MostVisitedSitesSection from "./MostVisitedSitesSection";
import { IDevice } from "@/app/filters/[id]/contents/common";
dayjs.extend(advancedFormat);

export interface IVisitedSite {
  url: string;
  title: string;
  faviconUrl: string;
  screenTime: number;
}

export const DUMMY_DOMAIN_URLS: (IFilterDomain & { time: number })[] = [
  {
    id: 1,
    domain: "https://www.nationalreview.com/buuuuu/boooo",
    title: "National Review",
    faviconUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/pingu_profile.jpg",
    time: 3094,
    urls: [
      {
        id: 1,
        url: "https://www.nationalreview.com/",
        title: "National Review",
        imageUrl:
          "https://ursorassets.s3.eu-west-1.amazonaws.com/pingu_profile.jpg",
        createdAt: "2024-06-06",
        groupId: DUMMY_GROUP_ID,
      },
      {
        id: 2,
        url: "https://www.nationalgeographic.com/",
        title: "National Geographic",
        imageUrl:
          "https://ursorassets.s3.eu-west-1.amazonaws.com/pingu_profile.jpg",
        createdAt: "2024-06-06",
        groupId: DUMMY_GROUP_ID,
      },
      {
        id: 3,
        url: "https://www.nintendo.com/",
        title: "Nintendo",
        imageUrl:
          "https://ursorassets.s3.eu-west-1.amazonaws.com/pingu_profile.jpg",
        createdAt: "2024-06-06",
        groupId: DUMMY_GROUP_ID,
      },
    ],
  },
  {
    id: 2,
    domain: "https://www.nationalreview.com/",
    title: "National Review",
    faviconUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/pingu_profile.jpg",
    time: 124,
    urls: [
      {
        id: 1,
        url: "https://www.nationalreview.com/",
        title: "National Review",
        imageUrl:
          "https://ursorassets.s3.eu-west-1.amazonaws.com/pingu_profile.jpg",
        createdAt: "2024-06-06",
        groupId: DUMMY_GROUP_ID,
      },
      {
        id: 2,
        url: "https://www.nationalgeographic.com/",
        title: "National Geographic",
        imageUrl:
          "https://ursorassets.s3.eu-west-1.amazonaws.com/pingu_profile.jpg",
        createdAt: "2024-06-06",
        groupId: DUMMY_GROUP_ID,
      },
      {
        id: 3,
        url: "https://www.nintendo.com/",
        title: "Nintendo",
        imageUrl:
          "https://ursorassets.s3.eu-west-1.amazonaws.com/pingu_profile.jpg",
        createdAt: "2024-06-06",
        groupId: DUMMY_GROUP_ID,
      },
    ],
  },
];

export interface IDayScreenTime {
  date: string;
  screenTime: number;
  timeLimitReached: boolean;
}

const DevicePageInsightsTab = (props: { deviceId: IDevice["id"] }) => {
  const [times, setTimes] = useState<IDayScreenTime[]>([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0); // days from today
  const [rangeEndDayIndex, setRangeEndDayIndex] = useState<number>(0);
  const [rangeStartDayIndex, setRangeStartDayIndex] = useState<number>(6);
  const [visitedSites, setVisitedSites] = useState<IVisitedSite[]>([]);
  useEffect(() => {
    ApiController.getStats(
      props.deviceId,
      dayjs().utc().subtract(rangeStartDayIndex, "days").format("YYYY-MM-DD"),
      dayjs().utc().subtract(rangeEndDayIndex, "days").format("YYYY-MM-DD")
    ).then((stats) => {
      setTimes(stats.screenTime);
      setVisitedSites(
        _.sortBy(
          stats.visitedWebsites?.[stats.visitedWebsites.length - 1]?.websites ||
            [],
          (t) => t.screenTime
        )
      );
    });
  }, [props.deviceId, rangeStartDayIndex, rangeEndDayIndex]);

  const [timeSpent, setTimeSpent] = useState<number>(0);
  useEffect(
    () =>
      setTimeSpent(
        times.find(
          (t) =>
            t.date ===
            dayjs()
              .utc()
              .subtract(selectedDayIndex, "days")
              .format("YYYY-MM-DD")
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
  return (
    <Stack spacing="24px" pb="32px">
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing="10px" alignItems="center">
          <Stack
            sx={{
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": { opacity: 0.6 },
            }}
            onClick={() => setSelectedDayIndex(selectedDayIndex + 1)}
          >
            <ChevronLeftIcon height="24px" width="24px" />
          </Stack>
          <Typography variant="h5">
            {`${
              selectedDayIndex === 0
                ? "Today"
                : selectedDayIndex === 1
                ? "Yesterday"
                : `${dayjs().subtract(selectedDayIndex, "days").format("dddd")}`
            }, ${dayjs().subtract(selectedDayIndex, "days").format("Do MMMM")}`}
          </Typography>
          <Stack
            sx={{
              opacity: selectedDayIndex === 0 ? 0.3 : 1,
              pointerEvents: selectedDayIndex === 0 ? "none" : undefined,
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": { opacity: 0.6 },
            }}
            onClick={() => setSelectedDayIndex(selectedDayIndex - 1)}
          >
            <ChevronRightIcon height="24px" width="24px" />
          </Stack>
        </Stack>
        <CalendarButton
          value={dayjs().subtract(selectedDayIndex, "days").toDate()}
          setValue={(date: Date) =>
            setSelectedDayIndex(dayjs().diff(date, "days"))
          }
        />
      </Stack>
      <Stack height="290px" spacing="28px" direction="row">
        <Stack width="54%" flex={1}>
          <AstroBentoCard
            title={`${Math.floor(timeSpent / 60)}h ${Math.floor(
              timeSpent
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
                    .subtract(selectedDayIndex)
                    .format("YYYY-MM-DD")}
                  setSelectedDatetime={(datetime) =>
                    dayjs().utc().diff(datetime, "days")
                  }
                />
              ) : null}
            </Stack>
          </AstroBentoCard>
        </Stack>
        <Stack flex={1}>
          <MostVisitedSitesSection sites={visitedSites} />
        </Stack>
      </Stack>
      <HistorySection domainUrls={DUMMY_DOMAIN_URLS} />
    </Stack>
  );
};

export default DevicePageInsightsTab;
