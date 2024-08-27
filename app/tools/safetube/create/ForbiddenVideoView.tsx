import { Stack } from '@mui/system';
import { useState } from 'react';
import ChevronLeft from '@/images/icons/ChevronLeft.svg';
import { PALETTE, Typography, UrsorButton } from '@/ui';
import { useRouter } from 'next/navigation';

export default function ForbiddenVideoView() {
  const [url, setUrl] = useState<string>('');
  const navigate = useNavigate();
  return (
    <Stack
      height="100vh"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      spacing="36px"
    >
      <Stack
        sx={{
          background: 'linear-gradient(76deg, #F279C5, #FD9B41)',
          '-webkit-text-fill-color': 'transparent',
          backgroundClip: 'text',
          '-webkit-background-clip': 'text',
        }}
      >
        <Typography variant="h1">Ooooops...</Typography>
      </Stack>
      <Stack spacing="5px" alignItems="center">
        <Typography variant="medium" bold color="rgba(255,255,255,0.65)">
          Unfortunately, the video owner has opted out of this video being
          embedded.
        </Typography>
        <Typography variant="medium" bold color="rgba(255,255,255,0.65)">
          Please try another video.
        </Typography>
      </Stack>
      <UrsorButton
        size="large"
        dark
        variant="tertiary"
        onClick={() => navigate('/tools/safetube')}
        startIcon={ChevronLeft}
      >
        Back to Creation
      </UrsorButton>
      {/* <Stack direction="row" width="50%" spacing="20px">
        <UrsorInputField
          value={url}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUrl(event.target.value)
          }
          placeholder="Paste in a YouTube or Vimeo URL"
          width="100%"
          backgroundColor={INPUT_FIELD_BACKGROUND_COLOR}
          color={INPUT_FIELD_TEXT_COLOR}
          backgroundBlur="blur(3px)"
          boldValue
          leftAlign
        />
        <Stack
          sx={{
            opacity: url ? 1 : 0.5,
            pointerEvents: url ? undefined : "none",
          }}
        >
          <UrsorButton
            dark
            variant="tertiary"
            onClick={() =>
              navigate(`/video/create?url=${encodeURIComponent(url)}`)
            }
            backgroundColor="linear-gradient(150deg, #F279C5, #FD9B41)"
            hoverOpacity={0.7}
            endIcon={ChevronRight}
            iconColor={PALETTE.font.light}
          >
            {"Let's go again"}
          </UrsorButton>
        </Stack>
      </Stack> */}
    </Stack>
  );
}
