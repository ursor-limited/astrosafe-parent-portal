import { Stack } from "@mui/system";
import { useState } from "react";
import { PALETTE } from "ui";

const AstroSwitch = (props: { on: boolean }) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      height="34px"
      width="73px"
      bgcolor={PALETTE.secondary.grey[4]}
      borderRadius="20px"
      px="4px"
      justifyContent="center"
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      sx={{
        cursor: "pointer",
      }}
    >
      <Stack
        height="28px"
        width="28px"
        borderRadius="100%"
        sx={{
          background: props.on
            ? "linear-gradient(150deg, #F279C5, #FD9B41)"
            : PALETTE.secondary.grey[1],
          opacity: hovering ? 0.7 : 1,
          transition: "0.2s ease-out",
          transform: `translateX(${props.on ? 0 : 46}px)`,
        }}
      />
    </Stack>
  );
};

export default AstroSwitch;
