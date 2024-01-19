"use client";

import React, { useEffect, useState } from "react";
import { useLottie } from "lottie-react";
import byteAppear from "@/lotties/byteAppear.json";
import byteDisappear from "@/lotties/byteDisappear.json";
import byteCelebration from "@/lotties/byteCelebration.json";
import byteLoading from "@/lotties/byteLoading.json";
import { Box } from "@mui/system";

const HEIGHT = 45;

export type ByteAnimation = "appear" | "disappear" | "celebration" | "loading";
const JSONS: Record<ByteAnimation, any> = {
  appear: byteAppear,
  disappear: byteDisappear,
  celebration: byteCelebration,
  loading: byteLoading,
};

export interface IByteAnimationProps {
  callback: () => void;
  lottieJson: any;
  loop?: boolean;
  size?: number;
}

function ByteAnimation(props: IByteAnimationProps) {
  const options = {
    animationData: props.lottieJson,
    autoplay: true,
    loop: !!props.loop,
    onComplete: props.callback,
  };
  const { View } = useLottie(options, { height: props.size || HEIGHT });
  return View;
}

export interface IStepsByteControllerProps {
  animation?: ByteAnimation;
  delay?: number;
  size?: number;
  loop?: boolean;
}

export default function Byte(props: IStepsByteControllerProps) {
  const [animation, setAnimation] = useState<ByteAnimation | null>(null);

  useEffect(() => {
    (animation ||
      !noTransitionFromNull.includes(props.animation || "appear")) &&
      setTimeout(
        () => setAnimation(props.animation || "appear"),
        props.delay ?? 0
      );
  }, [props.animation]);

  const noTransitionFromNull: ByteAnimation[] = ["disappear"];

  const callbacks: Record<ByteAnimation, () => void> = {
    appear: () => null,
    disappear: () => setAnimation(null),
    celebration: () => null,
    loading: () => null,
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={props.size || HEIGHT}
      height={props.size || HEIGHT}
    >
      {animation ? (
        <ByteAnimation
          lottieJson={JSONS[animation]}
          callback={callbacks[animation]}
          loop={props.loop}
          size={props.size}
        />
      ) : null}
    </Box>
  );
}
