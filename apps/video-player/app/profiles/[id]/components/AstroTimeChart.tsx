import { Stack } from "@mui/system";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import { PALETTE, Typography } from "ui";
import { UrsorTypographyVariant } from "ui/typography";

const daysN = 7;
const hoursInterval = 2;
const TIME_LIMIT = 6;

const AstroTimeChart = (props: {
  times: number[];
  selectedDayIndex: number;
  setSelectedDayIndex: (i: number) => void;
  barWidth?: number;
  labelFontSize?: UrsorTypographyVariant;
  barsXPadding?: number;
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
      const shiftNDays = props.selectedDayIndex - 3;
      setDateIndexRange([
        Math.max(0, shiftNDays),
        props.selectedDayIndex + 3 - shiftNDays,
      ]);
    } else if (props.times.length - props.selectedDayIndex < 4) {
      const shiftNDays = props.times.length - 1 - props.selectedDayIndex;
      setDateIndexRange([
        props.selectedDayIndex - 6 + shiftNDays,
        Math.min(props.times.length - 1, props.selectedDayIndex + 3),
      ]);
    } else {
      setDateIndexRange([
        props.selectedDayIndex - 3,
        props.selectedDayIndex + 3,
      ]);
    }
  }, [props.selectedDayIndex, props.times]);
  return (
    <Stack
      flex={1}
      px={`${props.barsXPadding}px` ?? "24px"}
      position="relative"
      mr="56px !important"
    >
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
          _.range(dateIndexRange[0], dateIndexRange[1] + 1).map((dayIndex) => (
            <Stack
              key={dayIndex}
              alignItems="center"
              width="60px"
              justifyContent="flex-end"
              spacing="6px"
              sx={
                props.selectedDayIndex !== dayIndex
                  ? {
                      cursor: "pointer",
                      "&:hover": { opacity: 0.7 },
                      transition: "0.2s",
                    }
                  : null
              }
              onClick={() => props.setSelectedDayIndex(dayIndex)}
            >
              <Stack
                height={`${(100 * props.times[dayIndex]) / yRange}%`}
                width={props.barWidth ?? "32px"}
                borderRadius="4px 4px 0 0"
                bgcolor={
                  props.selectedDayIndex === dayIndex
                    ? PALETTE.secondary.purple[2]
                    : PALETTE.secondary.grey[2]
                }
                sx={{
                  transition: "0.2s",
                }}
                position="relative"
              >
                {props.times[dayIndex] >= TIME_LIMIT ? (
                  <Stack
                    position="absolute"
                    left={0}
                    right={0}
                    margin="0 auto"
                    width={0}
                    overflow="visible"
                    alignItems="center"
                  >
                    <Stack
                      width="50px"
                      justifyContent="center"
                      position="absolute"
                      top="-25px"
                      sx={
                        {
                          // transform: `translateX(-${
                          //   props.limitReachedXTranslation ?? "8.5"
                          // }px)`,
                        }
                      }
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
                  </Stack>
                ) : null}
              </Stack>

              <Stack>
                <Typography
                  bold
                  color={
                    props.selectedDayIndex === dayIndex
                      ? undefined
                      : PALETTE.secondary.grey[3]
                  }
                  variant={props.labelFontSize ?? "normal"}
                >
                  {dayjs()
                    .subtract(dayIndex, "days")
                    .format(dayIndex < 7 ? "ddd" : "MM/DD")}
                </Typography>
                <Stack
                  width="100%"
                  height="2px"
                  bgcolor={
                    props.selectedDayIndex === dayIndex
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