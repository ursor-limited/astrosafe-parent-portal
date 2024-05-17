import { Stack, alpha } from "@mui/system";
import Image from "next/image";
import TimelineCard from "./TimelineCard";
import DeletionDialog from "@/app/components/DeletionDialog";
import { useContext, useEffect, useRef, useState } from "react";
import ApiController from "@/app/api";
import NotificationContext from "@/app/components/NotificationContext";
import { CONTENT_BRANDING } from "@/app/dashboard/DashboardPageContents";
import { ILink } from "@/app/dashboard/LinkDialog";
import { useRouter } from "next/navigation";
import { getPrefixRemovedUrl } from "@/app/components/LinkCard";
import { IText } from "@/app/components/TextDialog";
import { PALETTE } from "ui";
import CopyAndMoveDialog from "../CopyAndMoveDialog";

const WIDTH_RATIO = 0.94;

export const TextPreview = (props: { value: string }) => (
  <div
    key={new Date().getTime()} // needed because React does not automatically rerender dangerouslySetInnerHTML
    className="view ql-editor"
    dangerouslySetInnerHTML={{
      __html: props.value,
    }}
    style={{
      overflowWrap: "anywhere",
      color: PALETTE.font.dark,
    }}
  />
);

const TimelineTextCard = (
  props: IText & {
    lessonId: string;
    setHeight?: (height: number) => void;
    editingCallback?: () => void;
    deletionCallback?: () => void;
    duplicationCallback?: () => void;
    onDragStart?: () => void;
    dragging?: boolean;
    columnWidth?: number;
    expanded?: boolean;
    noButtons?: boolean;
    expansionCallback?: () => void;
  }
) => {
  const notificationCtx = useContext(NotificationContext);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
  const submitDeletion = () =>
    ApiController.deleteText(props.id)
      .then(props.deletionCallback)
      .then(() => notificationCtx.negativeSuccess("Deleted Text."));

  const submitDuplication = () =>
    ApiController.duplicateText(props.id, props.lessonId)
      .then(props.duplicationCallback)
      .then(() => notificationCtx.success("Duplicated Text."));

  const textRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    var quillValue = document.createElement("div");
    quillValue.innerHTML = props.value;
    quillValue.className = "view ql-editor";
    while (textRef.current?.firstChild) {
      textRef.current?.removeChild(textRef.current.firstChild);
    }
    textRef.current?.appendChild(quillValue);
  }, [props.value]);

  const [copyDialogOpen, setCopyDialogOpen] = useState<boolean>(false);

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
        copyAndMoveCallback={() => setCopyDialogOpen(true)}
        duplicationCallback={submitDuplication}
        width={props.columnWidth ? WIDTH_RATIO * props.columnWidth : undefined}
        creatorId={props.creatorId}
        expanded={props.expanded}
        expansionCallback={props.expansionCallback}
        noButtons={props.noButtons}
      >
        <Stack
          sx={{
            ".ql-container": {
              fontFamily: "unset",
              borderRadius: "12px",
              height: "unset",
              border: "none !important",
            },
            ".ql-editor": {
              padding: "3px",
              ".ql-size-large": { fontSize: "20px" },
              ".ql-size-medium": { fontSize: "16px" },
              ".ql-size-small": { fontSize: "14px" },
            },
            overflowWrap: "anywhere",
            color: PALETTE.font.dark,
          }}
          px="4px"
        >
          <div ref={textRef} />
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
      {copyDialogOpen && props.id ? (
        <CopyAndMoveDialog
          id={props.id}
          open={copyDialogOpen}
          closeCallback={() => setCopyDialogOpen(false)}
        />
      ) : null}
    </>
  );
};

export default TimelineTextCard;
