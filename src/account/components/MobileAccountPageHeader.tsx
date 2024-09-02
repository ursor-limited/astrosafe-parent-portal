import React from 'react';
import { Stack } from '@mui/system';
import { VIBRANT_GRADIENT } from '../contents/common';
import { PALETTE, Typography, UrsorButton } from './../../ui';
import { ReactComponent as VerifiedIcon } from './../../images/VerifiedIcon.svg';

const MobileAccountPageHeader = (props: {
  setUpgradeDialogOpen: () => void;
  isMobile?: boolean;
  smallerFont?: boolean;
}) => (
  <Stack
    minHeight={props.isMobile ? '107px' : '71px'}
    direction="row"
    alignItems="space-between"
    sx={{
      background: VIBRANT_GRADIENT,
    }}
    borderRadius="12px"
    overflow="hidden"
    spacing={props.smallerFont || props.isMobile ? '12px' : undefined}
    width="100%"
  >
    <Stack spacing="16px" direction="column" p="12px" boxSizing="border-box">
      <Typography bold color="rgb(255,255,255)">
        Upgrade to a Family or School account to get unlimited access!
      </Typography>
      <UrsorButton
        dark
        endIcon={VerifiedIcon}
        iconSize={15}
        size="small"
        backgroundColor="rgb(255,255,255)"
        fontColor={PALETTE.primary.navy}
        hoverOpacity={0.7}
        onClick={props.setUpgradeDialogOpen}
      >
        Upgrade
      </UrsorButton>
    </Stack>
    <Stack justifyContent="flex-end" alignItems="flex-end">
      <img
        src="https://ursorassets.s3.eu-west-1.amazonaws.com/ELLIPSE!.png"
        height={95}
        width={84}
        alt="upgrade"
      />
    </Stack>
  </Stack>
);

export default MobileAccountPageHeader;
