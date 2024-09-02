import { Stack } from '@mui/system';
import PlayIcon from './../images/PlayIcon.svgimages/icons/PlayIcon.svg';
import { PALETTE, Typography, UrsorButton } from './../ui';

import X from './../images/X.svg';
import { useState } from 'react';

const TutorialVideoBar = (props: {
  title: string;
  subtitle: string;
  callback: () => void;
  xCallback: () => void;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      borderRadius="12px"
      spacing="20px"
      direction="row"
      bgcolor={PALETTE.secondary.orange[1]}
      p="8px"
      mb="24px"
      position="relative"
      sx={{
        cursor: 'pointer',
        opacity: hovering ? 0.7 : 1,
        transition: '0.2s',
      }}
    >
      <Stack borderRadius="8px">
        <img
          src="https://ursorassets.s3.eu-west-1.amazonaws.com/intro_to_astrosafe.webp"
          alt="intro video"
          width={158}
          height={119}
        />
      </Stack>
      <Stack spacing="8px" justifyContent="center">
        <Typography bold variant="medium">
          {props.title}
        </Typography>
        <Typography variant="small" bold color={PALETTE.secondary.grey[4]}>
          {props.subtitle}
        </Typography>
        <UrsorButton
          size="small"
          variant="secondary"
          backgroundColor="transparent"
          endIcon={PlayIcon}
        >
          Watch tutorial
        </UrsorButton>
      </Stack>
      <Stack
        position="absolute"
        top={0}
        left={0}
        height="100%"
        width="100%"
        onClick={props.callback}
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
      />
      <Stack
        onClick={props.xCallback}
        right="12px"
        top="12px"
        position="absolute"
        sx={{
          transition: '0.2s',
          '&:hover': { opacity: 0.5 },
        }}
      >
        <X height="20px" width="20px" />
      </Stack>
    </Stack>
  );
};

export default TutorialVideoBar;
