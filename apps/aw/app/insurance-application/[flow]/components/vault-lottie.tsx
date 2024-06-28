"use client";

import { useLottie } from "lottie-react";
import lottie from "@/images/VaultLottie.json";

const VaultLottie = () => {
  const options = {
    animationData: lottie,
    autoplay: true,
  };
  const { View } = useLottie(options, { height: 360 });
  return View;
};

export default VaultLottie;
