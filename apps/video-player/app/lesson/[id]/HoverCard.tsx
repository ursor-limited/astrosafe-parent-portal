import { Stack } from "@mui/system";
import { createElement, useEffect, useRef } from "react";

const HoverCard = (props: {
  y: number;
  x: number;
  element: HTMLElement;
  width: number;
  containerX: number;
  containerWidth: number;
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
      left={props.containerX}
      width={props.containerWidth / 2}
      //left={props.left ? props.x : undefined}
      //right={!props.left ? props.x : undefined}
      zIndex={5}
      height="30px"
      bgcolor="cyan"
    >
      <Stack width="100%" position="relative">
        <div
          ref={ref}
          style={{
            width: `${props.width}px`,
            position: "absolute",
            left: props.x - props.containerX,
          }}
        />
      </Stack>
    </Stack>
  );
};

export default HoverCard;
