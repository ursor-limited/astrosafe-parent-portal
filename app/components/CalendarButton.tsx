import ChevronDownIcon from '@/images/icons/ChevronDown.svg';
import { Stack } from '@mui/system';
import UrsorPopover from './UrsorPopover';
import { useState } from 'react';
import { Typography } from '@/ui';
import UrsorCalendar from './UrsorCalendar';

export interface IInfoButtonProps {
  title: string;
  body: string;
}

const CalendarButton = (props: {
  value: Date;
  setValue: (date: Date) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <UrsorPopover
      open={open}
      content={
        <UrsorCalendar
          value={props.value}
          onChange={(value: Date) => {
            setOpen(false);
            props.setValue(value);
          }}
          disableFuture
        />
      }
      closeCallback={() => setOpen(false)}
      placement='right'
      noPadding
    >
      <Stack
        bgcolor='rgb(255,255,255)'
        height='32px'
        alignItems='center'
        borderRadius='8px'
        pl='12px'
        pr='8px'
        boxSizing='border-box'
        spacing='8px'
        direction='row'
        sx={{
          cursor: 'pointer',
          transition: '0.2s',
          '&:hover': { opacity: 0.6 },
        }}
        onClick={() => setOpen(true)}
      >
        <Typography variant='small' bold>
          Select date
        </Typography>
        <ChevronDownIcon height='20px' width='20px' />
      </Stack>
    </UrsorPopover>
  );
};

export default CalendarButton;
