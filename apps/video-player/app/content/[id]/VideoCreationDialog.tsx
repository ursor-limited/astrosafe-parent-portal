import { Stack } from "@mui/system";
import ContentCreationDialog from "./ContentCreationDialog";
import VideoCard from "./VideoCard";
import { useContext, useEffect, useState } from "react";
import ApiController from "@/app/api";
import { IContentBucket, IVideo } from "@/app/devices/[id]/ContentTab";
import NotificationContext from "@/app/components/NotificationContext";

const VideoCreationDialog = (props: {
  open: boolean;
  onClose: () => void;
  folderId: IContentBucket["id"];
  creationCallback: () => void;
  updateDetails?: {
    video: IVideo;
    callback?: () => void;
  };
}) => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  useEffect(() => {
    props.updateDetails && setTitle(props.updateDetails?.video.title);
    props.updateDetails && setUrl(props.updateDetails?.video.url);
    props.updateDetails &&
      setThumbnailUrl(props.updateDetails?.video.thumbnailUrl);
  }, [props.updateDetails]);

  const notificationCtx = useContext(NotificationContext);

  const submitCreation = () =>
    ApiController.createVideo(
      title,
      url,
      "https://ursorassets.s3.eu-west-1.amazonaws.com/signupScreenshot.png",
      props.folderId
    ).then(props.creationCallback);

  const submitUpdate = () =>
    props.updateDetails?.video.id &&
    ApiController.updateVideo(
      props.updateDetails.video.id,
      title,
      url,
      "https://ursorassets.s3.eu-west-1.amazonaws.com/signupScreenshot.png"
    )
      .then(props.updateDetails?.callback)
      .then(() => notificationCtx.success("Updated Video"));

  return (
    <ContentCreationDialog
      open={props.open}
      closeCallback={props.onClose}
      onSubmit={() => {
        (props.updateDetails?.callback ? submitUpdate : submitCreation)();
        props.onClose();
      }}
      type="video"
      setTitle={setTitle}
      title={title}
      setUrl={setUrl}
      url={url}
    >
      <Stack
        sx={{
          pointerEvents: "none",
        }}
      >
        <VideoCard
          id={0}
          title={title}
          url={url}
          thumbnailUrl={thumbnailUrl}
          onClick={() => null}
          noPointerEvents
        />
      </Stack>
    </ContentCreationDialog>
  );
};

export default VideoCreationDialog;
