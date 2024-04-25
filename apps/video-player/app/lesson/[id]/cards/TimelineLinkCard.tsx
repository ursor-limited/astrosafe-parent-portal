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

const WIDTH_RATIO = 0.65;

const TimelineLinkCard = (
  props: ILink & {
    setHeight?: (height: number) => void;
    editingCallback?: () => void;
    deletionCallback?: () => void;
    onDragStart?: () => void;
    dragging?: boolean;
  }
) => {
  const notificationCtx = useContext(NotificationContext);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
  const submitDeletion = () =>
    ApiController.deleteLink(props.id)
      .then(props.deletionCallback)
      .then(() => notificationCtx.negativeSuccess("Deleted Link."));

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
        widthRatio={WIDTH_RATIO}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          height="350px"
          width="100%"
          overflow="hidden"
          position="relative"
          onClick={() =>
            router.push(`https://${getPrefixRemovedUrl(props.url)}`)
          }
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
            }}
            position="relative"
          />
        </Stack>
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
