"use client";

import { Stack } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { useReactToPrint } from "react-to-print";
import { PALETTE, Typography, UrsorButton } from "ui";
import { IWorksheet } from "@/app/components/WorksheetGenerator";
import PencilIcon from "@/images/icons/Pencil.svg";
import ShareIcon from "@/images/icons/ShareIcon2.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import Pencil from "@/images/icons/Pencil.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BigCard from "@/app/components/BigCard";
import DeletionDialog from "@/app/components/DeletionDialog";
import TextDialog, { IText } from "@/app/components/TextDialog";
import ApiController, { IVideo } from "@/app/api";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/components/UserContext";
import NotificationContext from "@/app/components/NotificationContext";
import { AstroContent } from "@/app/dashboard/DashboardPageContents";
import LessonVideoCard from "./LessonVideoCard";
import LinkCard from "@/app/components/LinkCard";
import AddContentButton from "./AddContentButton";
import LinkDialog, { ILink } from "@/app/dashboard/LinkDialog";
import VideoCreationDialog from "@/app/dashboard/VideoCreationDialog";
import WorksheetCreationDialog from "@/app/dashboard/WorksheetCreationDialog";
import { ILesson } from "./page";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import NoCreationsLeftDialog from "@/app/dashboard/NoCreationsLeftDialog";
import UpgradeDialog from "@/app/components/UpgradeDialog";
import { useOutOfCreations } from "@/app/dashboard/LiteModeBar";
import UrsorActionButton from "@/app/components/UrsorActionButton";
import LessonCreationDialog from "@/app/dashboard/LessonCreationDialog";
import ImageDialog, { IImage } from "@/app/dashboard/ImageDialog";
import ImageCard from "@/app/components/ImageCard";
import TextCard from "@/app/components/TextCard";
import "react-quill/dist/quill.snow.css";
import LessonWorksheetPreview from "./LessonWorksheetPreview";

export type AstroLessonContent = Omit<AstroContent, "lesson">;

export default function MobileLessonPageContents(props: { lessonId: string }) {
  const [lesson, setLesson] = useState<ILesson | undefined>(undefined);
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [links, setLinks] = useState<ILink[]>([]);
  const [images, setImages] = useState<IImage[]>([]);
  const [texts, setTexts] = useState<IText[]>([]);
  const [worksheets, setWorksheets] = useState<IWorksheet[]>([]);

  const loadLesson = () =>
    ApiController.getLessonWithContents(props.lessonId).then(
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
        response?.actualContents?.texts &&
          setTexts(
            response.actualContents.texts.map((t: any) => ({
              ...t,
              value: t.value.replaceAll("&lt;", "<"),
            }))
          );
      }
    );

  const reloadLessonDetails = () =>
    ApiController.getLesson(props.lessonId).then((l) => setLesson(l));

  useEffect(() => {
    props.lessonId && loadLesson();
  }, [props.lessonId]);

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
  useEffect(() => setContents(lesson?.contents || []), [lesson?.contents]);

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
    setContents(lesson.contents);
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
  const contentCallbacks: Record<AstroContent, () => void> = {
    worksheet: () => setWorksheetDialogOpen(true),
    video: () => setVideoDialogOpen(true),
    link: () => setLinkDialogOpen(true),
    image: () => setImageDialogOpen(true),
    text: () => setTextDialogOpen(true),
    lesson: () => null,
  };

  const [noCreationsLeftDialogOpen, setNoCreationsLeftDialogOpen] =
    useState<boolean>(false);

  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState<boolean>(false);

  const outOfCreations = useOutOfCreations();

  const [editingDialogOpen, setEditingDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Stack p="16px" overflow="scroll">
        <Stack width="100%" direction="row" justifyContent="space-between">
          <Stack
            direction="row"
            alignItems="center"
            spacing="3px"
            sx={{
              cursor: "pointer",
              "&:hover": { opacity: 0.7 },
              transition: "0.2s",
              svg: {
                path: { fill: PALETTE.secondary.grey[1] },
              },
            }}
            onClick={() => router.push(userDetails ? "/dashboard" : "/")}
          >
            <ChevronLeft width="20px" height="20px" />
            <Typography color={PALETTE.secondary.grey[1]}>
              Back to Home
            </Typography>
          </Stack>
          <Stack direction="row" spacing="12px">
            {userDetails?.user?.id &&
            userDetails?.user?.id === lesson?.creatorId ? (
              <UrsorActionButton
                size="43px"
                iconSize="17px"
                //background={PALETTE.secondary.grey[1]}
                border
                actions={[
                  {
                    text: "Edit",
                    kallback: () => setEditingDialogOpen(true),
                    icon: PencilIcon,
                  },
                  {
                    text: "Delete",
                    kallback: () => setDeletionDialogOpen(true),
                    icon: TrashcanIcon,
                    color: PALETTE.system.red,
                  },
                ]}
              />
            ) : null}
            <Stack
              borderRadius="100%"
              border={`2px solid ${PALETTE.secondary.purple[2]}`}
              height="39px"
              width="39px"
              justifyContent="center"
              alignItems="center"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                notificationCtx.success("Copied URL to clipboard.");
              }}
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.6 },
                transition: "0.2s",
                svg: {
                  path: {
                    fill: PALETTE.secondary.purple[2],
                  },
                },
              }}
            >
              <ShareIcon width="22px" height="22px" />
            </Stack>
          </Stack>
        </Stack>

        {lesson ? (
          <Stack pt="20px">
            <Typography htmlTag="h1" variant="h5" bold color="rgb(255,255,255)">
              {lesson?.title}
            </Typography>
            <Typography htmlTag="h2" variant="small" color="rgb(255,255,255)">
              {lesson?.description}
            </Typography>
          </Stack>
        ) : null}

        <Stack width="100%">
          <Stack
            height="110px"
            position="fixed"
            left="50%"
            sx={{ transform: "translate(-50%)" }}
            zIndex={3}
          >
            <Stack sx={{ zIndex: 2 }}>
              <AddContentButton
                mobile
                callback={(type) =>
                  outOfCreations
                    ? setNoCreationsLeftDialogOpen(true)
                    : contentCallbacks[type]()
                }
              />
            </Stack>
          </Stack>
          <Stack pt="65px" width="100%" spacing="16px">
            {_.reverse(contents.slice())
              .map((c) => {
                if (c.type === "video") {
                  const video = videos?.find((v) => v.id === c.contentId);
                  return video ? (
                    <LessonVideoCard
                      key={video.id}
                      {...video}
                      editingCallback={() => setVideoEditingDialogId(video.id)}
                      deletionCallback={loadLesson}
                      lessonId={props.lessonId}
                    />
                  ) : null;
                } else if (c.type === "link") {
                  const link = links?.find((v) => v.id === c.contentId);
                  return link ? (
                    <LinkCard
                      key={link.id}
                      {...link}
                      editCallback={() => setLinkEditingDialogId(link.id)}
                      deleteCallback={loadLesson}
                    />
                  ) : null;
                } else if (c.type === "text") {
                  const text = texts?.find((t) => t.id === c.contentId);
                  return text ? (
                    <TextCard
                      key={text.id}
                      {...text}
                      editCallback={() => setTextEditingDialogId(text.id)}
                      deleteCallback={loadLesson}
                    />
                  ) : null;
                } else if (c.type === "image") {
                  const image = images?.find((i) => i.id === c.contentId);
                  return image ? (
                    <ImageCard
                      key={image.id}
                      {...image}
                      editingCallback={() => setImageEditingDialogId(image.id)}
                      deletionCallback={loadLesson}
                    />
                  ) : null;
                } else if (c.type === "worksheet") {
                  const worksheet = worksheets?.find(
                    (w) => w.id === c.contentId
                  );
                  return worksheet ? (
                    <LessonWorksheetPreview
                      key={worksheet.id}
                      worksheet={worksheet}
                      lessonId={props.lessonId}
                      editingCallback={
                        () => null
                        //setWorksheetEditingDialogId(worksheet.id)
                      }
                      deletionCallback={loadLesson}
                    />
                  ) : null;
                }
              })
              .map((card, i) => (
                <UrsorFadeIn duration={800} key={i}>
                  {card}
                </UrsorFadeIn>
              ))}
          </Stack>
        </Stack>
      </Stack>
      <LessonCreationDialog
        open={editingDialogOpen}
        closeCallback={() => setEditingDialogOpen(false)}
        lesson={lesson}
        updateCallback={reloadLessonDetails}
      />
      <DeletionDialog
        open={deletionDialogOpen}
        closeCallback={() => setDeletionDialogOpen(false)}
        deletionCallback={submitDeletion}
        category="playlist"
        title={lesson?.title ?? ""}
      />
      <VideoCreationDialog
        open={videoDialogOpen}
        closeCallback={() => setVideoDialogOpen(false)}
        creationCallback={(id) => {
          ApiController.addToLesson(props.lessonId, "video", id).then(
            (response) => updateLesson(response.lesson, response.actualContents)
          );
        }}
      />
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
        closeCallback={() => setWorksheetDialogOpen(false)}
        creationCallback={(id) => {
          ApiController.addToLesson(props.lessonId, "worksheet", id).then(
            (response) => updateLesson(response.lesson, response.actualContents)
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
        closeCallback={() => setLinkDialogOpen(false)}
        creationCallback={(link) => {
          ApiController.addToLesson(props.lessonId, "link", link.id).then(
            (response) => updateLesson(response.lesson, response.actualContents)
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
      <TextDialog
        open={textDialogOpen}
        closeCallback={() => setTextDialogOpen(false)}
        creationCallback={(text) => {
          ApiController.addToLesson(props.lessonId, "text", text.id).then(
            (response) => updateLesson(response.lesson, response.actualContents)
          );
        }}
        mobile
      />
      {textEditingDialogId ? (
        <TextDialog
          open={true}
          closeCallback={() => setTextEditingDialogId(undefined)}
          updateCallback={loadLesson}
          text={texts.find((t) => t.id === textEditingDialogId)}
          mobile
        />
      ) : null}
      {imageDialogOpen ? (
        <ImageDialog
          open={imageDialogOpen}
          closeCallback={() => setImageDialogOpen(false)}
          creationCallback={(link) => {
            ApiController.addToLesson(props.lessonId, "image", link.id).then(
              (response) =>
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
