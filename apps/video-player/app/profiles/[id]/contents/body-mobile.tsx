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
import DevicePageContentTab, {
  IContentBucket,
  IGroupContentBucket,
} from "../components/ContentTab";
import { useState } from "react";
import { AstroAccountTab } from "./common";
import MobilePageLayout from "@/app/components/MobilePageLayout";
import DevicePageLimitsTab from "../components/LimitsTab";
import HorizontalDeviceCard from "../../components/HorizontalDeviceCard";
import DevicePageMobileInsightsTab from "../components/MobileInsightsTab";

const ProfilePageMobileBody = (props: {
  device: IDevice;
  titleRow: ITitleRowItem[];
  actions: IActionPopupItem[];
  folders: IGroupContentBucket[];
  tab?: AstroAccountTab;
}) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<AstroAccountTab>(
    props.tab ?? "content"
  );
  return (
    <MobilePageLayout titleRow={props.titleRow} selectedPage="profiles">
      <Stack overflow="scroll">
        <HorizontalDeviceCard {...props.device} />
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
          <DevicePageLimitsTab />
        ) : null}
      </Stack>
    </MobilePageLayout>
  );
};

export default ProfilePageMobileBody;