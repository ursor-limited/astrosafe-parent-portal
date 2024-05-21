import { Stack } from "@mui/system";
import React from "react";
import { IMAGE_HEIGHT, MAX_WIDTH } from "./LessonCard";
import { PALETTE } from "../../../palette";
import Typography from "../../../components/Typography";
import { ReactComponent as PlusIcon } from "../../../images/icons/PlusIcon.svg";
import { DEFAULT_CORNER_RADIUS } from "../../../components/UrsorPopover";

const HEIGHT = "211px";

export default function NewLessonCardButton(props: {
  color?: string;
  title: string;
}) {
  return (
    <Stack
      width="100%"
      maxWidth={MAX_WIDTH}
      height={HEIGHT}
      borderRadius={DEFAULT_CORNER_RADIUS}
      m="2px"
      bgcolor="rgb(255,255,255)"
      overflow="hidden"
    >
      <Stack
        bgcolor={props.color ?? PALETTE.secondary.grey[2]}
        height={IMAGE_HEIGHT}
      />
      <Stack flex={1} p="15px" justifyContent="space-between">
        <Typography bold variant="large" color={PALETTE.secondary.grey[3]}>
          {props.title}
        </Typography>
        <Stack width="100%" alignItems="flex-end">
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
        </Stack>
      </Stack>
    </Stack>
  );
}
