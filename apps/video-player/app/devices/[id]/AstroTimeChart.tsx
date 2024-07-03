import { Stack } from "@mui/system";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import { PALETTE, Typography } from "ui";

const daysN = 8;
const hoursInterval = 2;

const AstroTimeChart = (props: { times: number[] }) => {
  const [selectedDay, setSelectedDay] = useState<number>(0);
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
  return (
    <Stack flex={1} px="24px" position="relative" mr="62px !important">
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
            >
              <Stack
                height={`${(100 * time) / yRange}%`}
                width="32px"
                borderRadius="4px 4px 0 0"
                bgcolor={
                  selectedDay === i
                    ? PALETTE.secondary.purple[2]
                    : PALETTE.secondary.grey[2]
                }
              />
              <Stack>
                <Typography
                  bold
                  color={
                    selectedDay === i ? undefined : PALETTE.secondary.grey[3]
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
                    selectedDay === i ? PALETTE.secondary.purple[2] : undefined
                  }
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
