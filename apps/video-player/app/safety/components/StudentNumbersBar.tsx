import { Box, Stack } from "@mui/system";
import React from "react";
import { PALETTE } from "../../../palette";
import Typography from "../../../components/Typography";
import _ from "lodash";
import {
  SESSION_STATE_COLORS,
  SESSION_STATE_DISPLAY_NAMES,
  UrsorSessionState,
} from "../dialogs/StudentDialog/StudentDialog";

const STATE_ORDER: UrsorSessionState[] = [
  "onTask",
  "offTask",
  "wrongSite",
  "offline",
];

export interface IStudentNumbersBarProps {}

const StudentNumbersBarItem = (props: {
  color: string;
  n: number;
  text: string;
}) => (
  <Stack
    direction="row"
    spacing="6px"
    alignItems="center"
    sx={{ opacity: props.n > 0 ? 1 : 0.48 }}
  >
    <Box height="12px" width="12px" bgcolor={props.color} borderRadius="100%" />
    <Stack direction="row" spacing="3px">
      <Typography variant="small" bold color={PALETTE.secondary.grey[5]}>
        {props.n}
      </Typography>
      <Typography variant="small" color={PALETTE.secondary.grey[5]}>
        {props.text}
      </Typography>
    </Stack>
  </Stack>
);

export default function StudentNumbersBar(props: IStudentNumbersBarProps) {
  // const stateCounts = _.countBy(classroomCtx.students, (s) => s.sessionState);
  return (
    <></>
    // <Stack
    //   height="42px"
    //   width="fit-content"
    //   px="17px"
    //   direction="row"
    //   spacing="14px"
    //   borderRadius="41px"
    //   bgcolor="rgb(255,255,255)"
    // >
    //   {STATE_ORDER.map((state: UrsorSessionState) => (
    //     <StudentNumbersBarItem
    //       key={state}
    //       color={SESSION_STATE_COLORS[state]}
    //       n={stateCounts[state] ?? 0}
    //       text={SESSION_STATE_DISPLAY_NAMES[state]}
    //     />
    //   ))}
    // </Stack>
  );
}
