import { Stack } from "@mui/system";
import { Captioned } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import { PALETTE } from "ui";
import DurationLabel from "../video/[videoId]/duration-label";
import _ from "lodash";
import { Slider } from "@mui/material";

const TimeRange = (props: {
  originalUrl?: string;
  setRange: (range: [number, number] | undefined) => void;
  range?: [number, number];
  duration?: number;
}) => (
  <Captioned text="Start and end time">
    <Stack
      bgcolor={PALETTE.secondary.grey[1]}
      borderRadius="8px"
      height="40px"
      justifyContent="center"
      px="10px"
    >
      <Stack
        direction="row"
        // spacing={mobile ? "20px" : "44px"}
        spacing={"20px"}
        justifyContent="center"
        width="100%"
        sx={{
          pointerEvents: !props.originalUrl ? "none" : undefined,
          opacity: props.originalUrl ? 1 : 0.5,
          ".MuiSlider-root": {
            color: "transparent !important",
          },
          ".MuiSlider-rail": {
            opacity: 0.4,
            background: "linear-gradient(90deg,#F279C5,#FD9B41)",
          },
          ".MuiSlider-track": {
            background: "linear-gradient(90deg,#F279C5,#FD9B41)",
          },
          ".MuiSlider-thumb": {
            "&:nth-of-type(3)": {
              background: "#F279C5",
            },
            "&:nth-of-type(4)": {
              background: "#FD9B41",
            },
          },
        }}
      >
        <DurationLabel
          value={props.range?.[0] ?? 0}
          incrementCallback={() =>
            props.setRange(
              props.duration &&
                props.range &&
                _.isNumber(props.range?.[0]) &&
                _.isNumber(props.range?.[1])
                ? [Math.min(props.duration, props.range[0] + 1), props.range[1]]
                : undefined
            )
          }
          decrementCallback={() =>
            props.setRange(
              props.duration &&
                props.range &&
                _.isNumber(props.range?.[0]) &&
                _.isNumber(props.range?.[1])
                ? [Math.max(0, props.range[0] - 1), props.range[1]]
                : undefined
            )
          }
        />
        <Slider
          min={0}
          max={props.duration}
          valueLabelDisplay="off"
          getAriaLabel={() => "Temperature range"}
          value={props.range}
          onChange={(event: Event, newValue: number | number[]) => {
            props.setRange(newValue as [number, number]);
          }}
        />
        <DurationLabel
          value={props.range?.[1] ?? 0}
          incrementCallback={() =>
            props.setRange(
              props.duration &&
                props.range &&
                _.isNumber(props.range?.[0]) &&
                _.isNumber(props.range?.[1])
                ? [props.range[0], Math.min(props.duration, props.range[1] + 1)]
                : undefined
            )
          }
          decrementCallback={() =>
            props.setRange(
              props.duration &&
                props.range &&
                _.isNumber(props.range?.[0]) &&
                _.isNumber(props.range?.[1])
                ? [props.range[0], Math.max(0, props.range[1] - 1)]
                : undefined
            )
          }
        />
      </Stack>
    </Stack>
  </Captioned>
);

export default TimeRange;
