import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ReactComponent as CirclePlayIcon } from './../../images/CirclePlay.svg'
import { ReactComponent as LinkIcon } from './../../images/LinkIcon.svg'
import { ReactComponent as VideoCameraIcon } from './../../images/VideoCameraIcon.svg'
import { ReactComponent as TrashcanIcon } from './../../images/TrashcanIcon.svg'
import { ReactComponent as PencilIcon } from './../../images/Pencil.svg'
import { PALETTE } from './../../ui'
import _ from 'lodash'
import useNavigate from '../../hooks/useNavigate'
import AddDeviceDialog from '../components/AddDeviceDialog'
import LinkCreationDialog from '../components/LinkCreationDialog'
import ChannelCreationDialog from '../components/ChannelCreationDialog'
import ApiController from './../../api'
import FolderRenameDialog from '../components/FolderRenameDialog'
import NotificationContext from './../../components/NotificationContext'
import useLoadFolderAndContents from '../components/useLoadFolderAndContents'
import VideoCreationDialog from '../components/VideoCreationDialog'
import FolderPageMobileBody from './body-mobile'
import FolderPageDesktopBody from './body-desktop'
import { IDevice } from './../../filter/contents/common'
import {
  AstroContent,
  IChannel,
  IContent,
  IContentBucket,
  ILink,
  IVideo,
} from './../../profile/components/ContentTab'
import DeletionDialog from './../../components/DeletionDialog'
import useDeviceOnlineStatus from './../../profiles/components/useDeviceOnlineStatus'
import useAuth from './../../hooks/useAuth'

export const FOLDER_DELETION_DIALOG_SUBTITLE =
  'If you delete this Folder all of the Content within the Folder will also be deleted and it will no longer be accessible on the assigned Devices.'

export interface IGroup {
  id: number
  title: string
  joinCode: string
}

export interface IAstroContentBranding {
  title: string
  color: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export const CONTENT_BRANDING: Record<AstroContent, IAstroContentBranding> = {
  video: {
    title: 'Add Video',
    color: '#FC5C5C',
    icon: CirclePlayIcon,
  },
  channel: {
    title: 'Add Youtube Channel',
    color: PALETTE.system.orange,
    icon: VideoCameraIcon,
  },
  // lesson: {
  //   title: "Add Lesson",
  //   color: PALETTE.secondary.green[5],
  //   icon: VersionsIcon,
  // },
  link: {
    title: 'Add Link',
    color: PALETTE.secondary.blue[3],
    icon: LinkIcon,
  },
}

export interface IContentCard {
  type: AstroContent
  content: IContent
}

export default function FolderPage({
  folderId,
  isMobile,
  email,
  isProd,
}: {
  folderId: number
  isMobile: boolean
  email: string
  isProd: boolean
}) {
  const navigate = useNavigate()
  const { user } = useAuth(email, isProd)

  const [devices, setDevices] = useState<IDevice[]>([])

  const apiController = new ApiController(isProd)

  const loadDevices = useCallback(
    () => apiController.getFolderDevices(folderId).then((d) => setDevices(d)),
    [folderId]
  )
  useEffect(() => {
    loadDevices()
  }, [loadDevices])
  const cuttingEdgeOnlineStatusDevices = useDeviceOnlineStatus(devices, email)

  const { folder, contents, loadFolderAndContents } = useLoadFolderAndContents(
    folderId,
    isProd
  )

  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedContentType, setSelectedContentType] = useState<
    AstroContent | 'all'
  >('all')

  const [filteredContents, setFilteredContents] = useState<IContentCard[]>([])

  useEffect(
    () =>
      setFilteredContents(
        _(contents)
          .filter(
            (c) =>
              selectedContentType === 'all' || c.type === selectedContentType
          )
          .filter(
            (c) =>
              !searchValue ||
              c.content.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .reverse()
          .value()
      ),
    [searchValue, selectedContentType, contents]
  )

  const [addDeviceDialogOpen, setAddDeviceDialogOpen] = useState<boolean>(false)

  const [contentCreationDialogOpen, setContentCreationDialogOpen] = useState<
    AstroContent | undefined
  >()

  const [allFolders, setFolders] = useState<IContentBucket[]>([])
  useEffect(() => {
    user?.group_id &&
      apiController.getGroupFolders(user.group_id).then(setFolders)
  }, [user?.group_id])

  const [folderRenameDialogOpen, setFolderRenameDialogOpen] =
    useState<boolean>(false)

  const notificationCtx = useContext(NotificationContext)

  const [linkEditingDialogId, setLinkEditingDialogId] = useState<
    ILink['id'] | undefined
  >(undefined)

  const [videoEditingDialogId, setVideoEditingDialogId] = useState<
    IVideo['id'] | undefined
  >(undefined)

  const [channelEditingDialogId, setChannelEditingDialogId] = useState<
    IChannel['id'] | undefined
  >(undefined)

  const titleRow = [
    {
      text: 'My Folders',
      callback: () => navigate.push('/folders'),
    },
    {
      text: folder?.title ?? '',
      options: allFolders
        .filter((f) => f.id !== folderId)
        .map((f) => ({
          text: f.title,
          callback: () => navigate.push(`/folders/${f.id}`),
        })),
    },
  ]

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false)

  const deleteFolder = () =>
    apiController.removeFolder(folderId).then(() => navigate.push('/folders'))

  const actions = [
    {
      text: 'Edit name',
      kallback: () => setFolderRenameDialogOpen(true),
      icon: PencilIcon,
    },
    // {
    //   text: "Duplicate",
    //   kallback: () => null,
    //   icon: DuplicateIcon,
    // },
    {
      text: 'Delete',
      kallback: () => setDeletionDialogOpen(true),
      icon: TrashcanIcon,
      color: PALETTE.system.red,
    },
  ]

  return (
    <>
      {isMobile ? (
        <FolderPageMobileBody
          email={email}
          folderId={folderId}
          folder={folder}
          contents={filteredContents}
          allFolders={allFolders}
          devices={cuttingEdgeOnlineStatusDevices}
          setCreationDialogOpen={setContentCreationDialogOpen}
          loadFolderAndContents={loadFolderAndContents}
          setAddDeviceDialogOpen={() => {
            setAddDeviceDialogOpen(true)
          }}
          onRemoveDevice={() => {
            loadDevices()
            notificationCtx.negativeSuccess('Removed Device')
          }}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          selectedContentType={selectedContentType}
          setSelectedContentType={setSelectedContentType}
          setLinkEditingDialogId={setLinkEditingDialogId}
          setVideoEditingDialogId={setVideoEditingDialogId}
          setChannelEditingDialogId={setChannelEditingDialogId}
          titleRow={titleRow}
          actions={actions}
          isProd={isProd}
        />
      ) : (
        <FolderPageDesktopBody
          folderId={folderId}
          folder={folder}
          contents={filteredContents}
          allFolders={allFolders}
          devices={cuttingEdgeOnlineStatusDevices}
          setContentCreationDialogOpen={setContentCreationDialogOpen}
          loadFolderAndContents={loadFolderAndContents}
          setAddDeviceDialogOpen={() => {
            setAddDeviceDialogOpen(true)
          }}
          onRemoveDevice={() => {
            loadDevices()
            notificationCtx.negativeSuccess('Removed Device')
          }}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          selectedContentType={selectedContentType}
          setSelectedContentType={setSelectedContentType}
          setLinkEditingDialogId={setLinkEditingDialogId}
          setVideoEditingDialogId={setVideoEditingDialogId}
          setChannelEditingDialogId={setChannelEditingDialogId}
          titleRow={titleRow}
          actions={actions}
          isProd={isProd}
        />
      )}
      {devices ? (
        <AddDeviceDialog
          open={addDeviceDialogOpen}
          groupId={user?.group_id}
          onClose={() => setAddDeviceDialogOpen(false)}
          title="Share to a Device"
          subtitle={['Add Device access to this', 'Content Folder.']}
          emptyText="This Content Folder is on all of your Devices"
          addedDevices={devices}
          onAdd={(id) => {
            apiController.addFolderToDevice(folderId, id).then(() => {
              setAddDeviceDialogOpen(false)
              loadDevices()
              notificationCtx.success('Added Device')
            })
          }}
          isMobile={isMobile}
          isProd={isProd}
        />
      ) : null}
      <FolderRenameDialog
        open={folderRenameDialogOpen}
        onClose={() => setFolderRenameDialogOpen(false)}
        name={folder?.title ?? ''}
        onSubmit={(name) =>
          apiController.renameFolder(folderId, name).then(() => {
            loadFolderAndContents()
            notificationCtx.success('Renamed Folder')
          })
        }
        isMobile={isMobile}
      />
      {contentCreationDialogOpen ? (
        contentCreationDialogOpen === 'video' ? (
          <VideoCreationDialog
            open={true}
            onClose={() => {
              setContentCreationDialogOpen(undefined)
            }}
            folderId={folderId}
            creationCallback={loadFolderAndContents}
            isProd={isProd}
          />
        ) : contentCreationDialogOpen === 'link' ? (
          <LinkCreationDialog
            open={true}
            onClose={() => {
              setContentCreationDialogOpen(undefined)
            }}
            folderId={folderId}
            creationCallback={loadFolderAndContents}
            isProd={isProd}
          />
        ) : contentCreationDialogOpen === 'channel' ? (
          <ChannelCreationDialog
            open={true}
            onClose={() => {
              setContentCreationDialogOpen(undefined)
            }}
            folderId={folderId}
            creationCallback={loadFolderAndContents}
            isProd={isProd}
          />
        ) : null
      ) : null}
      {linkEditingDialogId && contents ? (
        <LinkCreationDialog
          open={true}
          onClose={() => {
            setLinkEditingDialogId(undefined)
          }}
          folderId={folderId}
          creationCallback={loadFolderAndContents}
          updateDetails={{
            link: contents.find(
              (c) => c.content.id === linkEditingDialogId && c.type === 'link'
            )?.content as ILink,
            callback: loadFolderAndContents,
          }}
          isProd={isProd}
        />
      ) : null}
      {videoEditingDialogId && contents ? (
        <VideoCreationDialog
          open={true}
          onClose={() => {
            setVideoEditingDialogId(undefined)
          }}
          folderId={folderId}
          creationCallback={loadFolderAndContents}
          updateDetails={{
            video: contents.find(
              (c) => c.content.id === videoEditingDialogId && c.type === 'video'
            )?.content as IVideo,
            callback: loadFolderAndContents,
          }}
          isProd={isProd}
        />
      ) : null}
      {channelEditingDialogId && contents ? (
        <ChannelCreationDialog
          open={true}
          onClose={() => {
            setChannelEditingDialogId(undefined)
          }}
          folderId={folderId}
          creationCallback={loadFolderAndContents}
          updateDetails={{
            channel: contents.find(
              (c) =>
                c.content.id === channelEditingDialogId && c.type === 'channel'
            )?.content as IChannel,
            callback: loadFolderAndContents,
          }}
          isProd={isProd}
        />
      ) : null}
      <DeletionDialog
        open={deletionDialogOpen}
        type="Folder"
        onClose={() => setDeletionDialogOpen(false)}
        subtitle={FOLDER_DELETION_DIALOG_SUBTITLE}
        onSubmit={deleteFolder}
        isMobile={isMobile}
      />
    </>
  )
}
