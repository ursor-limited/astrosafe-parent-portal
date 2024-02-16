import { Stack } from "@mui/system";
import AstroElementFrame from "./AstroElementFrame";
import { useEffect, useState } from "react";
import { IAstroCanvasElement } from "./Canvas";
import { getModules, formats } from "./TextEditorToolBar";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.core.css";

const ReactQuill = dynamic(
  () => import("react-quill"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export const getNewTextDetails: (
  id: string,
  x: number,
  y: number
) => IAstroCanvasElement = (id, x, y) => ({
  id,
  width: 270,
  x,
  y,
  type: "text",
  value: "",
});

const AstroText = (props: {
  selected: boolean;
  selectionCallback: () => void;
  details: IAstroCanvasElement;
  valueChangeCallback: (value: string) => void;
  frameChangeCallback: (width: number, x: number, y: number) => void;
  preview?: boolean;
}) => {
  const [value, setValue] = useState<string>("");
  useEffect(() => setValue(props.details.value), [props.details.value]);
  console.log(value);
  return (
    <AstroElementFrame
      width={props.details.width}
      x={props.details.x}
      y={props.details.y}
      dynamicHeight
      noVerticalResizing
      selectionCallback={props.selectionCallback}
      selected={props.selected}
      changeCallback={(width, height, x, y) => {
        props.frameChangeCallback(width, x, y);
      }}
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
        // ref={setTextAreaRef}
      >
        {props.preview ? (
          <div
            className="view ql-editor"
            dangerouslySetInnerHTML={{ __html: value }}
          ></div>
        ) : (
          <ReactQuill
            theme="snow"
            value={value}
            onChange={(v) => {
              setValue(v);
              props.valueChangeCallback(v);
            }}
            modules={getModules(
              props.details.id + props.preview ? "preview" : ""
            )}
            formats={formats}
          />
        )}
      </Stack>
    </AstroElementFrame>
  );
};

export default AstroText;
