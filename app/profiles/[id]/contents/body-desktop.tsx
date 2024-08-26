import PageLayout from "@/app/components/PageLayout";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { PALETTE } from "@/ui";
import { ITitleRowItem } from "@/app/components/TitleRow";
import AstroTabSwitch from "../components/AstroTabSwitch";
import { IActionPopupItem } from "@/app/components/ActionPopup";
import DevicePageInsightsTab from "../components/InsightsTab";
import DevicePageContentTab from "../components/ContentTab";
import { useEffect, useState } from "react";
import { AstroAccountTab } from "./common";
import HorizontalDeviceCard from "../../components/HorizontalDeviceCard";
import DevicePageLimitsTab from "../components/LimitsTab";
import { IEnrichedContentBucket } from "@/app/folders/contents/common";
import { IEnrichedDevice } from "../../contents/common";
import DevicePageAppsTab, { IApp } from "../components/AppsTab";
import { useWindowSize } from "usehooks-ts";
import MobileDeviceCard from "../../components/MobileDeviceCard";

const SWITCH_TO_MOBILE_DEVICE_CARD_WINDOW_WIDTH_THRESHOLD = 1283;

const ProfilePageDesktopBody = (props: {
  device: IEnrichedDevice;
  titleRow: ITitleRowItem[];
  actions: IActionPopupItem[];
  folders: IEnrichedContentBucket[];
  tab?: AstroAccountTab;
  onUpdateDevice: () => void;
  onUpdateFolders: () => void;
  openAddFolderDialog: () => void;
}) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<AstroAccountTab>(
    props.tab ?? "content"
  );
  const { width } = useWindowSize();
  const [switchToMobileDeviceCard, setSwitchToMobileDeviceCard] =
    useState<boolean>(false);
  useEffect(() => {
    setSwitchToMobileDeviceCard(
      width < SWITCH_TO_MOBILE_DEVICE_CARD_WINDOW_WIDTH_THRESHOLD
    );
  }, [width]);
  return (
    <PageLayout
      titleRow={props.titleRow}
      titleBackButtonCallback={() => router.push("/profiles")}
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="devices"
      actions={props.actions}
      maxWidth={834}
      scrollable
    >
      <Stack pl="48px">
        {switchToMobileDeviceCard ? (
          <MobileDeviceCard
            {...props.device}
            onClickViewScreenTime={() => setSelectedTab("limits")}
            onUpdate={props.onUpdateDevice}
            noDeviceTypeUnderAvatar
          />
        ) : (
          <HorizontalDeviceCard
            {...props.device}
            onClickViewScreenTime={() => setSelectedTab("limits")}
            onUpdate={props.onUpdateDevice}
          />
        )}
        <Stack flex={1} height="56px" minHeight="56px" justifyContent="center">
          <Stack
            height="1px"
            width="100%"
            bgcolor={PALETTE.secondary.grey[2]}
          />
        </Stack>
      </Stack>
      <Stack pl="48px" spacing="24px">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          height="fit"
        >
          <AstroTabSwitch
            select={(id) => setSelectedTab(id as AstroAccountTab)}
            selected={selectedTab}
            items={[
              {
                text: "Content",
                id: "content",
              },
              {
                text: "Apps",
                id: "apps",
              },
              {
                text: "Insights",
                id: "insights",
              },
              {
                text: "Limits",
                id: "limits",
              },
            ]}
          />
        </Stack>
        {selectedTab === "insights" ? (
          <DevicePageInsightsTab deviceId={props.device.id} />
        ) : selectedTab === "apps" ? (
          <DevicePageAppsTab deviceId={props.device.id} />
        ) : selectedTab === "content" ? (
          <DevicePageContentTab
            deviceId={props.device.id}
            deviceName={props.device.name}
            folders={props.folders}
            onUpdate={props.onUpdateFolders}
            openAddFolderDialog={props.openAddFolderDialog}
          />
        ) : selectedTab === "limits" ? (
          <DevicePageLimitsTab deviceId={props.device.id} />
        ) : null}
      </Stack>
    </PageLayout>
  );
};

export default ProfilePageDesktopBody;
