import React, { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../contexts/NotificationContext";
import UrsorDialog from "../../../components/UrsorDialog";
import ApiController from "../../../controllers/ApiController";
import Illustration from "../../../images/WonderingIllustration.svg";
import { Box } from "@mui/system";

const SUCCESS_MESSAGE = "Lesson Drafted";

export interface IDraftDialogProps {
  open: boolean;
  lessonId: string;
  closeCallback: () => void;
  submitCallback: () => void;
}

export default function DraftDialog(props: IDraftDialogProps) {
  const notificationCtx = useContext(NotificationContext);

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <UrsorDialog
      title="Change Lesson to Draft"
      subtitle={[
        "Changing a lesson to a draft removes students access so that",
        "you can prepare your lesson and release it later.",
      ]}
      supertitle="Draft Lesson"
      open={props.open}
      loading={loading}
      button={{
        text: "Do it",
        callback: async () => {
          return ApiController.updateLesson(props.lessonId, {
            isDraft: true,
            isArchived: false,
          })
            .then(() => notificationCtx.success(SUCCESS_MESSAGE))
            .finally(() => props.submitCallback())
            .catch((error) => notificationCtx.error(error.message));
        },
      }}
      onCloseCallback={props.closeCallback}
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
