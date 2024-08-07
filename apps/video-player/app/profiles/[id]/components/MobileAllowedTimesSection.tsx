import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import { Stack } from "@mui/system";
import _ from "lodash";
import { IAllowedTime } from "./LimitsTab";
import { PALETTE, Typography } from "ui";
import dayjs from "dayjs";
import PencilIcon from "@/images/icons/Pencil.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";

const DAY_FULL_NAMES = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

const MobileAllowedTimeRow = (props: {
  dayName: string;
  times: IAllowedTime[];
  addAllowedTime: (startTime: number, endTime: number) => void;
  reset: () => void;
  setAllowedTimes: (
    id: IAllowedTime["id"],
    startTime: IAllowedTime["startTime"],
    endTime: IAllowedTime["endTime"]
  ) => void;
  smallerLabelFont?: boolean;
  halveLabelFrequency?: boolean;
}) => {
  return (
    <Stack spacing="4px">
      <Typography bold color={PALETTE.secondary.grey[3]}>
        {/* @ts-ignore */}
        {DAY_FULL_NAMES[props.dayName]}
      </Typography>
      {props.times.map((t) => (
        <Stack
          key={t.id}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack
            borderRadius="8px"
            bgcolor={PALETTE.secondary.grey[1]}
            alignItems="center"
            direction="row"
            height="39px"
            px="14px"
            boxSizing="border-box"
            spacing="10px"
            width="fit-content"
          >
            <Stack alignItems="center" direction="row" spacing="5px">
              <Typography bold>
                {dayjs(t.startTime).format("HH:mma")}
              </Typography>
              <PencilIcon height="16px" width="16px" />
            </Stack>
            <Typography bold color={PALETTE.secondary.grey[3]}>
              to
            </Typography>
            <Stack alignItems="center" direction="row" spacing="5px">
              <Typography bold>{dayjs(t.endTime).format("HH:mma")}</Typography>
              <PencilIcon height="16px" width="16px" />
            </Stack>
          </Stack>
          <Stack
            width="30px"
            height="30px"
            bgcolor={PALETTE.secondary.purple[2]}
            borderRadius="100%"
            justifyContent="center"
            alignItems="center"
            sx={{
              svg: {
                path: {
                  fill: "rgb(255,255,255)",
                },
              },
            }}
          >
            <PlusIcon height="20px" width="20px" />
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

const MobileAllowedTimesSection = (props: {
  allowedTimes: IAllowedTime[];
  setAllowedTimes: (
    id: IAllowedTime["id"],
    startTime: IAllowedTime["startTime"],
    endTime: IAllowedTime["endTime"]
  ) => void;
  addTimeLimit: (day: number, startTime: number, endTime: number) => void;
  reset: (day: IAllowedTime["day"]) => void;
  topRightElement?: React.ReactNode;
  smallerLabelFont?: boolean;
  halveLabelFrequency?: boolean;
}) => (
  <AstroBentoCard
    title="Allowed browsing time"
    subtitle="Select when you want the Browser to be online. Turn this off to remove schedules."
    info={{
      title: "Set when the Browser can be used",
      body: "Select the times of the day when you want the Browser to be accessible. Click add to create a new time period if you want an offline period in the middle of the day. Turn this off to allow the Browser to be accessible 24/7.",
    }}
    notCollapsible
    topRightStuff={props.topRightElement}
  >
    {props.allowedTimes ? (
      <Stack spacing="36px" pb="12px">
        {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day, i) => (
          <MobileAllowedTimeRow
            key={day}
            dayName={day}
            times={props.allowedTimes.filter((t) =>
              day === "sun" ? t.day === 0 : t.day === i + 1
            )}
            reset={() => props.reset(day === "sun" ? 0 : i + 1)}
            addAllowedTime={(startTime, endTime) =>
              props.addTimeLimit(day === "sun" ? 0 : i + 1, startTime, endTime)
            }
            setAllowedTimes={props.setAllowedTimes}
          />
        ))}
      </Stack>
    ) : null}
  </AstroBentoCard>
);

export default MobileAllowedTimesSection;
