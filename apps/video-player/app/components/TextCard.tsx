import React, { useContext, useEffect, useState } from "react";
import { Stack, alpha } from "@mui/system";
import dayjs from "dayjs";
import { PALETTE, Typography } from "ui";
import { useRouter } from "next/navigation";
import { ILink } from "../dashboard/LinkDialog";
import { getFormattedDate } from "./VideoCard";
import TypographyIcon from "@/images/icons/TypographyIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import UrsorActionButton from "./UrsorActionButton";
import DeletionDialog from "./DeletionDialog";
import ApiController from "../api";
import NotificationContext from "./NotificationContext";
import { IText } from "./TextDialog";
import "react-quill/dist/quill.core.css";
import { CONTENT_BRANDING } from "../dashboard/DashboardPageContents";
import useOrangeBorder from "./useOrangeBorder";

const TextPreview = (props: { value: string }) => (
  <div
    key={new Date().getTime()}
    className="view ql-editor"
    dangerouslySetInnerHTML={{
      __html: props.value,
    }}
    style={{ overflowWrap: "anywhere" }}
  />
);

const TextCard = (
  props: IText & {
    setHeight?: (height: number) => void;
    clickCallback?: () => void;
    editCallback?: () => void;
    deleteCallback?: () => void;
    duplicateCallback?: () => void;
  }
) => {
  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  const notificationCtx = React.useContext(NotificationContext);

  const submitDeletion = () =>
    ApiController.deleteText(props.id)
      .then(props.deleteCallback)
      .then(() => notificationCtx.negativeSuccess("Deleted Text."));

  const orangeBorderOn = useOrangeBorder(props.updatedAt);

  const [ref, setRef] = useState<HTMLElement | null>(null);
  useEffect(
    () => props.setHeight?.(ref?.getBoundingClientRect?.()?.height ?? 0),
    [ref?.getBoundingClientRect?.()?.height]
  );

  return (
    <>
      <Stack
        ref={setRef}
        borderRadius="12px"
        bgcolor={alpha(CONTENT_BRANDING.text.color, 0.12)}
        p="4px"
        overflow="hidden"
        sx={{
          backdropFilter: "blur(4px)",
          outline: orangeBorderOn
            ? `3px solid ${PALETTE.system.orange}`
            : undefined,
        }}
        position="relative"
        //boxShadow="0 0 20px rgba(0,0,0,0.08)"
        pb="6px"
        pt="50px"
      >
        <Stack position="absolute" top="16px" right="16px" zIndex={2}>
          <UrsorActionButton
            size="32px"
            iconSize="16px"
            shadow
            actions={[
              {
                text: "Edit",
                kallback: () => props.editCallback?.(),
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
        >
          <TextPreview value={props.value} />
        </Stack>

        {/* <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            svg: {
              path: {
                fill: CONTENT_BRANDING.text.color,
              },
            },
          }}
        >
          <Typography color={PALETTE.secondary.grey[5]} variant="small">
            {getFormattedDate(props.createdAt)}
          </Typography>
          <TypographyIcon height="20px" width="20px" />
        </Stack> */}
      </Stack>
      <DeletionDialog
        open={deletionDialogOpen}
        closeCallback={() => setDeletionDialogOpen(false)}
        deletionCallback={submitDeletion}
        category="Text"
      />
    </>
  );
};

export default TextCard;
