import React, { useState } from 'react';
import { alpha, Box } from '@mui/system';
import Calendar from 'react-calendar';
import ChevronIcon from './../images/icons/ChevronLeftIcon.svgimages/icons/ChevronLeftIcon.svg';
import { PALETTE } from './../ui';
import dayjs from 'dayjs';
import DynamicContainer from './DynamicContainer';

export interface IUrsorCalendarProps {
  value: Date;
  hidePast?: boolean;
  disableFuture?: boolean;
  onChange: (newDate: Date) => void;
}

export default function UrsorCalendar(props: IUrsorCalendarProps) {
  const [viewMonthStartDate, setViewMonthStartDate] = useState<
    Date | undefined
  >(
    dayjs().isAfter(props.value)
      ? new Date()
      : new Date(props.value.getFullYear(), props.value.getMonth(), 1)
  );

  const showingCurrentMonth =
    viewMonthStartDate?.getMonth() === new Date().getMonth() &&
    viewMonthStartDate?.getFullYear() === new Date().getFullYear();

  return (
    <Box
      p="10px"
      pb="5px"
      width="320px"
      sx={{
        '.react-calendar__tile': {
          color: PALETTE.font.dark,
          transition: '0.2s',
          borderRadius: '100%',
          height: '42px',
          border: 'none',
          fontSize: 15,
          background: 'transparent',
          fontFamily: 'inherit',
          '&:hover': {
            opacity: 0.7,
          },
          cursor: 'pointer',
        },
        '.react-calendar__tile--active': {
          '> abbr': {
            color: 'white !important',
            background: PALETTE.secondary.purple[2],
            width: '36px',
            height: '34px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '100%',
          },
          '&:hover': {
            '> abbr': {
              background: PALETTE.secondary.purple[2],
            },
            opacity: 1,
          },
          cursor: 'default',
        },
        '.react-calendar__month-view__weekdays__weekday': {
          color: PALETTE.font.dark,
          fontSize: 13,
          fontWeight: 500,
          //opacity: 0.8,
          textAlign: 'center',
          textTransform: 'uppercase',
          '> abbr': {
            textDecoration: 'none !important',
            border: 'none !important',
          },
          pointerEvents: 'none',
        },
        '.react-calendar__navigation': {
          display: 'flex',
          marginBottom: '17px',
        },
        '.react-calendar__navigation__label': {
          color: PALETTE.font.dark,
          background: 'none',
          border: 'none',
          fontSize: 15,
          fontFamily: 'inherit',
        },
        '.react-calendar__navigation__arrow': {
          display: 'flex',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          '&:hover': { opacity: 0.6 },
          cursor: 'pointer',
          transition: '0.2s',
        },
        '.react-calendar__navigation__prev-button': {
          opacity: props.hidePast && showingCurrentMonth ? 0 : 1,
          pointerEvents:
            props.hidePast && showingCurrentMonth ? 'none' : 'auto',
        },
        '.hidePast': {
          opacity: 0.16,
          pointerEvents: 'none',
        },
        '.disableFuture': {
          opacity: 0.16,
          pointerEvents: 'none',
        },
      }}
    >
      <DynamicContainer duration={800}>
        <Calendar //@ts-ignore
          onChange={props.onChange}
          onActiveStartDateChange={(x: any) =>
            setViewMonthStartDate(x.activeStartDate)
          }
          value={props.value}
          prevLabel={<ChevronIcon height="20px" width="20px" />}
          nextLabel={
            <ChevronIcon
              height="20px"
              width="20px"
              style={{ transform: 'rotate(180deg)' }}
            />
          }
          prev2Label={null}
          next2Label={null}
          tileClassName={(tileProps) =>
            props.hidePast && dayjs().diff(tileProps.date, 'days') >= 1
              ? 'hidePast'
              : props.disableFuture &&
                dayjs(tileProps.date).isAfter(dayjs(), 'days')
              ? 'hidePast'
              : ''
          }
          maxDate={new Date()}
          minDetail="month"
        />
      </DynamicContainer>
    </Box>
  );
}
