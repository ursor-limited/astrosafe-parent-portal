import { Stack } from '@mui/system'
import { PALETTE, Typography, UrsorButton } from './../../ui'
import { ReactComponent as ChevronRightIcon } from './../../images/ChevronRight.svg'
import { ReactComponent as ChevronLeftIcon } from './../../images/ChevronLeft.svg'

import { AstroBentoCard } from './../../filter/components/AstroBentoCard'
import _ from 'lodash'
import AstroTimeChart from './AstroTimeChart'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import CalendarButton from './../../components/CalendarButton'
import { IDayScreenTime, IVisitedSite } from './InsightsTab'
import MobileHistorySection from './MobileHistorySection'
import MostVisitedSitesSection from './MostVisitedSitesSection'
import ApiController from './../../api'
import { IDevice } from './../../filter/contents/common'
dayjs.extend(advancedFormat)

export const cleanUrl = (url: string) =>
  url.replace('http://', '').replace('https://', '').replace('www.', '')

const DevicePageMobileInsightsTab = (props: { deviceId: IDevice['id'] }) => {
  const [times, setTimes] = useState<IDayScreenTime[]>([])
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0) // days from today
  const [rangeEndDayIndex, setRangeEndDayIndex] = useState<number>(0)
  const [rangeStartDayIndex, setRangeStartDayIndex] = useState<number>(6)
  const [visitedSites, setVisitedSites] = useState<IVisitedSite[]>([])
  useEffect(() => {
    ApiController.getStats(
      props.deviceId,
      dayjs().utc().subtract(rangeStartDayIndex, 'days').format('YYYY-MM-DD'),
      dayjs().utc().subtract(rangeEndDayIndex, 'days').format('YYYY-MM-DD')
    ).then((stats) => {
      setTimes(stats.screenTime)
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
      )
    })
  }, [props.deviceId, rangeStartDayIndex, rangeEndDayIndex, selectedDayIndex])

  const [timeSpent, setTimeSpent] = useState<number>(0)
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
  )

  useEffect(() => {
    if (selectedDayIndex < 4) {
      const shiftNDays = selectedDayIndex - 3
      setRangeStartDayIndex(selectedDayIndex + 3 - shiftNDays)
      setRangeEndDayIndex(Math.max(0, shiftNDays))
      // }
      // else if (times.length - selectedDayIndex < 4) {
      //   const shiftNDays = times.length - 1 - selectedDayIndex;
      //   setRangeStartDayIndex(Math.min(times.length - 1, selectedDayIndex + 3));
      //   setRangeEndDayIndex(selectedDayIndex - 6 + shiftNDays);
    } else {
      setRangeStartDayIndex(selectedDayIndex + 3)
      setRangeEndDayIndex(selectedDayIndex - 3)
    }
  }, [selectedDayIndex, times])
  return (
    <>
      <Stack spacing="12px">
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing="8px" alignItems="center">
            <Stack
              sx={{
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': { opacity: 0.6 },
              }}
              onClick={() => setSelectedDayIndex(selectedDayIndex + 1)}
            >
              <ChevronLeftIcon height="18px" width="18px" />
            </Stack>
            <Typography variant="medium" bold>
              {`${
                selectedDayIndex === 0
                  ? 'Today'
                  : selectedDayIndex === 1
                  ? 'Yesterday'
                  : `${dayjs()
                      .subtract(selectedDayIndex, 'days')
                      .format('dddd')}`
              }, ${dayjs()
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
              <ChevronRightIcon height="18px" width="18px" />
            </Stack>
          </Stack>
          <CalendarButton
            value={dayjs().subtract(selectedDayIndex, 'days').toDate()}
            setValue={(date: Date) =>
              setSelectedDayIndex(dayjs().diff(date, 'days'))
            }
          />
        </Stack>

        <AstroBentoCard
          title={`${Math.floor(timeSpent / 60)}h ${Math.floor(
            timeSpent % 60
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
                labelFontSize="small"
                barsXPadding={12}
                barWidth={22}
              />
            ) : null}
          </Stack>
        </AstroBentoCard>

        {/* <AstroBentoCard
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
                <a
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
                      <img
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
                </a>
              </Stack>
            ))}
          </Stack>
        </AstroBentoCard> */}
        <Stack flex={1}>
          <MostVisitedSitesSection sites={visitedSites} isMobile />
        </Stack>
        <MobileHistorySection
          email={props.email}
          date={dayjs()
            .utc()
            .subtract(selectedDayIndex, 'days')
            .format('YYYY-MM-DD')}
        />
      </Stack>
      {/* <MobileAllDevicesDialog
        title={`${props.devices.length} ${
          props.devices.length === 1 ? "Device has" : "Devices have"
        } this Filter applied.`}
        devices={props.devices.slice(0, 4)}
        open={devicesGridDialogOpen}
        onClose={() => setDevicesGridDialogOpen(false)}
        onAdd={() => {
          props.onAdd();
          setDevicesGridDialogOpen(false);
        }}
      /> */}
    </>
  )
}

export default DevicePageMobileInsightsTab
