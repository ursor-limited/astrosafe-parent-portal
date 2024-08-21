'use client';

import { Stack } from '@mui/system';
import { Typography, UrsorButton } from '@/ui';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Clipboard from '@/images/icons/Clipboard.svg';

const UrlBar = (props: { mobile: boolean }) => {
  const [hovering, setHovering] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const [currentPageUrl, setCurrentPageUrl] = useState<string | undefined>(
    undefined
  );
  useEffect(() => setCurrentPageUrl(window?.location.href), []);
  return currentPageUrl ? (
    <Stack
      width='100%'
      spacing={props.mobile ? '6px' : '20px'}
      height={props.mobile ? undefined : '76px'}
      px='28px'
      py='8px'
      bgcolor={hovering ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.15)'}
      borderRadius='14px'
      direction={props.mobile ? undefined : 'row'}
      justifyContent='space-between'
      alignItems='center'
      overflow='hidden'
      onClick={() => {
        setCopied(true);
        navigator.clipboard.writeText(currentPageUrl.split('?')[0]);
      }}
      sx={{
        transition: '0.2s',
        cursor: 'pointer',
      }}
      onMouseDown={() => {
        setPressed(true);
      }}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
        setPressed(false);
      }}
      onMouseUp={() => {
        setPressed(false);
      }}
    >
      <Typography
        bold
        noWrap
        color={hovering ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)'}
        sx={{
          transition: '0.2s',
          maxWidth: props.mobile ? 0 : undefined,
          minWidth: props.mobile ? '100%' : undefined,
          textAlign: 'center',
        }}
      >
        {currentPageUrl.split('?')[0]}
      </Typography>

      {copied ? (
        <Stack height='40px' justifyContent='center'>
          <Typography noWrap bold color='rgba(255,255,255,0.7)'>
            Copied to Clipboard
          </Typography>
        </Stack>
      ) : (
        <Stack
          sx={{
            cursor: 'pointer',
            '&:hover': { opacity: 0.8 },
            transition: '0.2s',
          }}
        >
          <UrsorButton
            endIcon={Clipboard}
            dark
            variant='tertiary'
            onClick={() => null}
            backgroundColor='linear-gradient(150deg, #F279C5, #FD9B41)'
          >
            Share safe video link
          </UrsorButton>
        </Stack>
      )}
    </Stack>
  ) : null;
};

export default UrlBar;
