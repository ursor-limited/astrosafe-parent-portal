import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import GrabberIcon from "@/images/icons/GrabberIcon.svg";
import useOrangeBorder from "@/app/components/useOrangeBorder";
import { useEffect, useState } from "react";

const LessonCard = (props: {
  id: string;
  title?: string;
  description?: string;
  updatedAt: string;
  setHeight?: (height: number) => void;
  onDragStart?: () => void;
  dragging?: boolean;
  children: React.ReactNode;
}) => {
  const orangeBorderOn = useOrangeBorder(props.updatedAt);

  const [ref, setRef] = useState<HTMLElement | null>(null);
  useEffect(
    () => props.setHeight?.(ref?.getBoundingClientRect?.()?.height ?? 0),
    [ref?.getBoundingClientRect?.()?.height]
  );

  return (
    <Stack
      id={props.id}
      ref={setRef}
      borderRadius="12px"
      p="8px"
      pt={0}
      boxShadow="0 0 20px rgba(0,0,0,0.08)"
      onMouseDown={props.onDragStart}
      bgcolor="rgb(255,255,255)"
      sx={{
        //pointerEvents: props.dragging ? "none" : undefined,
        outline: orangeBorderOn
          ? `3px solid ${PALETTE.system.orange}`
          : undefined,
      }}
    >
      <Stack
        height="48px"
        alignItems="center"
        justifyContent="center"
        sx={{
          cursor: props.dragging ? "grabbing" : "grab",
          svg: {
            transform: "rotate(90deg)",
          },
        }}
      >
        <GrabberIcon width="20px" height="20px" />
      </Stack>
      <Stack borderRadius="8px" overflow="hidden">
        {props.children}
      </Stack>
      {props.title || props.description ? (
        <Stack flex={1} justifyContent="space-between" px="4px" py="8px">
          {props.title ? (
            <Typography
              variant="medium"
              bold
              maxLines={2}
              color={PALETTE.secondary.grey[5]}
            >
              {props.title}
            </Typography>
          ) : null}
          {props.description ? (
            <Typography
              variant="medium"
              maxLines={2}
              color={PALETTE.secondary.grey[5]}
            >
              {props.description}
            </Typography>
          ) : null}
        </Stack>
      ) : null}
    </Stack>
  );
};

export default LessonCard;
