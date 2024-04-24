import { Stack, alpha } from "@mui/system";
import Image from "next/image";
import TimelineCard from "./TimelineCard";
import { IImage } from "@/app/dashboard/ImageDialog";
import DeletionDialog from "@/app/components/DeletionDialog";
import { useContext, useState } from "react";
import ApiController from "@/app/api";
import NotificationContext from "@/app/components/NotificationContext";
import { CONTENT_BRANDING } from "@/app/dashboard/DashboardPageContents";
import { ILink } from "@/app/dashboard/LinkDialog";
import { useRouter } from "next/navigation";
import { getPrefixRemovedUrl } from "@/app/components/LinkCard";
import { IText } from "@/app/components/TextDialog";
import { PALETTE } from "ui";

const TextPreview = (props: { value: string }) => (
  <div
    key={new Date().getTime()}
    className="view ql-editor"
    dangerouslySetInnerHTML={{
      __html: props.value,
    }}
    style={{ overflowWrap: "anywhere", color: PALETTE.font.dark }}
  />
);

const TimelineTextCard = (
  props: IText & {
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
    ApiController.deleteText(props.id)
      .then(props.deletionCallback)
      .then(() => notificationCtx.negativeSuccess("Deleted Text."));

  const router = useRouter();
  return (
    <>
      <TimelineCard
        id={props.id}
        setHeight={props.setHeight}
        updatedAt={props.updatedAt}
        color={alpha(CONTENT_BRANDING.text.color, 0.12)}
        onDragStart={props.onDragStart}
        dragging={props.dragging}
        deletionCallback={() => setDeletionDialogOpen(true)}
        editingCallback={props.editingCallback}
      >
        <Stack
          key={new Date().getTime()}
          sx={{
            ".ql-container": {
              fontFamily: "unset",
              borderRadius: "12px",
              height: "unset",
              border: "none !important",
            },
            ".ql-editor": {
              padding: "3px",
            },
          }}
          px="4px"
        >
          <TextPreview value={props.value} />
        </Stack>
      </TimelineCard>
      {deletionDialogOpen ? (
        <DeletionDialog
          open={deletionDialogOpen}
          closeCallback={() => setDeletionDialogOpen(false)}
          deletionCallback={submitDeletion}
          category="Text"
        />
      ) : null}
    </>
  );
};

export default TimelineTextCard;
