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
import { ORANGE_BORDER_DURATION } from "./WorksheetCard";
import "react-quill/dist/quill.core.css";
import { CONTENT_BRANDING } from "../dashboard/DashboardPageContents";

const TextPreview = (props: { value: string }) => (
  <div
    key={new Date().getTime()}
    className="view ql-editor"
    dangerouslySetInnerHTML={{
      __html: props.value,
    }}
  />
);

const LinkCard = (
  props: IText & {
    clickCallback?: () => void;
    editCallback?: () => void;
    deleteCallback?: () => void;
    duplicateCallback?: () => void;
  }
) => {
  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  const notificationCtx = React.useContext(NotificationContext);

  const [orangeBorderOn, setOrangeBorderOn] = useState<boolean>(false);
  useEffect(() => {
    if (
      -dayjs(props.createdAt).diff(dayjs(), "seconds") < ORANGE_BORDER_DURATION
    ) {
      setOrangeBorderOn(true);
      setTimeout(() => setOrangeBorderOn(false), ORANGE_BORDER_DURATION * 1000);
    }
  }, [props.createdAt]);

  const submitDeletion = () =>
    ApiController.deleteLink(props.id)
      .then(props.deleteCallback)
      .then(() => notificationCtx.negativeSuccess("Deleted Text."));

  return (
    <>
      <Stack
        width="100%"
        borderRadius="12px"
        bgcolor="rgb(255,255,255)"
        p="4px"
        overflow="hidden"
        sx={{
          backdropFilter: "blur(4px)",
          outline: orangeBorderOn
            ? `3px solid ${PALETTE.system.orange}`
            : undefined,
        }}
        position="relative"
        boxShadow="0 0 12px rgba(0,0,0,0.06)"
        pb="12px"
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

        <Stack
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
          <Typography variant="small">
            {getFormattedDate(props.createdAt)}
          </Typography>
          <TypographyIcon height="20px" width="20px" />
        </Stack>
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

export default LinkCard;