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
import { ILesson } from "../lesson/[id]/page";
import { useLocalStorage } from "usehooks-ts";

const LessonCreationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  lesson?: ILesson;
  updateCallback?: () => void;
}) => {
  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    props.lesson?.title && setTitle(props.lesson.title);
  }, [props.lesson?.title]);
  const [description, setDescription] = useState<string>("");
  useEffect(() => {
    props.lesson?.description && setDescription(props.lesson.description);
  }, [props.lesson?.description]);
  const router = useRouter();
  const userId = useUserContext().user?.id;
  const notificationCtx = useContext(NotificationContext);

  const [openContentDialogInLessonId, setOpenContentDialogInLessonId] =
    useLocalStorage<string | null>("openContentDialogInLessonId", null);

  const submitCreation = () =>
    ApiController.createLesson({
      title,
      description,
      creatorId: userId,
    }).then((lesson) => {
      setOpenContentDialogInLessonId(lesson.id);
      router.push(`/lesson/${lesson.id}`);
    });
  const submitUpdate = () =>
    props.lesson?.id &&
    ApiController.updateLesson(props.lesson.id, {
      title,
      description,
    })
      .then(props.updateCallback)
      .then(props.closeCallback)
      .then(() => notificationCtx.success("Lesson updated."));

  return (
    <UrsorDialog
      supertitle={props.lesson?.title ? "Edit your Lesson" : "Name your Lesson"}
      open={props.open}
      onCloseCallback={props.closeCallback}
      dynamicHeight
      width={"488px"}
      //noPadding={isMobile}
      button={{
        text: props.lesson?.title ? "Update" : "Create",
        callback: () => (props.lesson?.id ? submitUpdate() : submitCreation()),
        disabled: !title,
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
