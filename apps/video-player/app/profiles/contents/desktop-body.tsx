import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import PageLayout from "@/app/components/PageLayout";
import { Stack } from "@mui/system";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import PlugIcon from "@/images/icons/PlugIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import ArrowUpRightIcon from "@/images/icons/ArrowUpRight.svg";
import { IDevice } from "@/app/filters/[id]/contents/common";
import DeviceInstructionsView from "../components/DeviceInstructionsView";
import DeviceCard from "../components/DeviceCard";
import UrsorActionButton from "@/app/components/UrsorActionButton";
import { PALETTE } from "ui";
import { useRouter } from "next/navigation";

const AllDevicesPageDesktopBody = (props: {
  devices: IDevice[];
  setConnectDialogOpen: () => void;
  // setDownloadDialogOpen: () => void;
  setRenameDeviceDialogId: (id: IDevice["id"]) => void;
  setDisconnectDialogOpen: (id: IDevice["id"]) => void;
}) => {
  const router = useRouter();
  return (
    <PageLayout
      title="My Devices"
      titleBackButton={true}
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="devices"
      button={{
        text: "Add a Device",
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
      <Stack px="50px" flex={1}>
        {props.devices.length > 0 ? (
          <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
            {props.devices.map((d) => (
              <DeviceCard
                key={d.id}
                {...d}
                showBrowsing
                url="nintendo.com/bopioijgorfrifunrifjni"
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
          </DynamicCardGrid>
        ) : (
          <DeviceInstructionsView />
        )}
      </Stack>
    </PageLayout>
  );
};

export default AllDevicesPageDesktopBody;
