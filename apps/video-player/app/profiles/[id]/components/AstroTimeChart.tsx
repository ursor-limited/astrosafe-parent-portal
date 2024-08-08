import { Stack } from "@mui/system";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import { PALETTE, Typography } from "ui";
import { UrsorTypographyVariant } from "ui/typography";
import { IDayScreenTime } from "./InsightsTab";

const yInterval = 1; // hours
const TIME_LIMIT = 6;

const AstroTimeChart = (props: {
  times: IDayScreenTime[];
  selected: IDayScreenTime["date"];
  setSelectedDatetime: (datetime: IDayScreenTime["date"]) => void;
  barWidth?: number;
  labelFontSize?: UrsorTypographyVariant;
  barsXPadding?: number;
}) => {
  const [maxTime, setMaxTime] = useState<number>(0); // minutes
  useEffect(
    () =>
      setMaxTime(
        _.max(props.times.map((t) => t.screenTime)) ??
          props.times[0]?.screenTime
      ),
    [props.times]
  );
  const [nHorizontalLines, setNHorizontalLines] = useState<number>(1);
  useEffect(
    () => setNHorizontalLines(Math.ceil(maxTime / (60 * yInterval)) + 1),
    [maxTime]
  );
  return (
    <Stack
      flex={1}
      px={props.barsXPadding ? `${props.barsXPadding}px` : "24px"}
      position="relative"
      mr="56px !important"
    >
      <Stack top={0} left={0} width="100%" height="100%" position="absolute">
        <Stack flex={1} justifyContent="space-between" pb="28px">
          {_.reverse([...Array(nHorizontalLines + 1).keys()]).map((i) => (
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
                sx={{ transform: "translateY(-50%)" }}
              >
                <Typography bold color={PALETTE.secondary.grey[3]}>{`${
                  i * yInterval
                }h`}</Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Stack direction="row" flex={1} justifyContent="space-between" zIndex={2}>
        {props.times.map((dayTime, i) => (
          <Stack
            key={dayTime.date}
            alignItems="center"
            width="60px"
            justifyContent="flex-end"
            spacing="6px"
            sx={
              props.selected !== dayTime.date
                ? {
                    cursor: "pointer",
                    "&:hover": { opacity: 0.7 },
                    transition: "0.2s",
                  }
                : null
            }
            onClick={() => props.setSelectedDatetime(dayTime.date)}
          >
            <Stack
              height={`${
                (100 * dayTime.screenTime) / (yInterval * nHorizontalLines)
              }%`}
              width={props.barWidth ?? "32px"}
              borderRadius="4px 4px 0 0"
              bgcolor={
                props.selected === dayTime.date
                  ? PALETTE.secondary.purple[2]
                  : PALETTE.secondary.grey[2]
              }
              sx={{
                transition: "0.2s",
              }}
              position="relative"
            >
              {dayTime.timeLimitReached ? (
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
                  props.selected === dayTime.date
                    ? undefined
                    : PALETTE.secondary.grey[3]
                }
                variant={props.labelFontSize ?? "normal"}
              >
                {dayjs(dayTime.date).format(
                  dayjs().utc().diff(dayTime.date, "days") < 7 ? "ddd" : "MM/DD"
                )}
              </Typography>
              <Stack
                width="100%"
                height="2px"
                bgcolor={
                  props.selected === dayTime.date
                    ? PALETTE.secondary.purple[2]
                    : undefined
                }
                sx={{
                  transition: "0.2s",
                }}
              />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default AstroTimeChart;
