"use client";

import { Stack } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { IWorksheet } from "@/app/components/WorksheetGenerator";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DeletionDialog from "@/app/components/DeletionDialog";
import TextDialog, { IText } from "@/app/components/TextDialog";
import ApiController, { IVideo } from "@/app/api";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/components/UserContext";
import NotificationContext from "@/app/components/NotificationContext";
import {
  AstroContent,
  DEFAULT_LESSON_TITLE,
} from "@/app/dashboard/DashboardPageContents";
import LessonVideoCard from "./MoonsafeKidsVideoCard";
import LinkCard from "@/app/components/LinkCard";
import AddContentButton from "./AddContentButton";
import LinkDialog, { ILink } from "@/app/dashboard/LinkDialog";
import VideoCreationDialog from "@/app/dashboard/VideoCreationDialog";
import WorksheetCreationDialog from "@/app/dashboard/WorksheetCreationDialog";
import { ILesson } from "./page";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import NoCreationsLeftDialog from "@/app/dashboard/NoCreationsLeftDialog";
import UpgradeDialog from "@/app/components/UpgradeDialog";
import { useOnBasicMode } from "@/app/dashboard/LiteModeBar";
import UrsorActionButton from "@/app/components/UrsorActionButton";
import LessonCreationDialog from "@/app/dashboard/LessonCreationDialog";
import ImageDialog, { IImage } from "@/app/dashboard/ImageDialog";
import ImageCard from "@/app/components/ImageCard";
import TextCard from "@/app/components/TextCard";
import "react-quill/dist/quill.snow.css";
import LessonWorksheetPreview from "./LessonWorksheetPreview";
import MobilePageCard from "@/app/dashboard/MobilePageCard";
import { useLocalStorage } from "usehooks-ts";
import TimelineImageCard from "./cards/TimelineImageCard";
import TimelineLinkCard from "./cards/TimelineLinkCard";
import TimelineTextCard from "./cards/TimelineTextCard";
import TimelineWorksheetCard from "./cards/TimelineWorksheetCard";
import TimelineVideoCard from "./cards/TimelineVideoCard";
import MobileExternalPageFooter from "@/app/components/MobileExternalPageFooter";
import QuizDialog, { IQuiz } from "@/app/components/QuizDialog";

export type AstroLessonContent = Omit<AstroContent, "lesson">;

export const cleanTextValueIntoInnerHTML = (value: string) =>
  value.replaceAll("&lt;", "<");

export default function MobileLessonPageContents(props: {
  subdirectory: string;
}) {
  const [lesson, setLesson] = useState<ILesson | undefined>(undefined);
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [links, setLinks] = useState<ILink[]>([]);
  const [images, setImages] = useState<IImage[]>([]);
  const [texts, setTexts] = useState<IText[]>([]);
  const [worksheets, setWorksheets] = useState<IWorksheet[]>([]);
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);

  const loadLesson = () =>
    ApiController.getLessonFromUrlWithContents(props.subdirectory).then(
      (response: any) => {
        if (!response) return;
        response?.lesson && setLesson(response.lesson);
        response?.actualContents?.videos &&
          setVideos(response.actualContents.videos);
        response?.actualContents?.worksheets &&
          setWorksheets(response.actualContents.worksheets);
        response?.actualContents?.links &&
          setLinks(response.actualContents.links);
        response?.actualContents?.images &&
          setImages(response.actualContents.images);
        response?.actualContents?.quizzes &&
          setQuizzes(response.actualContents.quizzes);
        response?.actualContents?.texts &&
          setTexts(
            response.actualContents.texts.map((t: any) => ({
              ...t,
              value: cleanTextValueIntoInnerHTML(t.value),
            }))
          );
      }
    );

  const reloadLessonDetails = () =>
    ApiController.getLessonFromUrl(props.subdirectory).then((l) =>
      setLesson(l)
    );

  useEffect(() => {
    props.subdirectory && loadLesson();
  }, [props.subdirectory]);

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  const submitDeletion = () =>
    lesson?.id &&
    ApiController.deleteLesson(lesson.id)
      .then(() => router.push("/dashboard"))
      .then(() => notificationCtx.negativeSuccess("Deleted Lesson."));

  const userDetails = useUserContext();

  const notificationCtx = useContext(NotificationContext);

  const [contents, setContents] = useState<
    {
      type: AstroLessonContent;
      contentId: string;
    }[]
  >([]);
  useEffect(
    () =>
      setContents(
        lesson
          ? _.compact([
              ...lesson.contentOrder.map((contentId) =>
                lesson.contents.find((c) => c.contentId === contentId)
              ),
            ])
          : []
      ),
    [lesson?.contents, lesson?.contentOrder]
  );

  const updateLesson = (
    lesson: ILesson,
    actualContents: {
      videos: IVideo[];
      worksheets: IWorksheet[];
      links: ILink[];
      images: IImage[];
      texts: IText[];
    }
  ) => {
    setContents(
      _.compact([
        ...lesson.contentOrder.map((contentId) =>
          lesson.contents.find((c) => c.contentId === contentId)
        ),
      ])
    );
    setVideos(actualContents.videos);
    setWorksheets(actualContents.worksheets);
    setLinks(actualContents.links);
    setImages(actualContents.images);
    setTexts(
      actualContents.texts.map((t: any) => ({
        ...t,
        value: t.value.replaceAll("&lt;", "<"),
      }))
    );
  };

  const [worksheetDialogOpen, setWorksheetDialogOpen] =
    useState<boolean>(false);
  const [worksheetEditingDialogId, setWorksheetEditingDialogId] = useState<
    string | undefined
  >(undefined);

  const [videoDialogOpen, setVideoDialogOpen] = useState<boolean>(false);
  const [videoEditingDialogId, setVideoEditingDialogId] = useState<
    string | undefined
  >(undefined);

  const [linkDialogOpen, setLinkDialogOpen] = useState<boolean>(false);
  const [linkEditingDialogId, setLinkEditingDialogId] = useState<
    string | undefined
  >(undefined);

  const [textDialogOpen, setTextDialogOpen] = useState<boolean>(false);
  const [textEditingDialogId, setTextEditingDialogId] = useState<
    string | undefined
  >(undefined);

  const [imageDialogOpen, setImageDialogOpen] = useState<boolean>(false);
  const [imageEditingDialogId, setImageEditingDialogId] = useState<
    string | undefined
  >(undefined);

  const [quizDialogOpen, setQuizDialogOpen] = useState<boolean>(true);
  const [quizEditingDialogId, setQuizEditingDialogId] = useState<
    string | undefined
  >(undefined);

  const contentCallbacks: Record<AstroContent, () => void> = {
    worksheet: () => setWorksheetDialogOpen(true),
    video: () => setVideoDialogOpen(true),
    link: () => setLinkDialogOpen(true),
    image: () => setImageDialogOpen(true),
    text: () => setTextDialogOpen(true),
    quiz: () => setQuizDialogOpen(true),
    lesson: () => null,
  };

  const [noCreationsLeftDialogOpen, setNoCreationsLeftDialogOpen] =
    useState<boolean>(false);

  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState<boolean>(false);

  const onBasicMode = useOnBasicMode();

  const [editingDialogOpen, setEditingDialogOpen] = useState<boolean>(false);

  const [contentInsertionIndex, setContentInsertionIndex] = useState<
    number | undefined
  >(undefined);

  const [addContentPopoverOpenId, setAddContentPopoverOpenId] = useState<
    string | undefined
  >(undefined);

  const [
    typeOfContentDialogToOpenUponLandingInNewLesson,
    setTypeOfContentDialogToOpenUponLandingInNewLesson,
  ] = useLocalStorage<"video" | "worksheet" | null>(
    "typeOfContentDialogToOpenUponLandingInNewLesson",
    null
  );

  const [openContentDialogInLessonId, setOpenContentDialogInLessonId] =
    useLocalStorage<string | null>("openContentDialogInLessonId", null);

  useEffect(() => {
    if (openContentDialogInLessonId === props.subdirectory) {
      setTimeout(() => {
        if (typeOfContentDialogToOpenUponLandingInNewLesson === "video") {
          setVideoDialogOpen(true);
          setOpenContentDialogInLessonId(null);
          setTypeOfContentDialogToOpenUponLandingInNewLesson(null);
        }
        if (typeOfContentDialogToOpenUponLandingInNewLesson === "worksheet") {
          setWorksheetDialogOpen(true);
          setOpenContentDialogInLessonId(null);
          setTypeOfContentDialogToOpenUponLandingInNewLesson(null);
        }
      }, 1000);
    }
  }, [
    openContentDialogInLessonId,
    typeOfContentDialogToOpenUponLandingInNewLesson,
  ]);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    notificationCtx.success("Copied URL to clipboard.");
  };

  const [lessonNamingDialogSkipTo, setLessonNamingDialogSkipTo] = useState<
    "back" | "share" | null
  >(null);

  const [needToTitle, setNeedToTitle] = useState<boolean>(false);
  useEffect(
    () =>
      setNeedToTitle(
        lesson?.title === DEFAULT_LESSON_TITLE &&
          lessonNamingDialogSkipTo !== "share"
      ),
    [lesson?.title, lessonNamingDialogSkipTo]
  );

  return (
    <>
      {lesson ? (
        <MobilePageCard
          title={lesson.title}
          description={lesson.description}
          creatorId={lesson.creatorId}
          editingEnabled={
            !!userDetails?.user?.id && userDetails.user.id === lesson?.creatorId
          }
          editingCallback={() => setEditingDialogOpen(true)}
          deletionCallback={() => setDeletionDialogOpen(true)}
          backCallback={
            needToTitle
              ? () => {
                  setLessonNamingDialogSkipTo("back");
                  setEditingDialogOpen(true);
                  notificationCtx.success(
                    "Please add a title to your Lesson before leaving."
                  );
                }
              : undefined
          }
          copyCallback={() => {
            if (needToTitle) {
              setLessonNamingDialogSkipTo("share");
              setEditingDialogOpen(true);
              notificationCtx.success(
                "Please add a title to your Lesson before sharing it."
              );
            } else {
              navigator.clipboard.writeText(window.location.href);
              notificationCtx.success("Copied URL to clipboard.");
            }
          }}
        >
          <Stack width="100%" pt="16px">
            {userDetails?.user?.id &&
            lesson &&
            userDetails.user.id === lesson.creatorId ? (
              <Stack
                alignItems="center"
                onClick={() => setContentInsertionIndex(0)}
              >
                <AddContentButton
                  mobile
                  open={addContentPopoverOpenId === "first"}
                  setOpen={(o) =>
                    setAddContentPopoverOpenId(
                      (o ? "first" : undefined) as string
                    )
                  }
                  callback={(type) => contentCallbacks[type]()}
                  clickOutsideCloseCallback={() => null}
                  premiumCallback={() => setUpgradeDialogOpen(true)}
                />
              </Stack>
            ) : null}
            <Stack pt="20px" width="100%" spacing="16px">
              {contents
                .map((c) => {
                  if (c.type === "video") {
                    const video = videos?.find((v) => v.id === c.contentId);
                    return video ? (
                      <TimelineVideoCard
                        key={video.id}
                        {...video}
                        lessonId={lesson?.id ?? ""}
                        editingCallback={() =>
                          setVideoEditingDialogId(video.id)
                        }
                        deletionCallback={loadLesson}
                        duplicationCallback={loadLesson}
                      />
                    ) : null;
                  } else if (c.type === "link") {
                    const link = links?.find((v) => v.id === c.contentId);
                    return link ? (
                      <TimelineLinkCard
                        key={link.id}
                        {...link}
                        lessonId={lesson?.id}
                        editingCallback={() => setLinkEditingDialogId(link.id)}
                        deletionCallback={loadLesson}
                        duplicationCallback={loadLesson}
                        mobile
                      />
                    ) : null;
                  } else if (c.type === "text") {
                    const text = texts?.find((t) => t.id === c.contentId);
                    return text ? (
                      <TimelineTextCard
                        key={text.id}
                        {...text}
                        lessonId={lesson?.id}
                        editingCallback={() => setTextEditingDialogId(text.id)}
                        deletionCallback={loadLesson}
                        duplicationCallback={loadLesson}
                      />
                    ) : null;
                  } else if (c.type === "image") {
                    const image = images?.find((i) => i.id === c.contentId);
                    return image ? (
                      <TimelineImageCard
                        key={image.id}
                        {...image}
                        lessonId={lesson?.id ?? ""}
                        editingCallback={() =>
                          setImageEditingDialogId(image.id)
                        }
                        deletionCallback={loadLesson}
                        duplicationCallback={loadLesson}
                        mobile
                      />
                    ) : null;
                  } else if (c.type === "worksheet") {
                    const worksheet = worksheets?.find(
                      (w) => w.id === c.contentId
                    );
                    return worksheet ? (
                      <TimelineWorksheetCard
                        key={worksheet.id}
                        {...worksheet}
                        lessonId={lesson?.id ?? ""}
                        editingCallback={() =>
                          setWorksheetEditingDialogId(worksheet.id)
                        }
                        deletionCallback={loadLesson}
                        duplicationCallback={loadLesson}
                      />
                    ) : null;
                  }
                })
                .map((card, i) => (
                  <UrsorFadeIn duration={800} key={i}>
                    <Stack spacing="16px" justifyContent="center">
                      {card}
                      {userDetails?.user?.id &&
                      lesson &&
                      userDetails.user.id === lesson.creatorId ? (
                        <Stack
                          width="100%"
                          alignItems="center"
                          onClick={() => setContentInsertionIndex(i + 1)}
                        >
                          <AddContentButton
                            mobile
                            open={addContentPopoverOpenId === card?.key}
                            setOpen={(o) =>
                              setAddContentPopoverOpenId(
                                (o
                                  ? card?.key
                                    ? card?.key
                                    : undefined
                                  : undefined) as string
                              )
                            }
                            callback={(type) =>
                              onBasicMode
                                ? setNoCreationsLeftDialogOpen(true)
                                : contentCallbacks[type]()
                            }
                            premiumCallback={() => setUpgradeDialogOpen(true)}
                            clickOutsideCloseCallback={() =>
                              setContentInsertionIndex(undefined)
                            }
                          />
                        </Stack>
                      ) : null}
                    </Stack>
                  </UrsorFadeIn>
                ))}
            </Stack>
          </Stack>
          <Stack height="100vh" justifyContent="center">
            <MobileExternalPageFooter />
          </Stack>
        </MobilePageCard>
      ) : null}
      <LessonCreationDialog
        open={editingDialogOpen}
        closeCallback={() => setEditingDialogOpen(false)}
        lesson={lesson}
        updateCallback={reloadLessonDetails}
        skipCallback={
          lessonNamingDialogSkipTo
            ? lessonNamingDialogSkipTo === "back"
              ? () => router.push("/dashboard")
              : () => copyUrl()
            : undefined
        }
      />
      <DeletionDialog
        open={deletionDialogOpen}
        closeCallback={() => setDeletionDialogOpen(false)}
        deletionCallback={submitDeletion}
        category="playlist"
        title={lesson?.title ?? ""}
      />
      {videoDialogOpen ? (
        <VideoCreationDialog
          open={videoDialogOpen}
          closeCallback={() => {
            setVideoDialogOpen(false);
            setContentInsertionIndex(undefined);
          }}
          creationCallback={(id, title) => {
            lesson &&
              ApiController.addToLesson(
                lesson.id,
                contentInsertionIndex ?? 0,
                "video",
                id
              ).then(() =>
                lesson?.contents.length === 0
                  ? ApiController.updateLesson(props.subdirectory, {
                      title,
                    }).then(loadLesson)
                  : loadLesson()
              );
          }}
        />
      ) : null}
      {videoEditingDialogId ? (
        <VideoCreationDialog
          open={true}
          closeCallback={() => setVideoEditingDialogId(undefined)}
          editingCallback={loadLesson}
          video={videos.find((v) => v.id === videoEditingDialogId)}
        />
      ) : null}
      <WorksheetCreationDialog
        open={worksheetDialogOpen}
        closeCallback={() => {
          setWorksheetDialogOpen(false);
          setContentInsertionIndex(undefined);
        }}
        creationCallback={(id) => {
          lesson &&
            ApiController.addToLesson(
              lesson.id,
              contentInsertionIndex ?? 0,
              "worksheet",
              id
            ).then((response) =>
              updateLesson(response.lesson, response.actualContents)
            );
        }}
        mobile
      />
      {worksheetEditingDialogId ? (
        <WorksheetCreationDialog
          open={true}
          closeCallback={() => setWorksheetEditingDialogId(undefined)}
          editingCallback={loadLesson}
          worksheet={worksheets.find((w) => w.id === worksheetEditingDialogId)}
          mobile
        />
      ) : null}
      <LinkDialog
        open={linkDialogOpen}
        closeCallback={() => {
          setLinkDialogOpen(false);
          setContentInsertionIndex(undefined);
        }}
        creationCallback={(link) => {
          lesson &&
            ApiController.addToLesson(
              lesson.id,
              contentInsertionIndex ?? 0,
              "link",
              link.id
            ).then((response) =>
              updateLesson(response.lesson, response.actualContents)
            );
        }}
      />
      {linkEditingDialogId ? (
        <LinkDialog
          open={true}
          closeCallback={() => setLinkEditingDialogId(undefined)}
          updateCallback={loadLesson}
          link={links.find((l) => l.id === linkEditingDialogId)}
        />
      ) : null}
      {textDialogOpen ? (
        <TextDialog
          open={textDialogOpen}
          closeCallback={() => {
            setTextDialogOpen(false);
            setContentInsertionIndex(undefined);
          }}
          creationCallback={(text) => {
            lesson &&
              ApiController.addToLesson(
                lesson.id,
                contentInsertionIndex ?? 0,
                "text",
                text.id
              ).then((response) =>
                updateLesson(response.lesson, response.actualContents)
              );
          }}
          mobile
        />
      ) : null}
      {textEditingDialogId ? (
        <TextDialog
          open={true}
          closeCallback={() => setTextEditingDialogId(undefined)}
          updateCallback={loadLesson}
          text={texts.find((t) => t.id === textEditingDialogId)}
          mobile
        />
      ) : null}
      {quizDialogOpen && lesson ? (
        <QuizDialog
          open={true}
          closeCallback={() => setQuizDialogOpen(false)}
          creationCallback={(quiz) => {
            ApiController.addToLesson(
              lesson.id,
              contentInsertionIndex ?? 0,
              "quiz",
              quiz.id
            ).then(loadLesson);
          }}
        />
      ) : null}
      {quizEditingDialogId ? (
        <QuizDialog
          open={true}
          closeCallback={() => setQuizEditingDialogId(undefined)}
          editingCallback={loadLesson}
          quiz={quizzes.find((q) => q.id === quizEditingDialogId)}
        />
      ) : null}
      {imageDialogOpen ? (
        <ImageDialog
          open={imageDialogOpen}
          closeCallback={() => {
            setImageDialogOpen(false);
            setContentInsertionIndex(undefined);
          }}
          creationCallback={(link) => {
            lesson &&
              ApiController.addToLesson(
                lesson.id,
                contentInsertionIndex ?? 0,
                "image",
                link.id
              ).then((response) =>
                updateLesson(response.lesson, response.actualContents)
              );
          }}
        />
      ) : null}
      {imageEditingDialogId ? (
        <ImageDialog
          open={true}
          closeCallback={() => setImageEditingDialogId(undefined)}
          updateCallback={loadLesson}
          image={images.find((i) => i.id === imageEditingDialogId)}
        />
      ) : null}
      <NoCreationsLeftDialog
        open={noCreationsLeftDialogOpen}
        closeCallback={() => setNoCreationsLeftDialogOpen(false)}
        callback={() => setUpgradeDialogOpen(true)}
        mobile
      />
      <UpgradeDialog
        open={upgradeDialogOpen}
        closeCallback={() => setUpgradeDialogOpen(false)}
        mobile
      />
    </>
  );
}