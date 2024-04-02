import UrsorDialog from "@/app/components/UrsorDialog";
import { Stack } from "@mui/system";
import { UrsorInputField, UrsorTextField } from "ui";
import { Captioned } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import { useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import ApiController from "../api";
import { useRouter } from "next/navigation";
import PencilIcon from "@/images/icons/Pencil.svg";
import { useUserContext } from "../components/UserContext";
import NotificationContext from "../components/NotificationContext";

const LessonCreationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  lessonId?: string;
  title?: string;
  description?: string;
  updateCallback?: () => void;
}) => {
  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    props.title && setTitle(props.title);
  }, [props.title]);
  const [description, setDescription] = useState<string>("");
  useEffect(() => {
    props.description && setDescription(props.description);
  }, [props.description]);
  const router = useRouter();
  const userId = useUserContext().user?.id;
  const notificationCtx = useContext(NotificationContext);
  const submitCreation = () =>
    ApiController.createLesson({
      title,
      description,
      creatorId: userId,
    }).then((lesson) => router.push(`/lesson/${lesson.id}`));
  const submitUpdate = () =>
    props.lessonId &&
    ApiController.updateLesson(props.lessonId, {
      title,
      description,
    })
      .then(props.updateCallback)
      .then(props.closeCallback)
      .then(() => notificationCtx.success("Lesson updated."));
  return (
    <UrsorDialog
      supertitle={props.title ? "Edit your Lesson" : "Name your Lesson"}
      open={props.open}
      onCloseCallback={props.closeCallback}
      dynamicHeight
      width="488px"
      noPadding={isMobile}
      button={{
        text: props.title ? "Update" : "Create",
        callback: () => (props.lessonId ? submitUpdate() : submitCreation()),
        icon: PencilIcon,
      }}
    >
      <Stack spacing="20px" width="100%">
        <Captioned text="Title">
          <UrsorInputField
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
            placeholder="Title"
            width="100%"
            leftAlign
            boldValue
          />
        </Captioned>
        <Captioned text="Description">
          <UrsorTextField
            value={description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(event.target.value)
            }
            placeholder="Description"
            width="100%"
            height="90px"
            boldValue
          />
        </Captioned>
      </Stack>
    </UrsorDialog>
  );
};

export default LessonCreationDialog;
