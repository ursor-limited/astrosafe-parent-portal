import React, { useContext, useEffect } from 'react';
import useNavigate from '../../hooks/useNavigate';
import { useCallback, useState } from 'react';
import ApiController from './../../api';
import { ReactComponent as PencilIcon } from './../../images/Pencil.svg';
import { ReactComponent as TrashcanIcon } from './../../images/TrashcanIcon.svg';
import {
  IChannel,
  IContentBucket,
  IVideo,
} from './../../profile/components/ContentTab';
import ChannelPageDesktopBody from './body-desktop';
import VideoCreationDialog from './../../folder/components/VideoCreationDialog';
import { PALETTE } from './../../ui';
import DeletionDialog from './../../components/DeletionDialog';
import ChannelRenameDialog from '../components/ChannelRenameDialog';
import NotificationContext from './../../components/NotificationContext';
import ChannelPageMobileBody from './body-mobile';

const ChannelPage = (props: { id: IChannel['id']; isMobile: boolean }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<IChannel['title']>('');
  const [folderId, setFolderId] = useState<IContentBucket['id'] | undefined>();
  const [videos, setVideos] = useState<IVideo[]>([]);
  const load = useCallback(
    () =>
      ApiController.getChannel(props.id).then((c) => {
        setTitle(c.title);
        setFolderId(c.contentBucketId);
        setVideos(c.videos);
      }),
    [props.id]
  );
  useEffect(() => {
    load();
  }, [load]);

  const [folder, setFolder] = useState<IContentBucket | undefined>();
  useEffect(() => {
    folderId && ApiController.getFolder(folderId).then(setFolder);
  }, [folderId]);

  const [videoEditingDialogId, setVideoEditingDialogId] = useState<
    IVideo['id'] | undefined
  >();

  const titleRow = [
    ...(folder
      ? [
          {
            text: 'My Folders',
            callback: () => navigate.push('/folders'),
          },
          {
            text: folder?.title ?? '',
            callback: () => navigate.push(`/folders/${folderId}`),
          },
        ]
      : []),
    {
      text: title,
    },
  ];

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState<boolean>(false);

  const actions = [
    {
      text: 'Edit name',
      kallback: () => setRenameDialogOpen(true),
      icon: PencilIcon,
    },
    {
      text: 'Delete',
      kallback: () => setDeletionDialogOpen(true),
      icon: TrashcanIcon,
      color: PALETTE.system.red,
    },
  ];

  const notificationCtx = useContext(NotificationContext);

  const deleteChannel = () =>
    ApiController.deleteChannel(props.id).then(() =>
      navigate.push(folderId ? `/folders/${folderId}` : '/folders')
    );

  return (
    <>
      {props.isMobile ? (
        <ChannelPageMobileBody
          videos={videos}
          onUpdate={load}
          titleRow={titleRow}
          setVideoEditingDialogId={setVideoEditingDialogId}
          actions={actions}
          onBack={() =>
            navigate.push(folderId ? `/folders/${folderId}` : '/folders')
          }
        />
      ) : (
        <ChannelPageDesktopBody
          videos={videos}
          onUpdate={load}
          titleRow={titleRow}
          setVideoEditingDialogId={setVideoEditingDialogId}
          actions={actions}
          onBack={() =>
            navigate.push(folderId ? `/folders/${folderId}` : '/folders')
          }
        />
      )}
      {videoEditingDialogId && folderId ? (
        <VideoCreationDialog
          open={true}
          onClose={() => {
            setVideoEditingDialogId(undefined);
          }}
          folderId={folderId}
          creationCallback={load}
          updateDetails={{
            video: videos.find((v) => v.id === videoEditingDialogId)!,
            callback: load,
          }}
          belongsToChannel
        />
      ) : null}
      <DeletionDialog
        open={deletionDialogOpen}
        type="channel"
        onClose={() => setDeletionDialogOpen(false)}
        subtitle="If you remove this Channel, all of its Videos too will be deleted."
        onSubmit={deleteChannel}
        isMobile={props.isMobile}
      />
      <ChannelRenameDialog
        open={renameDialogOpen}
        onClose={() => setRenameDialogOpen(false)}
        name={title}
        onSubmit={(title) =>
          ApiController.changeChannelName(props.id, title)
            .then(load)
            .then(() => notificationCtx.success('Renamed Channel'))
        }
        isMobile={props.isMobile}
      />
    </>
  );
};

export default ChannelPage;
