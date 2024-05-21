import React from "react";
import Typography from "../../../components/Typography";
import UrsorDialog from "../../../components/UrsorDialog";
import NotificationContext from "../../../contexts/NotificationContext";
import ApiController from "../../../controllers/ApiController";
import { IStudent } from "../../AdminPage/AdminPageStudentsTab";
import { useUserDataContext } from "../../../contexts/UserDataContext";

const SUCCESS_MESSAGE = "Removed Student";

export interface IStudentRemovalDialogProps {
  open: boolean;
  student: IStudent;
  classId: string;
  closeCallback: () => void;
}

export default function StudentRemovalDialog(
  props: IStudentRemovalDialogProps
) {
  const notificationCtx = React.useContext(NotificationContext);
  const dataCtx = useUserDataContext();
  return (
    <UrsorDialog
      title={"Remove Student from Class"}
      subtitle={[
        "Are you sure that you want to remove",
        <Typography variant="medium" bold>
          {props.student.name}
        </Typography>,
        "from this class?",
      ]}
      open={props.open}
      button={{
        text: "Remove",
        callback: async () => {
          await ApiController.removeStudentFromClassroom(
            props.classId,
            props.student.id
          )
            .then(() => {
              notificationCtx.negativeSuccess(SUCCESS_MESSAGE);
              dataCtx.refreshStudents();
              dataCtx.refreshClassrooms();
              dataCtx.refreshStacks();
              props.closeCallback();
            })
            .catch((error) => notificationCtx.error(error.message));
        },
      }}
      onCloseCallback={props.closeCallback}
    ></UrsorDialog>
  );
}
