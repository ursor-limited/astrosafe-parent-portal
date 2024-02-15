"use client";

import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
  DropAnimation,
  defaultDropAnimationSideEffects,
  DragOverlay,
  DragOverEvent,
  DragStartEvent,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import AstroImage from "./AstroImage";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import AstroElementFrame from "./AstroElementFrame";
import TextEditorToolbar, { modules, formats } from "./TextEditorToolBar";

const DUMMY_IMAGE_URL =
  "https://images.aeonmedia.co/images/8eac4719-7f56-4d0a-9a32-aae431c8ca07/built-ecologies-emilio-ambasz-landscape-2-v2.jpg?width=828&quality=75&format=auto";

const ReactQuill = dynamic(
  () => import("react-quill"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export function Droppable(props: { id: string; children: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

function Draggable(props: {
  id: string;
  translationCallback: (x: number, y: number) => void;
  x: number;
  y: number;
  draggingDisabled: boolean;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    disabled: props.draggingDisabled,
  });

  //   const [x, setX] = useState<number>(0);
  //   const [y, setY] = useState<number>(0);

  //   useEffect(() => {
  //     console.log(transform?.x, "00");
  //     transform?.x && setX(transform?.x);
  //     transform?.y && setY(transform?.y);
  //   }, [transform?.x, transform?.y]);

  useEffect(() => {
    props.translationCallback(transform?.x ?? 0, transform?.y ?? 0);
  }, [transform?.x, transform?.y]);

  return (
    <Stack
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      position="absolute"
      top={props.y}
      left={props.x}
      sx={{
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
      }}
    >
      {props.children}
    </Stack>
  );
}

const Canvas = (props: {
  textEditorSelectionCallback: () => void;
  textEditorDeselectionCallback: () => void;
}) => {
  const [value, setValue] = useState<string>("");

  const [textAreaRef, setTextAreaRef] = useState<HTMLElement | null>(null);

  const [selectedElement, setSelectedElement] = useState<string | undefined>(
    undefined
  );

  useEffect(
    () =>
      selectedElement === "text"
        ? props.textEditorSelectionCallback()
        : props.textEditorDeselectionCallback(),
    [selectedElement]
  );

  return (
    <Stack
      width="900px"
      height="600px"
      position="relative"
      bgcolor="rgba(255,255,255,0.8)"
    >
      <Stack
        flex={1}
        onClick={() => setSelectedElement(undefined)}
        zIndex={0}
      />

      <AstroElementFrame
        defaultWidth={270}
        dynamicHeight
        noVerticalResizing
        selectionCallback={() => setSelectedElement("text")}
        selected={selectedElement === "text"}
      >
        <Stack
          sx={{
            ".ql-container": {
              fontFamily: "unset",
              borderRadius: "12px",
              height: "unset",
              border: "none",
            },
            ".ql-editor": {
              padding: "3px",
            },
          }}
          ref={setTextAreaRef}
        >
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
          />
        </Stack>
      </AstroElementFrame>
      <AstroImage
        url={DUMMY_IMAGE_URL}
        selectionCallback={() => setSelectedElement("image")}
        selected={selectedElement === "image"}
      />
    </Stack>
  );
};

export default Canvas;
