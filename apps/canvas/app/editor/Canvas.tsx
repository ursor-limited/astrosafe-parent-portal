"use client";

import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { getNewImageDetails } from "./AstroImage";
import "react-quill/dist/quill.snow.css";
import TypographyIcon from "@/images/icons/TypographyIcon.svg";
import ImageIcon from "@/images/icons/ImageIcon.svg";
import TextEditorToolbar from "./TextEditorToolBar";
import ActualCanvas, { CANVAS_HEIGHT, CANVAS_WIDTH } from "./ActualCanvas";
import ImageSelectionDialog from "./ImageSelectionDialog";
import { getNewTextDetails } from "./AstroText";

const DUMMY_IMAGE_URL =
  "https://c.files.bbci.co.uk/8FEE/production/_127864863_eltonjohn-index-getty.jpg";

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
  changeCallback?: (elements: IAstroCanvasElement[]) => void;
  // textEditorSelectionCallback: (id: string) => void;
  // textEditorDeselectionCallback: () => void;
}) => {
  const [selectedElement, setSelectedElement] = useState<string | undefined>(
    undefined
  );
  const [elements, setElements] = useState<IAstroCanvasElement[] | undefined>(
    undefined
  );
  useEffect(() => elements && props.changeCallback?.(elements), [elements]);
  useEffect(() => {
    (!elements || props.noButtons) &&
      props.elements &&
      setElements(props.elements);
  }, [props.elements]);

  const [imageSelectionDialogOpen, setImageSelectionDialogOpen] =
    useState<boolean>(false);

  const addText = () => {
    elements &&
      setElements([
        ...elements,
        getNewTextDetails(
          `text${elements.length}`,
          CANVAS_WIDTH / 2,
          CANVAS_HEIGHT / 2
        ),
      ]);
    elements && setSelectedElement(`text${elements.length}`);
  };

  const addImage = async (url: string) => {
    elements &&
      setElements([
        ...elements,
        await getNewImageDetails(
          url,
          `image${elements.length}`,
          CANVAS_WIDTH / 2,
          CANVAS_HEIGHT / 2
        ),
      ]);
    elements && setSelectedElement(`image${elements.length}`);
  };

  return (
    <>
      <Stack spacing="12px">
        {!props.noButtons ? (
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing="10px">
              <ElementButton icon={TypographyIcon} callback={addText} />
              <ElementButton
                icon={ImageIcon}
                callback={async () => {
                  setImageSelectionDialogOpen(true);
                }}
              />
            </Stack>
            <Stack position="relative" flex={1}>
              {elements
                ?.filter((e) => e.type === "text")
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
                    <TextEditorToolbar
                      id={e.id + props.noButtons ? "preview" : ""}
                    />
                  </Stack>
                ))}
            </Stack>
          </Stack>
        ) : null}
        <ActualCanvas
          elements={elements || []}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          changeCallback={(e) => setElements(e)}
          preview={props.noButtons}
        />
      </Stack>
      <ImageSelectionDialog
        open={imageSelectionDialogOpen}
        closeCallback={() => setImageSelectionDialogOpen(false)}
        additionCallback={(url) => addImage(url)}
      />
    </>
  );
};

export default Canvas;
