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
import ImageUploader from "./ImageUploader";
import AstroImage from "./AstroImage";
import { PALETTE } from "ui";

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
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
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

const Canvas = () => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [finalX, setFinalX] = useState<number>(0);
  const [finalY, setFinalY] = useState<number>(0);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setFinalX(finalX + x);
    setFinalY(finalY + y);
  };

  return (
    // <DndContext onDragEnd={handleDragEnd}>
    <Stack
      width="600px"
      height="600px"
      position="relative"
      bgcolor="rgba(255,255,255,0.8)"
    >
      <Draggable
        id="draggable"
        x={finalX}
        y={finalY}
        translationCallback={(x, y) => {
          setX(x);
          setY(y);
        }}
      >
        <AstroImage />
      </Draggable>
    </Stack>
    // </DndContext>
  );
};

export default Canvas;
