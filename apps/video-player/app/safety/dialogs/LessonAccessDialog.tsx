import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import UrsorDialog from "../../../components/UrsorDialog";
import _ from "lodash";
import { IClassroom } from "./AddStudentToClassroomDialog";
import { useUserDataContext } from "../../../contexts/UserDataContext";
import { UserAdditionDialogContent } from "./AddStudentDialogNew";
import UrsorButton from "../../../components/buttons/UrsorButton";
import { ReactComponent as X } from "../../../images/icons/x.svg";
import { ReactComponent as PlusIcon } from "../../../images/icons/PlusIcon.svg";

export interface ILessonAccessDialogProps {
  open: boolean;
  selectedStudentIds: string[];
  classroomId: string;
  closeCallback: () => void;
  selectionCallback: (students: string[]) => void;
  //completionCallback: () => void;
}

export default function LessonAccessDialog(props: ILessonAccessDialogProps) {
  const dataCtx = useUserDataContext();

  const [selectedStudentIds, setSelectedStudentIds] = useState<
    string[] | undefined
  >(undefined);
  const [classroom, setClassroom] = useState<IClassroom | undefined>(undefined);

  useEffect(() => {
    setClassroom(dataCtx.classrooms.find((c) => c.id === props.classroomId));
  }, [props.classroomId]);

  useEffect(() => {
    (!selectedStudentIds || !props.open) &&
      setSelectedStudentIds(props.selectedStudentIds);
  }, [props.selectedStudentIds, props.open]);

  return (
    <UrsorDialog
      title={"Who should have access?"}
      supertitle="Create Lesson"
      subtitle={[
        "Select if all Students or a specific Group should",
        "have access to this Lesson.",
      ]}
      open={props.open}
      button={{
        text: "Continue",
        callback: () => props.selectionCallback(selectedStudentIds!),
      }}
      onCloseCallback={props.closeCallback}
      backButtonCallback={props.closeCallback}
      dynamicHeight
    >
      <Stack>
        {classroom && selectedStudentIds ? (
          <UserAdditionDialogContent
            extraRow={
              <Stack
                width="100%"
                justifyContent="center"
                direction="row"
                spacing="7px"
              >
                <UrsorButton
                  onClick={() => setSelectedStudentIds([])}
                  size="small"
                  variant="secondary"
                  startIcon={<X width="20px" height="20px" />}
                  disabled={selectedStudentIds.length === 0}
                >
                  Clear all
                </UrsorButton>
                <UrsorButton
                  onClick={() => setSelectedStudentIds(classroom.studentList)}
                  size="small"
                  variant="secondary"
                  startIcon={<PlusIcon width="20px" height="20px" />}
                  disabled={
                    selectedStudentIds.length === classroom.studentList.length
                  }
                >
                  Whole Classroom
                </UrsorButton>
              </Stack>
            }
            placeholder="Search for Student or Groups"
            students={dataCtx.students.filter(
              (s) => classroom.studentList.includes(s.id) //&&
              //!selectedStudentIds.includes(s.id)
            )}
            teachers={[]}
            classrooms={[]}
            studentGroups={classroom.studentGroups}
            selectedStudents={
              dataCtx.students &&
              selectedStudentIds.map(
                (id) => dataCtx.students.find((s) => s.id === id)!
              )
            }
            selectedTeachers={[]}
            noRemovalIds={[]}
            selectionCallback={(id, type) => {
              if (!id) {
                return;
              }
              if (type === "user") {
                !selectedStudentIds.includes(id) &&
                  setSelectedStudentIds([...selectedStudentIds, id]);
              } else {
                setSelectedStudentIds(
                  _.uniq([
                    ...selectedStudentIds,
                    ...classroom.studentGroups.find((group) => group.id === id)
                      ?.students!,
                  ])
                );
              }
            }}
            deletionCallback={(id) =>
              setSelectedStudentIds(
                selectedStudentIds.filter((sid) => sid !== id)
              )
            }
          />
        ) : null}
      </Stack>
    </UrsorDialog>
  );
}
