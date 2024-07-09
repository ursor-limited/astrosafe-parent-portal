import { Stack } from "@mui/system";
import ContentCreationDialog from "./ContentCreationDialog";
import VideoCard from "./VideoCard";
import { useState } from "react";
import LinkCard from "./LinkCard";
import ApiController from "@/app/api";
import { IContentBucket } from "@/app/devices/[id]/ContentTab";

const LinkCreationDialog = (props: {
  open: boolean;
  onClose: () => void;
  folderId: IContentBucket["id"];
  creationCallback: () => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const submit = () =>
    ApiController.createLink(
      title,
      url,
      "https://ursorassets.s3.eu-west-1.amazonaws.com/signupScreenshot.png",
      props.folderId
    ).then(props.creationCallback);
  return (
    <ContentCreationDialog
      open={props.open}
      closeCallback={props.onClose}
      onSubmit={() => {
        submit();
        props.onClose();
      }}
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
          title={title}
          url={url}
          thumbnailUrl=""
          onClick={() => null}
          noPointerEvents
        />
      </Stack>
    </ContentCreationDialog>
  );
};

export default LinkCreationDialog;
