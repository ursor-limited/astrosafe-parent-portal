import { Stack } from "@mui/system";
import AstroText from "./AstroText";
import AstroImage from "./AstroImage";
import { IAstroCanvasElement } from "./Canvas";

export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 600;

const ActualCanvas = (props: {
  elements: IAstroCanvasElement[];
  setSelectedElement: (id?: string) => void;
  selectedElement?: string;
  changeCallback?: (elements: IAstroCanvasElement[]) => void;
  preview?: boolean;
}) => {
  return (
    <Stack
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      position="relative"
      bgcolor="rgb(255,255,255)"
      overflow="hidden"
    >
      <Stack
        flex={1}
        onClick={() => {
          props.setSelectedElement(undefined);
          //setSelectedTextId(undefined);
        }}
        zIndex={0}
      />
      {props.elements.map((e) =>
        e.type === "image" ? (
          <AstroImage
            key={e.id}
            details={e}
            selectionCallback={() => {
              props.setSelectedElement(e.id);
              //setSelectedTextId(undefined);
            }}
            selected={e.id === props.selectedElement}
            frameChangeCallback={(width, height, x, y) => {
              props.changeCallback?.(
                props.elements.map((el) =>
                  el.id === e.id ? { ...el, width, height, x, y } : el
                )
              );
            }}
          />
        ) : (
          <AstroText
            key={e.id}
            details={e}
            preview={props.preview}
            selectionCallback={() => props.setSelectedElement(e.id)}
            selected={e.id === props.selectedElement}
            frameChangeCallback={(width, x, y) => {
              props.changeCallback?.(
                props.elements.map((el) =>
                  el.id === e.id ? { ...el, width, x, y } : el
                )
              );
            }}
            valueChangeCallback={(value) =>
              props.changeCallback?.(
                props.elements.map((el) =>
                  el.id === e.id ? { ...el, value } : el
                )
              )
            }
          />
        )
      )}
    </Stack>
  );
};

export default ActualCanvas;
