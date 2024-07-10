import { Stack } from "@mui/system";
import ContentCreationDialog from "./ContentCreationDialog";
import { useEffect, useState } from "react";
import LinkCard from "./LinkCard";
import ApiController from "@/app/api";
import { IContentBucket, ILink } from "@/app/devices/[id]/ContentTab";

const LinkCreationDialog = (props: {
  open: boolean;
  onClose: () => void;
  folderId: IContentBucket["id"];
  creationCallback: () => void;
  updateDetails?: {
    link: ILink;
    callback?: () => void;
  };
}) => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    props.updateDetails && setTitle(props.updateDetails?.link.title);
    props.updateDetails && setUrl(props.updateDetails?.link.url);
  }, [props.updateDetails]);

  const submitCreation = () =>
    ApiController.createLink(
      title,
      url,
      "https://ursorassets.s3.eu-west-1.amazonaws.com/signupScreenshot.png",
      props.folderId
    ).then(props.creationCallback);

  const submitUpdate = () =>
    props.updateDetails?.link.id &&
    ApiController.updateLink(
      props.updateDetails.link.id,
      title,
      url,
      "https://ursorassets.s3.eu-west-1.amazonaws.com/signupScreenshot.png"
    ).then(props.updateDetails?.callback);

  return (
    <ContentCreationDialog
      open={props.open}
      closeCallback={props.onClose}
      onSubmit={() => {
        (props.updateDetails?.callback ? submitUpdate : submitCreation)();
        props.onClose();
      }}
      type="link"
      editing={!!props.updateDetails}
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
