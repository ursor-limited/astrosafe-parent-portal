import { Stack } from "@mui/system";
import ContentCreationDialog from "./ContentCreationDialog";
import VideoCard from "./VideoCard";
import { useState } from "react";
import LinkCard from "./LinkCard";

const LinkCreationDialog = (props: { open: boolean; onClose: () => void }) => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  return (
    <ContentCreationDialog
      open={props.open}
      closeCallback={props.onClose}
      creationCallback={() => null}
      type="link"
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
        <LinkCard
          id={0}
          type="link"
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

export default LinkCreationDialog;
