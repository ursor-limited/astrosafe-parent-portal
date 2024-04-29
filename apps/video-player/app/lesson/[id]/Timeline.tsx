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
  videos: IVideo[];
  links: ILink[];
  texts: IText[];
  images: IImage[];
  worksheets: IWorksheet[];
  lessonId: string;
  expansionCallback: (id: string) => void;
  setVideoEditingDialogId: (id: string) => void;
  setLinkEditingDialogId: (id: string) => void;
  setTextEditingDialogId: (id: string) => void;
  setImageEditingDialogId: (id: string) => void;
  setWorksheetEditingDialogId: (id: string) => void;
  loadLesson: () => void;
  setDraggedContentId: (id: string) => void;
  setStarterAddContentPopoverOpen: () => void;
  draggedContentId?: string;
  singleContentsColumnWidth: number;
  //   hovering: boolean;
  //   setHovering: (on: boolean) => void;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
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
      <Stack flex={1}>
        {props.contents.length > 0 ? (
          <ContentCards
            contents={leftCards}
            videos={props.videos}
            links={props.links}
            texts={props.texts}
            images={props.images}
            worksheets={props.worksheets}
            lessonId={props.lessonId}
            setVideoEditingDialogId={props.setVideoEditingDialogId}
            setLinkEditingDialogId={props.setLinkEditingDialogId}
            setTextEditingDialogId={props.setTextEditingDialogId}
            setImageEditingDialogId={props.setImageEditingDialogId}
            setWorksheetEditingDialogId={props.setWorksheetEditingDialogId}
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
        ) : (
          <Stack position="relative">
            <UrsorFadeIn delay={1000} duration={800}>
              <Stack
                key="starter"
                width="94%"
                onMouseEnter={() => {
                  setHovering(true);
                }}
                onMouseLeave={() => {
                  setHovering(false);
                }}
                onClick={props.setStarterAddContentPopoverOpen}
              >
                <Stack
                  height="230px"
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
                      transform: "translateY(5px)",
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
                    sx={{
                      transform: "translateY(-20px)",
                    }}
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
            <Stack position="absolute" top={`${DOT_CARD_Y}px`} right="-8px">
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
          contents={rightCards}
          videos={props.videos}
          links={props.links}
          texts={props.texts}
          images={props.images}
          worksheets={props.worksheets}
          lessonId={props.lessonId}
          setVideoEditingDialogId={props.setVideoEditingDialogId}
          setLinkEditingDialogId={props.setLinkEditingDialogId}
          setTextEditingDialogId={props.setTextEditingDialogId}
          setImageEditingDialogId={props.setImageEditingDialogId}
          setWorksheetEditingDialogId={props.setWorksheetEditingDialogId}
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
