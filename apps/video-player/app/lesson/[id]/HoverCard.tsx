import { Stack } from "@mui/system";
import { createElement, useEffect, useRef } from "react";

const HoverCard = (props: {
  y: number;
  x: number;
  element: HTMLElement;
  width: number;
  left?: boolean;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    while (ref.current?.firstChild) {
      ref.current?.removeChild(ref.current.firstChild);
    }
    ref.current?.appendChild(props.element.cloneNode(true));
  }, [props.element]);
  return (
    <Stack
      position="absolute"
      top={props.y}
      left={props.left ? props.x : undefined}
      right={!props.left ? props.x : undefined}
      zIndex={5}
    >
      <div ref={ref} style={{ width: `${props.width}px` }} />
    </Stack>
  );
};

export default HoverCard;
