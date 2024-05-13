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
  belowButtonsElement?: React.ReactNode;
  copyCallback?: () => void;
  editingCallback?: () => void;
  editingEnabled?: boolean;
  deletionCallback?: () => void;
  backCallback?: () => void;
  backText?: string;
  backRoute?: string;
  backgroundColor?: string;
  cardBackgroundColor?: string;
}) => {
  const router = useRouter();
  const userDetails = useUserContext();
  const notificationCtx = useContext(NotificationContext);
  return (
    <Stack
      px="20px"
      pt="20px"
      spacing="22px"
      overflow="scroll"
      flex={1}
      bgcolor={
        props.backgroundColor ||
        (userDetails?.user?.id &&
        props?.creatorId &&
        userDetails.user.id === props.creatorId
          ? PALETTE.secondary.grey[1]
          : undefined)
      }
    >
      <Stack
        spacing="12px"
        bgcolor={props.cardBackgroundColor || "rgb(255,255,255)"}
        borderRadius="16px 16px 0 0"
        p="12px"
        pb="24px"
        flex={1}
        minHeight="fit-content"
        boxSizing="border-box"
        boxShadow="0 0 14px rgba(0,0,0,0.05)"
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
            onClick={
              props.backCallback ||
              (() =>
                router.push(
                  props.backRoute ||
                    (props.lessonId
                      ? `/lesson/${props.lessonId}`
                      : userDetails
                      ? "/dashboard"
                      : "/")
                ))
            }
          >
            <ChevronLeft width="20px" height="20px" />
            <Typography>{props.backText || "Back to Dashboard"}</Typography>
          </Stack>

          <Stack direction="row" spacing="8px">
            {props.editingCallback &&
            props.deletionCallback &&
            userDetails?.user?.id &&
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
              onClick={
                props.copyCallback ||
                (() => {
                  navigator.clipboard.writeText(window.location.href);
                  notificationCtx.success("Copied URL to clipboard.");
                })
              }
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
        {props.belowButtonsElement}
        <Stack pt="60px" pb="22px">
          <Stack
            direction="row"
            spacing="12px"
            sx={{
              svg: {
                path: {
                  fill: PALETTE.secondary.grey[4],
                },
              },
            }}
            alignItems="center"
          >
            <Typography htmlTag="h1" variant="large" bold>
              {props.title}
            </Typography>
            {props.editingEnabled ? (
              <Stack
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.6 },
                  transition: "0.2s",
                }}
                onClick={props.editingCallback}
                zIndex={5}
              >
                <PencilIcon width="18px" height="18px" />
              </Stack>
            ) : null}
          </Stack>
          {props.description ? (
            <Stack
              direction="row"
              spacing="12px"
              sx={{
                svg: {
                  path: {
                    fill: PALETTE.secondary.grey[4],
                  },
                },
              }}
              alignItems="center"
            >
              <Typography htmlTag="h2" variant="small">
                {props.description}
              </Typography>
              {props.editingEnabled ? (
                <Stack
                  sx={{
                    cursor: "pointer",
                    "&:hover": { opacity: 0.6 },
                    transition: "0.2s",
                  }}
                  onClick={props.editingCallback}
                  zIndex={5}
                >
                  <PencilIcon width="14px" height="14px" />
                </Stack>
              ) : null}
            </Stack>
          ) : null}
        </Stack>
        {props.children}
      </Stack>
    </Stack>
  );
};

export default MobilePageCard;
