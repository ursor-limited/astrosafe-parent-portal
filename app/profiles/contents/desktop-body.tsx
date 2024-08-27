import DynamicCardGrid from '@/app/components/DynamicCardGrid';
import PageLayout from '@/app/components/PageLayout';
import { Stack } from '@mui/system';
import PlusIcon from '@/images/icons/PlusIcon.svg';
import PencilIcon from '@/images/icons/Pencil.svg';
import ArrowUpRightIcon from '@/images/icons/ArrowUpRight.svg';
import { IDevice } from '@/app/filters/[id]/contents/common';
import UrsorActionButton from '@/app/components/UrsorActionButton';
import { useNavigate } from 'react-router-dom';
import DeviceCard from '../components/DeviceCard';
import QRCodeView from '../components/QRCodeView';
import UrsorFadeIn from '@/app/components/UrsorFadeIn';
import { IEnrichedDevice } from './common';
import { IFilter } from '@/app/filters/contents/common';

const AllDevicesPageDesktopBody = (props: {
  devices: IEnrichedDevice[];
  filters: IFilter[];
  setConnectDialogOpen: () => void;
  // setDownloadDialogOpen: () => void;
  setRenameDeviceDialogId: (id: IDevice['id']) => void;
  setDisconnectDialogOpen: (id: IDevice['id']) => void;
}) => {
  const navigate = useNavigate();
  return (
    <PageLayout
      title="My Kids"
      titleBackButton={true}
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="devices"
      button={{
        text: 'Add a Device',
        callback: props.setConnectDialogOpen,
        icon: PlusIcon,
      }}
      //   secondaryButton={{
      //     text: "Get Browser",
      //     callback: props.setDownloadDialogOpen,
      //     icon: DownloadIcon,
      //   }}
      maxWidth={834}
      scrollable
    >
      <Stack pl="50px" flex={1} pb="31px">
        {props.devices.length > 0 ? (
          <DynamicCardGrid cardWidth="355px" rowGap="20px" columnGap="20px">
            {props.devices.map((d, i) => (
              <UrsorFadeIn key={d.id} delay={i * 100} duration={800}>
                <DeviceCard
                  {...d}
                  showBrowsing
                  filterName={
                    props.filters.find((f) => f.id === d.filterId)?.title ?? ''
                  }
                  button={
                    <UrsorActionButton
                      size="18px"
                      iconSize="18px"
                      actions={[
                        {
                          text: 'Open',
                          kallback: () => navigate(`/profiles/${d.id}`),
                          icon: ArrowUpRightIcon,
                        },
                        {
                          text: 'Edit name',
                          kallback: () => props.setRenameDeviceDialogId(d.id),
                          icon: PencilIcon,
                        },
                        // {
                        //   text: "Disconnect",
                        //   kallback: () => props.setDisconnectDialogOpen(d.id),
                        //   icon: PlugIcon,
                        //   color: PALETTE.system.red,
                        // },
                      ]}
                    />
                  }
                />
              </UrsorFadeIn>
            ))}
          </DynamicCardGrid>
        ) : (
          <UrsorFadeIn delay={700} duration={800}>
            <QRCodeView />
          </UrsorFadeIn>
        )}
      </Stack>
    </PageLayout>
  );
};

export default AllDevicesPageDesktopBody;
