import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import UrsorDialog from "../../../components/UrsorDialog";
import WonderingIllustration from "../../../images/WonderingIllustration.svg";
import GraphIllustration from "../../../images/GraphIllustration.svg";
import DefaultIllustration from "../../../images/DefaultIllustration.svg";
import { useClassroomContext } from "../ClassroomContext";
import ClassIntroDialogButton from "../components/ClassIntroDialogButton";

const PLUS_ICON_SIZE = "45px";
const ILLUST_ROW_WIDTH = "780px";
const DELAY = 800;

export interface IClassDialogProps {
  openingCallback: () => void;
  alreadyBeenOpened: boolean;
  lessonCallback: () => void;
  studentCallback: () => void;
  teacherCallback: () => void;
}

export default function ClassIntroDialog(props: IClassDialogProps) {
  const classroomCtx = useClassroomContext();

  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    open && props.openingCallback();
  }, [open]);

  useEffect(() => {
    if (
      !props.alreadyBeenOpened &&
      classroomCtx.students &&
      classroomCtx.lessons &&
      classroomCtx.teachers &&
      !(
        classroomCtx.students.length + classroomCtx.lessons.length > 0 ||
        classroomCtx.teachers.length > 1
      )
    ) {
      const timeout = setTimeout(() => setOpen(true), DELAY);
      return () => clearTimeout(timeout);
    } else {
      setOpen(false);
      //setAlreadyBeenOpened(true);
    }

    // setOpen(
    //   !!(
    //     classroomCtx.lessons &&
    //     classroomCtx.students &&
    //     classroomCtx.students.length + classroomCtx.lessons.length === 0
    //   )
    // );
  }, [
    classroomCtx.students?.length,
    classroomCtx.lessons?.length,
    classroomCtx.teachers?.length,
  ]);

  useEffect(() => {
    if (
      open &&
      //!alreadyBeenOpened &&
      classroomCtx.students &&
      classroomCtx.lessons &&
      classroomCtx.teachers &&
      (classroomCtx.students.length + classroomCtx.lessons.length > 0 ||
        classroomCtx.teachers.length > 1)
    ) {
      setOpen(false);
      //setAlreadyBeenOpened(true);
    }
  }, [open]);

  const [hovering, setHovering] = useState<boolean>(false);

  return (
    <UrsorDialog
      title={"Get Started"}
      subtitle={[
        "Create a lesson, add students or add colleagues to get",
        "this classroom started!",
      ]}
      supertitle="Add to Session"
      open={open}
      loading={false}
      secondaryButton={{
        text: "Skip",
        callback: () => setOpen(false),
      }}
      onCloseCallback={() => setOpen(false)}
    >
      <Stack justifyContent="center" height="100%">
        <Stack
          direction="row"
          width={ILLUST_ROW_WIDTH}
          height="100%"
          justifyContent="space-between"
        >
          <Box
            onClick={() => {
              props.studentCallback();
              setOpen(false);
            }}
            height="100%"
          >
            <ClassIntroDialogButton
              title="Add Students"
              illustration={DefaultIllustration}
            />
          </Box>
          <Box
            onClick={() => {
              props.teacherCallback();
              setOpen(false);
            }}
            height="100%"
          >
            <ClassIntroDialogButton
              title="Add Teachers"
              illustration={WonderingIllustration}
            />
          </Box>
          <Box
            onClick={() => {
              props.lessonCallback();
              setOpen(false);
            }}
            height="100%"
          >
            <ClassIntroDialogButton
              title="Create a Lesson"
              illustration={GraphIllustration}
            />
          </Box>
        </Stack>
      </Stack>
    </UrsorDialog>
  );
}
