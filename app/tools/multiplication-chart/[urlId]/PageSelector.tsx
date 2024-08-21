import { Stack } from '@mui/system';
import { PALETTE, Typography } from '@/ui';
import ChevronLeft from '@/images/icons/ChevronLeft.svg';
import ChevronRight from '@/images/icons/ChevronRight.svg';

export default function PageSelector(props: {
  pageIndex: number;
  nPages: number;
  back: () => void;
  forward: () => void;
}) {
  return (
    <Stack
      direction='row'
      spacing='7px'
      sx={{
        svg: {
          cursor: 'pointer',
          '&:hover': { opacity: 0.7 },
          transition: '0.2s',
          path: {
            fill: PALETTE.secondary.grey[4],
          },
        },
      }}
      justifyContent='center'
      alignItems='center'
    >
      <Stack
        sx={{
          opacity: props.pageIndex === 0 ? 0.28 : 1,
          pointerEvents: props.pageIndex === 0 ? 'none' : undefined,
        }}
        onClick={props.back}
      >
        <ChevronLeft height='16px' width='16px' />
      </Stack>
      <Typography variant='small' color={PALETTE.secondary.grey[3]}>{`Page ${
        props.pageIndex + 1
      } of ${props.nPages}`}</Typography>
      <Stack
        sx={{
          opacity: props.pageIndex === props.nPages - 1 ? 0.28 : 1,
          pointerEvents:
            props.pageIndex === props.nPages - 1 ? 'none' : undefined,
        }}
        onClick={props.forward}
      >
        <ChevronRight height='16px' width='16px' />
      </Stack>
    </Stack>
  );
}
