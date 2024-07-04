import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import ChevronLeftIcon from "@/images/icons/ChevronLeft.svg";
import { DUMMY_GROUP_ID, IFilterUrl } from "@/app/filters/FiltersPageContents";
import Image from "next/image";
import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import _ from "lodash";
import AstroTimeChart from "./AstroTimeChart";
import { useState } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
dayjs.extend(advancedFormat);

const DUMMY_MOST_VISITED: (IFilterUrl & { time: number })[] = [
  {
    id: 1,
    url: "https://www.nationalreview.com/",
    title: "National Review",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/pingu_profile.jpg",
    createdAt: "2024-06-06",
    groupId: DUMMY_GROUP_ID,
    time: 5040,
  },
  {
    id: 2,
    url: "https://www.nationalgeographic.com/",
    title: "National Geographic",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/pingu_profile.jpg",
    createdAt: "2024-06-06",
    groupId: DUMMY_GROUP_ID,
    time: 4590,
  },
  {
    id: 3,
    url: "https://www.nintendo.com/",
    title: "Nintendo",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/pingu_profile.jpg",
    createdAt: "2024-06-06",
    groupId: DUMMY_GROUP_ID,
    time: 340,
  },
];

const DevicePageMonitoringTab = () => {
  const [timeSpent, setTimeSpent] = useState<number>(59083);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  return (
    <Stack spacing="24px">
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
      <Stack height="290px" spacing="28px" direction="row">
        <Stack width="54%" flex={1}>
          <AstroBentoCard
            title={`${Math.floor(timeSpent / 3600)}h ${Math.floor(
              (timeSpent % 3600) / 60
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
              <AstroTimeChart
                selectedDayIndex={selectedDayIndex}
                setSelectedDayIndex={setSelectedDayIndex}
                times={[2, 0.5, 3, 7, 8, 1, 3]}
              />
            </Stack>
          </AstroBentoCard>
        </Stack>
        <Stack flex={1}>
          <AstroBentoCard
            title="Most visited sites today"
            notCollapsible
            paddingBottom="0"
            topRightStuff={
              <UrsorButton size="small" variant="secondary">
                View all
              </UrsorButton>
            }
          >
            {DUMMY_MOST_VISITED.map((site, i) => (
              <Stack
                key={site.id}
                flex={1}
                direction="row"
                spacing="12px"
                alignItems="center"
                borderTop={
                  i > 0 ? `2px solid ${PALETTE.secondary.grey[2]}` : undefined
                }
              >
                <Stack borderRadius="8px" overflow="hidden">
                  <Image
                    src={site.imageUrl}
                    height={42}
                    width={42}
                    alt="favicon"
                  />
                </Stack>
                <Stack spacing="8px" width="100%">
                  <Stack direction="row" spacing="8px" alignItems="center">
                    <Typography bold>{site.title}</Typography>
                    <Typography bold color={PALETTE.secondary.grey[3]}>
                      {site.url}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing="12px">
                    <Stack
                      width={`${
                        (100 * site.time) /
                        (_.max(DUMMY_MOST_VISITED.map((s) => s.time)) ?? 1)
                      }%`}
                      height="8px"
                      bgcolor={PALETTE.secondary.purple[1]}
                      borderRadius="4px"
                    />
                    <Stack width="60px">
                      <Typography bold variant="tiny">{`${Math.floor(
                        site.time / 3600
                      )}h ${Math.floor((site.time % 3600) / 60)}m`}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </AstroBentoCard>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DevicePageMonitoringTab;
