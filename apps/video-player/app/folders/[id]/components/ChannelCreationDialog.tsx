import { Stack } from "@mui/system";
import ContentCreationDialog from "./ContentCreationDialog";
import { useContext, useEffect, useState } from "react";
import ChannelCard from "./ChannelCard";
import { IChannel, IContentBucket } from "@/app/devices/[id]/ContentTab";
import NotificationContext from "@/app/components/NotificationContext";
import ApiController from "@/app/api";
import CheckboxIcon from "@/images/icons/CheckboxIcon.svg";
import EmptyCheckboxIcon from "@/images/icons/EmptyCheckboxIcon.svg";
import { PALETTE, Typography } from "ui";
import InfoButton from "@/app/components/InfoButton";

const ChannelCreationDialog = (props: {
  open: boolean;
  onClose: () => void;
  folderId: IContentBucket["id"];
  creationCallback: () => void;
  updateDetails?: {
    channel: IChannel;
    callback?: () => void;
  };
}) => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [profileUrl, setProfileUrl] = useState<string>(
    "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_profile.jpg"
  );
  const [backgroundUrl, setBackgroundUrl] = useState<string>(
    "https://ursorassets.s3.eu-west-1.amazonaws.com/signupScreenshot.png"
  );
  useEffect(() => {
    props.updateDetails && setTitle(props.updateDetails?.channel.title);
    props.updateDetails && setUrl(props.updateDetails?.channel.url);
    props.updateDetails &&
      setProfileUrl(props.updateDetails?.channel.profileUrl);
    props.updateDetails &&
      setBackgroundUrl(props.updateDetails?.channel.backgroundUrl);
  }, [props.updateDetails]);

  const notificationCtx = useContext(NotificationContext);

  const submitCreation = () =>
    ApiController.createChannel(
      title,
      url,
      backgroundUrl,
      profileUrl,
      props.folderId
    ).then(props.creationCallback);

  const submitUpdate = () =>
    props.updateDetails?.channel.id &&
    ApiController.updateChannel(
      props.updateDetails.channel.id,
      title,
      url,
      backgroundUrl,
      profileUrl
    )
      .then(props.updateDetails?.callback)
      .then(() => notificationCtx.success("Updated Channel"));

  const [checked, setChecked] = useState<boolean>(false);
  return (
    <ContentCreationDialog
      open={props.open}
      closeCallback={props.onClose}
      onSubmit={() => {
        (props.updateDetails?.callback ? submitUpdate : submitCreation)();
        props.onClose();
      }}
      type="channel"
      setTitle={setTitle}
      title={title}
      setUrl={setUrl}
      url={url}
      buttonDisabled={!checked}
      extraBottomElement={
        <Stack direction="row" spacing="8px">
          <Stack
            pt="3px"
            sx={{
              cursor: "pointer",
              "&:hover": { opacity: 0.7 },
              transition: "0.2s",
              svg: {
                path: {
                  fill: PALETTE.secondary.purple[2],
                },
              },
            }}
            onClick={() => setChecked(!checked)}
          >
            {checked ? (
              <CheckboxIcon width="20px" height="20px" />
            ) : (
              <EmptyCheckboxIcon width="20px" height="20px" />
            )}
          </Stack>
          <Typography variant="small" bold>
            {
              "I'm aware that I'm adding all Videos from this Channel to the Folder."
            }
          </Typography>
          <Stack>
            <InfoButton
              title="Boo"
              body="Kirby is so much better than Jigglypuff"
            />
          </Stack>
        </Stack>
      }
    >
      <Stack
        sx={{
          pointerEvents: "none",
        }}
      >
        <ChannelCard
          id={0}
          title={title}
          url={url}
          profileUrl={profileUrl}
          backgroundUrl={backgroundUrl}
          onClick={() => null}
          noPointerEvents
        />
      </Stack>
    </ContentCreationDialog>
  );
};

export default ChannelCreationDialog;
