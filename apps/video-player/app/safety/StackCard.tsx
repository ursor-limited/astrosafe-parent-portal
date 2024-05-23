import { useContext, useEffect, useState } from "react";
import PencilIcon from "@/images/icons/Pencil.svg";
import LinkIcon from "@/images/icons/LinkIcon.svg";
import ClippyIcon from "@/images/icons/ClippyIcon.svg";
import ArrowUpRightIcon from "@/images/icons/ArrowUpRight.svg";
import ListUnorderedIcon from "@/images/icons/ListUnorderedIcon.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import Star from "@/images/Star.svg";
import BrowserApiController, { IStack } from "../browserApi";
import { keyframes } from "@emotion/react";
import NotificationContext from "../components/NotificationContext";
import { IActionPopupItem } from "../components/ActionPopup";
import MovingDialog from "./MovingDialog";
import DeletionDialog from "../components/DeletionDialog";
import { DEFAULT_CORNER_RADIUS } from "../components/UrsorPopover";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import UrsorActionButton from "../components/UrsorActionButton";

const STACK_CARD_HEIGHT = "258px";

export const spin = keyframes`
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
`;

const StackCard = (props: {
  stack?: IStack;
  title?: IStack["title"];
  backgroundColors?: IStack["backgroundColors"];
  clickCallback?: () => void;
  editCallback?: () => void;
  updateCallback?: () => void;
  duplicateCallback?: () => void;
  shadow?: boolean;
  noPointerEvents?: boolean;
}) => {
  const notificationCtx = useContext(NotificationContext);
  const [hovering, setHovering] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  useEffect(
    () => setTitle(props.title ?? props.stack?.title ?? ""),
    [props.stack?.title, props.title]
  );
  const actions: IActionPopupItem[] = [
    {
      text: "View",
      icon: ListUnorderedIcon,
      kallback: () => props.clickCallback?.(),
    },
    {
      text: "Edit",
      icon: PencilIcon,
      kallback: () => props.editCallback?.(),
    },
    {
      text: "Duplicate",
      icon: ClippyIcon,
      kallback: () => props.duplicateCallback?.(),
    },
    {
      text: "Move",
      icon: ArrowUpRightIcon,
      kallback: () => setMoveDialogOpen(true),
    },
    // {
    //   text: props.classroom.isArchived ? "Unarchive" : "Archive",
    //   icon: ClockIcon,
    //   kallback: () => archive(props.classroom.isArchived),
    // },
    {
      text: "Delete",
      icon: TrashcanIcon,
      kallback: () => setDeletionDialogOpen(true),
      // dialogCtx.setDeletionDialogProps({
      //   category: "Stack",
      //   title: props.stack?.title ?? "",
      //   open: true,
      //   deletionCallback: () =>
      //     ApiController.deleteStack(props.stack?.id)
      //       .then(dataCtx.refreshStacks)
      //       .then(dataCtx.refreshChannels)
      //       .then(() => notificationCtx.negativeSuccess("Stack deleted")),
      //   closeCallback: () => null,
      color: PALETTE.system.red,
    },
  ];
  const [moveDialogOpen, setMoveDialogOpen] = useState<boolean>(false);
  const [backgroundColors, setBackgroundColors] = useState<
    IStack["backgroundColors"]
  >([]);
  useEffect(() => {
    if (props.stack?.backgroundColors) {
      setBackgroundColors(props.stack?.backgroundColors);
    } else if (props.backgroundColors) {
      setBackgroundColors(props.backgroundColors);
    }
  }, [props.stack?.backgroundColors, props.backgroundColors]);

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
  return (
    <>
      <Stack
        width="100%"
        borderRadius={DEFAULT_CORNER_RADIUS}
        border={`4px solid rgb(255,255,255)`}
        boxSizing="border-box"
        sx={{
          transition: "0.2s",
        }}
        bgcolor="rgb(255,255,255)"
        overflow="hidden"
        boxShadow={props.shadow ? "0 0 23px rgba(0,0,0,0.08)" : undefined}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        position="relative"
      >
        <Stack
          flex={1}
          onClick={props.clickCallback}
          sx={{
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { opacity: 0.6 },
          }}
        >
          <Stack
            height="156px"
            minHeight="156px"
            width="100%"
            direction="row"
            spacing="4px"
          >
            <Stack
              flex={1}
              bgcolor={backgroundColors[0]}
              position="relative"
              justifyContent="center"
              alignItems="center"
              sx={{
                opacity: 0.74,
                svg: {
                  transform: "rotate(26deg)",
                },
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: props.stack?.imageUrls[0]
                  ? `url(${props.stack?.imageUrls[0]})`
                  : undefined,
              }}
            >
              {!props.stack?.imageUrls[0] ? (
                <Stack
                  sx={{
                    animation: `${spin} 9s linear`,
                    animationIterationCount: "infinite",
                  }}
                >
                  <Star height="52px" width="52px" />
                </Stack>
              ) : null}
            </Stack>
            <Stack spacing="4px" width="30%">
              <Stack
                flex={1}
                bgcolor={backgroundColors[1]}
                position="relative"
                justifyContent="center"
                alignItems="center"
                sx={{
                  opacity: 0.74,
                  svg: {
                    transform: "rotate(39deg)",
                  },
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: props.stack?.imageUrls[1]
                    ? `url(${props.stack?.imageUrls[1]})`
                    : undefined,
                }}
              >
                {!props.stack?.imageUrls[1] ? (
                  <Stack
                    sx={{
                      animation: `${spin} 12s linear`,
                      animationDirection: "reverse",
                      animationIterationCount: "infinite",
                    }}
                  >
                    <Star height="20px" width="20px" />
                  </Stack>
                ) : null}
              </Stack>
              <Stack
                flex={1}
                bgcolor={backgroundColors[2]}
                position="relative"
                justifyContent="center"
                alignItems="center"
                sx={{
                  opacity: 0.74,
                  svg: {
                    transform: "rotate(50deg)",
                  },
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: props.stack?.imageUrls[2]
                    ? `url(${props.stack?.imageUrls[2]})`
                    : undefined,
                }}
              >
                {!props.stack?.imageUrls[2] ? (
                  <Stack
                    sx={{
                      animation: `${spin} 4s linear`,
                      animationIterationCount: "infinite",
                    }}
                  >
                    <Star height="20px" width="20px" />
                  </Stack>
                ) : null}
              </Stack>
            </Stack>
          </Stack>
          <Stack px="4px" pt="8px" pb="4px" alignItems="space-between" flex={1}>
            <Stack direction="row" flex={1} overflow="scroll">
              <Typography bold variant="medium">
                {title}
              </Typography>
              <Stack minWidth="25px" />
            </Stack>
            <Stack width="100%" alignItems="flex-end">
              <Stack
                direction="row"
                spacing="5px"
                alignItems="center"
                sx={{
                  svg: {
                    path: {
                      fill: PALETTE.secondary.grey[3],
                    },
                  },
                }}
              >
                <Typography variant="small" color={PALETTE.secondary.grey[3]}>
                  {`${props.stack?.nLinks ?? 0}`}
                </Typography>
                <LinkIcon width="13px" height="13px" />
                {/* <Typography variant="small" color={PALETTE.secondary.grey[3]}>
                    {`Link${
                      !props.stack?.nLinks || props.stack?.nLinks > 1 ? "s" : ""
                    }`}
                  </Typography> */}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        {!props.noPointerEvents ? (
          <Stack
            position="absolute"
            right="10px"
            top="166px"
            sx={{
              //opacity: !props.stack || hovering ? 1 : 0,
              cursor: "pointer",
              "&:hover": { opacity: 0.6 },
              transition: "0.2s",
              pointerEvents: props.stack ? undefined : "none",
            }}
          >
            <UrsorActionButton
              size="16px"
              actions={actions}
              large
              buttonClickCallback={() => setHovering(false)}
            />
          </Stack>
        ) : null}
      </Stack>
      <MovingDialog
        open={moveDialogOpen}
        closeCallback={() => setMoveDialogOpen(false)}
        title={props.stack?.title ?? ""}
        id={props.stack?.id ?? ""}
        category="stack"
        updateCallback={() => props.updateCallback?.()}
      />
      <DeletionDialog
        open={deletionDialogOpen}
        closeCallback={() => setDeletionDialogOpen(false)}
        category="Stack"
        deletionCallback={() =>
          BrowserApiController.deleteStack(props.stack?.id ?? "")
            .then(props.updateCallback)
            .then(() => notificationCtx.negativeSuccess("Stack deleted"))
        }
      />
    </>
  );
};

export default StackCard;
