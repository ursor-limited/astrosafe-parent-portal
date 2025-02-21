import useNavigate from '../../hooks/useNavigate'
import ApiController from '../../api'
import { useCallback, useEffect, useState } from 'react'
import { IDevice } from '../../filter/contents/common'
import AllFoldersPageDesktopBody from './body-desktop'
import AllFoldersPageMobileBody from './body-mobile'
import { IContentBucket } from './../../profile/components/ContentTab'
import FolderCreationDialog from '../../folder/components/FolderCreationDialog'
import useAuth from './../../hooks/useAuth'

export interface IEnrichedContentBucket {
  id: IContentBucket['id']
  title: IContentBucket['title']
  preview: {
    thumbnailUrls: string[]
    devices: {
      profileAvatarUrl: IDevice['profileAvatarUrl']
      name: IDevice['name']
    }[]
    totalDeviceCount: number
  }
}

const AllFoldersPage = (props: {
  isMobile: boolean
  email: string
  isProd: boolean
}) => {
  const { user } = useAuth(props.email, props.isProd)
  const navigate = useNavigate()
  const [folders, setFolders] = useState<IEnrichedContentBucket[]>([])

  const apiController = new ApiController(props.isProd)

  const loadFolders = useCallback(
    () =>
      user?.group_id &&
      apiController
        .getEnrichedFolders(user.group_id)
        .then((f) => setFolders(f)),
    [user?.group_id]
  )
  useEffect(() => {
    loadFolders()
  }, [loadFolders])
  const createFolder = (title: IContentBucket['title']) =>
    user?.group_id &&
    apiController
      .createFolder(title, user.group_id)
      .then((response) => navigate.push(`/folders/${response.contentBucketId}`))
  const [creationDialogOpen, setCreationDialogOpen] = useState<boolean>(false)

  return (
    <>
      {props.isMobile ? (
        <AllFoldersPageMobileBody
          folders={folders}
          createFolder={() => setCreationDialogOpen(true)}
          onUpdate={loadFolders}
          isProd={props.isProd}
        />
      ) : (
        <AllFoldersPageDesktopBody
          folders={folders}
          createFolder={() => setCreationDialogOpen(true)}
          onUpdate={loadFolders}
          isProd={props.isProd}
        />
      )}
      <FolderCreationDialog
        open={creationDialogOpen}
        onClose={() => setCreationDialogOpen(false)}
        onSubmit={createFolder}
        isMobile={props.isMobile}
      />
    </>
  )
}

export default AllFoldersPage
