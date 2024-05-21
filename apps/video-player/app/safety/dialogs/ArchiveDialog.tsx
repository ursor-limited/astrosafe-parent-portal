import React, { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../contexts/NotificationContext";
import UrsorDialog from "../../../components/UrsorDialog";
import ApiController from "../../../controllers/ApiController";
import Illustration from "../../../images/WonderingIllustration.svg";
import { Box } from "@mui/system";

const SUCCESS_MESSAGE = "Lesson Archived";

export interface IArchiveDialogProps {
  open: boolean;
  lessonId: string;
  closeCallback: () => void;
  submitCallback: () => void;
}

export default function ArchiveDialog(props: IArchiveDialogProps) {
  const notificationCtx = useContext(NotificationContext);

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <UrsorDialog
      title="Move Lesson to Archive"
      subtitle={[
        "Archiving a lesson will hide the lesson from students and move it",
        "to the Archive page for access at a later date.",
      ]}
      supertitle="Archive Lesson"
      open={props.open}
      loading={loading}
      button={{
        text: "Archive",
        callback: async () => {
          return ApiController.updateLesson(props.lessonId, {
            isArchived: true,
            isDraft: false,
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
