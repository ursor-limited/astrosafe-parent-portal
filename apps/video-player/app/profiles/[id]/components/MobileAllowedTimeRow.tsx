import React, { useState } from "react";
import UrsorDialog from "@/app/components/UrsorDialog";
import { PALETTE, Typography } from "ui";
import { IAllowedTime } from "./LimitsTab";
import { Stack } from "@mui/system";
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

const MobileTimeSelectionDialog = (props: {
  dayName: string;
  open: boolean;
  startTime: IAllowedTime["startTime"];
  endTime: IAllowedTime["endTime"];
  onClose: () => void;
}) => (
  <UrsorDialog
    open={props.open}
    onCloseCallback={props.onClose}
    title="Select times"
    subtitle={[`Choose this browsing period's start and end time.`]}
    width="422px"
    dynamicHeight
    isMobile
  >
    <Stack direction="row">
      <Stack spacing="8px" alignItems="center">
        <Typography bold variant="h5" color={PALETTE.secondary.grey[5]}>
          {dayjs(props.startTime).format("HH:mma")}
        </Typography>
        <Stack height="200px" spacing="6px">
          {[...Array((24 * 60) / 15).keys()].map((i) => (
            <Stack key={i} alignItems="center">
              <Typography color={PALETTE.secondary.grey[5]}>
                {dayjs()
                  .hour(0)
                  .minute(0)
                  .millisecond(0)
                  .add(i * 15, "minutes")
                  .format("HH:mm a")}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  </UrsorDialog>
);

const MobileAllowedTimeRowDisplayButton = (props: {
  dayName: string;
  startTime: IAllowedTime["startTime"];
  endTime: IAllowedTime["endTime"];
}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <>
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
        onClick={() => setDialogOpen(true)}
      >
        <Stack alignItems="center" direction="row" spacing="5px">
          <Typography bold>
            {dayjs(props.startTime).format("HH:mma")}
          </Typography>
          <PencilIcon height="16px" width="16px" />
        </Stack>
        <Typography bold color={PALETTE.secondary.grey[3]}>
          to
        </Typography>
        <Stack alignItems="center" direction="row" spacing="5px">
          <Typography bold>{dayjs(props.endTime).format("HH:mma")}</Typography>
          <PencilIcon height="16px" width="16px" />
        </Stack>
      </Stack>
      {dialogOpen ? (
        <MobileTimeSelectionDialog
          open
          onClose={() => setDialogOpen(false)}
          dayName={props.dayName}
          startTime={props.startTime}
          endTime={props.endTime}
        />
      ) : null}
    </>
  );
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
  //@ts-ignore
  const dayName = DAY_FULL_NAMES[props.dayName];
  return (
    <Stack spacing="4px">
      <Typography bold color={PALETTE.secondary.grey[3]}>
        {dayName}
      </Typography>
      {props.times.map((t) => (
        <Stack
          key={t.id}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <MobileAllowedTimeRowDisplayButton
            dayName={dayName}
            startTime={t.startTime}
            endTime={t.endTime}
          />
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

export default MobileAllowedTimeRow;
