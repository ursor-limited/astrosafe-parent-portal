"use client";

import React from "react";
import { useLottie } from "lottie-react";
import byteLoading from "@/lotties/byteLoading.json";
import { Box } from "@mui/material";

export default function UrsorLoading(props: { size?: string }) {
  const options = {
    animationData: byteLoading,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, { height: props.size ?? "80px" });

  return (
    <Box
      height={props.size ?? "80px"}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {View}
    </Box>
  );
}
