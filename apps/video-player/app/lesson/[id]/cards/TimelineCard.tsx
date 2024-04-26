import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import GrabberIcon from "@/images/icons/GrabberIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import DuplicateIcon from "@/images/icons/DuplicateIcon.svg";
import useOrangeBorder from "@/app/components/useOrangeBorder";
import { useEffect, useState } from "react";
import UrsorActionButton from "@/app/components/UrsorActionButton";
import { useUserContext } from "@/app/components/UserContext";

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
  duplicationCallback?: () => void;
  width: number;
  children: React.ReactNode;
}) => {
  const orangeBorderOn = useOrangeBorder(props.updatedAt);

  const [ref, setRef] = useState<HTMLElement | null>(null);
  useEffect(
    () => props.setHeight?.(ref?.getBoundingClientRect?.()?.height ?? 0),
    [ref?.getBoundingClientRect?.()?.height]
  );

  const userDetails = useUserContext().user;

  return (
    <Stack
      id={props.id}
      ref={setRef}
      borderRadius="12px"
      //boxShadow="0 0 20px rgba(0,0,0,0.08)"
      bgcolor={PALETTE.secondary.grey[1]}
      overflow="hidden"
      sx={{
        //pointerEvents: props.dragging ? "none" : undefined,
        outline: orangeBorderOn
          ? `3px solid ${PALETTE.system.orange}`
          : undefined,
      }}
      width={props.width}
    >
      <Stack flex={1} p="8px" pt={userDetails ? 0 : undefined}>
        {userDetails ? (
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
              onMouseDown={(e) => {
                props.onDragStart?.();
                e.preventDefault();
              }}
            >
              <GrabberIcon width="20px" height="20px" />
            </Stack>

            <Stack
              position="relative"
              width={0}
              overflow="visible"
              justifyContent="center"
            >
              <Stack
                position="absolute"
                right={0}
                direction="row"
                spacing="8px"
              >
                <Stack
                  height="32px"
                  width="32px"
                  //border={`2px solid ${PALETTE.primary.navy}`}
                  bgcolor="rgb(255,255,255)"
                  borderRadius="100%"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    "&:hover": { opacity: 0.7 },
                    transition: "0.2s",
                    cursor: "pointer",
                  }}
                  onClick={props.duplicationCallback}
                >
                  <DuplicateIcon height="22px" width="22px" />
                </Stack>
                <UrsorActionButton
                  size="32px"
                  iconSize="16px"
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
        ) : null}

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
                color={PALETTE.secondary.grey[5]}
              >
                {props.title}
              </Typography>
            ) : null}
            {props.description ? (
              <Typography variant="medium" color={PALETTE.secondary.grey[5]}>
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
