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
import AstroText, { getNewTextDetails } from "./AstroText";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import AstroElementFrame from "./AstroElementFrame";
import TypographyIcon from "@/images/icons/TypographyIcon.svg";
import ImageIcon from "@/images/icons/ImageIcon.svg";
import TextEditorToolbar from "./TextEditorToolBar";
import ActualCanvas, { CANVAS_HEIGHT, CANVAS_WIDTH } from "./ActualCanvas";

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

const ElementButton = (props: {
  callback: () => void;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}) => (
  <Stack
    width="43px"
    height="43px"
    justifyContent="center"
    alignItems="center"
    bgcolor="rgb(255,255,255)"
    borderRadius="12px"
    sx={{
      cursor: "pointer",
      "&:hover": { opacity: 0.7 },
      transition: "0.2s",
    }}
    onClick={props.callback}
  >
    <props.icon height="16px" width="16px" />
  </Stack>
);

export type AstroCanvasElement = "image" | "text";

export interface IAstroCanvasElement {
  id: string;
  width: number;
  height?: number;
  x: number;
  y: number;
  type: AstroCanvasElement;
  value: string;
}

const Canvas = (props: {
  elements: IAstroCanvasElement[];
  noButtons?: boolean;
  // textEditorSelectionCallback: (id: string) => void;
  // textEditorDeselectionCallback: () => void;
}) => {
  const [selectedElement, setSelectedElement] = useState<string | undefined>(
    undefined
  );
  const [elements, setElements] = useState<IAstroCanvasElement[]>([]);

  // useEffect(
  //   () =>
  //     selectedElement &&
  //     elements.find((e) => e.id === selectedElement)?.type === "text"
  //       ? props.textEditorSelectionCallback(selectedElement)
  //       : props.textEditorDeselectionCallback(),
  //   [selectedElement, elements]
  // );

  return (
    <Stack spacing="12px">
      {" "}
      {!props.noButtons ? (
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing="10px">
            <ElementButton
              icon={TypographyIcon}
              callback={() => {
                setElements([
                  ...elements,
                  getNewTextDetails(
                    `text${elements.length}`,
                    CANVAS_WIDTH / 2,
                    CANVAS_HEIGHT / 2
                  ),
                ]);
                setSelectedElement(`text${elements.length}`);
                //setSelectedTextId(`text${elements.length}`);
              }}
            />
            <ElementButton icon={ImageIcon} callback={() => null} />
          </Stack>
          <Stack position="relative" flex={1}>
            {elements
              .filter((e) => e.type === "text")
              .map((e) => (
                <Stack
                  position="absolute"
                  top={0}
                  right={0}
                  key={e.id}
                  sx={{
                    opacity: e.id === selectedElement ? 1 : 0,
                    pointerEvents:
                      e.id === selectedElement ? undefined : "none",
                    transition: "0.6s",
                  }}
                >
                  <TextEditorToolbar id={e.id} />
                </Stack>
              ))}
          </Stack>
        </Stack>
      ) : null}
      <ActualCanvas
        elements={elements}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
      />
    </Stack>
  );
};

export default Canvas;
