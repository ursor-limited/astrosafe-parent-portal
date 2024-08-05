import { IDevice } from "@/app/filters/[id]/contents/common";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { PALETTE, Typography } from "ui";
import { ITitleRowItem } from "@/app/components/TitleRow";
import AstroTabSwitch from "../components/AstroTabSwitch";
import { IActionPopupItem } from "@/app/components/ActionPopup";
import DevicePageContentTab from "../components/ContentTab";
import { useState } from "react";
import { AstroAccountTab } from "./common";
import MobilePageLayout from "@/app/components/MobilePageLayout";
import DevicePageLimitsTab from "../components/LimitsTab";
import HorizontalDeviceCard from "../../components/HorizontalDeviceCard";
import DevicePageMobileInsightsTab from "../components/MobileInsightsTab";
import { IEnrichedContentBucket } from "@/app/folders/contents/common";

const ProfilePageMobileBody = (props: {
  device: IDevice;
  titleRow: ITitleRowItem[];
  actions: IActionPopupItem[];
  folders: IEnrichedContentBucket[];
  tab?: AstroAccountTab;
  onUpdateDevice: () => void;
}) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<AstroAccountTab>(
    props.tab ?? "content"
  );
  return (
    <MobilePageLayout titleRow={props.titleRow} selectedPage="profiles">
      <Stack overflow="scroll">
        <HorizontalDeviceCard
          {...props.device}
          onClickViewScreenTime={() => setSelectedTab("limits")}
          onUpdate={props.onUpdateDevice}
        />
      </Stack>
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
        {selectedTab === "insights" ? (
          <DevicePageMobileInsightsTab />
        ) : selectedTab === "content" ? (
          <DevicePageContentTab folders={props.folders} />
        ) : selectedTab === "limits" ? (
          <DevicePageLimitsTab deviceId={props.device.id} />
        ) : null}
      </Stack>
    </MobilePageLayout>
  );
};

export default ProfilePageMobileBody;
