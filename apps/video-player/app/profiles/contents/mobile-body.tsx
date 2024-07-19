import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import PageLayout from "@/app/components/PageLayout";
import { Stack } from "@mui/system";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import DownloadIcon from "@/images/icons/DownloadIcon.svg";
import PlugIcon from "@/images/icons/PlugIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import ArrowUpRightIcon from "@/images/icons/ArrowUpRight.svg";
import { IDevice } from "@/app/filters/[id]/contents/common";
import DeviceInstructionsView from "../components/DeviceInstructionsView";
import DeviceCard from "../components/DeviceCard";
import UrsorActionButton from "@/app/components/UrsorActionButton";
import { PALETTE, UrsorButton } from "ui";
import { useRouter } from "next/navigation";
import MobilePageLayout from "@/app/components/MobilePageLayout";

const AllDevicesPageMobileBody = (props: {
  devices: IDevice[];
  setConnectDialogOpen: () => void;
  //setDownloadDialogOpen: () => void;
  setRenameDeviceDialogId: (id: IDevice["id"]) => void;
  setDisconnectDialogOpen: (id: IDevice["id"]) => void;
}) => {
  const router = useRouter();
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
      title="My Devices"
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
                url="got to bind this url up too"
                button={
                  <UrsorActionButton
                    size="16px"
                    iconSize="16px"
                    actions={[
                      {
                        text: "Open",
                        kallback: () => router.push(`/devices/${d.id}`),
                        icon: ArrowUpRightIcon,
                      },
                      {
                        text: "Edit name",
                        kallback: () => props.setRenameDeviceDialogId(d.id),
                        icon: PencilIcon,
                      },
                      {
                        text: "Disconnect",
                        kallback: () => props.setDisconnectDialogOpen(d.id),
                        icon: PlugIcon,
                        color: PALETTE.system.red,
                      },
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
  );
};

export default AllDevicesPageMobileBody;
