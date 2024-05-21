import React from "react";
import { Box, Stack } from "@mui/system";
import Typography from "../../../components/Typography";
import { PALETTE } from "../../../palette";
import { IStudentAnswers } from "../../../components/WorksheetDialog/WorksheetDialog";
import ProgressBar from "@ramonak/react-progress-bar";
import _ from "lodash";
import { URL_FONT_SIZE } from "./StudentsTabStudentCard";

export interface IStudentWorksheetStatusIndicatorProps {
  // nAnswers: number;
  nQuestions: number;
  // state: StudentAnswersState;
  answers?: IStudentAnswers;
  barLength: string;
  alwaysDisplayBar?: boolean;
}

export const getResultBarColor = (score: number, maxScore: number) => {
  if (score / maxScore < 0.4) {
    return PALETTE.system.red;
  } else if (score / maxScore < 0.75) {
    return PALETTE.system.orange;
  }
  return PALETTE.system.green;
};

export default function StudentWorksheetStatusIndicator(
  props: IStudentWorksheetStatusIndicatorProps
) {
  return (
    <Stack
      direction="row"
      spacing="4px"
      height="100%"
      minHeight="11px"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      {!props.answers || props.answers.state === "inProgress" ? (
        <>
          <Typography
            noWrap
            sx={{ fontSize: URL_FONT_SIZE }}
            bold
            color={PALETTE.secondary.grey[3]}
          >
            {props.answers?.answers
              ? `${props.answers?.answers.length}/${props.nQuestions} in progress`
              : "Not begun"}
          </Typography>
          {props.answers?.answers ? (
            <ProgressBar
              completed={
                props.answers
                  ? (props.answers.answers.length / props.nQuestions) * 100
                  : 0
              }
              customLabel=" "
              height="8px"
              width={"100%" ?? props.barLength}
              bgColor={PALETTE.secondary.blue[1]}
              baseBgColor={PALETTE.secondary.grey[2]}
            />
          ) : null}
        </>
      ) : null}
      {props.answers?.answers &&
      props.answers.state === "submitted" &&
      !props.alwaysDisplayBar ? (
        <Typography
          noWrap
          sx={{ fontSize: URL_FONT_SIZE }}
          bold
          color={PALETTE.secondary.grey[3]}
        >
          Ready to mark
        </Typography>
      ) : null}
      {props.answers?.answers &&
      (props.answers.state === "results" || props.alwaysDisplayBar) ? (
        <>
          <Typography
            noWrap
            sx={{ fontSize: URL_FONT_SIZE, minWidth: "fit-content" }}
            bold
            color={PALETTE.secondary.grey[3]}
          >{`Score: ${_.reduce(
            props.answers.answers,
            (acc, cur) => acc + (cur.score ?? 0),
            0
          )}/${props.nQuestions}`}</Typography>
          <ProgressBar
            completed={
              props.answers
                ? (_.sum(props.answers.answers.map((a) => a.score)) /
                    props.nQuestions) *
                  100
                : 0
            }
            customLabel=" "
            height="8px"
            width={"100%" ?? props.barLength}
            bgColor={getResultBarColor(
              _.reduce(
                props.answers.answers,
                (acc, cur) => acc + (cur.score ?? 0),
                0
              ),
              props.nQuestions
            )}
            baseBgColor={PALETTE.secondary.grey[2]}
          />
        </>
      ) : null}
    </Stack>
  );
}
