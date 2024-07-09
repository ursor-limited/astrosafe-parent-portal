import { Stack } from "@mui/system";
import ContentCards from "./ContentCards";
import { AstroLessonContent } from "./MobileLessonPageContents";
import { IVideo_DEPRECATED } from "@/app/api";
import { ILink_DEPRECATED } from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/LinkDialog";
import { IText } from "@/app/components/TextDialog";
import { IImage } from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/ImageDialog";
import { IWorksheet } from "@/app/components/WorksheetGenerator";
import { PALETTE, Typography } from "ui";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import Image from "next/image";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { useEffect, useState } from "react";
import { IQuiz } from "@/app/components/QuizDialog";

export const DOT_CARD_Y = 47;
export const CARD_SPACING = 120;
export const RIGHT_COLUMN_Y_OFFSET = 60;

const Timeline = (props: {
  contents: {
    type: AstroLessonContent;
    contentId: string;
  }[];
  contentsWithSide: {
    type: AstroLessonContent;
    contentId: string;
    left: boolean;
  }[];
  videos: IVideo_DEPRECATED[];
  links: ILink_DEPRECATED[];
  texts: IText[];
  images: IImage[];
  worksheets: IWorksheet[];
  quizzes: IQuiz[];
  lessonId: string;
  expansionCallback: (id: string) => void;
  setVideoEditingDialogId: (id: string) => void;
  setLinkEditingDialogId: (id: string) => void;
  setTextEditingDialogId: (id: string) => void;
  setImageEditingDialogId: (id: string) => void;
  setWorksheetEditingDialogId: (id: string) => void;
  setQuizEditingDialogId: (id: string) => void;
  loadLesson: () => void;
  setDraggedContentId: (id: string) => void;
  draggedContentId?: string;
  singleContentsColumnWidth: number;
}) => {
  const [rightCards, setRightCards] = useState<
    {
      type: AstroLessonContent;
      contentId: string;
    }[]
  >([]);
  const [leftCards, setLeftCards] = useState<
    {
      type: AstroLessonContent;
      contentId: string;
    }[]
  >([]);
  useEffect(() => {
    setRightCards(
      props.contentsWithSide
        .filter((c) => !c.left)
        .map((c) => ({ contentId: c.contentId, type: c.type }))
    );
    setLeftCards(
      props.contentsWithSide
        .filter((c) => c.left)
        .map((c) => ({ contentId: c.contentId, type: c.type }))
    );
  }, [props.contentsWithSide]);
  return (
    <Stack direction="row">
      <Stack
        flex={1}
        pt={
          !props.contentsWithSide[0]?.left
            ? `${RIGHT_COLUMN_Y_OFFSET}px`
            : undefined
        }
      >
        {props.contents.length > 0 ? (
          <ContentCards
            contents={leftCards}
            videos={props.videos}
            links={props.links}
            texts={props.texts}
            images={props.images}
            worksheets={props.worksheets}
            quizzes={props.quizzes}
            lessonId={props.lessonId}
            setVideoEditingDialogId={props.setVideoEditingDialogId}
            setLinkEditingDialogId={props.setLinkEditingDialogId}
            setTextEditingDialogId={props.setTextEditingDialogId}
            setImageEditingDialogId={props.setImageEditingDialogId}
            setWorksheetEditingDialogId={props.setWorksheetEditingDialogId}
            setQuizEditingDialogId={props.setQuizEditingDialogId}
            updateCallback={props.loadLesson}
            dragStartCallback={props.setDraggedContentId}
            draggedContentId={
              props.draggedContentId ? props.draggedContentId : undefined
            }
            columnWidth={props.singleContentsColumnWidth}
            expansionCallback={props.expansionCallback}
            wrapper={(card, i) => (
              <Stack //@ts-ignore
                key={card?.props?.id}
                position="relative"
                // onMouseEnter={() => {
                //   setHoveringContentSide("left");
                //   setHoveringContentIndex(i);
                // }}
                // onMouseMove={(event) => {
                //   setHoveringContentSide("left");
                //   setHoveringContentIndex(i);
                //   //@ts-ignore
                //   const rect = event?.target?.getBoundingClientRect();
                //   setHoveringAboveCenter(
                //     event.pageY < rect.height / 2 + rect.top
                //   );
                // }}
                pb={i < leftCards.length - 1 ? `${CARD_SPACING}px` : undefined}
                sx={{
                  opacity:
                    //@ts-ignore
                    props.draggedContentId === card?.props?.id ? 0 : 1,
                  pointerEvents:
                    //@ts-ignore
                    props.draggedContentId === card?.props?.id
                      ? "none"
                      : undefined,
                }}
              >
                <Stack
                  width="96%"
                  //   onMouseEnter={() => {
                  //     setHoveringOnContentCard(true);
                  //   }}
                  //   onMouseLeave={() => {
                  //     setHoveringOnContentCard(false);
                  //   }}
                  alignItems="flex-end"
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
        ) : null}
      </Stack>
      <Stack
        flex={1}
        pt={
          props.contentsWithSide[0]?.left
            ? `${RIGHT_COLUMN_Y_OFFSET}px`
            : undefined
        }
      >
        <ContentCards
          contents={rightCards}
          videos={props.videos}
          links={props.links}
          texts={props.texts}
          images={props.images}
          worksheets={props.worksheets}
          quizzes={props.quizzes}
          lessonId={props.lessonId}
          setVideoEditingDialogId={props.setVideoEditingDialogId}
          setLinkEditingDialogId={props.setLinkEditingDialogId}
          setTextEditingDialogId={props.setTextEditingDialogId}
          setImageEditingDialogId={props.setImageEditingDialogId}
          setWorksheetEditingDialogId={props.setWorksheetEditingDialogId}
          setQuizEditingDialogId={props.setQuizEditingDialogId}
          updateCallback={props.loadLesson}
          dragStartCallback={props.setDraggedContentId}
          columnWidth={props.singleContentsColumnWidth}
          expansionCallback={props.expansionCallback}
          wrapper={(card, i) => (
            <Stack //@ts-ignore
              key={card?.props?.id}
              position="relative"
              //   onMouseEnter={() => {
              //     setHoveringContentSide("right");
              //     setHoveringContentIndex(i);
              //   }}
              //   onMouseMove={(event) => {
              //     setHoveringContentSide("right");
              //     setHoveringContentIndex(i);
              //     //@ts-ignore
              //     const rect = event?.target?.getBoundingClientRect();
              //     setHoveringAboveCenter(
              //       event.pageY < rect.height / 2 + rect.top
              //     );
              //   }}
              pb={i < rightCards.length - 1 ? `${CARD_SPACING}px` : undefined}
              sx={{
                opacity:
                  //@ts-ignore
                  props.draggedContentId === card?.props?.id ? 0 : 1,
                pointerEvents:
                  //@ts-ignore
                  props.draggedContentId === card?.props?.id
                    ? "none"
                    : undefined,
              }}
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
                // onMouseEnter={() => {
                //   setHoveringOnContentCard(true);
                // }}
                // onMouseLeave={() => {
                //   setHoveringOnContentCard(false);
                // }}
              >
                {card}
              </Stack>
            </Stack>
          )}
        />
      </Stack>
    </Stack>
  );
};

export default Timeline;
