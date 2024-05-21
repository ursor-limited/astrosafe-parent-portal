import React, { useContext } from "react";
import { Box } from "@mui/system";
import UrsorDialog from "../../../components/UrsorDialog";
import ApiController from "../../../controllers/ApiController";
import NotificationContext from "../../../contexts/NotificationContext";
import Illustration from "../../../images/WonderingIllustration.svg";
import { PALETTE } from "../../../palette";
import { useUserDataContext } from "../../../contexts/UserDataContext";

const SUCCESS_MESSAGE = "Deleted Lesson";

export interface IDeleteDialogProps {
  open: boolean;
  closeCallback: () => void;
  lessonId: string;
}

export default function DeleteLessonDialog(props: IDeleteDialogProps) {
  const notificationCtx = useContext(NotificationContext);
  const dataCtx = useUserDataContext();
  return (
    <UrsorDialog
      title="Delete Lesson"
      subtitle={[
        "This lesson will be permanently deleted. Please note that this action",
        "can not be undone.",
      ]}
      supertitle="Delete Lesson"
      open={props.open}
      button={{
        color: PALETTE.system.red,
        text: "Delete",
        callback: () =>
          ApiController.deleteLesson(props.lessonId)
            .then(() => notificationCtx.negativeSuccess(SUCCESS_MESSAGE))
            .finally(() => {
              dataCtx.refreshStacks();
              props.closeCallback();
            })
            .catch((error) => notificationCtx.error(error.message)),
      }}
      onCloseCallback={props.closeCallback}
      backButtonCallback={props.closeCallback}
    >
      <Box
        component="img"
        height="86%"
        minHeight={0}
        maxHeight="100%"
        width="fit-content"
        src={Illustration}
      />
    </UrsorDialog>
  );
}
