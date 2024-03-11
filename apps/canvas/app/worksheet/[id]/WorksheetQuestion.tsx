import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";

const WorksheetQuestion = (props: {
  n: number;
  endAligned?: boolean;
  top?: string;
  left?: string;
  children: React.ReactNode;
}) => (
  <Stack direction="row" spacing="4mm" position="relative">
    <Stack
      height="100%"
      position="absolute"
      top={props.top ?? 0}
      left={props.left ?? 0}
    >
      <Stack
        borderRadius="18px"
        //border={`2px solid ${PALETTE.secondary.grey[2]}`}
        width="22px"
        height="18px"
        justifyContent="center"
        alignItems="center"
        mb="2.6mm"
        direction="row"
        spacing="1px"
      >
        <Typography
          sx={{
            fontSize: "9px",
            marginBottom: "0.7mm",
          }}
          color={PALETTE.secondary.grey[4]}
        >
          Q
        </Typography>
        <Typography
          sx={{
            fontSize: "9px",
            marginBottom: "0.7mm",
          }}
          bold
          color={PALETTE.secondary.grey[4]}
        >
          {props.n}
        </Typography>
      </Stack>
    </Stack>
    {props.children}
  </Stack>
);

export default WorksheetQuestion;
