import React from "react";
import Typography from "../../../components/Typography";
import UrsorDialog from "../../../components/UrsorDialog";
import NotificationContext from "../../../contexts/NotificationContext";
import ApiController from "../../../controllers/ApiController";
import { ITeacher } from "../../AdminPage/AdminPageTeachersTab";

const SUCCESS_MESSAGE = "Removed Teacher";

export interface ITeacherRemovalDialogProps {
  open: boolean;
  teacher: ITeacher;
  classId: string;
  closeCallback: () => void;
}

export default function TeacherRemovalDialog(
  props: ITeacherRemovalDialogProps
) {
  const notificationCtx = React.useContext(NotificationContext);

  return (
    <UrsorDialog
      title={"Remove Teacher from Class"}
      subtitle={[
        "Are you sure that you want to remove",
        <Typography variant="medium" bold>
          {props.teacher.teacherName}
        </Typography>,
        "from this class?",
      ]}
      open={props.open}
      button={{
        text: "Remove",
        callback: async () => {
          await ApiController.removeTeacherFromClassroom(
            props.classId,
            props.teacher.id
          )
            .then(() => {
              notificationCtx.negativeSuccess(SUCCESS_MESSAGE);

              props.closeCallback();
            })
            .catch((error) => notificationCtx.error(error.message));
        },
      }}
      onCloseCallback={props.closeCallback}
    ></UrsorDialog>
  );
}
