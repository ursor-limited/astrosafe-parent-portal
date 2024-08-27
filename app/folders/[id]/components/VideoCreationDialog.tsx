import { Stack } from '@mui/system';
import VideoCard from './VideoCard';
import { useContext, useEffect, useState } from 'react';
import ApiController, { getAbsoluteUrl } from '@/app/api';
import NotificationContext from '@/components/NotificationContext';
import ContentCreationDialog from './ContentCreationDialog';
import {
  IContentBucket,
  IVideo,
} from '@/app/profiles/[id]/components/ContentTab';
import { cleanUrl } from '@/app/profiles/[id]/components/MobileInsightsTab';
import { INFOS } from '@/app/profiles/[id]/components/ProfilePageTabLayout';

const VideoCreationDialog = (props: {
  open: boolean;
  onClose: () => void;
  folderId: IContentBucket['id'];
  creationCallback: () => void;
  updateDetails?: {
    video: IVideo;
    callback?: () => void;
  };
  belongsToChannel?: boolean;
}) => {
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  useEffect(() => {
    props.updateDetails && setTitle(props.updateDetails?.video.title);
    props.updateDetails && setUrl(props.updateDetails?.video.url);
    props.updateDetails &&
      setThumbnailUrl(props.updateDetails?.video.thumbnailUrl);
  }, [props.updateDetails]);

  const [manuallyChangedTitle, setManuallyChangedTitle] =
    useState<boolean>(false);

  const loadPreview = () => {
    ApiController.getVideoPreview(
      encodeURIComponent(getAbsoluteUrl(cleanUrl(url)))
    )
      .then((result) => {
        result.title && !manuallyChangedTitle && setTitle(result.title);
        result.thumbnailUrl && setThumbnailUrl(result.thumbnailUrl);
      })
      .catch(() => null);
  };

  const notificationCtx = useContext(NotificationContext);

  const submitCreation = () =>
    ApiController.createVideo(
      title,
      getAbsoluteUrl(cleanUrl(url)),
      thumbnailUrl,
      props.folderId
    ).then(props.creationCallback);

  const submitUpdate = () =>
    props.updateDetails?.video.id &&
    ApiController.updateVideo(
      props.updateDetails.video.id,
      title,
      getAbsoluteUrl(cleanUrl(url)),
      !props.belongsToChannel ? props.folderId : undefined,
      props.belongsToChannel
      //thumbnailUrl
    )
      .then(props.updateDetails?.callback)
      .then(() => notificationCtx.success('Updated Video'));

  return (
    <ContentCreationDialog
      open={props.open}
      closeCallback={() => {
        props.onClose();
      }}
      onSubmit={() => {
        (props.updateDetails?.callback ? submitUpdate : submitCreation)();
        props.onClose();
      }}
      info={INFOS.addVideo}
      type="video"
      setTitle={(t) => {
        setTitle(t);
        setManuallyChangedTitle(true);
      }}
      title={title}
      setUrl={setUrl}
      url={url}
      editing={!!props.updateDetails}
      onUrlFieldBlur={loadPreview}
    >
      <Stack
        sx={{
          pointerEvents: 'none',
        }}
      >
        <VideoCard
          id={0}
          title={title}
          url={url}
          thumbnailUrl={thumbnailUrl}
          noPointerEvents
          noMenu
          twoLineTitleSectionHeight
        />
      </Stack>
    </ContentCreationDialog>
  );
};

export default VideoCreationDialog;
