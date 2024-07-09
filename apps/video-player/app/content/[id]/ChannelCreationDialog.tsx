import { Stack } from "@mui/system";
import ContentCreationDialog from "./ContentCreationDialog";
import { useState } from "react";
import ChannelCard from "./ChannelCard";

const ChannelCreationDialog = (props: {
  open: boolean;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  return (
    <ContentCreationDialog
      open={props.open}
      closeCallback={props.onClose}
      creationCallback={() => null}
      type="channel"
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
        <ChannelCard
          id={0}
          type="videoChannel"
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

export default ChannelCreationDialog;
