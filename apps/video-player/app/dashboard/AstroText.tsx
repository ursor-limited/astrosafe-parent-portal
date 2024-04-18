import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import TextEditorToolbar, {
  getModules,
  formats,
} from "../components/TextEditorToolBar";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.core.css";
//import ReactQuill from "react-quill";

const ReactQuill = dynamic(
  () => import("react-quill"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const AstroText = (props: {
  id: string;
  value: string;
  valueChangeCallback: (value: string) => void;
  preview?: boolean;
  height?: string;
}) => {
  return (
    <Stack
      width="100%"
      sx={{
        ".ql-container": {
          fontFamily: "unset",
          height: "unset",
          //border: "none !important",
          borderTop: "none",
          borderRadius: "0 0 12px 12px",
        },
        ".ql-editor": {
          padding: "8px",
          height: props.height,
        },
        ".ql-blank": { opacity: 0.7 },
      }}
      // ref={setTextAreaRef}
    >
      {props.preview ? (
        <div
          className="view ql-editor"
          dangerouslySetInnerHTML={{ __html: props.value }}
        />
      ) : (
        <Stack>
          <ReactQuill
            theme="snow"
            value={props.value}
            onChange={(v) => {
              props.valueChangeCallback(v);
            }}
            modules={getModules(props.id)}
            formats={formats}
            placeholder="Write something nice"
          />
        </Stack>
      )}
    </Stack>
  );
};

export default AstroText;
