import { IVideo_DEPRECATED } from "@/app/api";
import TimelineVideoCard from "@/app/lesson/[subdirectory]/cards/TimelineVideoCard";
import React, { useState } from "react";

const ContentCards = (props: {
  videos: IVideo_DEPRECATED[];
  selectedVideos: string[];
  lessonId: string;
  columnWidth: number;
  wrapper?: (card: React.ReactNode, i: number) => React.ReactNode;
  setVideoEditingDialogId: (id: string) => void;
  updateCallback: () => void;
  setHeight?: (id: string, height: number) => void;
  dragStartCallback?: (id: string) => void;
  expansionCallback?: (id: string) => void;
  draggedContentId?: string;
  expanded?: boolean;
  noPlayer?: boolean;
  noButtons?: boolean; // the buttons would be clickable in the column of invisible contents
  hideLimits?: boolean;
}) => {
  return (
    <>
      {props.selectedVideos
        .map((sv) => {
          const video = props.videos?.find((v) => v.id === sv);
          return video ? (
            <TimelineVideoCard
              {...video}
              lessonId={props.lessonId}
              key={sv}
              editingCallback={() => props.setVideoEditingDialogId(sv)}
              deletionCallback={props.updateCallback}
              duplicationCallback={props.updateCallback}
              setHeight={(height) => {
                props.setHeight?.(sv, height);
              }}
              onDragStart={() => props.dragStartCallback?.(sv)}
              dragging={props.draggedContentId === sv}
              columnWidth={props.columnWidth}
              expanded={props.expanded}
              expansionCallback={() => props.expansionCallback?.(sv)}
              noPlayer={props.noPlayer}
              noButtons={props.noButtons}
              hideLimits={props.hideLimits}
            />
          ) : null;
        })
        .map((card, i) => (props.wrapper ? props.wrapper(card, i) : card))}
    </>
  );
};

export default ContentCards;
