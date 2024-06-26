import UrsorDialog from "@/app/components/UrsorDialog";
import { Stack } from "@mui/system";
import { UrsorInputField, UrsorTextField } from "ui";
import { useContext, useEffect, useState } from "react";
import ApiController from "../api";
import { useRouter } from "next/navigation";
import PencilIcon from "@/images/icons/Pencil.svg";
import { useUserContext } from "../components/UserContext";
import NotificationContext from "../components/NotificationContext";
import { ILesson } from "../lesson/[subdirectory]/page";
import { useLocalStorage } from "usehooks-ts";

const LessonCreationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  lesson?: ILesson;
  updateCallback?: () => void;
  skipCallback?: () => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [canonicalUrl, setCanonicalUrl] = useState<string>("");
  const [nonCanonicalUrlList, setNonCanonicalUrlList] = useState<string[]>([]);
  useEffect(() => {
    props.lesson?.title && setTitle(props.lesson.title);
  }, [props.lesson?.title]);
  useEffect(() => {
    props.lesson?.description && setDescription(props.lesson.description);
  }, [props.lesson?.description]);
  useEffect(() => {
    props.lesson?.canonicalUrl && setCanonicalUrl(props.lesson.canonicalUrl);
  }, [props.lesson?.canonicalUrl]);
  useEffect(() => {
    props.lesson?.nonCanonicalUrlList &&
      setNonCanonicalUrlList(props.lesson.nonCanonicalUrlList);
  }, [props.lesson?.nonCanonicalUrlList]);

  const router = useRouter();
  const userId = useUserContext().user?.id;
  const notificationCtx = useContext(NotificationContext);

  const [openContentDialogInLessonId, setOpenContentDialogInLessonId] =
    useLocalStorage<string | null>("openContentDialogInLessonId", null);

  const submitCreation = () => {
    ApiController.createLesson({
      title,
      description,
      creatorId: userId,
    }).then((lesson) => {
      setOpenContentDialogInLessonId(lesson.id);
      router.push(`/lesson/${lesson.canonicalUrl}`);
    });
  };

  const submitUpdate = () => {
    props.lesson?.id &&
      ApiController.updateLesson(props.lesson.id, {
        title,
        description,
      })
        .then((result) =>
          router.push(`/lesson/${result?.canonicalUrl || props.lesson?.id}`)
        )
        .then(props.updateCallback)
        .then(props.closeCallback)
        .then(() => notificationCtx.success("Lesson updated."));
  };

  return (
    <UrsorDialog
      supertitle={
        props.lesson?.title ? "Edit your Channel" : "Name your Channel"
      }
      open={props.open}
      onCloseCallback={props.closeCallback}
      dynamicHeight
      width={"488px"}
      button={{
        text: props.lesson?.title ? "Update" : "Create",
        callback: () => (props.lesson?.id ? submitUpdate() : submitCreation()),
        disabled: !title,
        icon: PencilIcon,
      }}
      secondaryButton={
        props.skipCallback
          ? {
              text: "Name later",
              callback: () => {
                props.skipCallback!();
                props.closeCallback();
              },
            }
          : undefined
      }
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
            height="90px"
            boldValue
          />
        </Captioned>
      </Stack>
    </UrsorDialog>
  );
};

export default LessonCreationDialog;
