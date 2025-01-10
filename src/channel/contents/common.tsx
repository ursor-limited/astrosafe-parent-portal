import React, { useContext, useEffect } from 'react'
import useNavigate from '../../hooks/useNavigate'
import { useCallback, useState } from 'react'
import ApiController from './../../api'
import { ReactComponent as PencilIcon } from './../../images/Pencil.svg'
import { ReactComponent as TrashcanIcon } from './../../images/TrashcanIcon.svg'
import {
  IChannel,
  IContentBucket,
  IVideo,
} from './../../profile/components/ContentTab'
import ChannelPageDesktopBody from './body-desktop'
import VideoCreationDialog from './../../folder/components/VideoCreationDialog'
import { PALETTE } from './../../ui'
import DeletionDialog from './../../components/DeletionDialog'
import ChannelRenameDialog from '../components/ChannelRenameDialog'
import NotificationContext from './../../components/NotificationContext'
import ChannelPageMobileBody from './body-mobile'

interface ChannelPageProps {
  id: IChannel['id']
  isMobile: boolean
  isProd: boolean
}

const ChannelPage = ({ id, isMobile, isProd = false }: ChannelPageProps) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState<IChannel['title']>('')
  const [folderId, setFolderId] = useState<IContentBucket['id'] | undefined>()
  const [videos, setVideos] = useState<IVideo[]>([])

  const apiController = new ApiController(isProd)

  const load = useCallback(
    () =>
      apiController.getChannel(id).then((c) => {
        setTitle(c.title)
        setFolderId(c.contentBucketId)
        setVideos(c.videos)
      }),
    [id]
  )
  useEffect(() => {
    load()
  }, [load])

  const [folder, setFolder] = useState<IContentBucket | undefined>()
  useEffect(() => {
    folderId && apiController.getFolder(folderId).then(setFolder)
  }, [folderId])

  const [videoEditingDialogId, setVideoEditingDialogId] = useState<
    IVideo['id'] | undefined
  >()

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
  ]

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false)
  const [renameDialogOpen, setRenameDialogOpen] = useState<boolean>(false)

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
  ]

  const notificationCtx = useContext(NotificationContext)

  const deleteChannel = () =>
    apiController
      .deleteChannel(id)
      .then(() => navigate.push(folderId ? `/folders/${folderId}` : '/folders'))

  return (
    <>
      {isMobile ? (
        <ChannelPageMobileBody
          videos={videos}
          onUpdate={load}
          titleRow={titleRow}
          setVideoEditingDialogId={setVideoEditingDialogId}
          actions={actions}
          onBack={() =>
            navigate.push(folderId ? `/folders/${folderId}` : '/folders')
          }
          isProd={isProd}
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
          isProd={isProd}
        />
      )}
      {videoEditingDialogId && folderId ? (
        <VideoCreationDialog
          open={true}
          onClose={() => {
            setVideoEditingDialogId(undefined)
          }}
          folderId={folderId}
          creationCallback={load}
          updateDetails={{
            video: videos.find((v) => v.id === videoEditingDialogId)!,
            callback: load,
          }}
          belongsToChannel
          isProd={isProd}
        />
      ) : null}
      <DeletionDialog
        open={deletionDialogOpen}
        type="channel"
        onClose={() => setDeletionDialogOpen(false)}
        subtitle="If you remove this Channel, all of its Videos too will be deleted."
        onSubmit={deleteChannel}
        isMobile={isMobile}
      />
      <ChannelRenameDialog
        open={renameDialogOpen}
        onClose={() => setRenameDialogOpen(false)}
        name={title}
        onSubmit={(title) =>
          apiController
            .changeChannelName(id, title)
            .then(load)
            .then(() => notificationCtx.success('Renamed Channel'))
        }
        isMobile={isMobile}
      />
    </>
  )
}

export default ChannelPage
