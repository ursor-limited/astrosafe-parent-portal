import AstroSwitch from './../../components/AstroSwitch';
import { Stack } from '@mui/system';

import React from 'react';
import { PALETTE, Typography } from './../../ui';
import CheckIcon from './../../images/icons/CheckIcon.svg';
import { IApp } from './AppsTab';
import { cleanUrl } from './MobileInsightsTab';

const AppToggleCard = (
  props: IApp & {
    callback: () => void;
  }
) => (
  <Stack
    bgcolor="rgb(255,255,255)"
    borderRadius="12px"
    border={`1px solid ${PALETTE.secondary.grey[2]}`}
    p="16px"
    boxSizing="border-box"
    alignItems="space-between"
    justifyContent="center"
    height="130px"
  >
    <Stack justifyContent="space-between" spacing="12px" flex={1}>
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <Stack spacing="16px" direction="row" flex={1}>
          <Stack position="relative">
            {props.enabled ? (
              <Stack
                position="absolute"
                top="-6px"
                right="-10px"
                width="20px"
                height="20px"
                bgcolor={PALETTE.secondary.green[4]}
                sx={{ svg: { path: { fill: 'rgb(255,255,255)' } } }}
                borderRadius="100%"
                overflow="hidden"
                border="1.5px solid white"
                justifyContent="center"
                alignItems="center"
              >
                <CheckIcon width="12px" height="12px" />
              </Stack>
            ) : null}
            <Stack
              borderRadius="8px"
              overflow="hidden"
              boxShadow="0 0 16px rgba(0,0,0,0.08)"
            >
              <img
                src={props.imageUrl}
                height={41}
                width={41}
                alt="platform image"
              />
            </Stack>
          </Stack>
          <Stack overflow="hidden">
            <Typography maxLines={1} bold>
              {props.title}
            </Typography>
            <Typography
              variant="small"
              bold
              color={PALETTE.secondary.grey[3]}
              maxLines={1}
              sx={{
                wordBreak: 'break-all',
              }}
            >
              {cleanUrl(props.url).replace(/\/$/, '')}
            </Typography>
          </Stack>
        </Stack>
        <AstroSwitch on={props.enabled} callback={props.callback} />
      </Stack>
      <Stack flex={1}>
        <Typography variant="small" bold color={PALETTE.secondary.grey[3]}>
          {props.description}
        </Typography>
      </Stack>
    </Stack>
  </Stack>
);

export default AppToggleCard;
