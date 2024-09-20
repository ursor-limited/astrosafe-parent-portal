import DynamicCardGrid from './../../components/DynamicCardGrid'
import { Stack } from '@mui/system'
import FolderCard from '../../components/FolderCard'
import UrsorFadeIn from './../../components/UrsorFadeIn'
import useNavigate from '../../hooks/useNavigate'
import { IEnrichedContentBucket } from './../../folders/contents/common'
import { ReactComponent as PlusIcon } from './../../images/PlusIcon.svg'
import { PALETTE, Typography, UrsorButton } from './../../ui'
import { IDevice } from './../../filter/contents/common'
import ApiController from './../../api'
import { useContext, useState } from 'react'
import NotificationContext from './../../components/NotificationContext'
import FolderDeviceRemovalConfirmationDialog from './../../folder/components/FolderDeviceRemovalConfirmationDialog'

import ProfilePageTabLayout, { INFOS } from './ProfilePageTabLayout'

export type AstroContent = 'video' | 'channel' | 'link'

export interface IContent {
  id: number
  title: string
  url: string
  createdAt: string
  contentBucketId: IContentBucket['id']
}

export interface IContentBucket {
  id: number
  title: string
  groupId: number
  videos: IVideo[]
  channels: IChannel[]
  links: ILink[]
  lessons: ILesson[]
}

export interface ILink extends IContent {
  thumbnailUrl: string
}
export interface IChannel extends IContent {
  profileUrl: string
  bannerUrl: string
}
export interface IVideo extends IContent {
  thumbnailUrl: string
  channelId?: IChannel['id']
}
export interface ILesson extends IContent {
  imageUrls: string[]
}

const DevicePageContentTab = (props: {
  folders: IEnrichedContentBucket[]
  isMobile?: boolean
  onUpdate: () => any
  deviceId: IDevice['id']
  deviceName: IDevice['name']
  openAddFolderDialog: () => any
}) => {
  const navigate = useNavigate()
  const [
    folderDeviceRemovalConfirmationDialogId,
    setFolderDeviceRemovalConfirmationDialogId,
  ] = useState<number | undefined>()
  const notificationCtx = useContext(NotificationContext)
  return (
    <ProfilePageTabLayout
      title={`${props.folders.length} Content Folder${
        props.folders.length === 1 ? '' : 's '
      }`}
      rightSideElement={
        <UrsorButton
          dark
          variant="tertiary"
          size="small"
          endIcon={PlusIcon}
          iconSize={18}
          onClick={props.openAddFolderDialog}
        >
          Add Folder
        </UrsorButton>
      }
      mobile={props.isMobile}
      info={INFOS.folders}
    >
      {props.folders.length > 0 ? (
        <Stack pt="20px">
          <DynamicCardGrid cardWidth="292px" rowGap="40px" columnGap="20px">
            {props.folders.map((f, i) => (
              <UrsorFadeIn key={f.id} duration={800} delay={100 * i}>
                <FolderCard
                  key={f.id}
                  {...f}
                  clickCallback={() => navigate.push(`/folders/${f.id}`)}
                  isMobile={props.isMobile}
                  editingCallback={props.onUpdate}
                  deletionCallback={props.onUpdate}
                  // extraActions={[
                  //   {
                  //     text: "Remove Device",
                  //     kallback: () =>
                  //       setFolderDeviceRemovalConfirmationDialogId(f.id),
                  //     icon: PhoneIcon,
                  //     color: PALETTE.system.red,
                  //   },
                  // ]}
                />
              </UrsorFadeIn>
            ))}
          </DynamicCardGrid>
        </Stack>
      ) : (
        <Stack flex={1} justifyContent="center" alignItems="center">
          <UrsorFadeIn delay={600} duration={800}>
            <Stack
              height={props.isMobile ? '100%' : '457px'}
              justifyContent="center"
              alignItems="center"
              spacing="13px"
            >
              <img
                src="https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+427321506.png"
                width={props.isMobile ? 179 : 230}
                height={props.isMobile ? 152 : 195}
                alt="empty state illustration"
              />
              <Stack
                width={props.isMobile ? '100%' : '304px'}
                alignItems="center"
              >
                <Typography
                  color={PALETTE.secondary.grey[3]}
                  sx={{ textAlign: 'center' }}
                  bold
                >
                  There is no Content currently assigned to this Device. Add a
                  Folder to get started.
                </Typography>
              </Stack>
            </Stack>
          </UrsorFadeIn>
        </Stack>
      )}
      {folderDeviceRemovalConfirmationDialogId ? (
        <FolderDeviceRemovalConfirmationDialog
          open={true}
          onClose={() => setFolderDeviceRemovalConfirmationDialogId(undefined)}
          onSubmit={() =>
            ApiController.removeFolderFromDevice(
              folderDeviceRemovalConfirmationDialogId,
              props.deviceId
            )
              .then(props.onUpdate)
              .then(() =>
                notificationCtx.negativeSuccess('Removed Folder from Device.')
              )
          }
          deviceName={props.deviceName}
          isMobile={props.isMobile}
        />
      ) : null}
    </ProfilePageTabLayout>
  )
}

export default DevicePageContentTab
