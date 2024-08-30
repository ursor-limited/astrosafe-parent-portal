import React from 'react';
import { Stack } from '@mui/system';
import UrsorPopover from './UrsorPopover';
import { PALETTE, Typography } from './../ui';
import ChevronDown from './../images/icons/ChevronDown.svg';
import { useState } from 'react';

import { ITitleRowItem } from './TitleRow';

const MobileTitleRowItemCore = (
  props: ITitleRowItem & { last: boolean; isMobile?: boolean }
) => {
  const [open, setOpen] = useState<boolean>(false);
  const ActualItem = (
    <Stack
      direction="row"
      spacing={props.isMobile ? '6px' : '12px'}
      onClick={() => {
        setOpen(true);
        props.callback?.();
      }}
      alignItems="flex-end"
    >
      {props.image}
      <Stack justifyContent="center">
        <Typography
          bold
          variant={props.isMobile ? 'medium' : 'h4'}
          color={!props.last ? PALETTE.secondary.grey[3] : undefined}
          maxLines={1}
          sx={{ wordBreak: 'break-all' }}
        >
          {props.text}
        </Typography>
      </Stack>
      {props.label ? (
        <Stack justifyContent="flex-end" height="100%">
          <Typography
            variant={props.isMobile ? 'tiny' : 'normal'}
            color={PALETTE.secondary.grey[4]}
          >
            {props.label}
          </Typography>
        </Stack>
      ) : null}
      {props.options && props.options.length > 0 ? (
        <ChevronDown
          height={props.isMobile ? '24px' : '32px'}
          width={props.isMobile ? '24px' : '32px'}
        />
      ) : null}
    </Stack>
  );
  return props.options ? (
    <UrsorPopover
      open={open}
      content={
        <Stack spacing="10px">
          {props.options?.map((o, i) => (
            <Stack
              key={i}
              direction="row"
              alignItems="center"
              spacing="8px"
              sx={{
                cursor: 'pointer',
                '&:hover': { opacity: 0.6 },
                transition: '0.2s',
              }}
              onClick={o.callback}
            >
              {o.imageUrl ? (
                <Stack borderRadius="100%" overflow="hidden">
                  <img
                    src={o.imageUrl}
                    height={20}
                    width={20}
                    alt="option image"
                  />
                </Stack>
              ) : null}
              <Typography bold>{o.text}</Typography>
            </Stack>
          ))}
        </Stack>
      }
      placement="left"
      closeCallback={() => setOpen(false)}
    >
      {ActualItem}
    </UrsorPopover>
  ) : (
    ActualItem
  );
};

export const MobileTitleRow = (props: { item: ITitleRowItem }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Stack direction="row" spacing="6px" alignItems="center">
      <Stack
        alignItems="center"
        direction="row"
        spacing="6px"
        sx={{
          cursor: 'pointer',
          transition: '0.2s',
          '&:hover': { opacity: 0.7 },
        }}
      >
        <UrsorPopover
          open={open}
          content={
            <Stack spacing="10px">
              {props.item.options?.map((o, i) => (
                <Stack
                  key={i}
                  direction="row"
                  alignItems="center"
                  spacing="8px"
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.6 },
                    transition: '0.2s',
                  }}
                  onClick={o.callback}
                >
                  {o.image ||
                    (o.imageUrl ? (
                      <Stack borderRadius="100%" overflow="hidden">
                        <img
                          src={o.imageUrl}
                          height={20}
                          width={20}
                          alt="option image"
                        />
                      </Stack>
                    ) : null)}
                  <Typography bold>{o.text}</Typography>
                </Stack>
              ))}
            </Stack>
          }
          placement="left"
          closeCallback={() => setOpen(false)}
        >
          <Stack
            direction="row"
            spacing="6px"
            onClick={() => {
              setOpen(true);
              props.item.callback?.();
            }}
            alignItems="center"
          >
            {/* {props.image} */}
            <Stack justifyContent="center">
              <Typography
                bold
                variant="medium"
                maxLines={1}
                sx={{ wordBreak: 'break-all' }}
              >
                {props.item.text}
              </Typography>
            </Stack>
            {props.item.options && props.item.options.length > 0 ? (
              <ChevronDown height="20px" width="20px" />
            ) : null}
          </Stack>
        </UrsorPopover>
      </Stack>
    </Stack>
  );
};

export default MobileTitleRow;
