import { Stack } from "@mui/system";
import { useState } from "react";
import { PALETTE } from "ui";

const AstroSwitch = (props: { on: boolean; callback: () => void }) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      height="28px"
      width="60px"
      bgcolor={props.on ? PALETTE.system.green : PALETTE.secondary.grey[3]}
      borderRadius="20px"
      px="2px"
      boxSizing="border-box"
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
      onClick={props.callback}
    >
      <Stack
        height="24px"
        width="24px"
        borderRadius="100%"
        sx={{
          background: "rgb(255,255,255)",
          opacity: hovering ? 0.7 : 1,
          transition: "0.2s ease-out",
          transform: `translateX(${!props.on ? 0 : 32}px)`,
        }}
      />
    </Stack>
  );
};

export default AstroSwitch;
