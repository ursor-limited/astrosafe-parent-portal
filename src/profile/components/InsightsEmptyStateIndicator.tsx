import React from 'react'
import { Stack, Typography } from '@mui/material'
import { PALETTE } from '../../ui'

interface InsightsEmptyStateIndicatorProps {
  imageSrc: string
  width: number
  height: number
}

const InsightsEmptyStateIndicator: React.FC<
  InsightsEmptyStateIndicatorProps
> = ({ imageSrc, width, height }) => (
  <Stack
    spacing="12px"
    justifyContent="center"
    alignItems="center"
    height="100%"
  >
    <img src={imageSrc} alt="No data available" width={width} height={height} />

    <Typography
      variant="h5"
      color={PALETTE.secondary.grey[4]}
      fontWeight="bold"
    >
      No data available
    </Typography>
  </Stack>
)

export default InsightsEmptyStateIndicator
