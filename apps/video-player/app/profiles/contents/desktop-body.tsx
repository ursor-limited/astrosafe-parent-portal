import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import PageLayout from "@/app/components/PageLayout";
import { Stack } from "@mui/system";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import PlugIcon from "@/images/icons/PlugIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import ArrowUpRightIcon from "@/images/icons/ArrowUpRight.svg";
import { IDevice } from "@/app/filters/[id]/contents/common";
import DeviceInstructionsView from "../components/DeviceInstructionsView";
import UrsorActionButton from "@/app/components/UrsorActionButton";
import { PALETTE } from "ui";
import { useRouter } from "next/navigation";
import DeviceCard from "../components/DeviceCard";
import QRCodeView from "../components/QRCodeView";

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
      title="My Kids"
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
      <Stack px="50px" flex={1} pb="31px">
        {props.devices.length > 0 ? (
          <DynamicCardGrid cardWidth="355px" rowGap="20px" columnGap="20px">
            {props.devices.map((d) => (
              <DeviceCard
                key={d.id}
                {...d}
                showBrowsing
                url="nintendo.com/bopioijgorfrifunrifjni"
                button={
                  <UrsorActionButton
                    size="18px"
                    iconSize="18px"
                    actions={[
                      {
                        text: "Open",
                        kallback: () => router.push(`/profiles/${d.id}`),
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
          <QRCodeView />
        )}
      </Stack>
    </PageLayout>
  );
};

export default AllDevicesPageDesktopBody;
