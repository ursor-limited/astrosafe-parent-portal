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
import PlayIcon from "@/images/icons/PlayIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import ShareIcon from "@/images/icons/ShareIcon2.svg";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import X from "@/images/icons/X.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PageCard from "@/app/components/PageCard";
import DeletionDialog from "@/app/components/DeletionDialog";
import TextDialog, { IText } from "@/app/components/TextDialog";
import ApiController, { IVideo_DEPRECATED } from "@/app/api";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/components/UserContext";
import NotificationContext from "@/app/components/NotificationContext";
import {
  AstroContent,
  DEFAULT_LESSON_TITLE,
} from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/DashboardPageContents";
import AddContentButton from "./AddContentButton";
import LinkDialog, {
  ILink_DEPRECATED,
} from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/LinkDialog";
import VideoCreationDialog from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/VideoCreationDialog";
import WorksheetCreationDialog from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/WorksheetCreationDialog";
import { ILesson } from "./page";
import NoCreationsLeftDialog from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/NoCreationsLeftDialog";
import UpgradeDialog from "@/app/components/UpgradeDialog";
import UrsorActionButton from "@/app/components/UrsorActionButton";
import LessonCreationDialog from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/LessonCreationDialog";
import ImageDialog, {
  IImage,
} from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/ImageDialog";
import "react-quill/dist/quill.snow.css";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import ContentCards from "./ContentCards";
import TextCreationDialog from "@/app/components/TextDialog";
import AddContentDialog from "./AddContentDialog";
import { createPortal } from "react-dom";
import HoverCard from "./HoverCard";
import Timeline, {
  CARD_SPACING,
  DOT_CARD_Y,
  RIGHT_COLUMN_Y_OFFSET,
} from "./Timeline";
import InitialAddContentButton from "./InitialAddContentButton";
import MakeCopyDialog from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/MakeCopyDialog";
import ExternalPageFooter from "@/app/components/ExternalPageFooter";
import { Header } from "@/app/components/header2";
import QuizDialog, { IQuiz } from "@/app/components/QuizDialog";
import { useAuth0 } from "@auth0/auth0-react";
import TutorialVideoBar from "@/app/components/TutorialVideoBar";
import CopyAndMoveDialog from "./CopyAndMoveDialog";
import MoonsafePageCard, {
  MoonsafeDurationIndicator,
} from "./MoonsafePageCard";
import KidsView from "./KidsView";
import {
  SIDEBAR_X_MARGIN,
  SIDEBAR_Y_MARGIN,
} from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/PageLayout";
import Sidebar, {
  WIDTH,
} from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/Sidebar";

export interface IPlaylist {
  id: string;
  creatorId?: string;
  title: string;
  description?: string;
  videos: string[];
  contentOrder: string[];
  expandedContentIds: string[];
  canonicalUrl: string;
  nonCanonicalUrlList: string[];
  duration: number;
  createdAt: string;
  imageUrls?: string[];
  updatedAt: string;
}

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

export default function MoonsafePlaylistPageContents(props: {
  subdirectory: string;
}) {
  const [playlist, setPlaylist] = useState<IPlaylist | undefined>(undefined);
  const [videos, setVideos] = useState<IVideo_DEPRECATED[]>([]);

  const router = useRouter();

  const loadPlaylist = () =>
    ApiController.getPlaylistFromUrlWithContents(props.subdirectory).then(
      (response: any) => {
        if (!response) return;
        setStaticAddButtonY(null);
        response?.playlist && setPlaylist(response.playlist);
        response?.videos && setVideos(response.videos);
      }
    );

  useEffect(() => {
    props.subdirectory && loadPlaylist();
  }, [props.subdirectory]);

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);

  const submitDeletion = () =>
    playlist?.id &&
    ApiController.deleteLesson(playlist.id)
      .then(() => router.push("/dashboard"))
      .then(() => notificationCtx.negativeSuccess("Deleted Lesson."));

  const userDetails = useUserContext();
  const { isLoading } = useAuth0();

  const notificationCtx = useContext(NotificationContext);

  const [contentOrder, setContentOrder] = useState<string[]>([]);
  useEffect(() => {
    setContentOrder(playlist?.contentOrder || []);
  }, [playlist]);

  const [orderedVideos, setOrderedVideos] = useState<string[]>([]);
  useEffect(
    () =>
      setOrderedVideos(
        playlist
          ? _.compact([
              ...contentOrder.map((contentId) =>
                playlist.videos.find((v) => v === contentId)
              ),
            ])
          : []
      ),
    [playlist?.videos, contentOrder]
  );

  const [videosWithCardHeight, setVideosWithCardHeight] = useState<
    {
      id: string;
      height?: number;
    }[]
  >([]);

  const [videosWithSide, setVideosWithSide] = useState<
    {
      id: string;
      left: boolean;
    }[]
  >([]);

  useEffect(() => {
    if (!playlist || videosWithCardHeight.length === 0) return; // TODO: get rid of the / 2
    var leftHeightSum = 0;
    var rightHeightSum = RIGHT_COLUMN_Y_OFFSET;
    setVideosWithSide(
      _.compact(
        contentOrder.map((contentId, i) => {
          const video = videosWithCardHeight.find((co) => co.id === contentId);
          if (!video) return;
          if (i === 0) {
            leftHeightSum += video.height ?? 0;
            return {
              id: video.id ?? "",
              left: true,
            };
          } else {
            const left = leftHeightSum < rightHeightSum;
            if (leftHeightSum > rightHeightSum) {
              rightHeightSum += CARD_SPACING + (video.height ?? 0);
            } else {
              leftHeightSum += CARD_SPACING + (video.height ?? 0);
            }
            return {
              id: video.id ?? "",
              left,
            };
          }
        })
      )
    );
  }, [videosWithCardHeight, playlist, orderedVideos]);

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

  const [quizDialogOpen, setQuizDialogOpen] = useState<boolean>(false);
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

  const [editingDialogOpen, setEditingDialogOpen] = useState<boolean>(false);

  const [hoveringOnContentCard, setHoveringOnContentCard] =
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

  const [starterAddContentDialogOpen, setStarterAddContentPopoverOpen] =
    useState<boolean>(false);

  const [
    typeOfContentDialogToOpenUponLandingInNewLesson,
    setTypeOfContentDialogToOpenUponLandingInNewLesson,
  ] = useLocalStorage<"video" | "worksheet" | "quiz" | null>(
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
        if (typeOfContentDialogToOpenUponLandingInNewLesson === "quiz") {
          setQuizDialogOpen(true);
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
      id: string;
      dotY: number;
    }[]
  >([]);

  useEffect(() => {
    orderedVideos &&
      setContentsWithDotY(
        orderedVideos.map((id) => ({
          id,
          dotY:
            (document.getElementById(`${id}dot`)?.getBoundingClientRect?.()
              ?.top ?? 0) + 8,
        }))
      );
  }, [orderedVideos]);

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
          : orderedVideos.length === 0
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
      orderedVideos,
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
        playlist?.title === DEFAULT_LESSON_TITLE &&
          lessonNamingDialogSkipTo !== "share"
      ),
    [playlist?.title, lessonNamingDialogSkipTo]
  );

  const [draggedContentId, setDraggedContentId] = useState<string | null>(null);
  const reorder = useCallback(() => {
    if (!playlist || !draggedContentId) return;
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
      ApiController.updateLesson(props.subdirectory, {
        contentOrder: newOrder,
      });
      setContentOrder(newOrder);
    }
  }, [playlist, draggedContentId, mouseY]);

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
        !quizDialogOpen &&
        setMouseY(event.pageY);
    },
    [
      addContentPopoverOpen,
      worksheetDialogOpen,
      videoDialogOpen,
      imageDialogOpen,
      linkDialogOpen,
      textDialogOpen,
      quizDialogOpen,
    ]
  );
  useEffect(() => {
    if (!userDetails?.user?.id || userDetails.user.id !== playlist?.creatorId)
      return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, userDetails.user?.id, playlist]);

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
      return orderedVideos.length;
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
    if (y < (dotYs?.[0] ?? 0)) {
      return 0;
    } else if (y > (dotYs?.[dotYs.length - 1] ?? 0)) {
      return orderedVideos.length;
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
  useEffect(() => {
    setExpandedContentIds(playlist?.expandedContentIds || []);
  }, [playlist?.expandedContentIds]);

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

  const [makeCopyDialogOpen, setMakeCopyDialogOpen] = useState<boolean>(false);

  const [kidsViewOpen, setKidsViewOpen] = useState<boolean>(false);

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
              left={videosWithSide.find((c) => c.id === draggedContentId)?.left}
              element={draggedElement}
              width={draggedElementWidth}
            />,
            contentsColumnRef ?? document.body
          )
        : null}
      <Stack
        ref={setPageRef}
        px="20px"
        pt={
          !isLoading &&
          (!userDetails?.user?.id ||
            userDetails.user.id !== playlist?.creatorId)
            ? undefined
            : "40px"
        }
        overflow="scroll"
        flex={1}
        bgcolor={
          !isLoading &&
          (!userDetails?.user?.id ||
            userDetails.user.id !== playlist?.creatorId)
            ? PALETTE.primary.navy
            : undefined
        }
        // sx={{
        //   pointerEvents: draggedContentId ? "none" : undefined,
        // }}
        direction="row"
      >
        <Stack
          minWidth={`calc(${WIDTH} + ${SIDEBAR_X_MARGIN}px)`}
          alignItems="flex-end"
          py={SIDEBAR_Y_MARGIN}
          mr="5px"
          justifyContent="center"
        >
          <Sidebar selectedItemId="moonsafe" />
        </Stack>
        <Stack
          spacing="12px"
          flex={1}
          sx={{
            opacity: 0,
            animation: `${fadeIn} 0.2s ease-in`,
            animationFillMode: "forwards",
            animationDelay: "2s",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px="123px"
            py="20px"
            spacing="24px"
          >
            <Stack direction="row" justifyContent="center" spacing="12px">
              <Stack
                sx={{
                  "&:hover": { opacity: 0.7 },
                  transition: "0.2s",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/moonsafe")}
              >
                <Typography variant="h4" sx={{ transform: "translateY(1px)" }}>
                  <ChevronLeft width="32px" height="32px" />
                </Typography>
              </Stack>
              <Stack
                sx={{
                  "&:hover": { opacity: 0.7 },
                  transition: "0.2s",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/moonsafe")}
              >
                <Typography variant="h4" color={PALETTE.secondary.grey[3]}>
                  MoonSafe
                </Typography>
              </Stack>
              <Typography variant="h4" color={PALETTE.secondary.grey[3]}>
                /
              </Typography>
              <Typography variant="h4" maxLines={1}>
                {playlist?.title}
              </Typography>
            </Stack>
            <Stack direction="row" spacing="12px">
              <MoonsafeDurationIndicator
                value={playlist?.duration ?? 0}
                tiny
                small
                vibrantText
              />
              <UrsorButton
                dark
                variant="tertiary"
                endIcon={PlayIcon}
                onClick={() => setKidsViewOpen(true)}
              >
                Start Playlist
              </UrsorButton>
            </Stack>
          </Stack>
          <MoonsafePageCard
            createdAt={playlist?.createdAt ?? undefined}
            width="100%"
            maxWidth={
              !userDetails?.user || userDetails.user.id !== playlist?.creatorId
                ? "1260px"
                : undefined
            }
            noBottomPadding
            editingCallback={() => setEditingDialogOpen(true)}
            editingEnabled={
              !!userDetails?.user?.id &&
              userDetails.user.id === playlist?.creatorId
            }
            duration={playlist?.duration ?? 0}
          >
            {orderedVideos.length > 0 &&
            !!userDetails?.user?.id &&
            userDetails.user.id === playlist?.creatorId ? (
              <Stack
                height="100%"
                width="48px"
                position="fixed"
                top={0}
                left="50%"
                sx={{
                  transform: `translate(55px, -26px)`,
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
                        : mouseY -
                          draggedElementTopMouseYSeparation +
                          DOT_CARD_Y
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
                      setContentInsertionIndex(
                        getContentInsertionIndex(mouseY)
                      );
                    }}
                    alignItems="center"
                    zIndex={8}
                  >
                    <Stack
                      sx={{
                        opacity:
                          orderedVideos.length === 0 || !hoveringOnContentCard
                            ? 1
                            : 0,
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
                    {orderedVideos.length === 0 ||
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
                  {orderedVideos.length === 0 ? (
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
                      const expandedContent = orderedVideos.find(
                        (v) => v === chunk[0]
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
                            selectedVideos={[expandedContent]}
                            expanded
                            videos={videos}
                            lessonId={props.subdirectory}
                            hideLimits
                            columnWidth={singleContentsColumnWidth}
                            draggedContentId={
                              draggedContentId ? draggedContentId : undefined
                            }
                            dragStartCallback={(id) => setDraggedContentId(id)}
                            setVideoEditingDialogId={setVideoEditingDialogId}
                            updateCallback={loadPlaylist}
                            expansionCallback={() => {
                              const newExpandedContentIds =
                                expandedContentIds.filter(
                                  (cid) => cid !== chunk[0]
                                );
                              setExpandedContentIds(newExpandedContentIds);
                              ApiController.updateLesson(props.subdirectory, {
                                expandedContentIds: newExpandedContentIds,
                              });
                            }}
                          />
                        </Stack>
                      ) : null;
                    } else {
                      return (
                        <Timeline
                          key={`${i}columns`}
                          selectedVideos={orderedVideos.filter((c) =>
                            chunk.includes(c)
                          )}
                          videosWithSide={videosWithSide.filter((c) =>
                            chunk.includes(c.id)
                          )}
                          videos={videos}
                          lessonId={props.subdirectory}
                          loadLesson={loadPlaylist}
                          singleContentsColumnWidth={singleContentsColumnWidth}
                          setDraggedContentId={setDraggedContentId}
                          draggedContentId={
                            draggedContentId ? draggedContentId : undefined
                          }
                          setVideoEditingDialogId={setVideoEditingDialogId}
                          expansionCallback={(id) => {
                            const newExpandedContentIds =
                              expandedContentIds.includes(id)
                                ? expandedContentIds.filter((cid) => cid !== id)
                                : [...expandedContentIds, id];
                            setExpandedContentIds(newExpandedContentIds);
                            ApiController.updateLesson(props.subdirectory, {
                              expandedContentIds: newExpandedContentIds,
                            });
                          }}
                        />
                      );
                    }
                  })}
                </Stack>
              </Stack>
            </Stack>
            {playlist &&
            (!userDetails?.user?.id ||
              userDetails?.user?.id !== playlist?.creatorId) ? (
              <Stack px="24px" height="100vh" justifyContent="center">
                <ExternalPageFooter />
              </Stack>
            ) : null}
          </MoonsafePageCard>
        </Stack>
      </Stack>
      <DeletionDialog
        open={deletionDialogOpen}
        closeCallback={() => setDeletionDialogOpen(false)}
        deletionCallback={submitDeletion}
        category="playlist"
        title={playlist?.title ?? ""}
      />
      {videoDialogOpen && playlist ? (
        <VideoCreationDialog
          open={videoDialogOpen}
          closeCallback={() => {
            setVideoDialogOpen(false);
            setContentInsertionIndex(undefined);
          }}
          creationCallback={(id, title) => {
            ApiController.addToPlaylist(
              playlist.id,
              contentInsertionIndex ?? 0,
              id
            ).then(() =>
              playlist?.videos.length === 0
                ? ApiController.updateLesson(props.subdirectory, {
                    title,
                  }).then(loadPlaylist)
                : loadPlaylist()
            );
            setExpandedContentIds([...expandedContentIds, id]);
            ApiController.updateLesson(props.subdirectory, {
              expandedContentIds: [...expandedContentIds, id],
            });
          }}
          editingCallback={loadPlaylist}
        />
      ) : null}
      {videoEditingDialogId ? (
        <VideoCreationDialog
          open={true}
          closeCallback={() => setVideoEditingDialogId(undefined)}
          editingCallback={loadPlaylist}
          video={videos.find((v) => v.id === videoEditingDialogId)}
        />
      ) : null}
      {playlist ? (
        <WorksheetCreationDialog
          open={worksheetDialogOpen}
          closeCallback={() => {
            setWorksheetDialogOpen(false);
            setContentInsertionIndex(undefined);
          }}
          creationCallback={(id) => {
            ApiController.addToLesson(
              playlist.id,
              contentInsertionIndex ?? 0,
              "worksheet",
              id
            ).then(loadPlaylist);
          }}
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
          selectedVideos={orderedVideos}
          videos={videos}
          lessonId={props.subdirectory}
          hideLimits
          columnWidth={singleContentsColumnWidth}
          setVideoEditingDialogId={setVideoEditingDialogId}
          setHeight={(id, height) => {
            const content = orderedVideos.find((v) => v === id);
            if (!content) return;
            const contentWithCardHeight = videosWithCardHeight.find(
              (c) => c.id === id
            );
            if (contentWithCardHeight) {
              setVideosWithCardHeight((prev) =>
                prev.map((co) => (co.id === id ? { id, height } : co))
              );
            } else {
              setVideosWithCardHeight((prev) => [...prev, { id, height }]);
            }
          }}
          updateCallback={loadPlaylist}
          noPlayer
          noButtons
        />
      </Stack>
      <AddContentDialog
        open={starterAddContentDialogOpen}
        setOpen={setStarterAddContentPopoverOpen}
        callback={(type) => contentCallbacks[type]()}
        premiumCallback={() => setUpgradeDialogOpen(true)}
      />
      <MakeCopyDialog
        open={makeCopyDialogOpen}
        closeCallback={() => setMakeCopyDialogOpen(false)}
        callback={() =>
          ApiController.duplicateLesson(
            props.subdirectory,
            userDetails.user!.id
          ).then((l) => {
            router.push("/dashboard");
            notificationCtx.success("Made a copy of Lesson");
          })
        }
      />
      {kidsViewOpen ? (
        <KidsView
          videos={videos}
          duration={playlist?.duration ?? 0}
          open={kidsViewOpen}
          onClose={() => setKidsViewOpen(false)}
        />
      ) : null}
    </>
  );
}
