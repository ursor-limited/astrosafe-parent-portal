import React, { useState } from 'react';
import { Stack } from '@mui/system';
import ChevronDown from './../images/icons/ChevronDown.svg';
import X from './../images/icons/X.svg';
import { PALETTE } from './../ui';
import { Typography } from './../ui';
import UrsorPopover from './UrsorPopover';

export interface IUrsorSelectItem {
  id: string;
  value: string;
}

export interface IUrsorSelectProps {
  items: IUrsorSelectItem[];
  selected: string[];
  placeholder?: string;
  retainPlaceholder?: boolean; // keep it on even when the list is open
  leftAlign?: boolean;
  leftAlignPopover?: boolean;
  keepOpenOnSelect?: boolean;
  width?: number | string;
  fieldWidth?: string;
  white?: boolean;
  callback: (id: string) => void;
  clearAllCallback?: () => void;
  listButtons?: {
    title: string;
    callback: () => void;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    color?: string;
  }[];
  disabled?: boolean;
  zIndex?: number;
}

export default function UrsorSelect(props: IUrsorSelectProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [hoveringRowId, setHoveringRowId] = useState<string | undefined>(
    undefined
  );
  const list = (
    <Stack width={props.width} px="20px" pt="10px" pb="5px">
      {props.listButtons?.map((lb, i) => (
        <Stack
          key="button"
          onClick={() => {
            lb.callback();
            setOpen(false);
          }}
          height={i > 0 ? '43px' : '38px'}
          alignItems="center"
          onMouseEnter={() => setHoveringRowId('button')}
          onMouseLeave={() => setHoveringRowId('button')}
          sx={{
            cursor: 'pointer',
            '&:hover': { opacity: 0.6 },
            transition: '0.2s',
            svg: {
              path: {
                fill: lb.color || PALETTE.secondary.purple[2],
              },
            },
          }}
          direction="row"
          spacing="8px"
          borderBottom={
            props.items.length > 0
              ? `2px solid ${PALETTE.secondary.grey[1]}`
              : undefined
          }
          pb={i === 0 ? '6px' : 0}
          //pt={i > 0 ? "10px" : 0}
        >
          <Typography
            bold
            noWrap
            color={lb.color || PALETTE.secondary.purple[2]}
          >
            {lb.title}
          </Typography>
          <lb.icon height="14px" width="14px" />
        </Stack>
      ))}
      {props.items.map((item) => (
        <Stack
          key={item.id}
          onClick={() => {
            props.callback(item.id);
            !props.keepOpenOnSelect && setOpen(false);
          }}
          height="38px"
          justifyContent="center"
          onMouseEnter={() => setHoveringRowId(item.id)}
          onMouseLeave={() => setHoveringRowId(item.id)}
          sx={{
            cursor: 'pointer',
            '&:hover': { opacity: 0.6 },
            transition: '0.2s',
          }}
        >
          <Typography
            bold
            noWrap
            // color={
            //   hoveringRowId === item.id
            //     ? PALETTE.secondary.grey[3]
            //     : PALETTE.font.dark
            // }
          >
            {item.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );

  const getDisplayValue = () => {
    if (props.retainPlaceholder) {
      return props.placeholder;
    }
    return props.selected.length > 0
      ? props.items.find((item) => props.selected.includes(item.id))?.value
      : '';
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={
        props.disabled
          ? {
              pointerEvents: 'none',
            }
          : {
              //pointerEvents: props.disabled ? "none" : undefined,
              transition: '0.2s',
              '&:hover': { opacity: 0.7 },
            }
      }
      width={props.width}
    >
      <UrsorPopover
        open={open}
        content={list}
        closeCallback={() => setOpen(false)}
        clickableFloatedButton
        noPadding
        placement={props.leftAlignPopover ? 'left' : undefined}
        width={props.width ?? '100%'}
        fieldWidth={props.fieldWidth}
        noFloatButton
        disabled={props.disabled}
        zIndex={props.zIndex}
      >
        <Stack
          sx={{ cursor: 'pointer' }}
          position="relative"
          width="100%"
          height="44px"
          direction="row"
          bgcolor={props.white ? 'rgb(255,255,255)' : PALETTE.secondary.grey[1]}
          borderRadius="8px"
          pl="12px"
          boxSizing="border-box"
          alignItems="center"
          //onClick={() => setOpen(true)}
        >
          <Stack
            height="100%"
            width="100%"
            justifyContent="center"
            onClick={() => setOpen(true)}
          >
            <Typography
              bold
              color={
                getDisplayValue()
                  ? PALETTE.font.dark
                  : PALETTE.secondary.grey[3]
              }
            >
              {getDisplayValue()}
            </Typography>
          </Stack>

          <Stack
            height="100%"
            width="35px"
            justifyContent="center"
            pr="6px"
            sx={{
              '&:hover': { opacity: 0.5 },
              transition: '0.2s',
              cursor: 'pointer',
              svg: {
                path: {
                  fill: PALETTE.secondary.grey[3],
                },
              },
            }}
            onClick={() =>
              props.clearAllCallback && props.selected.length > 0
                ? null
                : setOpen(true)
            }
          >
            {props.clearAllCallback && props.selected.length > 0 ? (
              <X
                onClick={props.clearAllCallback}
                style={{
                  transform: 's cale(0.7)',
                }}
              />
            ) : (
              <ChevronDown
                style={{
                  transform: 's cale(0.7)',
                }}
              />
            )}
          </Stack>
        </Stack>
      </UrsorPopover>
    </Stack>
  );
}
