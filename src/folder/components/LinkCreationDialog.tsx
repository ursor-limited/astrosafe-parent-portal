import { Stack } from '@mui/system'
import ContentCreationDialog from './ContentCreationDialog'
import { useContext, useEffect, useState } from 'react'
import LinkCard from './LinkCreateButton'
import ApiController, { getAbsoluteUrl } from './../../api'
import NotificationContext from './../../components/NotificationContext'
import { IContentBucket, ILink } from './../../profile/components/ContentTab'
import { cleanUrl } from './../../profile/components/MobileInsightsTab'
import { INFOS } from './../../profile/components/ProfilePageTabLayout'

const LinkCreationDialog = ({
  updateDetails,
  isProd,
  open,
  onClose,
  folderId,
  creationCallback,
}: {
  open: boolean
  onClose: () => any
  folderId: IContentBucket['id']
  creationCallback: () => any
  updateDetails?: {
    link: ILink
    callback?: () => any
  }
  isProd: boolean
}) => {
  const [title, setTitle] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('')
  useEffect(() => {
    updateDetails && setTitle(updateDetails?.link.title)
    updateDetails && setUrl(updateDetails?.link.url)
    updateDetails && setThumbnailUrl(updateDetails?.link.thumbnailUrl)
  }, [updateDetails])

  const [manuallyChangedTitle, setManuallyChangedTitle] =
    useState<boolean>(false)

  const apiController = new ApiController(isProd)

  const loadPreview = () => {
    apiController
      .getLinkPreview(encodeURIComponent(getAbsoluteUrl(cleanUrl(url))))
      .then((result) => {
        result.title && !manuallyChangedTitle && setTitle(result.title)
        result.faviconUrl && setThumbnailUrl(result.faviconUrl)
      })
      .catch(() => null)
  }

  const notificationCtx = useContext(NotificationContext)

  const submitCreation = () =>
    apiController
      .createLink(title, getAbsoluteUrl(cleanUrl(url)), thumbnailUrl, folderId)
      .then(creationCallback)

  const submitUpdate = () =>
    updateDetails?.link.id &&
    apiController
      .updateLink(
        updateDetails.link.id,
        title,
        getAbsoluteUrl(cleanUrl(url)),
        thumbnailUrl
      )
      .then(updateDetails?.callback)
      .then(() => notificationCtx.success('Updated Link'))

  return (
    <ContentCreationDialog
      open={open}
      closeCallback={onClose}
      onSubmit={() => {
        ;(updateDetails?.callback ? submitUpdate : submitCreation)()
        onClose()
      }}
      type="link"
      info={INFOS.addLink}
      editing={!!updateDetails}
      setTitle={(t) => {
        setTitle(t)
        setManuallyChangedTitle(true)
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
          isProd={isProd}
        />
      </Stack>
    </ContentCreationDialog>
  )
}

export default LinkCreationDialog
