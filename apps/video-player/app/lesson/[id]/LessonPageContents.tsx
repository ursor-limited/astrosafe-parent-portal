"use client";

import { Stack, keyframes } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { useReactToPrint } from "react-to-print";
import { PALETTE, Typography, UrsorButton } from "ui";
import { IWorksheet } from "@/app/components/WorksheetGenerator";
import PencilIcon from "@/images/icons/Pencil.svg";
import ShareIcon from "@/images/icons/ShareIcon2.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
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

export const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

export type AstroLessonContent = Omit<AstroContent, "lesson">;

export default function LessonPageContents(props: { lessonId: string }) {
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
  useEffect(
    () => setContents(_.reverse(lesson ? [...lesson.contents] : [])),
    [lesson?.contents]
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

  const [hoveringContentIndex, setHoveringContentIndex] = useState<
    number | undefined
  >(undefined);
  const [hoveringAboveCenter, setHoveringAboveCenter] =
    useState<boolean>(false);
  // const [addContentButtonRelativeY, setAddContentButtonRelativeY] =
  //   useState<number>(0);

  // useEffect(() => {
  //   if (
  //     !_.isNumber(hoveringContentIndex) ||
  //     (hoveringContentIndex === 0 && hoveringAboveCenter) ||
  //     (hoveringContentIndex === contents.length - 1 && !hoveringAboveCenter)
  //   ) {
  //     setHoveringContentIndex(undefined);
  //     return;
  //   }

  //   const currentElementRect = document
  //     .getElementById(contents[hoveringContentIndex].contentId)
  //     ?.getBoundingClientRect();
  //   if (!currentElementRect) return;
  //   const currentElementCenter =
  //     currentElementRect.top + currentElementRect?.height / 2;

  //   const adjacentElementRect = document
  //     .getElementById(
  //       contents[hoveringContentIndex + (hoveringAboveCenter ? -1 : 1)]
  //         .contentId
  //     )
  //     ?.getBoundingClientRect();
  //   if (!adjacentElementRect) return;
  //   const adjacentElementCenter =
  //     adjacentElementRect.top + adjacentElementRect?.height / 2;
  //   setAddContentButtonRelativeY(
  //     (adjacentElementCenter - currentElementCenter) / 2
  //   );
  // }, [hoveringContentIndex, hoveringAboveCenter, contents]);

  const [mouseY, setMouseY] = useState<number>(0);

  const [showTopAdditionButton, setShowTopAdditionButton] =
    useState<boolean>(false);
  useEffect(
    () =>
      setShowTopAdditionButton(
        !_.isNumber(hoveringContentIndex) ||
          (hoveringContentIndex === 0 && hoveringAboveCenter)
      ),
    [hoveringAboveCenter, hoveringContentIndex]
  );

  return (
    <>
      <Stack
        p="40px"
        overflow="scroll"
        onMouseMove={(event) => setMouseY(event.pageY)}
      >
        <BigCard
          title={lesson?.title ?? ""}
          description={lesson?.description ?? ""}
          createdAt={lesson?.createdAt ?? undefined}
          rightStuff={
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
                border={`2px solid ${PALETTE.primary.navy}`}
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
                }}
              >
                <ShareIcon width="22px" height="22px" />
              </Stack>
            </Stack>
          }
        >
          {/* {_.isNumber(hoveringContentIndex) ? (
            <Stack
              position="absolute"
              height="100%"
              width="50px"
              top={0}
              left={0}
              right={0}
              marginLeft="auto"
              marginRight="auto"
              zIndex={999999}
              // sx={{
              //   transform: `translateY(${addContentButtonRelativeY}px)`,
              // }}
            >
              <AddContentButton
                callback={(type) =>
                  outOfCreations
                    ? setNoCreationsLeftDialogOpen(true)
                    : contentCallbacks[type]()
                }
              />
            </Stack>
          ) : null} */}
          {/* <Stack
            position="absolute"
            left={0}
            right={0}
            top={0}
            marginLeft="auto !important"
            marginRight="auto !important"
            height="100%"
            width="2px"
            bgcolor={PALETTE.secondary.grey[3]}
          ></Stack> */}
          {!showTopAdditionButton ? (
            <Stack
              height="100%"
              bgcolor="cyan"
              position="fixed"
              top={0}
              left="50%"
              sx={{
                transform: `translateY(-26px)`,
                opacity: 0,
                animation: `${fadeIn} 0.2s ease-in`,
                animationFillMode: "forwards",
              }}
              zIndex={3}
            >
              {/* <Stack
              position="absolute"
              left={0}
              right={0}
              top={0}
              marginLeft="auto !important"
              marginRight="auto !important"
              height="100%"
              width="2px"
              bgcolor={PALETTE.secondary.grey[3]}
            /> */}

              <Stack height="100%" position="relative">
                <Stack position="absolute" top={mouseY - 18} left={-18}>
                  <AddContentButton
                    callback={(type) =>
                      outOfCreations
                        ? setNoCreationsLeftDialogOpen(true)
                        : contentCallbacks[type]()
                    }
                  />
                </Stack>
              </Stack>
            </Stack>
          ) : null}
          <Stack width="100%">
            <Stack
              //height="20px"
              //left="50%"
              //sx={{ transform: "translate(-50%)" }}
              //zIndex={3}
              alignItems="center"
              pt="60px"
              pb="60px"
              sx={{
                pointerEvents: !showTopAdditionButton ? "none" : undefined,
              }}
              height="50px"
            >
              {showTopAdditionButton ? (
                <Stack
                  sx={{
                    animation: `${fadeIn} 0.2s ease-in`,
                    animationFillMode: "forwards",
                  }}
                >
                  <AddContentButton
                    callback={(type) =>
                      outOfCreations
                        ? setNoCreationsLeftDialogOpen(true)
                        : contentCallbacks[type]()
                    }
                  />
                </Stack>
              ) : null}

              {/* <Stack
                height="40px"
                width="2px"
                bgcolor={PALETTE.secondary.grey[3]}
              /> */}
            </Stack>

            <Stack px="24px">
              {contents
                .map((c) => {
                  if (c.type === "video") {
                    const video = videos?.find((v) => v.id === c.contentId);
                    return video ? (
                      <LessonVideoCard
                        key={video.id}
                        {...video}
                        editingCallback={() =>
                          setVideoEditingDialogId(video.id)
                        }
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
                        editingCallback={() =>
                          setImageEditingDialogId(image.id)
                        }
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
                        {...worksheet}
                        lessonId={props.lessonId}
                        editingCallback={() =>
                          setWorksheetEditingDialogId(worksheet.id)
                        }
                        deletionCallback={loadLesson}
                        worksheet={worksheet}
                      />
                    ) : null;
                  }
                })
                .map((card, i) => (
                  <UrsorFadeIn duration={800} key={i}>
                    <Stack
                      id={card?.props.id}
                      alignItems={i % 2 ? "flex-end" : "flex-start"}
                      position="relative"
                      onMouseEnter={() => {
                        setHoveringContentIndex(i);
                      }}
                      onMouseLeave={() => {
                        setHoveringContentIndex(undefined);
                      }}
                      onMouseMove={(event) => {
                        setHoveringContentIndex(i);
                        //@ts-ignore
                        const rect = event?.target?.getBoundingClientRect();
                        //console.log(rect);
                        setHoveringAboveCenter(
                          event.pageY < rect.height / 2 + rect.top
                        );
                      }}
                    >
                      {/* {hoveringContentIndex === i ? (
                        <Stack
                          height="100%"
                          position="absolute"
                          top={0}
                          // bottom={0}
                          left={0}
                          right={0}
                          marginLeft="auto"
                          marginRight="auto"
                          alignItems="center"
                          justifyContent="center"
                          zIndex={99999}
                          sx={{
                            opacity: 0,
                            animation: `${fadeIn} 0.2s ease-in`,
                            animationFillMode: "forwards",
                          }}
                        >
                          <Stack
                            sx={{
                              transform: `translateY(${addContentButtonRelativeY}px)`,
                            }}
                          >
                            <AddContentButton
                              callback={(type) =>
                                outOfCreations
                                  ? setNoCreationsLeftDialogOpen(true)
                                  : contentCallbacks[type]()
                              }
                            />
                          </Stack>
                        </Stack>
                      ) : null} */}
                      <Stack width="40%">{card}</Stack>

                      {/* {_.isNumber(hoveringPreviousContentIndex) ? ( */}
                      <Stack
                        position="absolute"
                        left={0}
                        right={0}
                        top={i === 0 ? undefined : 0}
                        bottom={i === 0 ? 0 : undefined}
                        marginLeft="auto !important"
                        marginRight="auto !important"
                        height={
                          i === 0 || i === contents.length - 1 ? "50%" : "100%"
                        }
                        width="2px"
                        bgcolor={PALETTE.secondary.grey[3]}
                      />
                      {/* ) : null} */}

                      <Stack
                        bgcolor={PALETTE.secondary.purple[1]}
                        height="20px"
                        width="20px"
                        borderRadius="100%"
                        position="absolute"
                        left={0}
                        right={0}
                        top={0}
                        bottom={0}
                        margin="auto"
                      />
                    </Stack>
                  </UrsorFadeIn>
                ))}
            </Stack>
          </Stack>
        </BigCard>
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
      />
      {worksheetEditingDialogId ? (
        <WorksheetCreationDialog
          open={true}
          closeCallback={() => setWorksheetEditingDialogId(undefined)}
          editingCallback={loadLesson}
          worksheet={worksheets.find((w) => w.id === worksheetEditingDialogId)}
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
      />
      {textEditingDialogId ? (
        <TextDialog
          open={true}
          closeCallback={() => setTextEditingDialogId(undefined)}
          updateCallback={loadLesson}
          text={texts.find((t) => t.id === textEditingDialogId)}
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
      />
      <UpgradeDialog
        open={upgradeDialogOpen}
        closeCallback={() => setUpgradeDialogOpen(false)}
      />
    </>
  );
}
