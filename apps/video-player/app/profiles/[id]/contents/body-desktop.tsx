import PageLayout from "@/app/components/PageLayout";
import { IDevice } from "@/app/filters/[id]/contents/common";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { PALETTE, Typography } from "ui";
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

const ProfilePageDesktopBody = (props: {
  device: IEnrichedDevice;
  titleRow: ITitleRowItem[];
  actions: IActionPopupItem[];
  folders: IEnrichedContentBucket[];
  tab?: AstroAccountTab;
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
        <HorizontalDeviceCard {...props.device} />
        <Stack flex={1} height="56px" minHeight="56px" justifyContent="center">
          <Stack
            height="1px"
            width="100%"
            bgcolor={PALETTE.secondary.grey[2]}
          />
        </Stack>
      </Stack>
      <Stack pl="48px" spacing="24px">
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
        {selectedTab === "insights" ? (
          <DevicePageInsightsTab />
        ) : selectedTab === "content" ? (
          <DevicePageContentTab folders={props.folders} />
        ) : selectedTab === "limits" ? (
          <DevicePageLimitsTab deviceId={props.device.id} />
        ) : null}
      </Stack>
    </PageLayout>
  );
};

export default ProfilePageDesktopBody;
