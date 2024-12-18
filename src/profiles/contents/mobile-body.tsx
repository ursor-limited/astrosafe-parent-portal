import { Stack } from '@mui/system'
import { ReactComponent as PlusIcon } from './../../images/PlusIcon.svg'
import { ReactComponent as PlugIcon } from './../../images/PlugIcon.svg'
import { ReactComponent as PencilIcon } from './../../images/Pencil.svg'
import { ReactComponent as ArrowUpRightIcon } from './../../images/ArrowUpRight.svg'
import { IDevice } from './../../filter/contents/common'
import DeviceInstructionsView from '../components/DeviceInstructionsView'
import UrsorActionButton from './../../components/UrsorActionButton'
import { PALETTE, UrsorButton } from './../../ui'
import useNavigate from '../../hooks/useNavigate'
import MobilePageLayout from './../../components/MobilePageLayout'
import DeviceCard from '../components/DeviceCard'
import { IFilter } from '../../astrosafe/components/filters/AllFilters'

const AllDevicesPageMobileBody = (props: {
  devices: IDevice[]
  filters: IFilter[]
  setConnectDialogOpen: () => any
  //setDownloadDialogOpen: () => any;
  setRenameDeviceDialogId: (id: IDevice['id']) => any
  setDisconnectDialogOpen: (id: IDevice['id']) => any
}) => {
  const navigate = useNavigate()
  return (
    // <PageLayout
    //   title="My Devices"
    //   titleBackButton={true}
    //   bodyWidth="100%"
    //   fullHeight
    //   selectedSidebarItemId="devices"
    //   button={{
    //     text: "Add a Device",
    //     callback: props.setConnectDialogOpen,
    //     icon: PlusIcon,
    //   }}
    //   secondaryButton={{
    //     text: "Get Browser",
    //     callback: props.setDownloadDialogOpen,
    //     icon: DownloadIcon,
    //   }}
    //   maxWidth={834}
    //   scrollable
    // >
    <MobilePageLayout
      title="My Kids"
      selectedPage="profiles"
      topRightElement={
        <Stack direction="row" spacing="8px">
          {/* <UrsorButton
            size="small"
            endIcon={PlusIcon}
            variant="secondary"
            onClick={props.setDownloadDialogOpen}
          >
            Get Browser
          </UrsorButton> */}
          <UrsorButton
            size="small"
            endIcon={PlusIcon}
            dark
            variant="tertiary"
            onClick={props.setConnectDialogOpen}
          >
            Add a Device
          </UrsorButton>
        </Stack>
      }
    >
      <Stack flex={1}>
        {props.devices.length > 0 ? (
          <Stack spacing="12px">
            {props.devices.map((d) => (
              <DeviceCard
                key={d.id}
                {...d}
                showBrowsing
                filterName={
                  props.filters.find((f) => f.id === d.filterId)?.title ?? ''
                }
                button={
                  <UrsorActionButton
                    size="16px"
                    iconSize="16px"
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
            ))}
          </Stack>
        ) : (
          <DeviceInstructionsView />
        )}
      </Stack>
    </MobilePageLayout>
  )
}

export default AllDevicesPageMobileBody
