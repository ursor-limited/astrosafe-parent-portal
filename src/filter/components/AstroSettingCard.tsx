import AstroSwitch from './../../components/AstroSwitch';
import { Stack } from '@mui/system';

import React from 'react';
import { PALETTE, Typography } from './../../ui';

export interface IAstroSettingCardProps {
  title: string;
  subtitle?: string;
  image?: React.ReactNode;
  rightContent?: React.ReactNode;
  textColor?: string;
}

const AstroSettingCard = (props: IAstroSettingCardProps) => (
  <Stack
    height="54px"
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
      <Stack spacing="8px" alignItems="center" direction="row">
        {props.image}
        <Stack>
          <Typography maxLines={1} bold color={props.textColor}>
            {props.title}
          </Typography>
          {props.subtitle ? (
            <Typography maxLines={1} variant="small" color={props.textColor}>
              {props.subtitle}
            </Typography>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
    {props.rightContent}
  </Stack>
);

export default AstroSettingCard;
