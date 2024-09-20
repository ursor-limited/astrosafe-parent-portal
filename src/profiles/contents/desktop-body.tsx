import DynamicCardGrid from './../../components/DynamicCardGrid'
import PageLayout from './../../components/PageLayout'
import { Stack } from '@mui/system'
import { ReactComponent as PlusIcon } from './../../images/PlusIcon.svg'
import { ReactComponent as PencilIcon } from './../../images/Pencil.svg'
import { ReactComponent as ArrowUpRightIcon } from './../../images/ArrowUpRight.svg'
import { IDevice } from './../../filter/contents/common'
import UrsorActionButton from './../../components/UrsorActionButton'
import useNavigate from '../../hooks/useNavigate'
import DeviceCard from '../components/DeviceCard'
import QRCodeView from '../components/QRCodeView'
import UrsorFadeIn from './../../components/UrsorFadeIn'
import { IEnrichedDevice } from './common'
import { IFilter } from '../../astrosafe/components/filters/AllFilters'

const AllDevicesPageDesktopBody = (props: {
  devices: IEnrichedDevice[]
  filters: IFilter[]
  setConnectDialogOpen: () => any
  // setDownloadDialogOpen: () => any;
  setRenameDeviceDialogId: (id: IDevice['id']) => any
  setDisconnectDialogOpen: (id: IDevice['id']) => any
  email: string
}) => {
  const navigate = useNavigate()
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
                          kallback: () => navigate.push(`/profiles/${d.id}`),
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
            <QRCodeView email={props.email} />
          </UrsorFadeIn>
        )}
      </Stack>
    </PageLayout>
  )
}

export default AllDevicesPageDesktopBody
