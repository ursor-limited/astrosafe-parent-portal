import React, { useState, useEffect } from 'react'
import { AstroBentoCard } from '../../../filter/components/AstroBentoCard'
import AstroTimeChart from '../../../profile/components/AstroTimeChart'
import { Stack } from '@mui/system'
import { PALETTE, Typography, UrsorButton } from '../../../ui'
import { ReactComponent as ChevronRightIcon } from './../../images/ChevronRight.svg'
import { ReactComponent as ChevronLeftIcon } from './../../images/ChevronLeft.svg'
import _ from 'lodash'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import CalendarButton from '../../../components/CalendarButton'
import {
  IDayScreenTime,
  IVisitedSite,
} from '../../../profile/components/InsightsTab'
import ApiController from '../../../api'
import useDevice from '../../../hooks/useDevice'
import useAuth from '../../../hooks/useAuth'
import { isMobile } from 'react-device-detect'
import UrsorFadeIn from '../../../../src/components/UrsorFadeIn'
import AllMostVisitedSitesDialog from '../../../../src/profile/components/AllMostVisitedSitesDialog'

dayjs.extend(utc)

interface DeviceScreenTimeCardProps {
  email: string
  deviceId: string
  date?: Date
}

interface InsightsTabEmptyStateIndicatorProps {
  imageSrc: string
  width: number
  height: number
  isMobile?: boolean
}

const InsightsTabEmptyStateIndicator: React.FC<
  InsightsTabEmptyStateIndicatorProps
> = ({ imageSrc, width, height, isMobile }) => (
  <Stack
    spacing={isMobile ? '6px' : '12px'}
    justifyContent="center"
    alignItems="center"
    height="100%"
    pb={isMobile ? '12px' : undefined}
    sx={{
      opacity: 0.6,
    }}
  >
    <img src={imageSrc} alt="No data available" width={width} height={height} />

    <Typography
      bold
      variant={isMobile ? 'medium' : 'h5'}
      color={PALETTE.secondary.grey[4]}
    >
      No data available
    </Typography>
  </Stack>
)

export const cleanUrl = (url: string) =>
  url?.replace('http://', '').replace('https://', '').replace('www.', '')

export const VisitedSiteRow = (
  props: IVisitedSite & {
    maxScreenTime: IVisitedSite['screenTime']
    borderTop: boolean
  }
) => (
  <Stack
    height="73px"
    borderTop={
      props.borderTop ? `2px solid ${PALETTE.secondary.grey[2]}` : undefined
    }
    sx={{
      cursor: 'pointer',
      '&:hover': { opacity: 0.7 },
      transition: '0.2s',
    }}
    justifyContent="center"
  >
    <a
      href={props.url}
      target="_blank"
      style={{
        textDecoration: 'none',
      }}
    >
      <Stack flex={1} direction="row" spacing="12px" alignItems="center">
        <Stack
          borderRadius="8px"
          overflow="hidden"
          minHeight={42}
          minWidth={42}
          boxShadow="0 0 12px rgba(0,0,0,0.1)"
        >
          <img src={props.faviconUrl} height={42} width={42} alt="favicon" />
        </Stack>
        <Stack spacing="8px" width="100%">
          <Stack direction="row" spacing="8px" alignItems="center">
            <Typography
              bold
              maxLines={1}
              sx={{
                wordBreak: 'break-all',
              }}
            >
              {props.title}
            </Typography>
            <Stack minWidth="20%">
              <Typography
                bold
                color={PALETTE.secondary.grey[3]}
                maxLines={1}
                sx={{
                  wordBreak: 'break-all',
                }}
              >
                {cleanUrl(props.url).replace(/\/$/, '')}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing="12px">
            <Stack
              width={`${(100 * props.screenTime) / props.maxScreenTime}%`}
              height="8px"
              bgcolor={PALETTE.secondary.purple[1]}
              borderRadius="4px"
            />
            <Stack width="60px">
              <Typography bold variant="tiny">{`${Math.floor(
                props.screenTime / 60
              )}h ${Math.floor(props.screenTime % 60)}m`}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </a>
  </Stack>
)

const DeviceMostVisitedSitesCard: React.FC<DeviceScreenTimeCardProps> = ({
  email,
  deviceId,
  date = new Date(),
}) => {
  const [times, setTimes] = useState<IDayScreenTime[]>([])
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0) // days from today
  const [rangeEndDayIndex, setRangeEndDayIndex] = useState<number>(0)
  const [rangeStartDayIndex, setRangeStartDayIndex] = useState<number>(6)
  const [visitedSites, setVisitedSites] = useState<IVisitedSite[]>([])
  const [allMostVisitedSitesDialogOpen, setAllMostVisitedSitesDialogOpen] =
    useState<boolean>(false)

  useAuth(email)

  const device = useDevice(deviceId)

  useEffect(() => {
    if (!device?.id) return

    ApiController.getStats(
      device.id,
      dayjs(date).subtract(3, 'days').format('YYYY-MM-DD'),
      dayjs(date).add(3, 'days').format('YYYY-MM-DD')
    ).then((stats) => {
      setTimes(stats.screenTime)

      setVisitedSites(
        _.sortBy(
          stats.visitedWebsites?.find(
            (w: any) => w.date === dayjs(date).format('YYYY-MM-DD')
          )?.websites || [],
          (t) => t.screenTime
        )
      )
    })
  }, [device, rangeStartDayIndex, rangeEndDayIndex, selectedDayIndex])

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
      <AstroBentoCard
        title="Most visited sites today"
        notCollapsible
        paddingBottom="0"
        isMobile={isMobile}
        topRightStuff={
          <UrsorButton
            size="small"
            variant="secondary"
            onClick={() => setAllMostVisitedSitesDialogOpen(true)}
          >
            View all
          </UrsorButton>
        }
      >
        {visitedSites.length === 0 ? (
          <InsightsTabEmptyStateIndicator
            imageSrc="https://ursorassets.s3.eu-west-1.amazonaws.com/windowsNodata.svg"
            width={isMobile ? 110 : 129}
            height={isMobile ? 43 : 51}
            isMobile={isMobile}
          />
        ) : (
          _.reverse(visitedSites.slice(-3)).map((site, i) => (
            <UrsorFadeIn key={site.url} delay={i * 90} duration={800}>
              <VisitedSiteRow
                {...site}
                maxScreenTime={
                  _.max(visitedSites.map((s) => s.screenTime)) ?? 1
                }
                borderTop={i > 0}
              />
            </UrsorFadeIn>
          ))
        )}
      </AstroBentoCard>

      <AllMostVisitedSitesDialog
        sites={visitedSites}
        open={allMostVisitedSitesDialogOpen}
        onClose={() => setAllMostVisitedSitesDialogOpen(false)}
        isMobile={isMobile}
      />
    </>
  )
}

export default DeviceMostVisitedSitesCard
