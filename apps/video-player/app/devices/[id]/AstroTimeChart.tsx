import { Stack } from "@mui/system";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import { PALETTE, Typography } from "ui";

const daysN = 7;
const hoursInterval = 2;
const TIME_LIMIT = 6;

const AstroTimeChart = (props: {
  times: number[];
  selectedDayIndex: number;
  setSelectedDayIndex: (i: number) => void;
}) => {
  const [maxTime, setMaxTime] = useState<number>(0);
  useEffect(
    () => setMaxTime(_.max(props.times) ?? props.times[0]),
    [props.times]
  );
  const [yRange, setYRange] = useState<number>(0);
  useEffect(
    () => setYRange((Math.ceil(maxTime / hoursInterval) + 1) * hoursInterval),
    [maxTime]
  );
  const [dateIndexRange, setDateIndexRange] = useState<[number, number]>([
    0, 7,
  ]);
  useEffect(() => {
    if (props.selectedDayIndex < 4) {
      setDateIndexRange([
        Math.max(0, props.selectedDayIndex - 3),
        6 - props.selectedDayIndex,
      ]);
    } else if (props.times.length - props.selectedDayIndex < 4) {
      setDateIndexRange([
        props.times.length - 6 + (props.times.length - props.selectedDayIndex),
        Math.min(props.times.length - 1, props.selectedDayIndex + 3),
      ]);
    }
  }, [props.selectedDayIndex]);
  return (
    <Stack flex={1} px="24px" position="relative" mr="56px !important">
      <Stack top={0} left={0} width="100%" height="100%" position="absolute">
        <Stack flex={1} justifyContent="space-between" pb="28px">
          {[...Array(1 + yRange / hoursInterval).keys()].map((i) => (
            <Stack
              key={i}
              height="2px"
              width="100%"
              bgcolor={PALETTE.secondary.grey[2]}
              position="relative"
            >
              <Stack
                width="30px"
                right="-42px"
                position="absolute"
                // alignItems="center"
                sx={{ transform: "translateY(-50%)" }}
              >
                <Typography bold color={PALETTE.secondary.grey[3]}>{`${
                  i * hoursInterval
                }h`}</Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Stack direction="row" flex={1} justifyContent="space-between" zIndex={2}>
        {_.reverse(
          props.times.map((time, i) => (
            <Stack
              key={i}
              alignItems="center"
              width="60px"
              justifyContent="flex-end"
              spacing="6px"
              sx={
                props.selectedDayIndex !== i
                  ? {
                      cursor: "pointer",
                      "&:hover": { opacity: 0.7 },
                      transition: "0.2s",
                    }
                  : null
              }
              onClick={() => props.setSelectedDayIndex(i)}
            >
              <Stack
                height={`${(100 * time) / yRange}%`}
                width="32px"
                borderRadius="4px 4px 0 0"
                bgcolor={
                  props.selectedDayIndex === i
                    ? PALETTE.secondary.purple[2]
                    : PALETTE.secondary.grey[2]
                }
                sx={{
                  transition: "0.2s",
                }}
                position="relative"
              >
                {time >= TIME_LIMIT ? (
                  <Stack
                    width="50px"
                    justifyContent="center"
                    position="absolute"
                    top="-25px"
                    sx={{
                      transform: "translateX(-8.5px)",
                    }}
                  >
                    <Typography
                      variant="tiny"
                      bold
                      color={PALETTE.secondary.grey[3]}
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      Limit reached
                    </Typography>
                  </Stack>
                ) : null}
              </Stack>

              <Stack>
                <Typography
                  bold
                  color={
                    props.selectedDayIndex === i
                      ? undefined
                      : PALETTE.secondary.grey[3]
                  }
                >
                  {dayjs()
                    .subtract(i, "days")
                    .format(i < 7 ? "ddd" : "MM/DD")}
                </Typography>
                <Stack
                  width="100%"
                  height="2px"
                  bgcolor={
                    props.selectedDayIndex === i
                      ? PALETTE.secondary.purple[2]
                      : undefined
                  }
                  sx={{
                    transition: "0.2s",
                  }}
                />
              </Stack>
            </Stack>
          ))
        )}
      </Stack>
    </Stack>
  );
};

export default AstroTimeChart;
