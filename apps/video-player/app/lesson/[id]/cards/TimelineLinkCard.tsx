import { Stack, alpha } from "@mui/system";
import Image from "next/image";
import TimelineCard from "./TimelineCard";
import DeletionDialog from "@/app/components/DeletionDialog";
import { useContext, useState } from "react";
import ApiController from "@/app/api";
import NotificationContext from "@/app/components/NotificationContext";
import { CONTENT_BRANDING } from "@/app/dashboard/DashboardPageContents";
import { ILink } from "@/app/dashboard/LinkDialog";
import { useRouter } from "next/navigation";
import { getPrefixRemovedUrl } from "@/app/components/LinkCard";
import ArrowUpRightIcon from "@/images/icons/ArrowUpRight.svg";
import { PALETTE } from "ui";
import Link from "next/link";

const WIDTH_RATIO = 0.65;

const TimelineLinkCard = (
  props: ILink & {
    lessonId: string;
    setHeight?: (height: number) => void;
    editingCallback?: () => void;
    deletionCallback?: () => void;
    duplicationCallback?: () => void;
    onDragStart?: () => void;
    dragging?: boolean;
    columnWidth: number;
    expanded?: boolean;
    expansionCallback?: () => void;
  }
) => {
  const notificationCtx = useContext(NotificationContext);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
  const submitDeletion = () =>
    ApiController.deleteLink(props.id)
      .then(props.deletionCallback)
      .then(() => notificationCtx.negativeSuccess("Deleted Link."));

  const submitDuplication = () =>
    ApiController.duplicateLink(props.id, props.lessonId)
      .then(props.duplicationCallback)
      .then(() => notificationCtx.success("Duplicated Link."));

  const router = useRouter();
  return (
    <>
      <TimelineCard
        id={props.id}
        title={props.title}
        description={props.description}
        setHeight={props.setHeight}
        updatedAt={props.updatedAt}
        color={alpha(CONTENT_BRANDING.link.color, 0.12)}
        onDragStart={props.onDragStart}
        dragging={props.dragging}
        deletionCallback={() => setDeletionDialogOpen(true)}
        editingCallback={props.editingCallback}
        duplicationCallback={submitDuplication}
        width={WIDTH_RATIO * props.columnWidth}
        creatorId={props.creatorId}
        expanded={props.expanded}
        expansionCallback={props.expansionCallback}
      >
        <Link
          href={`https://${getPrefixRemovedUrl(props.url)}`}
          target="_blank"
          rel="nofollow"
          style={{
            textDecoration: "none",
          }}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            height="350px"
            width="100%"
            overflow="hidden"
            position="relative"
            sx={{
              cursor: "pointer",
              "&:hover": { opacity: 0.6 },
              transition: "0.2s",
            }}
          >
            <Stack
              width="100%"
              height="100%"
              sx={{
                backgroundColor: "rgba(255,255,255,0.15)",
                backgroundImage: `url(${props.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxSizing: "border-box",
                svg: {
                  path: {
                    fill: PALETTE.font.light,
                  },
                },
              }}
              position="relative"
            >
              <Stack
                flex={1}
                bgcolor="rgba(0,0,0,0.4)"
                justifyContent="center"
                alignItems="center"
                sx={{
                  background: "rgba(0,0,0,0.25)",
                  // "radial-gradient(circle at center, rgba(0,0,0,0.27) 0, rgba(0,0,0,0) 80%)",
                }}
              >
                <ArrowUpRightIcon height="62px" width="62px" />
              </Stack>
            </Stack>
          </Stack>
        </Link>
      </TimelineCard>
      {deletionDialogOpen ? (
        <DeletionDialog
          open={deletionDialogOpen}
          closeCallback={() => setDeletionDialogOpen(false)}
          deletionCallback={submitDeletion}
          category="Image"
          title={props.title}
        />
      ) : null}
    </>
  );
};

export default TimelineLinkCard;
