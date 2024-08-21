'use client';

import { Stack } from '@mui/system';
import { Grid } from '@mui/material';
import { PALETTE, Typography } from '@/ui';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const Keywords = (props: {
  links: { title: string; url: string }[];
  mobile: boolean;
}) => {
  const router = useRouter();
  return (
    <Stack width='100%' position='relative' alignItems='center'>
      <Grid
        container
        gap='10px'
        width={props.mobile ? '90%' : '60%'}
        justifyContent='center'
      >
        {props.links.map((link, i) => (
          <Grid item key={i}>
            <Link href={link.url} style={{ textDecoration: 'none' }}>
              <Stack
                borderRadius='16px'
                bgcolor={PALETTE.secondary.grey[1]}
                height='32px'
                px='24px'
                justifyContent='center'
                sx={{
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.6 },
                  transition: '0.2s',
                }}
              >
                <Typography variant={props.mobile ? 'normal' : 'medium'} bold>
                  {link.title}
                </Typography>
              </Stack>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
