import { Stack } from '@mui/system';
import { useState } from 'react';
import { PALETTE } from './../ui';
import SearchIcon from './../images/icons/SearchIcon.svgimages/icons/SearchIcon.svg';
import XIcon from './../images/icons/X.svg';
import { FONT_SIZES } from './../ui/typography';
import { Input } from '@mui/material';

export const SearchInput = (props: {
  value: string;
  callback: (value: string) => void;
  clearCallback: () => void;
  shadow?: boolean;
  fullWidth?: boolean;
  height?: string;
  grey?: boolean;
  iconSize?: string;
}) => {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  return (
    <Stack
      height={props.height || '28px'}
      width={props.fullWidth ? '100%' : '160px'}
      direction="row"
      borderRadius="8px"
      alignItems="center"
      bgcolor={props.grey ? PALETTE.secondary.grey[1] : 'rgb(255,255,255)'}
      px="10px"
      spacing="8px"
      boxSizing="border-box"
      sx={{
        svg: {
          path: {
            fill: PALETTE.secondary.grey[4],
          },
        },
        transition: '0.2s',
      }}
      border={`${active || hovering ? 2 : 0}px solid ${
        PALETTE.secondary.purple[active ? 2 : 1]
      }`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      boxShadow={props.shadow ? '0 0 16px rgba(0,0,0,0.03)' : undefined}
    >
      <SearchIcon
        width={props.iconSize || '24px'}
        height={props.iconSize || '24px'}
      />
      <Input
        style={{
          textAlign: 'left',
          textOverflow: 'ellipsis',
          fontSize: FONT_SIZES['small'],
          color: PALETTE.font.dark,
          fontWeight: 480,
          lineHeight: '100%',
          transition: '0.2s',
          fontFamily: 'inherit',
          width: props.fullWidth ? '100%' : undefined,
        }}
        value={props.value}
        disableUnderline
        sx={{
          background: props.grey
            ? PALETTE.secondary.grey[1]
            : 'rgb(255,255,255)',
          input: {
            padding: '0 !important',
          },
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.callback(event.target.value);
        }}
        placeholder="Search"
        onBlur={() => setActive(false)}
        onFocus={() => setActive(true)}
      />

      <Stack
        sx={{
          cursor: 'pointer',
          '&:hover': { opacity: 0.6 },
          transition: '0.2s',
          opacity: props.value ? 1 : 0,
        }}
        onClick={props.clearCallback}
      >
        <XIcon width="16px" height="16px" />
      </Stack>
    </Stack>
  );
};
