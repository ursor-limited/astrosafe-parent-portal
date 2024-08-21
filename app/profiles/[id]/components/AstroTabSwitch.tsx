import { Stack } from '@mui/system';
import { PALETTE, Typography } from '@/ui';

const AstroTabSwitch = (props: {
  items: { id: string; text: string }[];
  select: (id: string) => void;
  selected: string;
}) => (
  <Stack direction='row' spacing='12px'>
    {props.items.map((item) => (
      <Stack
        key={item.id}
        height='32px'
        px='12px'
        boxSizing='border-box'
        onClick={() => props.select(item.id)}
        borderRadius='8px'
        justifyContent='center'
        bgcolor='rgb(255,255,255)'
      >
        <Typography
          variant='small'
          bold
          color={
            props.selected === item.id ? PALETTE.secondary.purple[2] : undefined
          }
          sx={{
            cursor: 'pointer',
            '&:hover': { opacity: 0.6 },
            transition: '0.2s',
          }}
        >
          {item.text}
        </Typography>
      </Stack>
    ))}
  </Stack>
);

export default AstroTabSwitch;
