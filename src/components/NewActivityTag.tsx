import React, { useState } from 'react';
import { Box, Stack } from '@mui/system';
import _ from 'lodash';
import { PALETTE, Typography } from './../ui';

export interface INewActivityTagProps {
  n?: number;
}

export default function NewActivityTag(props: INewActivityTagProps) {
  return (
    <Stack
      height={'20px'}
      width="100%"
      maxWidth="fit-content"
      direction="row"
      spacing={'5px'}
      borderRadius={'10px'}
      alignItems="center"
      bgcolor={PALETTE.system.orange}
      py="7px"
      px="11px"
      boxSizing="border-box"
    >
      <Box
        borderRadius="100%"
        bgcolor="rgb(255,255,255)"
        height="7.5px"
        width="7.5px"
      />
      <Typography
        variant={'tiny'}
        bold
        sx={{ lineHeight: '100%' }}
        color="rgb(255,255,255)"
        noWrap
      >
        {_.isNumber(props.n) ? `${props.n} New` : 'New'}
      </Typography>
    </Stack>
  );
}
