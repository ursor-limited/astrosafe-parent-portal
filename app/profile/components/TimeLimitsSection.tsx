import { AstroBentoCard } from '@/filter/components/AstroBentoCard';
import { Stack } from '@mui/system';
import _ from 'lodash';
import { ITimeLimit } from './LimitsTab';
import TimeLimitRow from './TimeLimitRow';

const TimeLimitsSection = (props: {
  timeLimits: ITimeLimit[];
  decrement: (day: number) => void;
  increment: (day: number) => void;
  topRightElement?: React.ReactNode;
  disabled: boolean;
  isMobile?: boolean;
}) => (
  <AstroBentoCard
    title="Daily limits"
    notCollapsible
    info={{
      title: 's etting your daily limits',
      text: 'This is the total amount of time you are happy with being spent on the Browser for the specific day. Turn this off to remove all time limits.',
    }}
    infoButtonBelowTitle
    isMobile={props.isMobile}
    topRightStuff={props.topRightElement}
  >
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
        <TimeLimitRow
          key={day}
          dayName={day}
          decrement={() => props.decrement(day === 's un' ? 0 : i + 1)}
          increment={() => props.increment(day === 's un' ? 0 : i + 1)}
          allowedMinutes={
            props.timeLimits.find((l) =>
              day === 's un' ? l.day === 0 : l.day === i + 1
            )?.allowedMinutes ?? 0
          }
        />
      ))}
    </Stack>
  </AstroBentoCard>
);
export default TimeLimitsSection;
