import { Stack } from '@mui/system';
import ContentCreationDialog from './ContentCreationDialog';
import { useContext, useEffect, useState } from 'react';
import LinkCard from './LinkCard';
import ApiController, { getAbsoluteUrl } from './../../api';
import NotificationContext from './../../components/NotificationContext';
import { IContentBucket, ILink } from './../../profile/components/ContentTab';
import { cleanUrl } from './../../profile/components/MobileInsightsTab';
import { INFOS } from './../../profile/components/ProfilePageTabLayout';

const LinkCreationDialog = (props: {
  open: boolean;
  onClose: () => void;
  folderId: IContentBucket['id'];
  creationCallback: () => void;
  updateDetails?: {
    link: ILink;
    callback?: () => void;
  };
}) => {
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  useEffect(() => {
    props.updateDetails && setTitle(props.updateDetails?.link.title);
    props.updateDetails && setUrl(props.updateDetails?.link.url);
    props.updateDetails &&
      setThumbnailUrl(props.updateDetails?.link.thumbnailUrl);
  }, [props.updateDetails]);

  const [manuallyChangedTitle, setManuallyChangedTitle] =
    useState<boolean>(false);

  const loadPreview = () => {
    ApiController.getLinkPreview(
      encodeURIComponent(getAbsoluteUrl(cleanUrl(url)))
    )
      .then((result) => {
        result.title && !manuallyChangedTitle && setTitle(result.title);
        result.faviconUrl && setThumbnailUrl(result.faviconUrl);
      })
      .catch(() => null);
  };

  const notificationCtx = useContext(NotificationContext);

  const submitCreation = () =>
    ApiController.createLink(
      title,
      getAbsoluteUrl(cleanUrl(url)),
      thumbnailUrl,
      props.folderId
    ).then(props.creationCallback);

  const submitUpdate = () =>
    props.updateDetails?.link.id &&
    ApiController.updateLink(
      props.updateDetails.link.id,
      title,
      getAbsoluteUrl(cleanUrl(url)),
      thumbnailUrl
    )
      .then(props.updateDetails?.callback)
      .then(() => notificationCtx.success('Updated Link'));

  return (
    <ContentCreationDialog
      open={props.open}
      closeCallback={props.onClose}
      onSubmit={() => {
        (props.updateDetails?.callback ? submitUpdate : submitCreation)();
        props.onClose();
      }}
      type="link"
      info={INFOS.addLink}
      editing={!!props.updateDetails}
      setTitle={(t) => {
        setTitle(t);
        setManuallyChangedTitle(true);
      }}
      title={title}
      setUrl={setUrl}
      url={url}
      onUrlFieldBlur={loadPreview}
    >
      <Stack
        sx={{
          pointerEvents: 'none',
        }}
      >
        <LinkCard
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

export default LinkCreationDialog;
