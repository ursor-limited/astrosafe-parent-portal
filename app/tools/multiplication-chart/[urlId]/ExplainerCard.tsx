import { Stack } from '@mui/system';
import Image from 'next/image';
import { PALETTE, Typography } from '@/ui';

export default function ExplainerCard(props: {
  title: string;
  imageUrl: string;
  text: string;
}) {
  return (
    <Stack
      width='313px'
      height='425px'
      bgcolor={PALETTE.secondary.grey[1]}
      borderRadius='12px'
      justifyContent='space-between'
      overflow='hidden'
    >
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Image
          src={props.imageUrl}
          style={{ objectFit: 'cover' }}
          fill
          alt='explainer card image'
        />
      </div>
      {/* <Stack
        height="242px"
        width="100%"
        sx={{
          backgroundImage: `url(${props.imageUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      /> */}
      <Stack
        flex={1}
        spacing='16px'
        px='12px'
        py='12px'
        boxSizing='border-box'
        minHeight='182px'
      >
        <Typography htmlTag='h4' bold variant='h5'>
          {props.title}
        </Typography>
        <Typography>{props.text}</Typography>
      </Stack>
    </Stack>
  );
}
