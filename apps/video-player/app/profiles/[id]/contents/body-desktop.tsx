import PageLayout from "@/app/components/PageLayout";
import { IDevice } from "@/app/filters/[id]/contents/common";
import { Stack } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PALETTE, Typography } from "ui";
import LinkExternalIcon from "@/images/icons/LinkExternalIcon.svg";
import { ITitleRowItem } from "@/app/components/TitleRow";
import AstroTabSwitch from "../components/AstroTabSwitch";
import { IActionPopupItem } from "@/app/components/ActionPopup";
import DevicePageInsightsTab from "../components/InsightsTab";
import DevicePageSettingsTab from "../components/SettingsTab";
import DevicePageContentTab from "../components/ContentTab";
import Link from "next/link";
import { useState } from "react";
import { AstroAccountTab } from "./common";
import DeviceCard from "../../components/DeviceCard";
import HorizontalDeviceCard from "../../components/HorizontalDeviceCard";

const ProfilePageDesktopBody = (props: {
  device: IDevice;
  titleRow: ITitleRowItem[];
  actions: IActionPopupItem[];
}) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<AstroAccountTab>("insights");
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
          ]}
        />
        {selectedTab === "insights" ? (
          <DevicePageInsightsTab />
        ) : selectedTab === "content" ? (
          <DevicePageContentTab />
        ) : null}
      </Stack>
    </PageLayout>
  );
};

export default ProfilePageDesktopBody;
