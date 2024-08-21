import React, { useState } from 'react';
import { Switch } from '@mui/material';
import { PALETTE } from '@/ui';
import { boxShadow } from 'html2canvas/dist/types/css/property-descriptors/box-shadow';

export interface IUrsorToggle {
  checked: boolean;
  small?: boolean;
  callback: () => void;
}

const SWITCH_LENGTH = 50; // px
const SMALL_SWITCH_LENGTH = 31;
const SWITCH_HEIGHT = 24.5; // px
const SMALL_SWITCH_HEIGHT = 16;
const SWITCH_THUMB_MARGIN = 3;
const SMALL_SWITCH_THUMB_MARGIN = 1.6;

const SWITCH_THUMB_SIZE = SWITCH_HEIGHT - 2 * SWITCH_THUMB_MARGIN;
const SMALL_SWITCH_THUMB_SIZE =
  SMALL_SWITCH_HEIGHT - 2 * SMALL_SWITCH_THUMB_MARGIN;
const SWITCH_MOVEMENT_DISTANCE =
  SWITCH_LENGTH - SWITCH_THUMB_SIZE - 2 * SWITCH_THUMB_MARGIN;
const SMALL_SWITCH_MOVEMENT_DISTANCE =
  SMALL_SWITCH_LENGTH - SMALL_SWITCH_THUMB_SIZE - 2 * SMALL_SWITCH_THUMB_MARGIN;

export const getSwitchStyle = (small: boolean) => ({
  width: `${small ? SMALL_SWITCH_LENGTH : SWITCH_LENGTH}px`,
  height: `${small ? SMALL_SWITCH_HEIGHT : SWITCH_HEIGHT}px`,
  padding: 0,
  borderRadius: '50px',
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: `${small ? SMALL_SWITCH_THUMB_MARGIN : SWITCH_THUMB_MARGIN}px`,
    transition: '300ms',
    opacity: 1,
    '&:hover': {
      opacity: 0.6,
      transition: '300ms',
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: `${small ? SMALL_SWITCH_THUMB_SIZE : SWITCH_THUMB_SIZE}px`,
      height: `${small ? SMALL_SWITCH_THUMB_SIZE : SWITCH_THUMB_SIZE}px`,
      backgroundColor: PALETTE.primary.offWhite,
      boxShadow: 'none',
    },
    '& + .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: PALETTE.secondary.grey[4],
    },
    '&.Mui-checked': {
      transform: `translateX(${
        small ? SMALL_SWITCH_MOVEMENT_DISTANCE : SWITCH_MOVEMENT_DISTANCE
      }px)`,
      '& .MuiSwitch-thumb': {
        backgroundColor: PALETTE.primary.offWhite,
      },
      '& + .MuiSwitch-track': {
        backgroundColor: PALETTE.system.green,
        opacity: 1,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '.MuiTouchRipple-child': {
      display: 'none',
    },
  },
});

export default function UrsorToggle(props: IUrsorToggle) {
  return (
    <Switch
      sx={getSwitchStyle(!!props.small)}
      checked={props.checked}
      //   icon={getSwitchIcon(true)}
      //   checkedIcon={getSwitchIcon(false)}
      onChange={props.callback}
    />
  );
}
