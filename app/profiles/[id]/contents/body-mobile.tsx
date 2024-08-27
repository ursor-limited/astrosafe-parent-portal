import { IDevice } from '@/filters/[id]/contents/common';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { PALETTE, Typography, UrsorButton } from '@/ui';
import { ITitleRowItem } from '@/components/TitleRow';
import AstroTabSwitch from '../components/AstroTabSwitch';
import { IActionPopupItem } from '@/components/ActionPopup';
import DevicePageContentTab from '../components/ContentTab';
import { useState } from 'react';
import { AstroAccountTab } from './common';
import MobilePageLayout from '@/components/MobilePageLayout';
import DevicePageLimitsTab from '../components/LimitsTab';
import DevicePageMobileInsightsTab from '../components/MobileInsightsTab';
import { IEnrichedContentBucket } from '@/folders/contents/common';
import MobileDeviceCard from '../../components/MobileDeviceCard';
import PlusIcon from '@/images/icons/PlusIcon.svg';
import DevicePageAppsTab from '../components/AppsTab';

const ProfilePageMobileBody = (props: {
  device: IDevice;
  titleRow: ITitleRowItem[];
  actions: IActionPopupItem[];
  folders: IEnrichedContentBucket[];
  tab?: AstroAccountTab;
  onUpdateDevice: () => void;
  onUpdateFolders: () => void;
  openAddFolderDialog: () => void;
}) => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<AstroAccountTab>(
    props.tab ?? 'content'
  );
  return (
    <MobilePageLayout
      titleRow={props.titleRow.slice(-1)[0]}
      titleBackButtonCallback={() => navigate('/profiles')}
      selectedPage="profiles"
      actions={props.actions}
    >
      <Stack spacing="24px" flex={1}>
        <MobileDeviceCard
          {...props.device}
          onClickViewScreenTime={() => setSelectedTab('limits')}
          onUpdate={props.onUpdateDevice}
          noDeviceTypeUnderAvatar
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
          <DevicePageMobileInsightsTab deviceId={props.device.id} />
        ) : selectedTab === 'apps' ? (
          <DevicePageAppsTab deviceId={props.device.id} isMobile />
        ) : selectedTab === 'content' ? (
          <DevicePageContentTab
            deviceId={props.device.id}
            deviceName={props.device.name}
            folders={props.folders}
            onUpdate={props.onUpdateFolders}
            openAddFolderDialog={props.openAddFolderDialog}
            isMobile
          />
        ) : selectedTab === 'limits' ? (
          <DevicePageLimitsTab deviceId={props.device.id} isMobile />
        ) : null}
      </Stack>
    </MobilePageLayout>
  );
};

export default ProfilePageMobileBody;
