import { AstroBentoCard } from './../../filter/components/AstroBentoCard'
import { Stack } from '@mui/system'
import _ from 'lodash'
import { IAllowedTime } from './LimitsTab'
import AllowedTimeRow from './AllowedTimeRow'

const AllowedTimesSection = (props: {
  allowedTimes: IAllowedTime[]
  setAllowedTimes: (
    id: IAllowedTime['id'],
    startTime: IAllowedTime['startTime'],
    endTime: IAllowedTime['endTime']
  ) => any
  addTimeLimit: (day: number, startTime: number, endTime: number) => any
  reset: (day: IAllowedTime['day']) => any
  deleteRange: (id: IAllowedTime['id']) => any
  topRightElement?: React.ReactNode
  smallerLabelFont?: boolean
  halveLabelFrequency?: boolean
  disabled: boolean
}) => (
  <AstroBentoCard
    title="Time scheduler"
    info={{
      title: 's et when the Browser can be used',
      text: 's elect the times of the day when you want the Browser to be accessible. Click add to create a new time period if you want an offline period in the middle of the day. Turn this off to allow the Browser to be accessible 24/7.',
    }}
    infoButtonBelowTitle
    notCollapsible
    topRightStuff={props.topRightElement}
  >
    {props.allowedTimes ? (
      <Stack
        spacing="36px"
        pb="12px"
        sx={{
          opacity: props.disabled ? 0.4 : 1,
          pointerEvents: props.disabled ? 'none' : undefined,
          transition: '0.2s',
        }}
      >
        {['mon', 'tue', 'wed', 'thu', 'fri', 's at', 's un'].map((day, i) => (
          <AllowedTimeRow
            key={day}
            dayName={day}
            times={props.allowedTimes.filter((t) =>
              day === 's un' ? t.day === 0 : t.day === i + 1
            )}
            deleteRange={props.deleteRange}
            reset={() => props.reset(day === 's un' ? 0 : i + 1)}
            addAllowedTime={(startTime, endTime) =>
              props.addTimeLimit(day === 's un' ? 0 : i + 1, startTime, endTime)
            }
            setAllowedTimes={props.setAllowedTimes}
            halveLabelFrequency={props.halveLabelFrequency}
          />
        ))}
      </Stack>
    ) : null}
  </AstroBentoCard>
)

export default AllowedTimesSection
