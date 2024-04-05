import { useContext, useEffect, useState } from "react";
import { Stack, keyframes } from "@mui/system";
import { ILesson } from "../lesson/[id]/page";
import { PALETTE, Typography } from "ui";
import Star from "@/images/Star.svg";
import VersionsIcon from "@/images/icons/VersionsIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import { getFormattedDate } from "./VideoCard";
import { CONTENT_BRANDING } from "../dashboard/DashboardPageContents";
import UrsorActionButton from "./UrsorActionButton";
import ApiController from "../api";
import NotificationContext from "./NotificationContext";
import DeletionDialog from "./DeletionDialog";

export const spin = keyframes`
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
`;

const LessonCard = (
  props: ILesson & {
    imageUrls: string[];
    clickCallback: () => void;
    editingCallback: () => void;
    deletionCallback: () => void;
  }
) => {
  const notificationCtx = useContext(NotificationContext);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
  const submitDeletion = () =>
    ApiController.deleteLesson(props.id)
      .then(() => notificationCtx.negativeSuccess("Deleted Lesson."))
      .then(props.deletionCallback);
  return (
    <>
      <Stack
        width="100%"
        borderRadius="12px"
        border={`4px solid rgb(255,255,255)`}
        boxSizing="border-box"
        sx={{
          transition: "0.2s",
        }}
        bgcolor="rgb(255,255,255)"
        boxShadow="0 0 12px rgba(0,0,0,0.06)"
        position="relative"
        pb="6px"
      >
        <Stack position="absolute" top="11px" right="11px" zIndex={2}>
          <UrsorActionButton
            size="32px"
            iconSize="16px"
            actions={[
              {
                text: "Edit",
                kallback: props.editingCallback,
                icon: PencilIcon,
              },
              {
                text: "Delete",
                kallback: () => setDeletionDialogOpen(true),
                icon: TrashcanIcon,
                color: PALETTE.system.red,
              },
            ]}
          />
        </Stack>
        <Stack
          flex={1}
          onClick={props.clickCallback}
          sx={{
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { opacity: 0.6 },
          }}
          borderRadius="8px 8px 0 0"
          overflow="hidden"
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
              bgcolor={PALETTE.secondary.orange[4]}
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
                backgroundImage: props.imageUrls[0]
                  ? `url(${props.imageUrls[0]})`
                  : undefined,
              }}
            >
              {!props.imageUrls[0] ? (
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
                bgcolor={PALETTE.secondary.blue[2]}
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
                  backgroundImage: props.imageUrls[1]
                    ? `url(${props.imageUrls[1]})`
                    : undefined,
                }}
              >
                {!props.imageUrls[1] ? (
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
                bgcolor={PALETTE.secondary.green[3]}
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
                  backgroundImage: props.imageUrls[2]
                    ? `url(${props.imageUrls[2]})`
                    : undefined,
                }}
              >
                {!props.imageUrls[2] ? (
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

          <Stack pt="8px" pb="4px" alignItems="space-between" flex={1}>
            <Stack height="45px">
              <Typography bold variant="medium" maxLines={2}>
                {props.title}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ svg: { path: { fill: CONTENT_BRANDING.lesson.color } } }}
          >
            <Typography variant="small">
              {getFormattedDate(props.createdAt)}
            </Typography>
            <VersionsIcon height="20px" width="20px" />
          </Stack>
        </Stack>
      </Stack>
      {/* {deletionDialogOpen ? ( */}
      <DeletionDialog
        open={deletionDialogOpen}
        closeCallback={() => setDeletionDialogOpen(false)}
        deletionCallback={submitDeletion}
        category="Lesson"
        title={props.title}
      />
      {/* ) : null} */}
    </>
  );
};

export default LessonCard;
