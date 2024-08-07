import React from "react";
import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import { Stack } from "@mui/system";
import _ from "lodash";
import { IAllowedTime } from "./LimitsTab";
import MobileAllowedTimeRow from "./MobileAllowedTimeRow";
// const AllowedTimesSectionTimeSelector = () => {
//   const [open, setOpen] = useState<boolean>(false);
//   return (
//     <UrsorPopover
//       open={open}
//       content={<Stack></Stack>}
//       closeCallback={() => setOpen(false)}
//       placement=''
//     >
//       <Stack alignItems="center" direction="row" spacing="5px">
//         <Typography bold>{dayjs(t.startTime).format("HH:mma")}</Typography>
//         <PencilIcon height="16px" width="16px" />
//       </Stack>
//     </UrsorPopover>
//   );
// };

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
    title="Time scheduler"
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
