import { IDevice } from './../../filter/contents/common'
import { Stack } from '@mui/system'
import useNavigate from '../../hooks/useNavigate'
import { PALETTE, Typography, UrsorButton } from './../../ui'
import { ITitleRowItem } from './../../components/TitleRow'
import AstroTabSwitch from '../components/AstroTabSwitch'
import { IActionPopupItem } from './../../components/ActionPopup'
import DevicePageContentTab from '../components/ContentTab'
import { useState } from 'react'
import { AstroAccountTab } from './common'
import MobilePageLayout from './../../components/MobilePageLayout'
import DevicePageLimitsTab from '../components/LimitsTab'
import DevicePageMobileInsightsTab from '../components/MobileInsightsTab'
import { IEnrichedContentBucket } from './../../folders/contents/common'
import MobileDeviceCard from '../../profiles/components/MobileDeviceCard'
import { ReactComponent as PlusIcon } from './../../images/PlusIcon.svg'
import DevicePageAppsTab from '../components/AppsTab'

const ProfilePageMobileBody = ({
  email,
  device,
  titleRow,
  actions,
  folders,
  tab,
  isProd,
  onUpdateDevice,
  onUpdateFolders,
  openAddFolderDialog,
}: {
  email: string
  device: IDevice
  titleRow: ITitleRowItem[]
  actions: IActionPopupItem[]
  folders: IEnrichedContentBucket[]
  tab?: AstroAccountTab
  isProd: boolean
  onUpdateDevice: () => any
  onUpdateFolders: () => any
  openAddFolderDialog: () => any
}) => {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState<AstroAccountTab>(
    tab ?? 'content'
  )

  return (
    <MobilePageLayout
      titleRow={titleRow.slice(-1)[0]}
      titleBackButtonCallback={() => navigate.push('/profiles')}
      selectedPage="profiles"
      actions={actions}
    >
      <Stack spacing="24px" flex={1}>
        <MobileDeviceCard
          email={email}
          {...device}
          onClickViewScreenTime={() => setSelectedTab('limits')}
          onUpdate={onUpdateDevice}
          noDeviceTypeUnderAvatar
          isProd={isProd}
        />
        <Stack width="100%" alignItems="center" justifyContent="center">
          <Stack
            height="1px"
            width="100%"
            bgcolor={PALETTE.secondary.grey[2]}
          />
        </Stack>
        <AstroTabSwitch
          select={(id) => setSelectedTab(id as AstroAccountTab)}
          selected={selectedTab}
          items={[
            {
              text: 'Content',
              id: 'content',
            },
            {
              text: 'Apps',
              id: 'apps',
            },
            {
              text: 'Insights',
              id: 'insights',
            },
            {
              text: 'Limits',
              id: 'limits',
            },
          ]}
        />
        {selectedTab === 'insights' ? (
          <DevicePageMobileInsightsTab
            email={email}
            deviceId={device.id}
            isProd={isProd}
          />
        ) : selectedTab === 'apps' ? (
          <DevicePageAppsTab deviceId={device.id} isMobile isProd={isProd} />
        ) : selectedTab === 'content' ? (
          <DevicePageContentTab
            deviceId={device.id}
            deviceName={device.name}
            folders={folders}
            onUpdate={onUpdateFolders}
            openAddFolderDialog={openAddFolderDialog}
            isMobile
            isProd={isProd}
          />
        ) : selectedTab === 'limits' ? (
          <DevicePageLimitsTab deviceId={device.id} isMobile isProd={isProd} />
        ) : null}
      </Stack>
    </MobilePageLayout>
  )
}

export default ProfilePageMobileBody
