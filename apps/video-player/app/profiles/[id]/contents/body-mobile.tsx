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
import DevicePageMonitoringTab from "../components/MonitoringTab";
import DevicePageSettingsTab from "../components/SettingsTab";
import DevicePageContentTab from "../components/ContentTab";
import Link from "next/link";
import { useState } from "react";
import { AstroAccountTab } from "./common";
import MobilePageLayout from "@/app/components/MobilePageLayout";

const ProfilePageMobileBody = (props: {
  device: IDevice;
  titleRow: ITitleRowItem[];
  actions: IActionPopupItem[];
}) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<AstroAccountTab>("monitoring");
  return (
    <MobilePageLayout titleRow={props.titleRow}>
      <Stack pl="48px">
        <Stack
          bgcolor="rgb(255,255,255)"
          height="52px"
          minHeight="52px"
          borderRadius="12px"
          px="16px"
          boxSizing="border-box"
          alignItems="center"
          spacing="20px"
          direction="row"
        >
          <Typography bold variant="large">
            Currently viewing
          </Typography>
          <Link
            href="https://nintendo.com"
            target="_blank"
            style={{
              textDecoration: "none",
            }}
          >
            <Stack
              alignItems="center"
              spacing="12px"
              direction="row"
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.7 },
                transition: "0.2s",
                svg: { path: { fill: PALETTE.secondary.purple[2] } },
              }}
            >
              <Stack
                height="28px"
                width="28px"
                borderRadius="7px"
                overflow="hidden"
              >
                <Image
                  src="https://ursorassets.s3.eu-west-1.amazonaws.com/lele_profile.jpg"
                  height={28}
                  width={28}
                  alt="most viewed favicon"
                />
              </Stack>
              <Typography
                variant="large"
                bold
                color={PALETTE.secondary.blue[3]}
              >
                nintendo.com/i-wanna-marry-princess-peach
              </Typography>
              <LinkExternalIcon width="24px" height="24px" />
            </Stack>
          </Link>
        </Stack>
      </Stack>
      <Stack minHeight="24px" alignItems="center">
        <Stack height="1px" bgcolor={PALETTE.secondary.grey[1]}></Stack>
      </Stack>
      <Stack pl="48px" spacing="24px">
        <AstroTabSwitch
          select={(id) => setSelectedTab(id as AstroAccountTab)}
          selected={selectedTab}
          items={[
            {
              text: "Monitoring",
              id: "monitoring",
            },
            {
              text: "Settings",
              id: "settings",
            },
            {
              text: "Content",
              id: "content",
            },
          ]}
        />
        {selectedTab === "monitoring" ? (
          <DevicePageMonitoringTab />
        ) : selectedTab === "settings" ? (
          <DevicePageSettingsTab />
        ) : (
          <DevicePageContentTab />
        )}
      </Stack>
    </MobilePageLayout>
  );
};

export default ProfilePageMobileBody;
