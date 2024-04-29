"use client";

import { Stack, alpha, keyframes } from "@mui/system";
import React, {
  createElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
import {
  AstroContent,
  DEFAULT_LESSON_TITLE,
} from "@/app/dashboard/DashboardPageContents";
import AddContentButton from "./AddContentButton";
import LinkDialog, { ILink } from "@/app/dashboard/LinkDialog";
import VideoCreationDialog from "@/app/dashboard/VideoCreationDialog";
import WorksheetCreationDialog from "@/app/dashboard/WorksheetCreationDialog";
import { ILesson } from "./page";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import NoCreationsLeftDialog from "@/app/dashboard/NoCreationsLeftDialog";
import UpgradeDialog from "@/app/components/UpgradeDialog";
import UrsorActionButton from "@/app/components/UrsorActionButton";
import LessonCreationDialog from "@/app/dashboard/LessonCreationDialog";
import ImageDialog, { IImage } from "@/app/dashboard/ImageDialog";
import "react-quill/dist/quill.snow.css";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import ContentCards from "./ContentCards";
import TextCreationDialog from "@/app/components/TextDialog";
import Image from "next/image";
import AddContentDialog from "./AddContentDialog";
import { createPortal } from "react-dom";
import HoverCard from "./HoverCard";
import { cardClasses } from "@mui/material";
import Timeline, {
  CARD_SPACING,
  DOT_CARD_Y,
  RIGHT_COLUMN_Y_OFFSET,
} from "./Timeline";
import InitialAddContentButton from "./InitialAddContentButton";

const CONTENT_PADDING_X = 24;
const EXPANDED_CARD_DOT_Y = 16;

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

  const [contentOrder, setContentOrder] = useState<string[]>([]);
  useEffect(() => {
    setContentOrder(lesson?.contentOrder || []);
  }, [lesson]);

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
              ...contentOrder.map((contentId) =>
                lesson.contents.find((c) => c.contentId === contentId)
              ),
            ])
          : []
      ),
    [lesson?.contents, contentOrder]
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
        contentOrder.map((contentId, i) => {
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

  const [editingDialogOpen, setEditingDialogOpen] = useState<boolean>(false);

  const [hoveringOnContentCard, setHoveringOnContentCard] =
    useState<boolean>(false);
  // const [hoveringContentIndex, setHoveringContentIndex] = useState<
  //   number | undefined
  // >(undefined);
  // const [hoveringContentSide, setHoveringContentSide] = useState<
  //   "left" | "right" | null
  // >(null);
  // const [hoveringAboveCenter, setHoveringAboveCenter] =
  //   useState<boolean>(false);
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
  // useEffect(() => {
  //   upgradeDialogOpen && setStaticAddButtonY(null);
  // }, [upgradeDialogOpen]);

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

  const [draggedContentId, setDraggedContentId] = useState<string | null>(null);
  const reorder = useCallback(() => {
    if (!lesson || !draggedContentId) return;
    const draggedContentIdIndex = contentOrder.indexOf(draggedContentId);
    const newIndex = getContentMovingIndex(
      expandedContentIds.includes(draggedContentId)
        ? mouseY - draggedElementTopMouseYSeparation - 2 * EXPANDED_CARD_DOT_Y
        : mouseY - draggedElementTopMouseYSeparation + DOT_CARD_Y,
      draggedContentIdIndex
    );
    if (newIndex !== draggedContentIdIndex) {
      //const orderWithout = contentOrder.filter((id) => id !== draggedContentId);
      const newOrder = [
        ...contentOrder
          .slice(0, newIndex)
          .filter((id) => id !== draggedContentId),
        draggedContentId,
        ...contentOrder.slice(newIndex).filter((id) => id !== draggedContentId),
      ];
      //const newOrderWithoutOldId =  draggedContentIdIndex < newIndex ? [...newOrder.slice(0,draggedContentId)]
      ApiController.updateLesson(props.lessonId, {
        contentOrder: newOrder,
      });
      setContentOrder(newOrder);
    }
  }, [lesson, draggedContentId, mouseY]);

  const handleDraggingEnd = useCallback(() => {
    reorder();
    setDraggedContentId(null);
  }, [reorder]);
  useEffect(() => {
    window.addEventListener("mouseup", handleDraggingEnd);
    return () => {
      window.removeEventListener("mouseup", handleDraggingEnd);
    };
  }, [handleDraggingEnd]);

  const [draggedElement, setDraggedElement] = useState<HTMLElement | null>(
    null
  );
  const [draggedElementWidth, setDraggedElementWidth] = useState<number>(0);
  const [
    draggedElementTopMouseYSeparation,
    setDraggedElementTopMouseYSeparation,
  ] = useState<number>(0);
  const [draggedElementX, setDraggedElementX] = useState<number>(0);
  useEffect(() => {
    if (draggedContentId) {
      const el = document.getElementById(draggedContentId);
      setDraggedElement(el);
      setDraggedElementWidth(el?.getBoundingClientRect?.()?.width ?? 0);
      setDraggedElementX(el?.getBoundingClientRect?.()?.left ?? 0);
      setDraggedElementTopMouseYSeparation(
        mouseY - (el?.getBoundingClientRect?.()?.top ?? 0)
      );
    } else {
      setDraggedElement(null);
    }
  }, [draggedContentId]);

  const [singleContentsColumnWidth, setSingleContentsColumnWidth] =
    useState<number>(0);
  useEffect(
    () =>
      setSingleContentsColumnWidth(
        (contentsColumnRef?.getBoundingClientRect?.()?.width ?? 0) / 2 -
          CONTENT_PADDING_X * 2
      ),
    [contentsColumnRef?.getBoundingClientRect?.()?.width]
  );

  const handleMouseMove = useCallback(
    (event: any) => {
      !addContentPopoverOpen &&
        !worksheetDialogOpen &&
        !videoDialogOpen &&
        !imageDialogOpen &&
        !linkDialogOpen &&
        !textDialogOpen &&
        setMouseY(event.pageY);
    },
    [
      addContentPopoverOpen,
      worksheetDialogOpen,
      videoDialogOpen,
      imageDialogOpen,
      linkDialogOpen,
      textDialogOpen,
    ]
  );
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const getContentInsertionIndex = (y: number) => {
    const dotYs =
      contentOrder.map(
        (id) =>
          (document.getElementById(`${id}dot`)?.getBoundingClientRect?.()
            ?.top ?? 0) + document.body.scrollTop
      ) ?? [];
    if (y < (dotYs?.[0] ?? 0)) {
      return 0;
    } else if (y > (dotYs?.[dotYs.length - 1] ?? 0)) {
      return contents.length;
    } else {
      const closestY = dotYs?.reduce((a, b) => (b <= y && a < b ? b : a), 0);
      const closestNumberIndex = dotYs?.indexOf(closestY);
      return closestNumberIndex + (y < closestY ? 0 : 1);
    }
  };

  const getContentMovingIndex = (y: number, currentIndex: number) => {
    const dotYs =
      contentOrder.map(
        (id) =>
          (document.getElementById(`${id}dot`)?.getBoundingClientRect?.()
            ?.top ?? 0) + document.body.scrollTop
      ) ?? [];
    console.log(dotYs);
    if (y < (dotYs?.[0] ?? 0)) {
      return 0;
    } else if (y > (dotYs?.[dotYs.length - 1] ?? 0)) {
      return contents.length;
    } else {
      const closestY = dotYs?.reduce(
        (a, b) => (Math.abs(y - a) < Math.abs(y - b) ? a : b),
        dotYs[0]
      );
      const closestNumberIndex = dotYs?.indexOf(closestY);
      if (closestNumberIndex === currentIndex) {
        return currentIndex;
      } else {
        return Math.max(0, closestNumberIndex + (y < closestY ? 0 : 1));
      }
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    notificationCtx.success("Copied URL to clipboard.");
  };

  const [expandedContentIds, setExpandedContentIds] = useState<string[]>([]);

  const [expansionChunkedContentIds, setExpansionChunkedContentIds] = useState<
    string[][]
  >([]);
  useEffect(() => {
    setExpansionChunkedContentIds(
      contentOrder.reduce((acc, cur, i) => {
        if (i > 0) {
          if (expandedContentIds.includes(cur)) {
            return [...acc, [cur]];
          }
          const lastChunk = acc[acc.length - 1];
          const previousContentIsExpanded = expandedContentIds.includes(
            lastChunk?.[lastChunk.length - 1]
          );
          return previousContentIsExpanded
            ? [...acc, [cur]]
            : [...acc.slice(0, -1), [...acc[acc.length - 1], cur]];
        } else {
          return [[cur]];
        }
      }, [] as string[][])
    );
  }, [contentOrder, expandedContentIds]);

  return (
    <>
      {draggedElement
        ? createPortal(
            <HoverCard
              y={
                mouseY -
                draggedElementTopMouseYSeparation -
                (contentsColumnRef?.getBoundingClientRect?.()?.top ?? 0)
              }
              x={
                draggedElementX -
                (contentsColumnRef?.getBoundingClientRect?.()?.left ?? 0)
                // (contentsColumnRef?.getBoundingClientRect?.()?.[
                //   contentsWithSide.find((c) => c.contentId === draggedContentId)
                //     ?.left
                //     ? "left"
                //     : "right"
                // ] ?? 0)
              }
              left={
                contentsWithSide.find((c) => c.contentId === draggedContentId)
                  ?.left
              }
              element={draggedElement}
              width={draggedElementWidth}
            />,
            contentsColumnRef ?? document.body
          )
        : null}
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
          pointerEvents: draggedContentId ? "none" : undefined,
        }}
      >
        <Stack height="40px" minHeight="40px" />
        <PageCard
          title={lesson?.title ?? ""}
          description={lesson?.description ?? ""}
          createdAt={lesson?.createdAt ?? undefined}
          noBottomPadding
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
          rightStuff={
            <Stack direction="row" spacing="12px">
              <Stack direction="row" spacing="12px">
                {userDetails?.user?.id &&
                userDetails?.user?.id !== lesson?.creatorId ? (
                  <UrsorButton
                    variant="secondary"
                    backgroundColor="rgb(255,255,255)"
                    endIcon={PencilIcon}
                    onClick={() => {
                      router.push("/dashboard");
                    }}
                  >
                    Create your own
                  </UrsorButton>
                ) : null}
                {/* {userDetails?.user?.id &&
                userDetails?.user?.id !== lesson?.creatorId ? (
                  <UrsorButton
                    variant="secondary"
                    backgroundColor="rgb(255,255,255)"
                    endIcon={PencilIcon}
                    onClick={() =>
                      ApiController.duplicateLesson(
                        props.lessonId,
                        userDetails.user!.id
                      ).then((id) => router.push(`/lesson/${id}`))
                    }
                  >
                    Make a copy
                  </UrsorButton>
                ) : null} */}
                <UrsorButton
                  dark
                  variant="tertiary"
                  endIcon={ShareIcon}
                  onClick={() => {
                    if (needToTitle) {
                      setLessonNamingDialogSkipTo("share");
                      setEditingDialogOpen(true);
                      notificationCtx.success(
                        "Please add a title to your Lesson before sharing it."
                      );
                    } else {
                      copyUrl();
                    }
                  }}
                >
                  Share link
                </UrsorButton>
                {userDetails?.user?.id &&
                userDetails?.user?.id === lesson?.creatorId ? (
                  <UrsorActionButton
                    size="43px"
                    iconSize="17px"
                    border
                    actions={[
                      // {
                      //   text: "Edit",
                      //   kallback: () => setEditingDialogOpen(true),
                      //   icon: PencilIcon,
                      // },
                      {
                        text: "Delete",
                        kallback: () => setDeletionDialogOpen(true),
                        icon: TrashcanIcon,
                        color: PALETTE.system.red,
                      },
                    ]}
                  />
                ) : null}
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
            >
              {draggedContentId ? (
                <Stack
                  bgcolor={PALETTE.secondary.purple[1]}
                  height="16px"
                  width="16px"
                  borderRadius="100%"
                  position="absolute"
                  left={0}
                  right={0}
                  marginLeft="auto"
                  marginRight="auto"
                  top={
                    expandedContentIds.includes(draggedContentId)
                      ? mouseY -
                        draggedElementTopMouseYSeparation -
                        2 * EXPANDED_CARD_DOT_Y
                      : mouseY - draggedElementTopMouseYSeparation + DOT_CARD_Y
                  }
                  zIndex={2}
                />
              ) : (
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
                    setContentInsertionIndex(getContentInsertionIndex(mouseY));
                  }}
                  alignItems="center"
                  zIndex={8}
                >
                  <Stack
                    sx={{
                      opacity:
                        contents.length === 0 || !hoveringOnContentCard ? 1 : 0,
                      transition: "0.2s",
                    }}
                  >
                    <AddContentButton
                      open={addContentPopoverOpen}
                      setOpen={setAddContentPopoverOpen}
                      callback={(type) => contentCallbacks[type]()}
                      premiumCallback={() => {
                        setUpgradeDialogOpen(true);
                        setStaticAddButtonY(null);
                        setAddContentPopoverOpen(false);
                      }}
                      clickOutsideCloseCallback={() =>
                        setContentInsertionIndex(undefined)
                      }
                    />
                  </Stack>
                </Stack>
              )}
            </Stack>
          ) : null}
          <Stack width="100%" pt="36px" minHeight="44px" flex={1}>
            <Stack
              px={`${CONTENT_PADDING_X}px`}
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
              <Stack spacing="50px" pb="70px">
                {contents.length === 0 ? (
                  <Stack width="50%">
                    <InitialAddContentButton
                      setStarterAddContentPopoverOpen={() =>
                        setStarterAddContentPopoverOpen(true)
                      }
                    />
                  </Stack>
                ) : null}
                {expansionChunkedContentIds.map((chunk, i) => {
                  if (
                    chunk.length === 1 &&
                    expandedContentIds.includes(chunk[0])
                  ) {
                    const expandedContent = contents.find(
                      (c) => c.contentId === chunk[0]
                    );
                    return expandedContent ? (
                      <Stack
                        key={`${i}expanded`}
                        zIndex={3}
                        alignItems="center"
                        spacing={`${EXPANDED_CARD_DOT_Y}px`}
                        sx={{
                          opacity: draggedContentId === chunk[0] ? 0 : 1,
                          transition: "0.2s",
                        }}
                      >
                        <Stack
                          // @ts-ignore
                          id={`${chunk[0]}dot`}
                          bgcolor={PALETTE.secondary.purple[1]}
                          height="16px"
                          width="16px"
                          borderRadius="100%"
                          top={`${DOT_CARD_Y}px`}
                          zIndex={2}
                        />
                        <ContentCards
                          contents={[expandedContent]}
                          expanded
                          videos={videos}
                          images={images}
                          links={links}
                          worksheets={worksheets}
                          texts={texts}
                          lessonId={props.lessonId}
                          columnWidth={singleContentsColumnWidth}
                          //  setDraggedContentId={setDraggedContentId}
                          draggedContentId={
                            draggedContentId ? draggedContentId : undefined
                          }
                          dragStartCallback={(id) => setDraggedContentId(id)}
                          setVideoEditingDialogId={setVideoEditingDialogId}
                          setImageEditingDialogId={setImageEditingDialogId}
                          setWorksheetEditingDialogId={
                            setWorksheetEditingDialogId
                          }
                          setTextEditingDialogId={setTextEditingDialogId}
                          setLinkEditingDialogId={setLinkEditingDialogId}
                          updateCallback={loadLesson}
                          expansionCallback={() =>
                            setExpandedContentIds(
                              expandedContentIds.filter(
                                (cid) => cid !== chunk[0]
                              )
                            )
                          }
                        />
                      </Stack>
                    ) : null;
                  } else {
                    return (
                      <Timeline
                        key={`${i}columns`}
                        contents={contents.filter((c) =>
                          chunk.includes(c.contentId)
                        )}
                        contentsWithSide={contentsWithSide.filter((c) =>
                          chunk.includes(c.contentId)
                        )}
                        videos={videos}
                        images={images}
                        links={links}
                        worksheets={worksheets}
                        texts={texts}
                        lessonId={props.lessonId}
                        loadLesson={loadLesson}
                        singleContentsColumnWidth={singleContentsColumnWidth}
                        setDraggedContentId={setDraggedContentId}
                        draggedContentId={
                          draggedContentId ? draggedContentId : undefined
                        }
                        setVideoEditingDialogId={setVideoEditingDialogId}
                        setImageEditingDialogId={setImageEditingDialogId}
                        setWorksheetEditingDialogId={
                          setWorksheetEditingDialogId
                        }
                        setTextEditingDialogId={setTextEditingDialogId}
                        setLinkEditingDialogId={setLinkEditingDialogId}
                        expansionCallback={(id) => {
                          expandedContentIds.includes(id)
                            ? setExpandedContentIds(
                                expandedContentIds.filter((cid) => cid !== id)
                              )
                            : setExpandedContentIds([
                                ...expandedContentIds,
                                id,
                              ]);
                        }}
                      />
                    );
                  }
                })}
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
      {textDialogOpen ? (
        <TextDialog
          open={true}
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
      ) : null}
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
        closeCallback={() => {
          setUpgradeDialogOpen(false);
          setStaticAddButtonY(null);
        }}
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
          columnWidth={singleContentsColumnWidth}
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
        premiumCallback={() => setUpgradeDialogOpen(true)}
      />
    </>
  );
}
