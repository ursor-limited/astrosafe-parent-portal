'use client';

import { Stack } from '@mui/system';
import { useState } from 'react';
import { PALETTE } from '@/ui';
import { SecondaryColor } from '@/ui/palette';
import { ElementButton } from '../editor/Canvas';
import dynamic from 'next/dynamic';

const UrsorPopover = dynamic(
  () => import('@/app/components/UrsorPopover'),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export const SECONDARY_COLOR_ORDER: SecondaryColor[] = [
  'purple',
  'pink',
  'red',
  'orange',
  'yellow',
  'grey',
  'green',
  'blue',
];

const ColorSelectionCircle = (props: {
  color: string;
  selected: boolean;
  shadow?: boolean;
}) => (
  <Stack
    sx={{
      cursor: 'pointer',
      '&:hover': { transform: 'scale(1.2)' },
      transition: '0.2s',
    }}
    height='27px'
    width='27px'
    borderRadius='100%'
    bgcolor={props.color}
    justifyContent='center'
    alignItems='center'
    boxShadow={props.shadow ? '0 0 10px rgba(0,0,0,0.12)' : undefined}
  >
    <Stack
      position='relative'
      width={0}
      height={0}
      overflow='visible'
      sx={{ opacity: props.selected ? 1 : 0, transition: '0.2s' }}
    >
      <Stack
        position='absolute'
        sx={{
          transform: 'translate(-50%, -50%)',
          outline: `2px solid ${PALETTE.secondary.grey[3]}`,
        }}
        height='32px'
        width='32px'
        borderRadius='100%'
      />
    </Stack>
  </Stack>
);

const PaletteButton = (props: {
  selected: string;
  callback: (color: string) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Stack direction='row' spacing='6px' zIndex={2}>
      <UrsorPopover
        open={open}
        closeCallback={() => setOpen(false)}
        placement='left'
        content={
          <Stack
            spacing='16px'
            direction='row'
            width='100%'
            justifyContent='space-between'
          >
            {[
              ...SECONDARY_COLOR_ORDER.map((colorName) => (
                <Stack key={colorName} spacing='16px'>
                  {[...Array(4).keys()].map((i) => {
                    const c = PALETTE.secondary[colorName][i + 2].toUpperCase();
                    return (
                      <Stack
                        key={i}
                        onClick={() => {
                          props.callback(c);
                          setOpen(false);
                        }}
                      >
                        <ColorSelectionCircle
                          color={c}
                          selected={
                            props.selected.toLowerCase() === c.toLowerCase()
                          }
                        />
                      </Stack>
                    );
                  })}
                </Stack>
              )),
              <Stack
                key='white'
                onClick={() => {
                  props.callback('#ffffff');
                  setOpen(false);
                }}
              >
                <ColorSelectionCircle
                  color='#ffffff'
                  selected={props.selected.toLowerCase() === '#ffffff'}
                  shadow
                />
              </Stack>,
            ]}
          </Stack>
        }
      >
        <ElementButton
          callback={() => setOpen(true)}
          image={
            <Stack
              bgcolor={props.selected}
              borderRadius='100%'
              height='18px'
              width='18px'
              border='2px solid rgba(0,0,0,0.06)'
              //boxShadow="0 0 15px rgba(0,0,0,0.23)"
            />
          }
        />
        {/* <Stack
          height="29px"
          width="29px"
          border="5px solid rgb(255,255,255)"
          borderRadius="100%"
          boxSizing="border-box"
          bgcolor={props.selected}
          sx={{
            "&:hover": {
              opacity: 0.7,
            },
            transition: "0.2s",
            cursor: "pointer",
          }}
          boxShadow={"0 0 20px rgba(0,0,0,0.08)"}
          onClick={() => setOpen(true)}
        /> */}
      </UrsorPopover>
    </Stack>
  );
};

export default PaletteButton;
