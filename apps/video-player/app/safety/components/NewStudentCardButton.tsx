import { Stack } from "@mui/system";
import React from "react";
import { HEIGHT, IMAGE_HEIGHT } from "./LessonCard";
import { PALETTE } from "../../../palette";
import Typography from "../../../components/Typography";
import { ReactComponent as PlusIcon } from "../../../images/icons/PlusIcon.svg";
import { DEFAULT_CORNER_RADIUS } from "../../../components/UrsorPopover";

export default function NewStudentCardButton(props: { width: string }) {
  return (
    <Stack
      width={props.width}
      height="86px"
      borderRadius={DEFAULT_CORNER_RADIUS}
      bgcolor="rgb(255,255,255)"
      overflow="hidden"
      direction="row"
      p="12px"
      alignItems="center"
      spacing="10px"
    >
      <Stack
        bgcolor={PALETTE.secondary.grey[2]}
        alignItems="center"
        justifyContent="center"
        borderRadius="100%"
        width="52px"
        height="52px"
        sx={{
          svg: {
            path: {
              fill: PALETTE.secondary.grey[4],
            },
          },
        }}
      >
        <PlusIcon height="23px" width="23px" />
      </Stack>
      <Typography bold color={PALETTE.secondary.grey[3]}>
        Add Student
      </Typography>
    </Stack>
  );
}
