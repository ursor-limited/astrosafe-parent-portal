import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import ShareIcon from "@/images/icons/ShareIcon2.svg";
import { useRouter } from "next/navigation";
import { useUserContext } from "../components/UserContext";
import UrsorActionButton from "../components/UrsorActionButton";
import NotificationContext from "../components/NotificationContext";
import { useContext } from "react";

// video?.creatorId

// () => setEditingDialogOpen(true)

// () => setDeletionDialogOpen(true)

const MobilePageCard = (props: {
  children: React.ReactNode;
  lessonId?: string;
  creatorId?: string;
  title: string;
  description?: string;
  editingCallback?: () => void;
  deletionCallback?: () => void;
}) => {
  const router = useRouter();
  const userDetails = useUserContext();
  const notificationCtx = useContext(NotificationContext);
  return (
    <Stack p="20px" spacing="22px" overflow="scroll" flex={1}>
      <Stack
        spacing="12px"
        bgcolor="rgb(255,255,255)"
        borderRadius="16px"
        p="12px"
        boxSizing="border-box"
      >
        <Stack direction="row" justifyContent="space-between">
          <Stack
            direction="row"
            alignItems="center"
            spacing="3px"
            sx={{
              cursor: "pointer",
              "&:hover": { opacity: 0.7 },
              transition: "0.2s",
            }}
            onClick={() =>
              router.push(
                props.lessonId
                  ? `/lesson/${props.lessonId}`
                  : userDetails
                  ? "/dashboard"
                  : "/"
              )
            }
          >
            <ChevronLeft width="20px" height="20px" />
            <Typography>
              {props.lessonId ? "Back to Lesson" : "Back to Home"}
            </Typography>
          </Stack>
          <Stack direction="row" spacing="8px">
            {userDetails?.user?.id &&
            userDetails?.user?.id === props.creatorId ? (
              <UrsorActionButton
                size="32px"
                iconSize="16px"
                border
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
            ) : null}

            <Stack
              boxSizing="border-box"
              borderRadius="100%"
              //border={`2px solid ${PALETTE.primary.navy}`}
              bgcolor={PALETTE.secondary.purple[2]}
              height="32px"
              width="32px"
              justifyContent="center"
              alignItems="center"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                notificationCtx.success("Copied URL to clipboard.");
              }}
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.6 },
                transition: "0.2s",
                svg: {
                  path: {
                    fill: "rgb(255,255,255)",
                  },
                },
              }}
            >
              <ShareIcon width="16px" height="16px" />
            </Stack>
          </Stack>
        </Stack>
        <Stack pt="60px" pb="22px">
          <Typography htmlTag="h1" variant="medium" bold>
            {props.title}
          </Typography>
          {props.description ? (
            <Typography htmlTag="h2" variant="small">
              {props.description}
            </Typography>
          ) : null}
        </Stack>
        {props.children}
      </Stack>
    </Stack>
  );
};

export default MobilePageCard;
