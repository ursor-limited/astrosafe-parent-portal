import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";

const WorksheetQuestion = (props: {
  n: number;
  endAligned?: boolean;
  children: React.ReactNode;
}) => (
  <Stack direction="row" spacing="4mm">
    <Stack
      height="100%"
      justifyContent={props.endAligned ? "flex-end" : "center"}
    >
      <Stack
        borderRadius="100%"
        border={`2px solid ${PALETTE.secondary.grey[2]}`}
        width="18px"
        height="18px"
        justifyContent="center"
        alignItems="center"
        mb="2.6mm"
      >
        <Typography
          sx={{ fontSize: "9px", marginBottom: "0.7mm" }}
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
