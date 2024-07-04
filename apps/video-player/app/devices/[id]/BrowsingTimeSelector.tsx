import { Stack } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { PALETTE, Typography, UrsorButton } from "ui";

const DISPLAY_INTERVAL = 2; // hours
const MIN = 4;
const MAX = 24;
const DRAG_INTERVAL = 0.25; // hours

const BrowsingTimeSelector = () => {
  const [lineRef, setLineRef] = useState<HTMLElement | null>(null);
  const [lineWidth, setLineWidth] = useState<number>(0);
  const [lineLeftX, setLineLeftX] = useState<number>(0);
  useEffect(() => {
    setLineWidth(lineRef?.getBoundingClientRect?.().width ?? 0);
    setLineLeftX(lineRef?.getBoundingClientRect?.().left ?? 0);
  }, [
    lineRef?.getBoundingClientRect?.().width,
    lineRef?.getBoundingClientRect?.().left,
  ]);

  const [mouseX, setMouseX] = useState<number>(0);

  const handleMouseMove = useCallback((event: any) => {
    setMouseX(event.pageX);
  }, []);
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const [draggingDot1, setDraggingDot1] = useState<boolean>(false);
  const [draggingDot2, setDraggingDot2] = useState<boolean>(false);

  const [dot1X, setDot1X] = useState<number>(0);
  const [dot2X, setDot2X] = useState<number>(0);

  const [dragInterval, setDragInterval] = useState<number>(1); // px
  useEffect(
    () => setDragInterval((lineWidth * DRAG_INTERVAL) / (MAX - MIN)),
    [lineWidth]
  );

  useEffect(() => {
    if (draggingDot1) {
      const lineLeftX = lineRef?.getBoundingClientRect?.().left ?? 0;
      const newDotX = Math.max(0, Math.min(lineWidth, mouseX - lineLeftX));
      const lockedEndLineX = Math.round(newDotX / dragInterval) * dragInterval; // the closest interval
      setDot1X(lockedEndLineX);
    }
  }, [draggingDot1, mouseX]);

  useEffect(() => {
    if (draggingDot2) {
      const lineLeftX = lineRef?.getBoundingClientRect?.().left ?? 0;
      const newDotX = Math.max(0, Math.min(lineWidth, mouseX - lineLeftX));
      const lockedEndLineX = Math.round(newDotX / dragInterval) * dragInterval; // the closest interval
      setDot2X(lockedEndLineX);
    }
  }, [draggingDot2, mouseX]);

  const handleDraggingEnd = useCallback(() => {
    setDraggingDot1(false);
    setDraggingDot2(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mouseup", handleDraggingEnd);
    return () => {
      window.removeEventListener("mouseup", handleDraggingEnd);
    };
  }, [handleDraggingEnd]);

  return (
    <Stack width="100%" height="22px">
      <Stack
        width="100%"
        height="4px"
        bgcolor={PALETTE.secondary.grey[2]}
        borderRadius="2px"
        ref={setLineRef}
        position="relative"
      >
        <Stack position="absolute" left={dot1X} zIndex={2}>
          <Stack flex={1} position="relative">
            <Stack
              position="absolute"
              top={0}
              left={0}
              sx={{
                transform: "translate(-50%, -35%)",
                cursor: draggingDot1 ? "grabbing" : "grab",
              }}
              height="14px"
              width="14px"
              bgcolor={PALETTE.secondary.purple[2]}
              borderRadius="100%"
              onMouseDown={(e) => {
                setDraggingDot1(true);
                e.preventDefault();
              }}
            />
          </Stack>
        </Stack>
        <Stack position="absolute" left={dot2X} zIndex={2}>
          <Stack flex={1} position="relative">
            <Stack
              position="absolute"
              top={0}
              left={0}
              sx={{
                transform: "translate(-50%, -35%)",
                cursor: draggingDot2 ? "grabbing" : "grab",
              }}
              height="14px"
              width="14px"
              bgcolor={PALETTE.secondary.purple[2]}
              borderRadius="100%"
              onMouseDown={(e) => {
                setDraggingDot2(true);
                e.preventDefault();
              }}
            />
          </Stack>
        </Stack>
        <Stack
          position="absolute"
          left={Math.min(dot1X, dot2X)}
          width={Math.abs(dot2X - dot1X)}
          bgcolor={PALETTE.secondary.purple[2]}
          height="4px"
          zIndex={2}
        />
        <Stack flex={1} justifyContent="space-between" direction="row">
          {[...Array(1 + (MAX - MIN) / DISPLAY_INTERVAL).keys()].map((i) => (
            <Stack
              key={i}
              height="4px"
              width="2px"
              bgcolor={
                i > 0 && i < (MAX - MIN) / DISPLAY_INTERVAL
                  ? PALETTE.secondary.grey[3]
                  : undefined
              }
              position="relative"
            >
              <Stack
                position="absolute"
                bottom="-20px"
                sx={{ transform: "translateX(-50%)" }}
              >
                <Typography variant="tiny" bold>{`${
                  (MIN + i * DISPLAY_INTERVAL) % 12 || 12
                }:00${
                  MIN + i * DISPLAY_INTERVAL >= 12 ? "pm" : "am"
                }`}</Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BrowsingTimeSelector;
