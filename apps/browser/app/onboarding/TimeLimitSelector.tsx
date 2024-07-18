import { Slider } from "@mui/material";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";

const TimeLimitSlider = (props: {
  value: number;
  setValue: (newValue: number) => void;
}) => (
  <Stack
    width="546px"
    sx={{
      ".MuiSlider-thumb": {
        background: "#f8f8f8",
        height: "48px",
        width: "48px",
      },
      ".MuiSlider-track": {
        background: PALETTE.secondary.purple[1],
        border: "none",
        height: "30px",
        borderRadius: "40px",
      },
      ".MuiSlider-rail": {
        height: "30px",
        borderRadius: "40px",
        background: "#384f61",
        opacity: 1,
      },
    }}
  >
    <Slider
      value={props.value}
      onChange={(event: Event, newValue: number | number[]) => {
        props.setValue(newValue as number);
      }}
    />
  </Stack>
);

const TimeLimitSelector = (props: {
  value: number;
  setValue: (newValue: number) => void;
}) => {
  return (
    <Stack spacing="16px">
      <TimeLimitSlider value={props.value} setValue={props.setValue} />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="small" bold color={PALETTE.secondary.grey[3]}>
          30 mins
        </Typography>
        <Typography variant="small" bold color={PALETTE.secondary.grey[3]}>
          5 hours
        </Typography>
      </Stack>
    </Stack>
  );
};

export default TimeLimitSelector;
