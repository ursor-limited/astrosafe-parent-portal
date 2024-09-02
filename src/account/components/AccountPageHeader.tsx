import { Stack } from '@mui/system';
import { VIBRANT_GRADIENT } from '../contents/common';
import { PALETTE, Typography, UrsorButton } from './../../ui';
import VerifiedIcon from './../../images/VerifiedIcon.svg';

const AccountPageHeader = (props: {
  setUpgradeDialogOpen: () => void;
  isMobile?: boolean;
  smallerFont?: boolean;
}) => (
  <Stack
    height={props.isMobile ? undefined : '71px'}
    px="24px"
    alignItems="center"
    direction={props.isMobile ? 'column' : 'row'}
    justifyContent="space-between"
    sx={{
      background: VIBRANT_GRADIENT,
    }}
    borderRadius="12px"
    pr="54px"
    spacing={props.smallerFont || props.isMobile ? '12px' : undefined}
  >
    <Stack
      spacing="16px"
      alignItems="center"
      direction={props.isMobile ? 'column' : 'row'}
    >
      <Typography
        variant={props.smallerFont || props.isMobile ? 'normal' : 'large'}
        bold
        color="rgb(255,255,255)"
      >
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
    <img
      src="https://ursorassets.s3.eu-west-1.amazonaws.com/Ellipse+399.png"
      height={71}
      width={245}
      alt="upgrade"
    />
  </Stack>
);

export default AccountPageHeader;
