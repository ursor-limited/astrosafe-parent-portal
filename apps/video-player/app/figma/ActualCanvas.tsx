import { Stack } from "@mui/system";
import AstroText from "./AstroText";
import AstroImage from "./AstroImage";
import { IAstroCanvasElement } from "./Canvas";

export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 600;

const DUMMY_IMAGE_URL =
  "https://images.aeonmedia.co/images/8eac4719-7f56-4d0a-9a32-aae431c8ca07/built-ecologies-emilio-ambasz-landscape-2-v2.jpg?width=828&quality=75&format=auto";

const ActualCanvas = (props: {
  elements: IAstroCanvasElement[];
  setSelectedElement: (id?: string) => void;
  selectedElement?: string;
  changeCallback?: (elements: IAstroCanvasElement[]) => void;
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
            url={DUMMY_IMAGE_URL}
            selectionCallback={() => {
              props.setSelectedElement(e.id);
              //setSelectedTextId(undefined);
            }}
            selected={e.id === props.selectedElement}
          />
        ) : (
          <AstroText
            key={e.id}
            details={e}
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
