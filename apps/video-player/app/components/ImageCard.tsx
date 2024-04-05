import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ApiController, { IVideo } from "../api";
import { PALETTE, Typography } from "ui";
import Play from "@/images/play.svg";
import ImageIcon from "@/images/icons/ImageIcon.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import Image from "next/image";
import { ORANGE_BORDER_DURATION } from "./WorksheetCard";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import UrsorActionButton from "./UrsorActionButton";
import DeletionDialog from "./DeletionDialog";
import NotificationContext from "./NotificationContext";
import { IImage } from "../dashboard/ImageDialog";
import { getFormattedDate } from "./VideoCard";
import { CONTENT_BRANDING } from "../dashboard/DashboardPageContents";
dayjs.extend(advancedFormat);

const ImageCard = (
  props: IImage & {
    editingCallback?: () => void;
    deletionCallback?: () => void;
  }
) => {
  const router = useRouter();
  const [currentPageUrl, setCurrentPageUrl] = useState<string | undefined>(
    undefined
  );
  useEffect(() => setCurrentPageUrl(window?.location.href), []);
  const [orangeBorderOn, setOrangeBorderOn] = useState<boolean>(false);
  useEffect(() => {
    if (
      -dayjs(props.createdAt).diff(dayjs(), "seconds") < ORANGE_BORDER_DURATION
    ) {
      setOrangeBorderOn(true);
      setTimeout(() => setOrangeBorderOn(false), ORANGE_BORDER_DURATION * 1000);
    }
  }, [props.createdAt]);

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);

  const notificationCtx = React.useContext(NotificationContext);

  const submitDeletion = () =>
    ApiController.deleteImage(props.id)
      .then(props.deletionCallback)
      .then(() => notificationCtx.negativeSuccess("Deleted Image."));

  return (
    <>
      <Stack
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
      >
        <Stack position="absolute" top="16px" right="16px" zIndex={2}>
          <UrsorActionButton
            size="32px"
            iconSize="16px"
            actions={[
              {
                text: "Edit",
                kallback: () => props.editingCallback?.(),
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
          flex={1}
          spacing="8px"
          sx={{
            "&:hover": { opacity: 0.6 },
            transition: "0.2s",
            cursor: "pointer",
          }}
          onClick={() => props.editingCallback?.()}
          overflow="hidden"
          borderRadius="10px 10px 0 0"
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
          <Stack flex={1} justifyContent="space-between">
            <Typography variant="medium" bold maxLines={2}>
              {props.title}
            </Typography>
            {props.description ? (
              <Stack pb="9px" pt="2px">
                <Typography variant="medium" maxLines={2}>
                  {props.description}
                </Typography>
              </Stack>
            ) : null}
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ svg: { path: { fill: CONTENT_BRANDING.image.color } } }}
            >
              <Typography variant="small">
                {getFormattedDate(props.createdAt)}
              </Typography>
              <ImageIcon height="20px" width="20px" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
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

export default ImageCard;
