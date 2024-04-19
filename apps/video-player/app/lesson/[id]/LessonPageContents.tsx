"use client";

import { Stack, alpha, keyframes } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import _, { isNumber } from "lodash";
import { PALETTE, Typography, UrsorButton } from "ui";
import { IWorksheet } from "@/app/components/WorksheetGenerator";
import PencilIcon from "@/images/icons/Pencil.svg";
import ShareIcon from "@/images/icons/ShareIcon2.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PageCard from "@/app/components/PageCard";
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
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import { HEIGHTS } from "ui/ursor-button";
import ContentCards from "./ContentCards";
import TextCreationDialog from "@/app/components/TextDialog";
import GraphIllustration from "@/images/GraphIllustration.svg";
import Image from "next/image";
import AddContentDialog from "./AddContentDialog";

const DOT_CARD_Y = 40;
const CARD_SPACING = 100;
const RIGHT_COLUMN_Y_OFFSET = 60;

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
        setStaticAddButtonY(null);
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

  const [contentsWithCardHeight, setContentsWithCardHeight] = useState<
    {
      type: AstroLessonContent;
      contentId: string;
      height?: number;
    }[]
  >([]);

  const [contentsWithSide, setContentsWithSide] = useState<
    {
      type: AstroLessonContent;
      contentId: string;
      left: boolean;
    }[]
  >([]);

  useEffect(() => {
    if (!lesson || contentsWithCardHeight.length === 0) return; // TODO: get rid of the / 2
    var leftHeightSum = 0;
    var rightHeightSum = RIGHT_COLUMN_Y_OFFSET;
    setContentsWithSide(
      _.compact(
        lesson.contentOrder.map((contentId, i) => {
          const content = contentsWithCardHeight.find(
            (co) => co.contentId === contentId
          );
          if (!content) return;
          if (i === 0) {
            leftHeightSum += content.height ?? 0;
            return {
              type: content.type,
              contentId: content.contentId,
              left: true,
            };
          } else {
            const left = leftHeightSum < rightHeightSum;
            if (leftHeightSum > rightHeightSum) {
              rightHeightSum += CARD_SPACING + (content.height ?? 0);
            } else {
              leftHeightSum += CARD_SPACING + (content.height ?? 0);
            }
            return {
              type: content.type,
              contentId: content.contentId,
              left,
            };
          }
        })
      )
    );
  }, [contentsWithCardHeight, lesson, contents]);

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

  const [hoveringOnContentCard, setHoveringOnContentCard] =
    useState<boolean>(false);
  const [hoveringContentIndex, setHoveringContentIndex] = useState<
    number | undefined
  >(undefined);
  const [hoveringContentSide, setHoveringContentSide] = useState<
    "left" | "right" | null
  >(null);
  const [hoveringAboveCenter, setHoveringAboveCenter] =
    useState<boolean>(false);
  const [contentInsertionIndex, setContentInsertionIndex] = useState<
    number | undefined
  >(undefined);

  const [mouseY, setMouseY] = useState<number>(0);

  const [contentsColumnRef, setContentsColumnRef] =
    useState<HTMLElement | null>(null);

  const { height } = useWindowSize();

  const [pageRef, setPageRef] = useState<HTMLElement | null>(null);

  const [addContentPopoverOpen, setAddContentPopoverOpen] =
    useState<boolean>(false);

  const [headerAddContentPopoverOpen, setHeaderAddContentPopoverOpen] =
    useState<boolean>(false);

  const [starterAddContentDialogOpen, setStarterAddContentPopoverOpen] =
    useState<boolean>(false);

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
    if (openContentDialogInLessonId === props.lessonId) {
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

  const [contentsWithDotY, setContentsWithDotY] = useState<
    {
      type: AstroLessonContent;
      contentId: string;
      dotY: number;
    }[]
  >([]);

  useEffect(() => {
    contents &&
      setContentsWithDotY(
        contents.map((c) => ({
          ...c,
          dotY:
            (document
              .getElementById(`${c?.contentId}dot`)
              ?.getBoundingClientRect?.()?.top ?? 0) + 8,
        }))
      );
  }, [contents]);

  const [staticAddButtonY, setStaticAddButtonY] = useState<number | null>(null);
  useEffect(() => {
    !_.isNumber(contentInsertionIndex) && setStaticAddButtonY(null);
  }, [contentInsertionIndex]);

  const [contentColumnWidth, setContentColumnWidth] = useState<number>(0);
  useEffect(
    () =>
      setContentColumnWidth(
        (0.98 *
          ((contentsColumnRef?.getBoundingClientRect?.()?.width ?? 0) - 48)) /
          2
      ),
    [contentsColumnRef?.getBoundingClientRect?.()?.width]
  );

  const [addButtonY, setAddButtonY] = useState<number>(0);
  useEffect(
    () =>
      setAddButtonY(
        _.isNumber(staticAddButtonY)
          ? staticAddButtonY - 18
          : contents.length === 0
          ? contentsColumnRef?.getBoundingClientRect()?.top ?? 0
          : mouseY < height / 2
          ? Math.max(
              mouseY - 18,
              (contentsColumnRef?.getBoundingClientRect()?.top ?? 0) - 60
            )
          : Math.min(mouseY - 10, height - 50)
      ),
    [
      staticAddButtonY,
      contents,
      mouseY,
      height,
      contentsColumnRef?.getBoundingClientRect()?.top,
    ]
  );

  const [hovering, setHovering] = useState<boolean>(false);

  return (
    <>
      <Stack
        ref={setPageRef}
        px="20px"
        overflow="scroll"
        flex={1}
        bgcolor={
          userDetails?.user?.id && userDetails.user.id === lesson?.creatorId
            ? PALETTE.secondary.grey[1]
            : undefined
        }
        sx={{
          transition: "1s",
        }}
      >
        <Stack height="40px" minHeight="40px" />
        <PageCard
          title={lesson?.title ?? ""}
          description={lesson?.description ?? ""}
          createdAt={lesson?.createdAt ?? undefined}
          noBottomPadding
          rightStuff={
            <Stack direction="row" spacing="12px">
              <Stack
                sx={{
                  opacity:
                    userDetails?.user?.id &&
                    userDetails?.user?.id === lesson?.creatorId
                      ? 1
                      : 0,
                  pointerEvents:
                    userDetails?.user?.id &&
                    userDetails?.user?.id === lesson?.creatorId
                      ? undefined
                      : "none",
                  transition: "0.2s",
                }}
                direction="row"
                spacing="12px"
              >
                <AddContentButton
                  open={headerAddContentPopoverOpen}
                  setOpen={setHeaderAddContentPopoverOpen}
                  callback={(type) => contentCallbacks[type]()}
                  premiumCallback={() => setNoCreationsLeftDialogOpen(true)}
                  standardStyle
                />
                <UrsorButton
                  dark
                  variant="tertiary"
                  endIcon={ShareIcon}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    notificationCtx.success("Copied URL to clipboard.");
                  }}
                >
                  Share link
                </UrsorButton>
                <UrsorActionButton
                  size="43px"
                  iconSize="17px"
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
              </Stack>
            </Stack>
          }
          editingCallback={() => setEditingDialogOpen(true)}
          editingEnabled={
            !!userDetails?.user?.id && userDetails.user.id === lesson?.creatorId
          }
        >
          {contents.length > 0 &&
          !!userDetails?.user?.id &&
          userDetails.user.id === lesson?.creatorId ? (
            <Stack
              height="100%"
              width="48px"
              position="fixed"
              top={0}
              left="50%"
              sx={{
                transform: `translate(-24px, -26px)`,
                opacity: 0,
                animation: `${fadeIn} 0.2s ease-in`,
                animationFillMode: "forwards",
              }}
              zIndex={3}
              onWheel={(event) => {
                pageRef?.scroll({
                  //@ts-ignore
                  top: event?.deltaY + pageRef.scrollTop,
                });
              }}
              onMouseMove={(event) => {
                !addContentPopoverOpen &&
                  !worksheetDialogOpen &&
                  !videoDialogOpen &&
                  !imageDialogOpen &&
                  !linkDialogOpen &&
                  !textDialogOpen &&
                  setMouseY(event.pageY);
              }}
              onMouseEnter={() => {
                setHoveringOnContentCard(false);
              }}
              onMouseLeave={() => {
                setHoveringOnContentCard(true);
              }}
            >
              <Stack
                position="absolute"
                top={addButtonY}
                left={0}
                right={0}
                marginLeft="auto"
                marginRight="auto"
                onClick={() => {
                  setStaticAddButtonY(mouseY);
                  if (addContentPopoverOpen) return;
                  const dotYs =
                    lesson?.contentOrder.map(
                      (id) =>
                        (document
                          .getElementById(`${id}dot`)
                          ?.getBoundingClientRect?.()?.top ?? 0) +
                        document.body.scrollTop
                    ) ?? [];
                  if (mouseY < (dotYs?.[0] ?? 0)) {
                    setContentInsertionIndex(0);
                  } else if (mouseY > (dotYs?.[dotYs.length - 1] ?? 0)) {
                    setContentInsertionIndex(contents.length);
                  } else {
                    const closestY = dotYs?.reduce(
                      (a, b) => (b <= mouseY && a < b ? b : a),
                      0
                    );
                    const closestNumberIndex = dotYs?.indexOf(closestY);
                    setContentInsertionIndex(
                      closestNumberIndex + (mouseY < closestY ? 0 : 1)
                    );
                  }
                }}
                alignItems="center"
                zIndex={8}
              >
                <Stack
                  sx={{
                    opacity:
                      contents.length === 0 || !hoveringOnContentCard ? 1 : 0,
                    transition: "0.5s",
                  }}
                >
                  <AddContentButton
                    open={addContentPopoverOpen}
                    setOpen={setAddContentPopoverOpen}
                    callback={(type) => contentCallbacks[type]()}
                    premiumCallback={() => setNoCreationsLeftDialogOpen(true)}
                    clickOutsideCloseCallback={() =>
                      setContentInsertionIndex(undefined)
                    }
                  />
                </Stack>
              </Stack>
            </Stack>
          ) : null}
          <Stack width="100%" pt="36px" minHeight="44px" flex={1}>
            <Stack
              px="24px"
              ref={setContentsColumnRef}
              position="relative"
              pb="48px"
              flex={1}
            >
              <Stack
                position="absolute"
                height="100%"
                width="50px"
                right={0}
                left={0}
                marginLeft="auto"
                marginRight="auto"
                onWheel={(event) => {
                  pageRef?.scroll({
                    //@ts-ignore
                    top: event?.deltaY + pageRef.scrollTop,
                  });
                }}
                onMouseEnter={() => setHoveringOnContentCard(false)}
              >
                <Stack height="100%" position="relative">
                  {contents.length === 0 ||
                  (contentsWithDotY[0]?.dotY &&
                    contentsWithDotY[contentsWithDotY.length - 1]?.dotY) ? (
                    <Stack
                      width="2px"
                      height={"calc(100% - 50px)"}
                      bgcolor={PALETTE.secondary.grey[3]}
                      position="absolute"
                      left="-1px"
                      right={0}
                      marginRight="auto"
                      marginLeft="auto"
                      top="50px"
                    />
                  ) : null}

                  <Stack
                    width="100%"
                    height="260px"
                    bgcolor="rgb(255,255,255)"
                    sx={{
                      background: `linear-gradient(0, rgb(255,255,255), rgba(255,255,255,0))`,
                    }}
                    position="absolute"
                    right={0}
                    marginRight="auto"
                    marginLeft="auto"
                    bottom={0}
                    zIndex={2}
                  />
                </Stack>
              </Stack>

              <Stack direction="row">
                <Stack flex={1}>
                  {contents.length > 0 ? (
                    <ContentCards
                      contents={contentsWithSide
                        .filter((c) => c.left)
                        .map((c) => ({ contentId: c.contentId, type: c.type }))}
                      videos={videos}
                      links={links}
                      texts={texts}
                      images={images}
                      worksheets={worksheets}
                      lessonId={props.lessonId}
                      setVideoEditingDialogId={setVideoEditingDialogId}
                      setLinkEditingDialogId={setLinkEditingDialogId}
                      setTextEditingDialogId={setTextEditingDialogId}
                      setImageEditingDialogId={setImageEditingDialogId}
                      setWorksheetEditingDialogId={setWorksheetEditingDialogId}
                      updateCallback={loadLesson}
                      wrapper={(card, i) => (
                        <Stack
                          position="relative"
                          onMouseEnter={() => {
                            setHoveringContentSide("left");
                            setHoveringContentIndex(i);
                          }}
                          onMouseMove={(event) => {
                            setHoveringContentSide("left");
                            setHoveringContentIndex(i);
                            //@ts-ignore
                            const rect = event?.target?.getBoundingClientRect();
                            setHoveringAboveCenter(
                              event.pageY < rect.height / 2 + rect.top
                            );
                          }}
                          pb={`${CARD_SPACING}px`}
                        >
                          <Stack
                            width="96%"
                            onMouseEnter={() => {
                              setHoveringOnContentCard(true);
                            }}
                            onMouseLeave={() => {
                              setHoveringOnContentCard(false);
                            }}
                          >
                            {card}
                          </Stack>
                          <Stack
                            // @ts-ignore
                            id={`${card?.props?.id}dot`}
                            bgcolor={PALETTE.secondary.purple[1]}
                            height="16px"
                            width="16px"
                            borderRadius="100%"
                            position="absolute"
                            right="-8px"
                            top={`${DOT_CARD_Y}px`}
                            zIndex={2}
                          />
                        </Stack>
                      )}
                    />
                  ) : (
                    <Stack position="relative">
                      <UrsorFadeIn delay={500} duration={800}>
                        <Stack
                          key="starter"
                          width="94%"
                          onMouseEnter={() => {
                            setHovering(true);
                          }}
                          onMouseLeave={() => {
                            setHovering(false);
                          }}
                          onClick={() => setStarterAddContentPopoverOpen(true)}
                        >
                          <Stack
                            height="459px"
                            border={`2px solid ${
                              hovering
                                ? PALETTE.secondary.purple[2]
                                : PALETTE.secondary.grey[3]
                            }`}
                            borderRadius="12px"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                              transition: "0.2s",
                              cursor: "pointer",
                              svg: {
                                path: {
                                  transition: "0.2s",
                                  fill: hovering
                                    ? PALETTE.secondary.purple[2]
                                    : PALETTE.secondary.grey[3],
                                },
                              },
                            }}
                          >
                            <Stack
                              sx={{
                                transform: "translateY(20px)",
                                filter: `grayscale(${hovering ? 0 : 100}%)`,
                                opacity: hovering ? 1 : 0.5,
                                transition: "0.2s",
                              }}
                            >
                              <Image
                                src="https://ursorassets.s3.eu-west-1.amazonaws.com/Untitled_Artwork+21+1.png"
                                height={170}
                                width={170}
                                alt="graph illustration"
                              />
                            </Stack>

                            <Stack
                              direction="row"
                              spacing="7px"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <PlusIcon height="24px" width="24px" />
                              <Typography
                                color={
                                  hovering
                                    ? PALETTE.secondary.purple[2]
                                    : PALETTE.secondary.grey[3]
                                }
                                sx={{
                                  transition: "0.2s",
                                }}
                                bold
                                variant="large"
                              >
                                Add
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </UrsorFadeIn>
                      <Stack
                        position="absolute"
                        top={`${DOT_CARD_Y}px`}
                        right="-8px"
                      >
                        <Stack
                          // @ts-ignore
                          id="starterdot"
                          bgcolor={PALETTE.secondary.purple[1]}
                          height="16px"
                          width="16px"
                          borderRadius="100%"
                        />
                      </Stack>
                    </Stack>
                  )}
                </Stack>
                <Stack flex={1} pt={`${RIGHT_COLUMN_Y_OFFSET}px`}>
                  <ContentCards
                    contents={contentsWithSide
                      .filter((c) => !c.left)
                      .map((c) => ({ contentId: c.contentId, type: c.type }))}
                    videos={videos}
                    links={links}
                    texts={texts}
                    images={images}
                    worksheets={worksheets}
                    lessonId={props.lessonId}
                    setVideoEditingDialogId={setVideoEditingDialogId}
                    setLinkEditingDialogId={setLinkEditingDialogId}
                    setTextEditingDialogId={setTextEditingDialogId}
                    setImageEditingDialogId={setImageEditingDialogId}
                    setWorksheetEditingDialogId={setWorksheetEditingDialogId}
                    updateCallback={loadLesson}
                    wrapper={(card, i) => (
                      <Stack
                        position="relative"
                        onMouseEnter={() => {
                          setHoveringContentSide("right");
                          setHoveringContentIndex(i);
                        }}
                        onMouseMove={(event) => {
                          setHoveringContentSide("right");
                          setHoveringContentIndex(i);
                          //@ts-ignore
                          const rect = event?.target?.getBoundingClientRect();
                          setHoveringAboveCenter(
                            event.pageY < rect.height / 2 + rect.top
                          );
                        }}
                        pb={`${CARD_SPACING}px`}
                        alignItems="flex-end"
                      >
                        <Stack
                          // @ts-ignore
                          id={`${card?.props?.id}dot`}
                          bgcolor={PALETTE.secondary.purple[1]}
                          height="16px"
                          width="16px"
                          borderRadius="100%"
                          position="absolute"
                          left="-8px"
                          top={`${DOT_CARD_Y}px`}
                          zIndex={2}
                        />
                        <Stack width="96%">{card}</Stack>
                      </Stack>
                    )}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </PageCard>
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
        closeCallback={() => {
          setVideoDialogOpen(false);
          setContentInsertionIndex(undefined);
        }}
        creationCallback={(id) => {
          ApiController.addToLesson(
            props.lessonId,
            contentInsertionIndex ?? 0,
            "video",
            id
          ).then(loadLesson);
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
        closeCallback={() => {
          setWorksheetDialogOpen(false);
          setContentInsertionIndex(undefined);
        }}
        creationCallback={(id) => {
          ApiController.addToLesson(
            props.lessonId,
            contentInsertionIndex ?? 0,
            "worksheet",
            id
          ).then(loadLesson);
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
        closeCallback={() => {
          setLinkDialogOpen(false);
          setContentInsertionIndex(undefined);
        }}
        creationCallback={(link) => {
          ApiController.addToLesson(
            props.lessonId,
            contentInsertionIndex ?? 0,
            "link",
            link.id
          ).then(loadLesson);
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
        closeCallback={() => {
          setTextDialogOpen(false);
          setContentInsertionIndex(undefined);
        }}
        creationCallback={(text) => {
          ApiController.addToLesson(
            props.lessonId,
            contentInsertionIndex ?? 0,
            "text",
            text.id
          ).then(loadLesson);
        }}
      />
      {textEditingDialogId ? (
        <TextCreationDialog
          open={true}
          closeCallback={() => setTextEditingDialogId(undefined)}
          updateCallback={loadLesson}
          text={texts.find((t) => t.id === textEditingDialogId)}
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
            ApiController.addToLesson(
              props.lessonId,
              contentInsertionIndex ?? 0,
              "image",
              link.id
            ).then(loadLesson);
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
      <Stack
        sx={{
          opacity: 0,
          pointerEvents: "none",
        }}
        position="absolute"
        width={contentColumnWidth}
      >
        <ContentCards
          contents={contents}
          videos={videos}
          links={links}
          texts={texts}
          images={images}
          worksheets={worksheets}
          lessonId={props.lessonId}
          setVideoEditingDialogId={setVideoEditingDialogId}
          setLinkEditingDialogId={setLinkEditingDialogId}
          setTextEditingDialogId={setTextEditingDialogId}
          setImageEditingDialogId={setImageEditingDialogId}
          setWorksheetEditingDialogId={setWorksheetEditingDialogId}
          setHeight={(id, height) => {
            const content = contents.find((c) => c.contentId === id);
            if (!content) return;
            const contentWithCardHeight = contentsWithCardHeight.find(
              (c) => c.contentId === id
            );
            if (contentWithCardHeight) {
              setContentsWithCardHeight((prev) =>
                prev.map((co) =>
                  co.contentId === id ? { ...content, height } : co
                )
              );
            } else {
              setContentsWithCardHeight((prev) => [
                ...prev,
                { ...content, height },
              ]);
            }
          }}
          updateCallback={loadLesson}
        />
      </Stack>
      <AddContentDialog
        open={starterAddContentDialogOpen}
        setOpen={setStarterAddContentPopoverOpen}
        callback={(type) => contentCallbacks[type]()}
        premiumCallback={() => setNoCreationsLeftDialogOpen(true)}
      />
    </>
  );
}
