import { Stack } from '@mui/system';
import UrsorFadeIn from './UrsorFadeIn';

import { PALETTE, Typography } from './../ui';

const EmptyStateIllustration = (props: {
  paddingTop?: number;
  children: React.ReactNode;
}) => (
  <Stack
    height="100%"
    justifyContent="center"
    alignItems="center"
    sx={{
      pointerEvents: 'none',
      filter: 'grayscale(1)',
    }}
    zIndex={999}
  >
    <UrsorFadeIn delay={500} duration={800}>
      <Stack position="relative">
        <Stack sx={{ opacity: 0.3 }}>
          <img
            height={217}
            width={217}
            src="https://ursorassets.s3.eu-west-1.amazonaws.com/wondering_.png"
            alt="Empty state illustration"
          />
        </Stack>
        <Stack
          width="100%"
          alignItems="center"
          sx={{ transform: 'translateY(-12px)' }}
        >
          <Typography
            bold
            variant="medium"
            color={PALETTE.secondary.grey[3]}
            sx={{ textAlign: 'center' }}
          >
            {props.children}
          </Typography>
        </Stack>
      </Stack>
    </UrsorFadeIn>
  </Stack>
);

export default EmptyStateIllustration;
