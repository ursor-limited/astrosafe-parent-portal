import { Stack } from "@mui/system";
import { createElement, useEffect, useRef } from "react";

const HoverCard = (props: {
  y: number;
  x: number;
  element: HTMLElement;
  width: number;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    while (ref.current?.firstChild) {
      ref.current?.removeChild(ref.current.firstChild);
    }
    ref.current?.appendChild(props.element.cloneNode(true));
  }, [props.element]);
  return (
    <Stack position="absolute" top={props.y} left={props.x}>
      <div ref={ref} style={{ width: `${props.width}px` }} />
    </Stack>
  );
};

export default HoverCard;
