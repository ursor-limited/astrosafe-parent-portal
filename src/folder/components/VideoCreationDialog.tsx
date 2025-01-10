import { Stack } from '@mui/system'
import VideoCard from './VideoCreateButton'
import { useContext, useEffect, useState } from 'react'
import ApiController, { getAbsoluteUrl } from './../../api'
import NotificationContext from './../../components/NotificationContext'
import ContentCreationDialog from './ContentCreationDialog'
import { IContentBucket, IVideo } from './../../profile/components/ContentTab'
import { cleanUrl } from './../../profile/components/MobileInsightsTab'
import { INFOS } from './../../profile/components/ProfilePageTabLayout'

const VideoCreationDialog = ({
  isProd,
  updateDetails,
  belongsToChannel,
  onClose,
  open,
  creationCallback,
  folderId,
}: {
  open: boolean
  onClose: () => any
  folderId: IContentBucket['id']
  creationCallback: () => any
  updateDetails?: {
    video: IVideo
    callback?: () => any
  }
  belongsToChannel?: boolean
  isProd: boolean
}) => {
  const [title, setTitle] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('')

  const apiController = new ApiController(isProd)

  useEffect(() => {
    updateDetails && setTitle(updateDetails?.video.title)
    updateDetails && setUrl(updateDetails?.video.url)
    updateDetails && setThumbnailUrl(updateDetails?.video.thumbnailUrl)
  }, [updateDetails])

  const [manuallyChangedTitle, setManuallyChangedTitle] =
    useState<boolean>(false)

  const loadPreview = () => {
    apiController
      .getVideoPreview(encodeURIComponent(getAbsoluteUrl(cleanUrl(url))))
      .then((result) => {
        result.title && !manuallyChangedTitle && setTitle(result.title)
        result.thumbnailUrl && setThumbnailUrl(result.thumbnailUrl)
      })
      .catch(() => null)
  }

  const notificationCtx = useContext(NotificationContext)

  const submitCreation = () =>
    apiController
      .createVideo(title, getAbsoluteUrl(cleanUrl(url)), thumbnailUrl, folderId)
      .then(creationCallback)

  const submitUpdate = () =>
    updateDetails?.video.id &&
    apiController
      .updateVideo(
        updateDetails.video.id,
        title,
        getAbsoluteUrl(cleanUrl(url)),
        !belongsToChannel ? folderId : undefined,
        belongsToChannel
        //thumbnailUrl
      )
      .then(updateDetails?.callback)
      .then(() => notificationCtx.success('Updated Video'))

  return (
    <ContentCreationDialog
      open={open}
      closeCallback={() => {
        onClose()
      }}
      onSubmit={() => {
        ;(updateDetails?.callback ? submitUpdate : submitCreation)()
        onClose()
      }}
      info={INFOS.addVideo}
      type="video"
      setTitle={(t) => {
        setTitle(t)
        setManuallyChangedTitle(true)
      }}
      title={title}
      setUrl={setUrl}
      url={url}
      editing={!!updateDetails}
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
          isProd={isProd}
        />
      </Stack>
    </ContentCreationDialog>
  )
}

export default VideoCreationDialog
