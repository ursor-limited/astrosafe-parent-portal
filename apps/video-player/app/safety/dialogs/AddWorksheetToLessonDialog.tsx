import React, { useState } from "react";
import UrsorDialog from "../../../components/UrsorDialog";
import _ from "lodash";
import UrsorSearchBar from "../../../components/inputs/UrsorSearchBar";
import { ReactComponent as ClassroomsIcon } from "../../../images/icons/ClassroomsIcon.svg";
import { Stack } from "@mui/system";
import { PALETTE } from "../../../palette";
import { useUserDataContext } from "../../../contexts/UserDataContext";

export const SELECT_WIDTH = "457px";
const ICON_SIZE = "24px";

export interface IAddWorksheetToLessonDialogProps {
  open: boolean;
  classroomId: string;
  closeCallback: () => void;
  selectionCallback: (lessonId: string) => void;
  newLessonCallback: () => void;
}

export default function AddWorksheetToLessonDialog(
  props: IAddWorksheetToLessonDialogProps
) {
  const dataCtx = useUserDataContext();

  const [selectedClassroom, setSelectedClassroom] = useState<
    string | undefined
  >(undefined);

  return (
    <UrsorDialog
      title={"Add Worksheet to Lesson"}
      supertitle="Create a Worksheet"
      subtitle={[
        "Select the lesson for which you would",
        "like to create this worksheet for.",
      ]}
      open={props.open}
      button={{
        text: "Continue",
        callback: () => props.selectionCallback(selectedClassroom!),
        disabled: !selectedClassroom,
      }}
      secondaryButton={{
        text: "Create new Lesson",
        callback: props.newLessonCallback,
      }}
      onCloseCallback={props.closeCallback}
      backButtonCallback={props.closeCallback}
    >
      <UrsorSearchBar
        showEverythingOnInit
        itemGroups={[
          {
            type: "lessons",
            title: "Lesson",
            items:
              dataCtx.lessons
                ?.filter((l) => l.classId === props.classroomId)
                ?.map((l) => ({
                  id: l.id,
                  name: l.title,
                  icon: (
                    <Stack
                      alignItems="center"
                      sx={{ path: { fill: PALETTE.secondary.grey[3] } }}
                    >
                      <ClassroomsIcon height={ICON_SIZE} width={ICON_SIZE} />
                    </Stack>
                  ),
                  callback: () => setSelectedClassroom(l.id),
                })) ?? [],
          },
        ]}
        width={SELECT_WIDTH}
        placeholder="Select a Lesson"
        selected={selectedClassroom}
        clearInputValueOnSelect
      />
    </UrsorDialog>
  );
}
