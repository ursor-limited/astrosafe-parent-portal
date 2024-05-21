import React from "react";
import WorksheetCard, { IWorksheetCardProps } from "./WorksheetCard";
import { IStudentAnswers } from "../../../components/WorksheetDialog/WorksheetDialog";
import { Box, Stack } from "@mui/system";
import Typography from "../../../components/Typography";
import { PALETTE } from "../../../palette";

const WIDTH = "301px";
const INDICATOR_ITEM_WIDTH = "70px";

const WorksheetCardIndicatorItem = (props: {
  n: number;
  text: string;
  color?: string;
}) => (
  <Stack width={INDICATOR_ITEM_WIDTH} alignItems="center">
    <Typography variant="h4" color={props.color}>
      {props.n}
    </Typography>
    <Typography variant="small" color={props.color}>
      {props.text}
    </Typography>
  </Stack>
);

export interface IClassroomPageWorksheetCardProps
  extends Omit<IWorksheetCardProps, "width"> {
  allAnswers: IStudentAnswers[];
  nStudents: number;
}

export default function ClassroomPageWorksheetCard(
  props: IClassroomPageWorksheetCardProps
) {
  return (
    <WorksheetCard {...props} width="100%">
      <Stack direction="row" justifyContent="space-between">
        <WorksheetCardIndicatorItem
          n={props.allAnswers.filter((a) => a.state === "inProgress").length}
          text="Assigned"
        />
        <Box width="1px" height="100%" bgcolor={PALETTE.secondary.grey[2]} />
        <WorksheetCardIndicatorItem
          n={props.allAnswers.filter((a) => a.state === "submitted").length}
          text="To mark"
          color={
            props.allAnswers.filter((a) => a.state === "submitted").length > 0
              ? PALETTE.system.orange
              : PALETTE.font.dark
          }
        />
        <Box width="1px" height="100%" bgcolor={PALETTE.secondary.grey[2]} />
        <WorksheetCardIndicatorItem
          n={props.allAnswers.filter((a) => a.state === "results").length}
          text="Graded"
        />
      </Stack>
    </WorksheetCard>
  );
}
