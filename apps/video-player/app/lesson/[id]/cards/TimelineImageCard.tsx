import { Stack, alpha } from "@mui/system";
import Image from "next/image";
import TimelineCard from "./TimelineCard";
import { IImage } from "@/app/dashboard/ImageDialog";
import DeletionDialog from "@/app/components/DeletionDialog";
import { useContext, useState } from "react";
import ApiController from "@/app/api";
import NotificationContext from "@/app/components/NotificationContext";
import { CONTENT_BRANDING } from "@/app/dashboard/DashboardPageContents";

const WIDTH_RATIO = 0.86;

const TimelineImageCard = (
  props: IImage & {
    lessonId: string;
    setHeight?: (height: number) => void;
    editingCallback?: () => void;
    deletionCallback?: () => void;
    duplicationCallback?: () => void;
    onDragStart?: () => void;
    columnWidth: number;
    dragging?: boolean;
    expanded?: boolean;
    expansionCallback?: () => void;
  }
) => {
  const notificationCtx = useContext(NotificationContext);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
  const submitDeletion = () =>
    ApiController.deleteImage(props.id)
      .then(props.deletionCallback)
      .then(() => notificationCtx.negativeSuccess("Deleted Image."));

  const submitDuplication = () =>
    ApiController.duplicateImage(props.id, props.lessonId)
      .then(props.duplicationCallback)
      .then(() => notificationCtx.success("Duplicated Image."));

  const [aspectRatio, setAspectRatio] = useState(2);

  const [ref, setRef] = useState<HTMLElement | null>(null);

  return (
    <>
      <TimelineCard
        id={props.id}
        title={props.title}
        description={props.description}
        setHeight={props.setHeight}
        updatedAt={props.updatedAt}
        color={alpha(CONTENT_BRANDING.image.color, 0.12)}
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
        <Stack
          ref={setRef}
          alignItems="center"
          justifyContent="center"
          p="12px"
          height={
            ((ref?.getBoundingClientRect?.()?.width ?? 0) - 24) / aspectRatio
          }
          width="100%"
          overflow="hidden"
          position="relative"
        >
          <Image
            src={props.url}
            fill
            style={{ objectFit: "cover" }}
            alt="image!"
            onLoadingComplete={({ naturalWidth, naturalHeight }) => {
              setAspectRatio(naturalWidth / naturalHeight);
            }}
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

export default TimelineImageCard;
