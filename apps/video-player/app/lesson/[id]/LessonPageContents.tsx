"use client";

import { Stack, alpha, keyframes } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import _, { isNumber } from "lodash";
import { PALETTE, Typography, UrsorButton } from "ui";
import { IWorksheet } from "@/app/components/WorksheetGenerator";
import PencilIcon from "@/images/icons/Pencil.svg";
import ShareIcon from "@/images/icons/ShareIcon2.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
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
    if (!lesson || contentsWithCardHeight.length / 2 < contents.length) return; // TODO: get rid of the / 2
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
  }, [contentsWithCardHeight, lesson]);

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

  const [topCardRef, setTopCardRef] = useState<HTMLElement | null>(null);
  const [bottomCardRef, setBottomCardRef] = useState<HTMLElement | null>(null);

  const [bottomCardCenter, setBottomCardCenter] = useState<number>(0);
  const updateBottomCardCenter = () => {
    if (contents) {
      const rect = (
        contents.length === 1 ? topCardRef : bottomCardRef
      )?.getBoundingClientRect?.();
      console.log(rect);
      if (rect) {
        setBottomCardCenter(rect?.top + (rect?.height ?? 0) / 2);
      }
    }
  };
  useEffect(() => {
    updateBottomCardCenter();
  }, [
    contents,
    topCardRef?.getBoundingClientRect?.().top,
    bottomCardRef?.getBoundingClientRect?.().top,
  ]);

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
      setTimeout(
        () =>
          setContentsWithDotY(
            contents.map((c) => ({
              ...c,
              dotY:
                (document
                  .getElementById(`${c?.contentId}dot`)
                  ?.getBoundingClientRect?.()?.top ?? 0) + 8,
            }))
          ),
        1000
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

  console.log(contentsWithDotY[0]?.dotY, addButtonY);

  return (
    <>
      <Stack
        height="100%"
        ref={setPageRef}
        px="40px"
        overflow="scroll"
        onMouseMove={(event) => setMouseY(event.pageY)}
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
          width="78%"
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
              >
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
          editingCallback={() => setEditingDialogOpen(true)}
          editingEnabled={
            !!userDetails?.user?.id && userDetails.user.id === lesson?.creatorId
          }
        >
          <Stack
            height="100%"
            position="fixed"
            bgcolor="yellow"
            top={0}
            left="50%"
            sx={{
              transform: `translateY(-26px)`,
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
            <Stack
              position="absolute"
              top={addButtonY}
              left={-18}
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
                  transition: "0.2s",
                }}
              >
                <AddContentButton
                  open={addContentPopoverOpen}
                  setOpen={setAddContentPopoverOpen}
                  callback={(type) =>
                    outOfCreations
                      ? setNoCreationsLeftDialogOpen(true)
                      : contentCallbacks[type]()
                  }
                  clickOutsideCloseCallback={() =>
                    setContentInsertionIndex(undefined)
                  }
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack width="100%" pt="36px" minHeight="44px">
            <Stack
              px="24px"
              ref={setContentsColumnRef}
              position="relative"
              pb="48px"
            >
              {userDetails.user?.id &&
              userDetails.user.id === lesson?.creatorId ? (
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
                    {/* {contentsWithDotY[0]?.dotY &&
                    mouseY < contentsWithDotY[0]?.dotY ? (
                      <Stack
                        width="2px"
                        height={
                          contentsWithDotY[0]?.dotY -
                          mouseY -
                          document.body.scrollTop -
                          26
                        }
                        bgcolor={PALETTE.secondary.grey[3]}
                        position="absolute"
                        left="-1px"
                        right={0}
                        marginRight="auto"
                        marginLeft="auto"
                        top={mouseY}
                      />
                    ) : null} */}
                    {contentsWithDotY[0]?.dotY &&
                    mouseY < contentsWithDotY[0]?.dotY ? (
                      <Stack
                        width="2px"
                        height={`${Math.min(
                          100,
                          contentsWithDotY[0]?.dotY -
                            addButtonY -
                            document.body.scrollTop -
                            30
                        )}px`}
                        sx={{
                          transform: `translateY(-${Math.min(
                            100,
                            contentsWithDotY[0]?.dotY -
                              addButtonY -
                              document.body.scrollTop -
                              30
                          )}px)`,
                        }}
                        bgcolor={PALETTE.secondary.grey[3]}
                        position="absolute"
                        left={0}
                        right={0}
                        marginRight="auto"
                        marginLeft="auto"
                        top={`${DOT_CARD_Y}px`}
                      />
                    ) : null}
                    {contentsWithDotY[0]?.dotY &&
                    contentsWithDotY[contentsWithDotY.length - 1]?.dotY ? (
                      <Stack
                        width="2px"
                        height={
                          "100%"
                          // contentsWithDotY[contentsWithDotY.length - 1].dotY -
                          // (contentsColumnRef?.getBoundingClientRect?.()?.top ??
                          //   0) -
                          // 50
                        }
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
                      zIndex={3}
                    />

                    {/* <Stack
                      width="2px"
                      height={
                        lineTailHeight
                      }
                      bgcolor="rgb(255,255,255)"
                      // sx={{
                      //   background: `linear-gradient(0, rgb(255,255,255), ${PALETTE.secondary.grey[3]})`,
                      // }}
                      position="absolute"
                      left="-1px"
                      right={0}
                      marginRight="auto"
                      marginLeft="auto"
                      top={`${
                        contentsWithDotY[contentsWithDotY.length - 1]?.dotY -
                        303
                      }px`}
                      zIndex={3}
                    />
                     */}

                    {/* <Stack
                      position="absolute"
                      top={
                        _.isNumber(staticAddButtonY)
                          ? staticAddButtonY - 18
                          : contents.length === 0
                          ? contentsColumnRef?.getBoundingClientRect()?.top
                          : mouseY < height / 2
                          ? Math.max(
                              mouseY - 18,
                              (contentsColumnRef?.getBoundingClientRect()
                                ?.top ?? 0) - 60
                            )
                          : Math.min(mouseY - 10, height - 50)
                      }
                      left={-18}
                      onClick={() => {
                        setStaticAddButtonY(mouseY);
                        if (addContentPopoverOpen) return;
                        const dotYs = lesson?.contentOrder.map(
                          (id) =>
                            (document
                              .getElementById(`${id}dot`)
                              ?.getBoundingClientRect?.()?.top ?? 0) +
                            document.body.scrollTop
                        );
                        if (mouseY < (dotYs?.[0] ?? 0)) {
                          setContentInsertionIndex(0);
                        } else if (mouseY > (dotYs?.[dotYs.length - 1] ?? 0)) {
                          setContentInsertionIndex(contents.length);
                        } else {
                          const closestY = dotYs.reduce(
                            (a, b) => (b <= mouseY && a < b ? b : a),
                            0
                          );
                          const closestNumberIndex = dotYs.indexOf(closestY);
                          setContentInsertionIndex(
                            closestNumberIndex + (mouseY < closestY ? 0 : 1)
                          );
                        }
                      }}
                      alignItems="center"
                    >
                      <Stack
                        sx={{
                          opacity:
                            contents.length === 0 || !hoveringOnContentCard
                              ? 1
                              : 0,
                          transition: "0.2s",
                        }}
                      >
                        <AddContentButton
                          open={addContentPopoverOpen}
                          setOpen={setAddContentPopoverOpen}
                          callback={(type) =>
                            outOfCreations
                              ? setNoCreationsLeftDialogOpen(true)
                              : contentCallbacks[type]()
                          }
                          clickOutsideCloseCallback={() =>
                            setContentInsertionIndex(undefined)
                          }
                        />
                      </Stack>
                    </Stack> */}
                  </Stack>
                </Stack>
              ) : null}
              <Stack direction="row">
                <Stack flex={1}>
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
                        ref={
                          i === 0
                            ? setTopCardRef
                            : i === contents.length - 1
                            ? setBottomCardRef
                            : undefined
                        }
                        //id={card?.props.id}
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

                        {/* {contents.length > 1 ? (
                          <Stack
                            position="absolute"
                            left={0}
                            right={0}
                            top={i === 0 ? undefined : 0}
                            bottom={i === 0 ? 0 : undefined}
                            marginLeft="auto !important"
                            marginRight="auto !important"
                            height={
                              i === 0 || i === contents.length - 1
                                ? "50%"
                                : "100%"
                            }
                            width="2px"
                            bgcolor={PALETTE.secondary.grey[3]}
                          />
                        ) : null} */}
                        {/* {contents.length > 0 && i === contents.length - 1 ? (
                          <Stack
                            sx={{
                              background: `linear-gradient(0, rgb(255,255,255), ${PALETTE.secondary.grey[3]})`,
                            }}
                            position="absolute"
                            width="2px"
                            top="50%"
                            height={height - bottomCardCenter}
                            left={0}
                            right={0}
                            marginRight="auto"
                            marginLeft="auto"
                          />
                        ) : null} */}
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
                        // ref={
                        //   i === 0
                        //     ? setTopCardRef
                        //     : i === contents.length - 1
                        //     ? setBottomCardRef
                        //     : undefined
                        // }
                        //id={card?.props.id}
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

                        {/* {contents.length > 1 ? (
                          <Stack
                            position="absolute"
                            left={0}
                            right={0}
                            top={i === 0 ? undefined : 0}
                            bottom={i === 0 ? 0 : undefined}
                            marginLeft="auto !important"
                            marginRight="auto !important"
                            height={
                              i === 0 || i === contents.length - 1
                                ? "50%"
                                : "100%"
                            }
                            width="2px"
                            bgcolor={PALETTE.secondary.grey[3]}
                          />
                        ) : null}
                        {contents.length > 0 && i === contents.length - 1 ? (
                          <Stack
                            sx={{
                              background: `linear-gradient(0, rgb(255,255,255), ${PALETTE.secondary.grey[3]})`,
                            }}
                            position="absolute"
                            width="2px"
                            top="50%"
                            height={height - bottomCardCenter}
                            left={0}
                            right={0}
                            marginRight="auto"
                            marginLeft="auto"
                          />
                        ) : null} */}
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
          ).then(
            loadLesson
            //esson(response.lesson, response.actualContents)
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
          ).then(
            loadLesson
            //esson(response.lesson, response.actualContents)
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
          ).then(
            loadLesson
            //esson(response.lesson, response.actualContents)
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
          ).then(
            loadLesson
            //esson(response.lesson, response.actualContents)
          );
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
            ).then(
              loadLesson
              //esson(response.lesson, response.actualContents)
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
    </>
  );
}
