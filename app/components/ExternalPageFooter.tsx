import UrsorParticles from '@/app/components/UrsorParticles';
import { Stack, alpha } from '@mui/system';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PALETTE, Typography, UrsorButton } from '@/ui';
import Star from '@/images/Star.svg';

const ExternalPageFooter = () => {
  const navigate = useNavigate();
  return (
    <Stack
      height="518px"
      borderRadius="20px"
      direction="row"
      bgcolor={PALETTE.primary.navy}
      position="relative"
      overflow="hidden"
      boxShadow="0 0 18px rgba(0,0,0,0.08)"
    >
      <Stack
        position="absolute"
        top={0}
        left={0}
        height="100%"
        width="100%"
        sx={{
          '#tsparticles': {
            height: '100%',
          },
        }}
      >
        <UrsorParticles number={22} />
      </Stack>
      <Stack
        width="50%"
        px="40px"
        boxSizing="border-box"
        spacing="30px"
        justifyContent="center"
        zIndex={2}
        sx={{
          background: `linear-gradient(90deg, ${PALETTE.primary.navy}, ${
            PALETTE.primary.navy
          }, ${alpha(PALETTE.primary.navy, 0)})`,
        }}
      >
        <Typography variant="h2" color={PALETTE.font.light}>
          Anyone can create digital lessons. Get started for free!
        </Typography>
        <Stack alignItems="center" width="206px" spacing="4px">
          <UrsorButton
            dark
            variant="tertiary"
            onClick={() => navigate('/dashboard')}
            endIcon={Star}
            iconSize={16}
            iconSpin
            iconColor="rgba(255,255,255,0.7)"
            size="large"
          >
            Start for free
          </UrsorButton>
          <Typography variant="small" color="rgba(255,255,255,0.75)">
            No payment required
          </Typography>
        </Stack>
      </Stack>
      <Stack flex={1}>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <img
            src="https://ursorassets.s3.eu-west-1.amazonaws.com/boo!.webp"
            style={{ objectFit: 'cover' }}
            fill
            alt="Footer image"
          />
        </div>
      </Stack>
    </Stack>
  );
};

export default ExternalPageFooter;
