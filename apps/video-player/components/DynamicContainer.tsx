import React from "react";
import { Box } from "@mui/system";
import { useRef } from "react";
import { useResizeObserver } from "./useResizeObserver";

export interface IDynamicContainerProps {
  width?: string;
  duration?: number;
  children: React.ReactNode;
}

/* from https://dev.to/anxiny/dynamic-dimension-react-container-with-transition-effect-part-2-resize-observer-5h18 */
export default function DynamicContainer(props: IDynamicContainerProps) {
  const content = useRef(null);
  const rect = useResizeObserver(content);

  return (
    <Box
      style={{
        transition: `${props.duration || 600}ms`,
        height: `${rect?.height}px`,
        width: props.width ?? "100%",
        overflow: "hidden",
      }}
    >
      <Box
        ref={content}
        style={{
          width: props.width ?? "100%",
          height: "fit-content",
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}
