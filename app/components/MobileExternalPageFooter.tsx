import UrsorParticles from '@/app/components/UrsorParticles';
import { Stack, alpha } from '@mui/system';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PALETTE, Typography, UrsorButton } from '@/ui';
import Star from '@/images/Star.svg';

const MobileExternalPageFooter = () => {
  const router = useRouter();
  return (
    <Stack
      height='568px'
      borderRadius='20px'
      bgcolor={PALETTE.primary.navy}
      position='relative'
      overflow='hidden'
      boxShadow='0 0 18px rgba(0,0,0,0.08)'
    >
      <Stack
        position='absolute'
        top={0}
        left={0}
        height='100%'
        width='100%'
        sx={{
          '#tsparticles': {
            height: '100%',
          },
        }}
      >
        <UrsorParticles number={46} />
      </Stack>
      <Stack
        width='100%'
        px='40px'
        pt='40px'
        boxSizing='border-box'
        spacing='30px'
        justifyContent='center'
        zIndex={2}
        sx={{
          background: `linear-gradient(180deg, ${PALETTE.primary.navy}, ${
            PALETTE.primary.navy
          }, ${alpha(PALETTE.primary.navy, 0)})`,
        }}
      >
        <Typography
          variant='h4'
          color={PALETTE.font.light}
          sx={{
            textAlign: 'center',
          }}
        >
          Anyone can create digital lessons. Get started for free!
        </Typography>
        <Stack alignItems='center' spacing='4px'>
          <UrsorButton
            dark
            variant='tertiary'
            onClick={() => router.push('/dashboard')}
            endIcon={Star}
            iconSize={14}
            iconSpin
            iconColor='rgba(255,255,255,0.7)'
          >
            Start for free
          </UrsorButton>
          <Typography variant='small' color='rgba(255,255,255,0.75)'>
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
          <Image
            src='https://ursorassets.s3.eu-west-1.amazonaws.com/boo!.webp'
            style={{ objectFit: 'cover' }}
            fill
            alt='Footer image'
          />
        </div>
      </Stack>
    </Stack>
  );
};

export default MobileExternalPageFooter;