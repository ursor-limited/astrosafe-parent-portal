import { Slider } from "@mui/material";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";

const TimeLimitSlider = (props: {
  value: number;
  setValue: (newValue: number) => void;
  barHeight?: string;
  circleSize?: string;
  step?: number;
}) => (
  <Stack
    sx={{
      ".MuiSlider-thumb": {
        background: "#f8f8f8",
        height: props.circleSize ?? "48px",
        width: props.circleSize ?? "48px",
      },
      ".MuiSlider-track": {
        background: PALETTE.secondary.purple[1],
        border: "none",
        height: props.barHeight ?? "30px",
        borderRadius: "40px",
      },
      ".MuiSlider-rail": {
        height: props.barHeight ?? "30px",
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
      step={props.step}
    />
  </Stack>
);

const TimeLimitSelector = (props: {
  value: number;
  width: string;
  barHeight?: string;
  circleSize?: string;
  spacing?: string;
  setValue: (newValue: number) => void;
  step?: number;
}) => {
  return (
    <Stack spacing={props.spacing || "16px"} width={props.width}>
      <TimeLimitSlider
        value={props.value}
        setValue={props.setValue}
        barHeight={props.barHeight}
        circleSize={props.circleSize}
        step={props.step}
      />
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
