import { Stack, alpha } from '@mui/system';
import { PALETTE, Typography } from '@/ui';

export const IntroBox = (props: {
  title: string;
  content: string;
  mobile?: boolean;
  backgroundOpacity: number;
}) => {
  return (
    <Stack
      width={props.mobile ? undefined : '277px'}
      height={props.mobile ? undefined : '116px'}
      boxSizing='border-box'
      borderRadius='16px'
      bgcolor={alpha(PALETTE.secondary.grey[3], props.backgroundOpacity || 1)}
      p={props.mobile ? '16px' : '24px'}
      alignItems='center'
      justifyContent={props.mobile ? 'center' : 'space-between'}
      sx={{
        backdropFilter: 'blur(2.5px)',
      }}
      spacing={props.mobile ? '5px' : undefined}
    >
      <Typography
        color={PALETTE.font.dark}
        variant={props.mobile ? 'normal' : 'medium'}
        bold
        sx={{ textAlign: 'center' }}
      >
        {props.title}
      </Typography>
      <Typography
        color={PALETTE.font.dark}
        variant='small'
        sx={{
          textAlign: 'center',
          fontSize: 12,
          lineHeight: '18px',
        }}
      >
        {props.content}
      </Typography>
    </Stack>
  );
};
