import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import TextEditorToolbar, {
  getModules,
  formats,
} from "../components/TextEditorToolBar";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.core.css";

const ReactQuill = dynamic(
  () => import("react-quill"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const AstroText = (props: {
  id: string;
  value: string;
  valueChangeCallback: (value: string) => void;
  preview?: boolean;
}) => {
  // const [value, setValue] = useState<string>("");
  // useE
  //useEffect(() => setValue(props.value), [props.value]);
  return (
    <Stack
      sx={{
        ".ql-container": {
          fontFamily: "unset",
          borderRadius: "12px",
          height: "unset",
          border: "none !important",
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
          dangerouslySetInnerHTML={{ __html: props.value }}
        />
      ) : (
        <Stack>
          <TextEditorToolbar id={props.id} />
          <ReactQuill
            theme="snow"
            value={props.value}
            onChange={(v) => {
              props.valueChangeCallback(v);
            }}
            modules={getModules(props.id)}
            formats={formats}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default AstroText;
