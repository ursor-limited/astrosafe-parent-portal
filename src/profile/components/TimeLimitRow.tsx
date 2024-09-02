import { Stack } from '@mui/system';
import TimeMinusIcon from './../../images/TimeMinusIcon.svgimages/icons/TimeMinusIcon.svg';
import TimePlusIcon from './../../images/TimePlusIcon.svgimages/icons/TimePlusIcon.svg';
import { PALETTE, Typography } from './../../ui';
import _ from 'lodash';
import { DAILY_LIMIT_INCREMENT, ITimeLimit } from './LimitsTab';
import { useEffect, useState } from 'react';

const TimeLimitRow = (props: {
  dayName: string;
  allowedMinutes: ITimeLimit['allowedMinutes'];
  decrement: () => void;
  increment: () => void;
}) => {
  const [decrementDisabled, setDecrementDisabled] = useState<boolean>(false);
  const [incrementDisabled, setIncrementDisabled] = useState<boolean>(false);
  useEffect(() => {
    setDecrementDisabled(props.allowedMinutes < DAILY_LIMIT_INCREMENT);
    setIncrementDisabled(
      props.allowedMinutes > 24 * 60 - DAILY_LIMIT_INCREMENT
    );
  }, [props.allowedMinutes]);
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="large" bold color={PALETTE.secondary.grey[3]}>
        {_.capitalize(props.dayName)}
      </Typography>
      <Stack direction="row" spacing="6px" alignItems="center">
        <Stack
          sx={{
            cursor: 'pointer',
            '&:hover': { opacity: 0.6 },
            transition: '0.2s',
            opacity: decrementDisabled ? 0.3 : 1,
            pointerEvents: decrementDisabled ? 'none' : undefined,
          }}
          onClick={props.decrement}
        >
          <TimeMinusIcon height="20px" width="20px" />
        </Stack>
        <Stack width="86px" alignItems="center">
          <Typography variant="large" bold>{`${Math.floor(
            Math.min((props.allowedMinutes ?? 0) / 60)
          )}:${(props.allowedMinutes ?? 0) % 60 || '00'} hr`}</Typography>
        </Stack>
        <Stack
          sx={{
            cursor: 'pointer',
            '&:hover': { opacity: 0.6 },
            transition: '0.2s',
            opacity: incrementDisabled ? 0.3 : 1,
            pointerEvents: incrementDisabled ? 'none' : undefined,
          }}
          onClick={props.increment}
        >
          <TimePlusIcon height="20px" width="20px" />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TimeLimitRow;
