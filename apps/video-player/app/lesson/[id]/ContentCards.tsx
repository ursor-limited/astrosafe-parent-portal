import { IVideo } from "@/app/api";
import { AstroLessonContent } from "./LessonPageContents";
import LessonVideoCard from "./LessonVideoCard";
import { ILink } from "@/app/dashboard/LinkDialog";
import LinkCard from "@/app/components/LinkCard";
import TextCard from "@/app/components/TextCard";
import TextCreationDialog, { IText } from "@/app/components/TextDialog";
import ImageDialog, { IImage } from "@/app/dashboard/ImageDialog";
import ImageCard from "@/app/components/ImageCard";
import LessonWorksheetPreview from "./LessonWorksheetPreview";
import { IWorksheet } from "@/app/components/WorksheetGenerator";
import React, { useState } from "react";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { Stack } from "@mui/system";
import LessonImageCard from "./cards/LessonImageCard";
import LessonWorksheetCard from "./cards/LessonWorksheetCard";

const ContentCards = (props: {
  videos: IVideo[];
  links: ILink[];
  texts: IText[];
  images: IImage[];
  worksheets: IWorksheet[];
  contents: {
    type: AstroLessonContent;
    contentId: string;
  }[];
  lessonId: string;
  wrapper?: (card: React.ReactNode, i: number) => React.ReactNode;
  setVideoEditingDialogId: (id: string) => void;
  setLinkEditingDialogId: (id: string) => void;
  setTextEditingDialogId: (id: string) => void;
  setImageEditingDialogId: (id: string) => void;
  setWorksheetEditingDialogId: (id: string) => void;
  updateCallback: () => void;
  setHeight?: (id: string, height: number) => void;
  dragStartCallback?: (id: string) => void;
  draggedContentId?: string;
}) => {
  return (
    <>
      {props.contents
        .map((c) => {
          if (c.type === "video") {
            const video = props.videos?.find((v) => v.id === c.contentId);
            return video ? (
              <LessonVideoCard
                key={video.id}
                {...video}
                editingCallback={() => props.setVideoEditingDialogId(video.id)}
                deletionCallback={props.updateCallback}
                lessonId={props.lessonId}
                setHeight={(height) => {
                  props.setHeight?.(video.id, height);
                }}
              />
            ) : null;
          } else if (c.type === "link") {
            const link = props.links?.find((v) => v.id === c.contentId);
            return link ? (
              <LinkCard
                key={link.id}
                {...link}
                editCallback={() => props.setLinkEditingDialogId(link.id)}
                deleteCallback={props.updateCallback}
                setHeight={(height) => {
                  props.setHeight?.(link.id, height);
                }}
                noFooter
              />
            ) : null;
          } else if (c.type === "text") {
            const text = props.texts?.find((t) => t.id === c.contentId);
            return text ? (
              <TextCard
                key={text.id}
                {...text}
                editCallback={() => props.setTextEditingDialogId(text.id)}
                deleteCallback={props.updateCallback}
                setHeight={(height) => {
                  props.setHeight?.(text.id, height);
                }}
              />
            ) : null;
          } else if (c.type === "image") {
            const image = props.images?.find((i) => i.id === c.contentId);
            return image ? (
              <LessonImageCard
                {...image}
                key={c.contentId}
                editingCallback={() => props.setImageEditingDialogId(image.id)}
                deletionCallback={props.updateCallback}
                setHeight={(height) => {
                  props.setHeight?.(image.id, height);
                }}
                onDragStart={() => props.dragStartCallback?.(c.contentId)}
                dragging={props.draggedContentId === image.id}
              />
            ) : // <Stack
            //   id={c.contentId}
            //   key={c.contentId}
            //   sx={{
            //     pointerEvents:
            //       props.draggedContentId === image.id ? "none" : undefined,
            //   }}
            //   onMouseDown={() => {
            //     props.dragStartCallback?.(c.contentId);
            //   }}
            // >
            //   <ImageCard
            //     key={image.id}
            //     {...image}
            //     editingCallback={() =>
            //       props.setImageEditingDialogId(image.id)
            //     }
            //     deletionCallback={props.updateCallback}
            //     setHeight={(height) => {
            //       props.setHeight?.(image.id, height);
            //     }}
            //     noFooter
            //     //onDragStart={() => props.dragStartCallback?.(c.contentId)}
            //   />
            // </Stack>
            null;
          } else if (c.type === "worksheet") {
            const worksheet = props.worksheets?.find(
              (w) => w.id === c.contentId
            );
            return worksheet ? (
              <LessonWorksheetCard
                {...worksheet}
                key={c.contentId}
                editingCallback={() =>
                  props.setImageEditingDialogId(c.contentId)
                }
                deletionCallback={props.updateCallback}
                setHeight={(height) => {
                  props.setHeight?.(c.contentId, height);
                }}
                onDragStart={() => props.dragStartCallback?.(c.contentId)}
                dragging={props.draggedContentId === c.contentId}
              />
            ) : null;
          }
        })
        .map((card, i) => (
          <UrsorFadeIn duration={800} key={card?.key}>
            {props.wrapper ? props.wrapper(card, i) : card}
          </UrsorFadeIn>
        ))}
    </>
  );
};

export default ContentCards;
