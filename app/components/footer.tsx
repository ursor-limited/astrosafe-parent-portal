import { Stack } from '@mui/system';
import Kitemark from '@/images/kiteMark.svg';
import Image from 'next/image';
import Link from 'next/link';
import { PALETTE, Typography, UrsorButton } from '@/ui';
import FooterBackground from '@/images/footerBackground.png';
import FooterScreenshot from '@/images/footerScreenshot.png';
import { useRouter } from 'next/navigation';

export const HEADER_HEIGHT = 86;

export const Footer = (props: { fontScale: number }) => {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      width="100%"
      height="100vh"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      px="32px"
    >
      <Stack
        maxWidth="1100px"
        width="100%"
        minHeight={`${props.fontScale * 670}px`}
        pt={`${props.fontScale * 80}px`}
        borderRadius="16px"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          backgroundImage: `url(${FooterBackground.src})`,
          backgroundSize: 'cover',
          boxSizing: 'border-box',
        }}
      >
        <Stack spacing="20px" alignItems="center">
          <Stack
            sx={{
              background: 'linear-gradient(172deg, #F279C5, #1D62F6)',
              '-webkit-text-fill-color': 'transparent',
              backgroundClip: 'text',
              '-webkit-background-clip': 'text',
            }}
            alignItems="center"
          >
            <Stack width="70%" sx={{ textAlign: 'center' }}>
              <Typography
                variant="h2"
                color={PALETTE.secondary.purple[2]}
                scale={props.fontScale}
                sx={{
                  fontWeight: 490,
                }}
              >
                SafeTube is a tool built by AstroSafe to help make the classroom
                a little bit safer.
              </Typography>
            </Stack>
          </Stack>
          <Stack maxWidth="40%" sx={{ textAlign: 'center' }}>
            <Typography
              bold
              variant="large"
              color={PALETTE.secondary.grey[4]}
              scale={props.fontScale}
            >
              Sign up to store your videos in a dashboard and create unlimited
              videos.
            </Typography>
          </Stack>
        </Stack>
        <Stack pt="12px" alignItems="center" spacing="3px">
          <UrsorButton
            size="large"
            endIcon={Kitemark}
            startIcon={Kitemark}
            iconSize={10}
            iconColor="rgba(255,255,255,0.6)"
            onClick={() => navigate('/dashboard')}
          >
            Start creating safe video links
          </UrsorButton>
          <Typography variant="small" color="rgba(0,0,0,0.4)">
            No payment or credit card required.
          </Typography>
        </Stack>
        <Stack alignItems="center" pt="5px">
          <img
            src={
              'https://ursorassets.s3.eu-west-1.amazonaws.com/safetubeFooterScreenshot.png'
            }
            loader={({ src }) => {
              return src;
            }}
            width={props.fontScale * 415}
            height={props.fontScale * 300}
            alt="Screenshot"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
