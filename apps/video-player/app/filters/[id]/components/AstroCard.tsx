import { Stack } from "@mui/system";
import { PALETTE } from "ui";

const AstroCard = (props: { height: number; children: React.ReactNode }) => (
  <Stack
    height={props.height}
    borderRadius="12px"
    px="16px"
    boxSizing="border-box"
    justifyContent="center"
    border={`1px solid ${PALETTE.secondary.grey[2]}`}
  >
    {props.children}
  </Stack>
);

export default AstroCard;
