import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import ChevronLeftIcon from "@/images/icons/ChevronLeft.svg";
import Image from "next/image";
import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import _ from "lodash";
import AstroTimeChart from "./AstroTimeChart";
import { useState } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import HistorySection from "./HistorySection";
import Link from "next/link";
import CalendarButton from "@/app/components/CalendarButton";
import { DUMMY_DOMAIN_URLS, DUMMY_MOST_VISITED } from "./InsightsTab";
import MobileHistorySection from "./MobileHistorySection";
dayjs.extend(advancedFormat);

export const cleanUrl = (url: string) =>
  url.replace("http://", "").replace("https://", "").replace("www.", "");

const DevicePageMobileInsightsTab = () => {
  const [timeSpent, setTimeSpent] = useState<number>(59083);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  return (
    <>
      <Stack spacing="12px">
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing="8px" alignItems="center">
            <Stack
              sx={{
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { opacity: 0.6 },
              }}
              onClick={() => setSelectedDayIndex(selectedDayIndex + 1)}
            >
              <ChevronLeftIcon height="18px" width="18px" />
            </Stack>
            <Typography variant="medium" bold>
              {`${
                selectedDayIndex === 0
                  ? "Today"
                  : selectedDayIndex === 1
                  ? "Yesterday"
                  : `${dayjs()
                      .subtract(selectedDayIndex, "days")
                      .format("dddd")}`
              }, ${dayjs()
                .subtract(selectedDayIndex, "days")
                .format("Do MMMM")}`}
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
              <ChevronRightIcon height="18px" width="18px" />
            </Stack>
          </Stack>
          <CalendarButton
            value={dayjs().subtract(selectedDayIndex, "days").toDate()}
            setValue={(date: Date) =>
              setSelectedDayIndex(dayjs().diff(date, "days"))
            }
          />
        </Stack>

        <AstroBentoCard
          title={`${Math.floor(timeSpent / 3600)}h ${Math.floor(
            (timeSpent % 3600) / 60
          )}m spent on screen`}
          notCollapsible
          isMobile
        >
          <Stack
            height="200px"
            mt="10px"
            borderRadius="12px"
            bgcolor="rgb(255,255,255)"
            py="8px"
            boxSizing="border-box"
          >
            <AstroTimeChart
              selectedDayIndex={selectedDayIndex}
              setSelectedDayIndex={setSelectedDayIndex}
              times={[4, 5, 6, 1, 3, 5, 2, 0.5, 3, 7, 8, 1, 3]}
              barWidth={20}
              labelFontSize="small"
              barsXPadding={12}
            />
          </Stack>
        </AstroBentoCard>

        <AstroBentoCard
          title="Most visited sites today"
          notCollapsible
          paddingBottom="0"
          topRightStuff={
            <UrsorButton size="small" variant="secondary">
              View all
            </UrsorButton>
          }
          isMobile
        >
          <Stack pb="14px" spacing="12px">
            {DUMMY_MOST_VISITED.map((site, i) => (
              <Stack
                key={site.id}
                borderTop={
                  i > 0 ? `2px solid ${PALETTE.secondary.grey[2]}` : undefined
                }
                pt={i > 0 ? "12px" : undefined}
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.7 },
                  transition: "0.2s",
                }}
                justifyContent="center"
              >
                <Link
                  key={site.id}
                  href={site.url}
                  target="_blank"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Stack
                    flex={1}
                    direction="row"
                    spacing="8px"
                    alignItems="center"
                  >
                    <Stack
                      borderRadius="12px"
                      overflow="hidden"
                      minWidth="56px"
                      minHeight="56px"
                    >
                      <Image
                        src={site.imageUrl}
                        height={56}
                        width={56}
                        alt="favicon"
                      />
                    </Stack>
                    <Stack spacing="8px" width="100%">
                      <Stack justifyContent="center">
                        <Typography bold variant="small" maxLines={1}>
                          {site.title}
                        </Typography>
                        <Typography
                          bold
                          variant="tiny"
                          color={PALETTE.secondary.grey[3]}
                          maxLines={1}
                        >
                          {cleanUrl(site.url)}
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing="6px"
                        width="90%"
                      >
                        <Stack
                          width={`${
                            (100 * site.time) /
                            (_.max(DUMMY_MOST_VISITED.map((s) => s.time)) ?? 1)
                          }%`}
                          height="8px"
                          bgcolor={PALETTE.secondary.purple[1]}
                          borderRadius="4px"
                        />
                        <Stack width="50px">
                          <Typography bold variant="tiny">{`${Math.floor(
                            site.time / 3600
                          )}h ${Math.floor(
                            (site.time % 3600) / 60
                          )}m`}</Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Link>
              </Stack>
            ))}
          </Stack>
        </AstroBentoCard>

        <MobileHistorySection domainUrls={DUMMY_DOMAIN_URLS} />
      </Stack>
      {/* <MobileAllDevicesDialog
        title={`${props.devices.length} Device${
          props.devices.length === 1 ? "" : "s"
        } have this Filter applied.`}
        devices={props.devices.slice(0, 4)}
        open={devicesGridDialogOpen}
        onClose={() => setDevicesGridDialogOpen(false)}
        onAdd={() => {
          props.onAdd();
          setDevicesGridDialogOpen(false);
        }}
      /> */}
    </>
  );
};

export default DevicePageMobileInsightsTab;
