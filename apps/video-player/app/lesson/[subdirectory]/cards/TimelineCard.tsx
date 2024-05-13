import { Stack, alpha } from "@mui/system";
import { PALETTE, Typography } from "ui";
import GrabberIcon from "@/images/icons/GrabberIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import DuplicateIcon from "@/images/icons/DuplicateIcon.svg";
import ChevronDownIcon from "@/images/icons/ChevronDown.svg";
import ArrowBothIcon from "@/images/icons/ArrowBothIcon.svg";
import useOrangeBorder from "@/app/components/useOrangeBorder";
import { useEffect, useState } from "react";
import UrsorActionButton from "@/app/components/UrsorActionButton";
import { useUserContext } from "@/app/components/UserContext";
import { IVideoComment } from "@/app/api";

const COLLAPSE_HEIGHT_THRESHOLD = 80;
const EXPANDED_HEIGHT = 700;

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
  width?: number;
  expanded?: boolean;
  expansionCallback?: () => void;
  useExpandedHeight?: boolean;
  creatorId: string;
  children: React.ReactNode;
  leftElement?: React.ReactNode;
  comments?: IVideoComment[];
  extraButton?: React.ReactNode;
  noButtons?: boolean;
}) => {
  const orangeBorderOn = useOrangeBorder(props.updatedAt);

  const [ref, setRef] = useState<HTMLElement | null>(null);
  useEffect(
    () => props.setHeight?.(ref?.getBoundingClientRect?.()?.height ?? 0),
    [ref?.getBoundingClientRect?.()?.height]
  );

  const userDetails = useUserContext().user;

  const [descriptionRef, setDescriptionRef] = useState<HTMLElement | null>(
    null
  );
  const [descriptionHeight, setDescriptionHeight] = useState<number>(0);
  useEffect(
    () =>
      setDescriptionHeight(
        descriptionRef?.getBoundingClientRect?.()?.height ?? 0
      ),
    [descriptionRef?.getBoundingClientRect?.()?.height]
  );

  const [descriptionCollapsed, setDescriptionCollapsed] =
    useState<boolean>(true);

  const [hoveringOnDescription, setHoveringOnDescription] =
    useState<boolean>(false);

  return (
    <Stack
      id={props.id}
      ref={setRef}
      borderRadius="12px"
      bgcolor={PALETTE.secondary.grey[1]}
      sx={{
        outline: orangeBorderOn
          ? `3px solid ${PALETTE.system.orange}`
          : undefined,
      }}
      width={props.expanded ? "100%" : props.width || "100%"}
      minHeight={
        props.useExpandedHeight && props.expanded ? EXPANDED_HEIGHT : undefined
      }
    >
      <Stack
        flex={1}
        p="8px"
        pt={userDetails && userDetails.id === props.creatorId ? 0 : undefined}
      >
        {userDetails && userDetails.id === props.creatorId ? (
          <Stack
            direction="row"
            width="100%"
            height="48px"
            justifyContent="space-between"
          >
            <Stack
              position="relative"
              width={0}
              overflow="visible"
              justifyContent="center"
            >
              {props.leftElement}
            </Stack>
            {props.onDragStart ? (
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
                  //e.preventDefault();
                }}
              >
                <GrabberIcon width="20px" height="20px" />
              </Stack>
            ) : null}

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
                {props.expansionCallback ? (
                  <Stack
                    height="32px"
                    width="32px"
                    bgcolor="rgb(255,255,255)"
                    borderRadius="100%"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      "&:hover": { opacity: 0.7 },
                      transition: "0.2s",
                      cursor: "pointer",
                    }}
                    onClick={props.expansionCallback}
                  >
                    <ArrowBothIcon height="18px" width="18px" />
                  </Stack>
                ) : null}
                {!props.noButtons ? (
                  <Stack
                    height="32px"
                    width="32px"
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
                ) : null}
                {props.extraButton}
                {!props.noButtons ? (
                  <UrsorActionButton
                    size="32px"
                    iconSize="16px"
                    actions={[
                      ...(props.editingCallback
                        ? [
                            {
                              text: "Edit",
                              kallback: () => props.editingCallback?.(),
                              icon: PencilIcon,
                            },
                          ]
                        : []),
                      ...(props.deletionCallback
                        ? [
                            {
                              text: "Delete",
                              kallback: () => props.deletionCallback?.(),
                              icon: TrashcanIcon,
                              color: PALETTE.system.red,
                            },
                          ]
                        : []),
                    ]}
                  />
                ) : null}
              </Stack>
            </Stack>
          </Stack>
        ) : null}

        <Stack
          borderRadius="8px"
          overflow="hidden"
          flex={props.expanded ? 1 : undefined}
        >
          {props.children}
        </Stack>
        {props.title || props.description ? (
          <Stack
            flex={props.expanded ? undefined : 1}
            justifyContent="space-between"
            px="4px"
            pt="11px"
            position="relative"
            pb={
              descriptionHeight > COLLAPSE_HEIGHT_THRESHOLD ? "20px" : undefined
            }
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
              <Stack
                ref={setDescriptionRef}
                maxHeight={descriptionCollapsed ? "100px" : undefined}
                overflow="hidden"
                sx={{
                  transition: "0.4s",
                }}
                onMouseEnter={() => {
                  setHoveringOnDescription(true);
                }}
                onMouseLeave={() => {
                  setHoveringOnDescription(false);
                }}
              >
                <Typography variant="medium" color={PALETTE.secondary.grey[5]}>
                  {props.description}
                </Typography>
              </Stack>
            ) : null}

            {descriptionHeight > COLLAPSE_HEIGHT_THRESHOLD ? (
              <Stack
                position="absolute"
                bottom={0}
                width="100%"
                height="80px"
                sx={{
                  opacity: hoveringOnDescription ? 0.9 : 1,
                  cursor: "pointer",
                  transition: "0.2s",
                  background: descriptionCollapsed
                    ? `linear-gradient(0deg,  ${
                        PALETTE.secondary.grey[1]
                      },  ${alpha(PALETTE.secondary.grey[1], 0.84)}, ${alpha(
                        PALETTE.secondary.grey[1],
                        0
                      )})`
                    : undefined,
                  svg: {
                    paddingRight: "4px",
                    transform: `scale(${hoveringOnDescription ? 1.1 : 1})`,
                    transition: "0.25s",
                    path: {
                      fill: PALETTE.secondary.grey[4],
                    },
                  },
                }}
                justifyContent="flex-end"
                alignItems="center"
                onClick={() => setDescriptionCollapsed(!descriptionCollapsed)}
                onMouseEnter={() => {
                  setHoveringOnDescription(true);
                }}
                onMouseLeave={() => {
                  setHoveringOnDescription(false);
                }}
              >
                <Stack
                  sx={{
                    transform: `rotate(${
                      descriptionCollapsed ? 0 : 180
                    }deg) translateY(-3px)`,
                    transition: "0.2s",
                  }}
                >
                  <ChevronDownIcon height="26px" width="26px" />
                </Stack>
              </Stack>
            ) : null}
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  );
};

export default TimelineCard;
