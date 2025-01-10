import { Stack } from '@mui/system'
import ContentCreationDialog from './ContentCreationDialog'
import { useContext, useEffect, useState } from 'react'
import ChannelCard from './ChannelCard'
import NotificationContext from './../../components/NotificationContext'
import ApiController, { getAbsoluteUrl } from './../../api'
import { ReactComponent as CheckboxIcon } from './../../images/CheckboxIcon.svg'
import { ReactComponent as EmptyCheckboxIcon } from './../../images/EmptyCheckboxIcon.svg'
import { PALETTE, Typography } from './../../ui'
import { IEnrichedContentBucket } from '../../folders/contents/common'
import { IChannel } from './../../profile/components/ContentTab'
import { INFOS } from './../../profile/components/ProfilePageTabLayout'
import { cleanUrl } from './../../profile/components/MobileInsightsTab'

const ChannelCreationDialog = ({
  open,
  onClose,
  folderId,
  creationCallback,
  updateDetails,
  isProd = false,
}: {
  open: boolean
  onClose: () => any
  folderId: IEnrichedContentBucket['id']
  creationCallback: () => any
  updateDetails?: {
    channel: IChannel
    callback?: () => any
  }
  isProd: boolean
}) => {
  const [title, setTitle] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [profileUrl, setProfileUrl] = useState<string>('')
  const [bannerUrl, setBannerUrl] = useState<string>('')
  useEffect(() => {
    updateDetails && setTitle(updateDetails?.channel.title)
    updateDetails && setUrl(updateDetails?.channel.url)
    updateDetails && setProfileUrl(updateDetails?.channel.profileUrl)
    updateDetails && setBannerUrl(updateDetails?.channel.bannerUrl)
  }, [updateDetails])

  const notificationCtx = useContext(NotificationContext)

  const apiController = new ApiController(isProd)

  const submitCreation = () =>
    apiController
      .createChannel(
        title,
        getAbsoluteUrl(cleanUrl(url)),
        bannerUrl,
        profileUrl,
        folderId
      )
      .then(creationCallback)

  const submitUpdate = () =>
    updateDetails?.channel.id &&
    apiController
      .updateChannel(
        updateDetails.channel.id,
        title,
        getAbsoluteUrl(cleanUrl(url)),
        bannerUrl,
        profileUrl
      )
      .then(updateDetails?.callback)
      .then(() => notificationCtx.success('Updated Channel'))

  const [checked, setChecked] = useState<boolean>(false)

  const [manuallyChangedTitle, setManuallyChangedTitle] =
    useState<boolean>(false)

  const loadPreview = () => {
    apiController
      .getChannelPreview(encodeURIComponent(getAbsoluteUrl(cleanUrl(url))))
      .then((result) => {
        result.title && !manuallyChangedTitle && setTitle(result.title)
        result.bannerUrl && setBannerUrl(result.bannerUrl)
        result.profileUrl && setProfileUrl(result.profileUrl)
      })
      .catch(() => null)
  }

  return (
    <ContentCreationDialog
      open={open}
      closeCallback={onClose}
      onSubmit={() => {
        ;(updateDetails?.callback ? submitUpdate : submitCreation)()
        onClose()
      }}
      info={INFOS.addChannel}
      type="channel"
      setTitle={(t) => {
        setTitle(t)
        setManuallyChangedTitle(true)
      }}
      title={title}
      setUrl={setUrl}
      url={url}
      onUrlFieldBlur={loadPreview}
      buttonDisabled={!checked && !updateDetails}
      editing={!!updateDetails}
      extraBottomElement={
        !updateDetails ? (
          <Stack direction="row" spacing="8px">
            <Stack
              pt="3px"
              sx={{
                cursor: 'pointer',
                '&:hover': { opacity: 0.7 },
                transition: '0.2s',
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
          pointerEvents: 'none',
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
  )
}

export default ChannelCreationDialog
