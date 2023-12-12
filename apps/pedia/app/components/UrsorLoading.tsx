import React from "react";
import { useLottie } from "lottie-react";
import byteLoading from "../lotties/byteLoading.json";
import { Box } from "@mui/material";

export default function UrsorLoading() {
  const options = {
    animationData: byteLoading,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, { height: 100 });

  return (
    <Box
      height="100px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {View}
    </Box>
  );
}
