import UrsorDialog from "@/app/components/UrsorDialog";
import { Stack } from "@mui/system";
import { UrsorInputField, UrsorTextField } from "ui";
import { Captioned } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import { useContext, useEffect, useState } from "react";
import ApiController from "../api";
import { useRouter } from "next/navigation";
import PencilIcon from "@/images/icons/Pencil.svg";
import { useUserContext } from "../components/UserContext";
import NotificationContext from "../components/NotificationContext";
import { ILesson } from "../lesson/[subdirectory]/page";
import { useLocalStorage } from "usehooks-ts";

function createUrlFromTitle(title: string, idString: string) {
  // Check if the title includes 'untitled lesson'
  if (title.trim().toLowerCase().includes("untitled lesson")) {
    return idString;
  }

  // Remove punctuation from the title
  title = title.toLowerCase();
  title = title.replace(/[^\w\s]/g, "");
  // Remove leading and trailing whitespace
  title = title.trim();
  // Reduce whitespace between words to a single dash
  title = title.replace(/\s+/g, "-");
  // Limit the title to 8 words
  const titleWords = title.split("-").slice(0, 8);
  title = titleWords.join("-");
  // Take the last 6 characters of the id string
  const idSuffix = idString.slice(-6);
  // Append idSuffix to the title with a dash
  title += `-${idSuffix}`;

  return title;
}

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
    const newUrl = createUrlFromTitle(title, props.lesson?.id ?? "000000");
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
    const newUrl = createUrlFromTitle(title, props.lesson?.id ?? "000000");

    props.lesson?.id &&
      ApiController.updateLesson(props.lesson.id, {
        title,
        description,
      })
        .then(() => {
          if (props.lesson!.canonicalUrl != newUrl) {
            return ApiController.updateLessonUrl(props.lesson!.id, newUrl);
          }
        })
        .then(props.updateCallback)
        .then(props.closeCallback)
        .then(() => notificationCtx.success("Lesson updated."));
  };

  return (
    <UrsorDialog
      supertitle={props.lesson?.title ? "Edit your Lesson" : "Name your Lesson"}
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
