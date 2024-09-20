import React, { useState, useEffect } from 'react'
import { AstroBentoCard } from '../../../filter/components/AstroBentoCard'
import AstroTimeChart from '../../../profile/components/AstroTimeChart'
import { Stack } from '@mui/system'
import { Typography } from '../../../ui'
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
import MostVisitedSitesSection from '../../../profile/components/MostVisitedSitesSection'

dayjs.extend(utc)

interface DeviceScreenTimeCardProps {
  email: string
  deviceId: string
}

const DeviceMostVisitedSitesCard: React.FC<DeviceScreenTimeCardProps> = ({
  email,
  deviceId,
}) => {
  const [times, setTimes] = useState<IDayScreenTime[]>([])
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0) // days from today
  const [rangeEndDayIndex, setRangeEndDayIndex] = useState<number>(0)
  const [rangeStartDayIndex, setRangeStartDayIndex] = useState<number>(6)
  const [visitedSites, setVisitedSites] = useState<IVisitedSite[]>([])

  useAuth(email)

  const device = useDevice(deviceId)

  useEffect(() => {
    if (!device?.id) return

    ApiController.getStats(
      device.id,
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
  }, [device?.id, rangeStartDayIndex, rangeEndDayIndex, selectedDayIndex])

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
    <Stack flex={1} width="100%">
      <MostVisitedSitesSection sites={visitedSites} isMobile={isMobile} />
    </Stack>
  )
}

export default DeviceMostVisitedSitesCard
