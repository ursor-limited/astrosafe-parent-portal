import AstroSwitch from '@/app/components/AstroSwitch';
import { Stack } from '@mui/system';

import React from 'react';
import { PALETTE, Typography } from '@/ui';

const AstroToggleCard = (props: {
  on: boolean;
  callback: () => void;
  title: string;
  subtitle?: string;
  image?: React.ReactNode;
}) => (
  <Stack
    height="72px"
    bgcolor="rgb(255,255,255)"
    borderRadius="12px"
    border={`1px solid ${PALETTE.secondary.grey[2]}`}
    px="16px"
    boxSizing="border-box"
    justifyContent="space-between"
    alignItems="center"
    direction="row"
  >
    <Stack justifyContent="space-between">
      <Stack spacing="16px" alignItems="center" direction="row">
        {props.image}
        <Stack>
          <Typography maxLines={1} bold>
            {props.title}
          </Typography>
          {props.subtitle ? (
            <Typography variant="small">{props.subtitle}</Typography>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
    <AstroSwitch on={props.on} callback={props.callback} />
  </Stack>
);

export default AstroToggleCard;
