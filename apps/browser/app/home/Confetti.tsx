import { Stack } from "@mui/system";
import { useLottie } from "lottie-react";
import leftConfetti from "@/lotties/leftConfetti.json";
import rightConfetti from "@/lotties/rightConfetti.json";

const Confetti = (props: { side: "left" | "right" }) => {
  const { View } = useLottie(
    {
      animationData: props.side === "right" ? rightConfetti : leftConfetti,
      loop: false,
      autoplay: true,
    },
    { height: "170px" }
  );
  return (
    <Stack
      height="170px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {View}
    </Stack>
  );
};

export default Confetti;
