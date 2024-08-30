import React, { useEffect, useState } from 'react';
import { useLottie } from 'lottie-react';
import byteAppear from './../lotties/byteAppear.json';
import byteDisappear from './../lotties/byteDisappear.json';
import byteCelebration from './../lotties/byteCelebration.json';
import { Box } from '@mui/system';

const HEIGHT = 45;

export type ByteAnimation = 'appear' | 'disappear' | 'celebration';
const JSONS: Record<ByteAnimation, any> = {
  appear: byteAppear,
  disappear: byteDisappear,
  celebration: byteCelebration,
};

export interface IByteAnimationProps {
  callback: () => void;
  lottieJson: any;
}

function ByteAnimation(props: IByteAnimationProps) {
  const options = {
    animationData: props.lottieJson,
    autoplay: true,
    loop: false,
    onComplete: props.callback,
  };
  const { View } = useLottie(options, { height: HEIGHT });
  return View;
}

export interface IStepsByteControllerProps {
  animation: ByteAnimation;
  delay?: number;
}

export default function Byte(props: IStepsByteControllerProps) {
  const [animation, setAnimation] = useState<ByteAnimation | null>(null);

  useEffect(() => {
    (animation || !noTransitionFromNull.includes(props.animation)) &&
      setTimeout(() => setAnimation(props.animation), props.delay ?? 0);
  }, [props.animation]);

  const noTransitionFromNull: ByteAnimation[] = ['disappear'];

  const callbacks: Record<ByteAnimation, () => void> = {
    appear: () => null,
    disappear: () => setAnimation(null),
    celebration: () => null,
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={HEIGHT}
    >
      {animation ? (
        <ByteAnimation
          lottieJson={JSONS[animation]}
          callback={callbacks[animation]}
        />
      ) : null}
    </Box>
  );
}
