import { Stack } from "@mui/system";
import ContentCreationDialog from "./ContentCreationDialog";
import { useContext, useEffect, useState } from "react";
import ChannelCard from "./ChannelCard";
import NotificationContext from "@/app/components/NotificationContext";
import ApiController, { getAbsoluteUrl } from "@/app/api";
import CheckboxIcon from "@/images/icons/CheckboxIcon.svg";
import EmptyCheckboxIcon from "@/images/icons/EmptyCheckboxIcon.svg";
import { PALETTE, Typography } from "@/ui";
import InfoButton from "@/app/components/InfoButton";
import { IEnrichedContentBucket } from "../../contents/common";
import { IChannel } from "@/app/profiles/[id]/components/ContentTab";
import { cleanUrl } from "@/app/profiles/[id]/components/MobileInsightsTab";
import { INFOS } from "@/app/profiles/[id]/components/ProfilePageTabLayout";

const ChannelCreationDialog = (props: {
  open: boolean;
  onClose: () => void;
  folderId: IEnrichedContentBucket["id"];
  creationCallback: () => void;
  updateDetails?: {
    channel: IChannel;
    callback?: () => void;
  };
}) => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [bannerUrl, setBannerUrl] = useState<string>("");
  useEffect(() => {
    props.updateDetails && setTitle(props.updateDetails?.channel.title);
    props.updateDetails && setUrl(props.updateDetails?.channel.url);
    props.updateDetails &&
      setProfileUrl(props.updateDetails?.channel.profileUrl);
    props.updateDetails && setBannerUrl(props.updateDetails?.channel.bannerUrl);
  }, [props.updateDetails]);

  const notificationCtx = useContext(NotificationContext);

  const submitCreation = () =>
    ApiController.createChannel(
      title,
      url,
      bannerUrl,
      profileUrl,
      props.folderId
    ).then(props.creationCallback);

  const submitUpdate = () =>
    props.updateDetails?.channel.id &&
    ApiController.updateChannel(
      props.updateDetails.channel.id,
      title,
      url,
      bannerUrl,
      profileUrl
    )
      .then(props.updateDetails?.callback)
      .then(() => notificationCtx.success("Updated Channel"));

  const [checked, setChecked] = useState<boolean>(false);

  const [manuallyChangedTitle, setManuallyChangedTitle] =
    useState<boolean>(false);

  // const loadPreview = () => {
  //   ApiController.getLinkPreview(
  //     encodeURIComponent(getAbsoluteUrl(cleanUrl(url)))
  //   )
  //     .then((result) => {
  //       result.title && !manuallyChangedTitle && setTitle(result.title);
  //       result.bannerUrl && setBannerUrl(result.bannerUrl);
  //       result.thumbnailUrl && setThumbnailUrl(result.thumbnailUrl);
  //     })
  //     .catch(() => null);
  // };

  return (
    <ContentCreationDialog
      open={props.open}
      closeCallback={props.onClose}
      onSubmit={() => {
        (props.updateDetails?.callback ? submitUpdate : submitCreation)();
        props.onClose();
      }}
      info={INFOS.addChannel}
      type="channel"
      setTitle={setTitle}
      title={title}
      setUrl={setUrl}
      url={url}
      buttonDisabled={!checked && !props.updateDetails}
      editing={!!props.updateDetails}
      extraBottomElement={
        !props.updateDetails ? (
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
          </Stack>
        ) : null
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
          bannerUrl={bannerUrl}
          noPointerEvents
          noMenu
          twoLineTitleSectionHeight
        />
      </Stack>
    </ContentCreationDialog>
  );
};

export default ChannelCreationDialog;
