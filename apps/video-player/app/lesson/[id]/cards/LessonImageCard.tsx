import { Stack } from "@mui/system";
import Image from "next/image";
import LessonCard from "./LessonCard";
import { IImage } from "@/app/dashboard/ImageDialog";
import DeletionDialog from "@/app/components/DeletionDialog";
import { useContext, useState } from "react";
import ApiController from "@/app/api";
import NotificationContext from "@/app/components/NotificationContext";

const LessonImageCard = (
  props: IImage & {
    setHeight?: (height: number) => void;
    editingCallback?: () => void;
    deletionCallback?: () => void;
    onDragStart?: () => void;
    dragging?: boolean;
    noFooter?: boolean;
  }
) => {
  const notificationCtx = useContext(NotificationContext);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
  const submitDeletion = () =>
    ApiController.deleteImage(props.id)
      .then(props.deletionCallback)
      .then(() => notificationCtx.negativeSuccess("Deleted Image."));
  return (
    <>
      <LessonCard
        id={props.id}
        title={props.title}
        description={props.description}
        setHeight={props.setHeight}
        updatedAt={props.updatedAt}
        onDragStart={props.onDragStart}
        dragging={props.dragging}
        deletionCallback={() => setDeletionDialogOpen(true)}
        editingCallback={props.editingCallback}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          p="12px"
          height="363px"
          width="100%"
          overflow="hidden"
          position="relative"
        >
          <Image
            src={props.url}
            fill
            style={{ objectFit: "cover" }}
            alt="image!"
          />
        </Stack>
      </LessonCard>
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

export default LessonImageCard;
