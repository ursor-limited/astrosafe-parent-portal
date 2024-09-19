import React, { useState, useEffect } from 'react'
import { AstroBentoCard } from '../../../filter/components/AstroBentoCard'
import AstroTimeChart from '../../../profile/components/AstroTimeChart'
import { Stack } from '@mui/system'
import { Typography } from '../../../ui'
import { ReactComponent as ChevronRightIcon } from '../../../images/ChevronRight.svg'
import { ReactComponent as ChevronLeftIcon } from '../../../images/ChevronLeft.svg'
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

dayjs.extend(utc)

interface DeviceScreenTimeCardProps {
  email: string
  deviceId: string
}

const DeviceScreenTimeCard: React.FC<DeviceScreenTimeCardProps> = ({
  email,
  deviceId,
}) => {
  const [times, setTimes] = useState<IDayScreenTime[]>([])
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0) // days from today
  const [rangeEndDayIndex, setRangeEndDayIndex] = useState<number>(0)
  const [rangeStartDayIndex, setRangeStartDayIndex] = useState<number>(6)

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
    })
  }, [device?.id, rangeStartDayIndex, rangeEndDayIndex, selectedDayIndex])

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
    <Stack spacing="12px" width="100%">
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
                : `${dayjs().subtract(selectedDayIndex, 'days').format('dddd')}`
            }, ${dayjs().subtract(selectedDayIndex, 'days').format('Do MMMM')}`}
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
    </Stack>
  )
}

export default DeviceScreenTimeCard
