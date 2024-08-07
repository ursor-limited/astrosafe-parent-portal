import { IDevice } from "@/app/filters/[id]/contents/common";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { PALETTE, Typography, UrsorButton } from "ui";
import { ITitleRowItem } from "@/app/components/TitleRow";
import AstroTabSwitch from "../components/AstroTabSwitch";
import { IActionPopupItem } from "@/app/components/ActionPopup";
import DevicePageContentTab from "../components/ContentTab";
import { useState } from "react";
import { AstroAccountTab } from "./common";
import MobilePageLayout from "@/app/components/MobilePageLayout";
import DevicePageLimitsTab from "../components/LimitsTab";
import DevicePageMobileInsightsTab from "../components/MobileInsightsTab";
import { IEnrichedContentBucket } from "@/app/folders/contents/common";
import MobileDeviceCard from "../../components/MobileDeviceCard";
import PlusIcon from "@/images/icons/PlusIcon.svg";

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
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<AstroAccountTab>(
    props.tab ?? "content"
  );
  return (
    <MobilePageLayout titleRow={props.titleRow} selectedPage="profiles">
      <MobileDeviceCard
        {...props.device}
        onClickViewScreenTime={() => setSelectedTab("limits")}
        onUpdate={props.onUpdateDevice}
      />
      <Stack minHeight="24px" alignItems="center">
        <Stack height="1px" bgcolor={PALETTE.secondary.grey[1]}></Stack>
      </Stack>
      <Stack spacing="24px">
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
            width="100%"
          >
            Add Folder
          </UrsorButton>
        ) : null}
        {selectedTab === "insights" ? (
          <DevicePageMobileInsightsTab />
        ) : selectedTab === "content" ? (
          <DevicePageContentTab
            deviceId={props.device.id}
            deviceName={props.device.name}
            folders={props.folders}
            isMobile
            onUpdate={props.onUpdateFolders}
          />
        ) : selectedTab === "limits" ? (
          <DevicePageLimitsTab deviceId={props.device.id} isMobile />
        ) : null}
      </Stack>
    </MobilePageLayout>
  );
};

export default ProfilePageMobileBody;
