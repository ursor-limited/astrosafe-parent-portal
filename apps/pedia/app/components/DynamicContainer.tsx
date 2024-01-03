import React from "react";
import { Box } from "@mui/system";
import { useRef } from "react";
import { useResizeObserver } from "./useResizeObserver";

export interface IDynamicContainerProps {
  duration: number; // ms
  children: React.ReactNode;
}

/* from https://dev.to/anxiny/dynamic-dimension-react-container-with-transition-effect-part-2-resize-observer-5h18 */
export default function DynamicContainer(props: IDynamicContainerProps) {
  const content = useRef(null);
  const rect = useResizeObserver(content);

  return (
    <Box
      style={{
        transition: `${props.duration}ms`,
        height: `${rect?.height}px`,
        width: `${rect?.width}px`,
        overflowY: "hidden",
      }}
    >
      <Box
        ref={content}
        style={{
          width: "fit-content",
          height: "fit-content",
        }}
        overflow="visible"
      >
        {props.children}
      </Box>
    </Box>
  );
}
