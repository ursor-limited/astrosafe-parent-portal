import { Stack } from '@mui/system';
import { useRouter } from 'next/navigation';
import { PALETTE, Typography } from '@/ui';

export const FooterList = (props: {
  title: string;
  items: { title: string; url: string }[];
  mobile?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <Stack spacing="15px" alignItems={props.mobile ? 'center' : undefined}>
      <Typography
        variant="medium"
        sx={{
          fontWeight: 500,
        }}
        color={PALETTE.font.dark}
      >
        {props.title}
      </Typography>
      <Stack
        spacing={props.mobile ? '8px' : '7px'}
        alignItems={props.mobile ? 'center' : undefined}
      >
        {props.items.map((p) => (
          <Stack key={p.url} onClick={() => navigate(p.url)}>
            <Typography
              variant="small"
              color={PALETTE.secondary.grey[4]}
              sx={{
                fontWeight: 390,
                '&:hover': { color: PALETTE.secondary.purple[2] },
                cursor: 'pointer',
                transition: '0.2s',
              }}
            >
              {p.title}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
