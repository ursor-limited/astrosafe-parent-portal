import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import GrabberIcon from "@/images/icons/GrabberIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import useOrangeBorder from "@/app/components/useOrangeBorder";
import { useEffect, useState } from "react";
import UrsorActionButton from "@/app/components/UrsorActionButton";

const TimelineCard = (props: {
  id: string;
  title?: string;
  description?: string;
  updatedAt: string;
  setHeight?: (height: number) => void;
  onDragStart?: () => void;
  dragging?: boolean;
  color: string;
  editingCallback?: () => void;
  deletionCallback?: () => void;

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
      boxShadow="0 0 20px rgba(0,0,0,0.08)"
      bgcolor="rgb(255,255,255)"
      overflow="hidden"
      sx={{
        //pointerEvents: props.dragging ? "none" : undefined,
        outline: orangeBorderOn
          ? `3px solid ${PALETTE.system.orange}`
          : undefined,
      }}
    >
      <Stack flex={1} bgcolor={props.color} p="8px" pt={0}>
        <Stack direction="row" width="100%" height="48px">
          <Stack
            width="100%"
            alignItems="center"
            justifyContent="center"
            sx={{
              cursor: props.dragging ? "grabbing" : "grab",
              svg: {
                transform: "rotate(90deg)",
              },
            }}
            onMouseDown={props.onDragStart}
          >
            <GrabberIcon width="20px" height="20px" />
          </Stack>
          <Stack
            position="relative"
            width={0}
            overflow="visible"
            justifyContent="center"
          >
            <Stack position="absolute" right={0}>
              <UrsorActionButton
                size="32px"
                iconSize="16px"
                shadow
                actions={[
                  {
                    text: "Edit",
                    kallback: () => props.editingCallback?.(),
                    icon: PencilIcon,
                  },
                  {
                    text: "Delete",
                    kallback: () => props.deletionCallback?.(),
                    icon: TrashcanIcon,
                    color: PALETTE.system.red,
                  },
                ]}
              />
            </Stack>
          </Stack>
        </Stack>

        <Stack borderRadius="8px" overflow="hidden">
          {props.children}
        </Stack>
        {props.title || props.description ? (
          <Stack
            flex={1}
            justifyContent="space-between"
            px="4px"
            pt="11px"
            pb="4px"
          >
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
    </Stack>
  );
};

export default TimelineCard;
