import React from "react";
import { useRef } from "react";
import { useResizeObserver } from "./useResizeObserver";

export interface IDynamicContainerProps {
  duration: number; // ms
  children: React.ReactNode;
  fullWidth?: boolean;
}

/* from https://dev.to/anxiny/dynamic-dimension-react-container-with-transition-effect-part-2-resize-observer-5h18 */
export default function DynamicContainer(props: IDynamicContainerProps) {
  const content = useRef(null);
  const rect = useResizeObserver(content);

  return (
    <div
      style={{
        transition: `${props.duration}ms`,
        height: `${rect?.height}px`,
        width: props.fullWidth ? "100%" : `${rect?.width}px`,
        maxWidth: props.fullWidth ? "100%" : `${rect?.width}px`,
        overflowY: "hidden",
      }}
    >
      <div
        ref={content}
        style={{
          width: props.fullWidth ? "100%" : "fit-content",
          maxWidth: props.fullWidth ? "100%" : "fit-content",
          height: "fit-content",
          overflow: "visible",
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
