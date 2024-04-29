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
import TimelineImageCard from "./cards/TimelineImageCard";
import TimelineWorksheetCard from "./cards/TimelineWorksheetCard";
import TimelineLinkCard from "./cards/TimelineLinkCard";
import TimelineTextCard from "./cards/TimelineTextCard";
import TimelineVideoCard from "./cards/TimelineVideoCard";

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
  columnWidth: number;
  wrapper?: (card: React.ReactNode, i: number) => React.ReactNode;
  setVideoEditingDialogId: (id: string) => void;
  setLinkEditingDialogId: (id: string) => void;
  setTextEditingDialogId: (id: string) => void;
  setImageEditingDialogId: (id: string) => void;
  setWorksheetEditingDialogId: (id: string) => void;
  updateCallback: () => void;
  setHeight?: (id: string, height: number) => void;
  dragStartCallback?: (id: string) => void;
  expansionCallback?: (id: string) => void;
  draggedContentId?: string;
  expanded?: boolean;
}) => {
  return (
    <>
      {props.contents
        .map((c) => {
          if (c.type === "video") {
            const video = props.videos?.find((v) => v.id === c.contentId);
            return video ? (
              <TimelineVideoCard
                {...video}
                lessonId={props.lessonId}
                key={c.contentId}
                editingCallback={() =>
                  props.setVideoEditingDialogId(c.contentId)
                }
                deletionCallback={props.updateCallback}
                duplicationCallback={props.updateCallback}
                setHeight={(height) => {
                  props.setHeight?.(c.contentId, height);
                }}
                onDragStart={() => props.dragStartCallback?.(c.contentId)}
                dragging={props.draggedContentId === c.contentId}
                columnWidth={props.columnWidth}
                expanded={props.expanded}
                expansionCallback={() => props.expansionCallback?.(c.contentId)}
              />
            ) : null;
          } else if (c.type === "link") {
            const link = props.links?.find((v) => v.id === c.contentId);
            return link ? (
              <TimelineLinkCard
                {...link}
                lessonId={props.lessonId}
                key={c.contentId}
                editingCallback={() => props.setLinkEditingDialogId(link.id)}
                deletionCallback={props.updateCallback}
                duplicationCallback={props.updateCallback}
                setHeight={(height) => {
                  props.setHeight?.(link.id, height);
                }}
                onDragStart={() => props.dragStartCallback?.(c.contentId)}
                dragging={props.draggedContentId === c.contentId}
                columnWidth={props.columnWidth}
                expanded={props.expanded}
                expansionCallback={() => props.expansionCallback?.(c.contentId)}
              />
            ) : null;
          } else if (c.type === "text") {
            const text = props.texts?.find((t) => t.id === c.contentId);
            return text ? (
              <TimelineTextCard
                {...text}
                lessonId={props.lessonId}
                key={c.contentId}
                editingCallback={() =>
                  props.setTextEditingDialogId(c.contentId)
                }
                deletionCallback={props.updateCallback}
                duplicationCallback={props.updateCallback}
                setHeight={(height) => {
                  props.setHeight?.(c.contentId, height);
                }}
                onDragStart={() => props.dragStartCallback?.(c.contentId)}
                dragging={props.draggedContentId === c.contentId}
                columnWidth={props.columnWidth}
                expanded={props.expanded}
                expansionCallback={() => props.expansionCallback?.(c.contentId)}
              />
            ) : null;
          } else if (c.type === "image") {
            const image = props.images?.find((i) => i.id === c.contentId);
            return image ? (
              <TimelineImageCard
                {...image}
                lessonId={props.lessonId}
                key={c.contentId}
                editingCallback={() => props.setImageEditingDialogId(image.id)}
                deletionCallback={props.updateCallback}
                duplicationCallback={props.updateCallback}
                setHeight={(height) => {
                  props.setHeight?.(image.id, height);
                }}
                onDragStart={() => props.dragStartCallback?.(c.contentId)}
                dragging={props.draggedContentId === c.contentId}
                columnWidth={props.columnWidth}
                expanded={props.expanded}
                expansionCallback={() => props.expansionCallback?.(c.contentId)}
              />
            ) : null;
          } else if (c.type === "worksheet") {
            const worksheet = props.worksheets?.find(
              (w) => w.id === c.contentId
            );
            return worksheet ? (
              <TimelineWorksheetCard
                {...worksheet}
                lessonId={props.lessonId}
                key={c.contentId}
                editingCallback={() =>
                  props.setWorksheetEditingDialogId(c.contentId)
                }
                deletionCallback={props.updateCallback}
                duplicationCallback={props.updateCallback}
                setHeight={(height) => {
                  props.setHeight?.(c.contentId, height);
                }}
                onDragStart={() => props.dragStartCallback?.(c.contentId)}
                dragging={props.draggedContentId === c.contentId}
                columnWidth={props.columnWidth}
                expanded={props.expanded}
                expansionCallback={() => props.expansionCallback?.(c.contentId)}
              />
            ) : null;
          }
        })
        .map((card, i) => (props.wrapper ? props.wrapper(card, i) : card))}
    </>
  );
};

export default ContentCards;
