import { Stack } from "@mui/system";
import { PALETTE } from "ui";
import DurationLabel from "../video/[videoId]/duration-label";
import _ from "lodash";
import { useEffect, useState } from "react";

const TimeRange = (props: {
  originalUrl?: string;
  setRange: (range: [number, number] | undefined) => void;
  range?: [number, number];
  currentTime: number;
  duration: number;
}) => {
  const [lineRef, setLineRef] = useState<HTMLElement | null>(null);
  const [lineWidth, setLineWidth] = useState<number>(0);
  useEffect(
    () => setLineWidth(lineRef?.getBoundingClientRect?.().width ?? 0),
    [lineRef?.getBoundingClientRect?.().width]
  );

  const [currentTimeDotX, setCurrentTimeDotX] = useState<number>(0);
  useEffect(
    () => setCurrentTimeDotX(lineWidth * (props.currentTime / props.duration)),
    [lineWidth, props.currentTime, props.duration]
  );

  console.log(currentTimeDotX, "gg", lineWidth, props.currentTime, "99999");

  return (
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
        <Stack position="relative" width="100%" height="42px" ref={setLineRef}>
          <Stack
            position="absolute"
            height="4px"
            width="100%"
            top={0}
            bottom={0}
            marginTop="auto"
            marginBottom="auto"
            sx={{
              background: "linear-gradient(90deg,#F279C5,#FD9B41)",
            }}
          />
          <Stack
            position="absolute"
            left={currentTimeDotX}
            top={0}
            bottom={0}
            marginTop="auto"
            marginBottom="auto"
            width="14px"
            height="14px"
            bgcolor={PALETTE.secondary.grey[4]}
            borderRadius="100%"
          />
          {/* <Slider
          min={0}
          max={props.duration}
          valueLabelDisplay="off"
          getAriaLabel={() => "Temperature range"}
          value={props.range}
          onChange={(event: Event, newValue: number | number[]) => {
            props.setRange(newValue as [number, number]);
          }}
        /> */}
        </Stack>
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
  );
};

export default TimeRange;
