import React from 'react';
import { Stack } from '@mui/system';
import ChevronRightIcon from './../images/icons/ChevronRight.svgimages/icons/ChevronRight.svg';
import ChevronLeftIcon from './../images/icons/ChevronLeft.svgimages/icons/ChevronLeft.svg';
import { PALETTE, Typography } from './../ui';

const PageSelector = (props: {
  pageIndex: number;
  nPages: number;
  setPageIndex: (index: number) => void;
}) => {
  return (
    <Stack
      direction="row"
      spacing="4px"
      alignItems="center"
      justifyContent="center"
    >
      {[
        <Stack
          key="left"
          sx={{
            cursor: 'pointer',
            transition: '0.2s',
            '&:hover': { opacity: 0.7 },
            pointerEvents: props.pageIndex === 0 ? 'none' : undefined,
            opacity: props.pageIndex === 0 ? 0.3 : 1,
          }}
          onClick={() => props.setPageIndex(props.pageIndex - 1)}
          width="30px"
          height="30px"
          justifyContent="center"
          alignItems="center"
        >
          <ChevronLeftIcon height="15px" width="15px" />
        </Stack>,
        ...[...Array(props.nPages).keys()].map((i) => (
          <Stack
            key={i}
            sx={{
              cursor: 'pointer',
              transition: '0.2s',
              '&:hover': { opacity: 0.7 },
              pointerEvents: props.pageIndex === i ? 'none' : undefined,
            }}
            onClick={() => props.setPageIndex(i)}
            width="30px"
            height="30px"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              bold
              sx={{ fontSize: 14 }}
              color={
                i === props.pageIndex
                  ? PALETTE.secondary.purple[2]
                  : PALETTE.secondary.grey[3]
              }
            >
              {i + 1}
            </Typography>
          </Stack>
        )),
        <Stack
          key="right"
          sx={{
            cursor: 'pointer',
            transition: '0.2s',
            '&:hover': { opacity: 0.7 },
            pointerEvents:
              props.pageIndex === props.nPages - 1 ? 'none' : undefined,
            opacity: props.pageIndex === props.nPages - 1 ? 0.3 : 1,
          }}
          onClick={() => props.setPageIndex(props.pageIndex + 1)}
          width="30px"
          height="30px"
          justifyContent="center"
          alignItems="center"
        >
          <ChevronRightIcon height="15px" width="15px" />
        </Stack>,
      ]}
    </Stack>
  );
};

export default PageSelector;
