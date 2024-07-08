import { Stack } from "@mui/system";
import ContentCreationDialog from "./ContentCreationDialog";
import VideoCard from "./VideoCard";
import { useState } from "react";

const VideoCreationDialog = (props: { open: boolean; onClose: () => void }) => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  return (
    <ContentCreationDialog
      open={props.open}
      closeCallback={props.onClose}
      creationCallback={() => null}
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
          type="video"
          title={title}
          url={url}
          imgUrl=""
          cardColor=""
          onClick={() => null}
          noPointerEvents
        />
      </Stack>
    </ContentCreationDialog>
  );
};

export default VideoCreationDialog;
