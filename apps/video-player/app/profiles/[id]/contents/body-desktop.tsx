import PageLayout from "@/app/components/PageLayout";
import { IDevice } from "@/app/filters/[id]/contents/common";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { PALETTE, Typography, UrsorButton } from "ui";
import { ITitleRowItem } from "@/app/components/TitleRow";
import AstroTabSwitch from "../components/AstroTabSwitch";
import { IActionPopupItem } from "@/app/components/ActionPopup";
import DevicePageInsightsTab from "../components/InsightsTab";
import DevicePageContentTab from "../components/ContentTab";
import { useState } from "react";
import { AstroAccountTab } from "./common";
import HorizontalDeviceCard from "../../components/HorizontalDeviceCard";
import DevicePageLimitsTab from "../components/LimitsTab";
import { IEnrichedContentBucket } from "@/app/folders/contents/common";
import { IEnrichedDevice } from "../../contents/common";
import PlusIcon from "@/images/icons/PlusIcon.svg";

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
  return (
    <PageLayout
      titleRow={props.titleRow}
      titleBackButton={true}
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="devices"
      actions={props.actions}
      maxWidth={834}
      scrollable
    >
      <Stack pl="48px">
        <HorizontalDeviceCard
          {...props.device}
          onClickViewScreenTime={() => setSelectedTab("limits")}
          onUpdate={props.onUpdateDevice}
        />
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
          {selectedTab === "content" ? (
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
          ) : null}
        </Stack>
        {selectedTab === "insights" ? (
          <DevicePageInsightsTab />
        ) : selectedTab === "content" ? (
          <DevicePageContentTab
            deviceId={props.device.id}
            deviceName={props.device.name}
            folders={props.folders}
            onUpdate={props.onUpdateFolders}
          />
        ) : selectedTab === "limits" ? (
          <DevicePageLimitsTab deviceId={props.device.id} />
        ) : null}
      </Stack>
    </PageLayout>
  );
};

export default ProfilePageDesktopBody;
