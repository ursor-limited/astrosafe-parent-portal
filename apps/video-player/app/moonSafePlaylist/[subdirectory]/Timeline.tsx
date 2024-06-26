import { Stack } from "@mui/system";
import ContentCards from "./ContentCards";
import { AstroLessonContent } from "./MobileLessonPageContents";
import { IVideo } from "@/app/api";
import { ILink } from "@/app/dashboard/LinkDialog";
import { IText } from "@/app/components/TextDialog";
import { IImage } from "@/app/dashboard/ImageDialog";
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
  selectedVideos: string[];
  videosWithSide: {
    id: string;
    left: boolean;
  }[];
  videos: IVideo[];
  lessonId: string;
  expansionCallback: (id: string) => void;
  setVideoEditingDialogId: (id: string) => void;
  loadLesson: () => void;
  setDraggedContentId: (id: string) => void;
  draggedContentId?: string;
  singleContentsColumnWidth: number;
}) => {
  const [rightVideos, setRightVideos] = useState<string[]>([]);
  const [leftVideos, setLeftVideos] = useState<string[]>([]);
  useEffect(() => {
    setRightVideos(
      props.videosWithSide.filter((c) => !c.left).map((v) => v.id)
    );
    setLeftVideos(props.videosWithSide.filter((c) => c.left).map((v) => v.id));
  }, [props.videosWithSide]);
  return (
    <Stack direction="row">
      <Stack
        flex={1}
        pt={
          !props.videosWithSide[0]?.left
            ? `${RIGHT_COLUMN_Y_OFFSET}px`
            : undefined
        }
      >
        {props.selectedVideos.length > 0 ? (
          <ContentCards
            selectedVideos={leftVideos}
            videos={props.videos}
            lessonId={props.lessonId}
            setVideoEditingDialogId={props.setVideoEditingDialogId}
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
                pb={i < leftVideos.length - 1 ? `${CARD_SPACING}px` : undefined}
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
                <Stack width="96%" alignItems="flex-end">
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
          props.videosWithSide[0]?.left
            ? `${RIGHT_COLUMN_Y_OFFSET}px`
            : undefined
        }
      >
        <ContentCards
          selectedVideos={rightVideos}
          videos={props.videos}
          lessonId={props.lessonId}
          setVideoEditingDialogId={props.setVideoEditingDialogId}
          updateCallback={props.loadLesson}
          dragStartCallback={props.setDraggedContentId}
          columnWidth={props.singleContentsColumnWidth}
          expansionCallback={props.expansionCallback}
          wrapper={(card, i) => (
            <Stack //@ts-ignore
              key={card?.props?.id}
              position="relative"
              pb={i < rightVideos.length - 1 ? `${CARD_SPACING}px` : undefined}
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
              <Stack width="96%">{card}</Stack>
            </Stack>
          )}
        />
      </Stack>
    </Stack>
  );
};

export default Timeline;
