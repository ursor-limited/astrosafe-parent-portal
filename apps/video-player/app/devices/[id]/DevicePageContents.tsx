"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import DownloadIcon from "@/images/icons/DownloadIcon.svg";
import LinkExternalIcon from "@/images/icons/LinkExternalIcon.svg";
import PageLayout from "@/app/dashboard/PageLayout";
import {
  DUMMY_DEVICES,
  IDevice_new,
} from "@/app/filters/[id]/FilterPageContents";
import Image from "next/image";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import _ from "lodash";
import AstroTabSwitch from "./AstroTabSwitch";
import DevicePageMonitoringTab from "./MonitoringTab";
import DevicePageSettingsTab from "./SettingsTab";
import Link from "next/link";

export type DeviceType = "chrome" | "android" | "ios";

type AstroAccountTab = "monitoring" | "settings" | "content";

export default function DevicePageContents(props: { deviceId: number }) {
  const [device, setDevice] = useState<IDevice_new | undefined>();
  useEffect(() => {
    setDevice(
      DUMMY_DEVICES.find((d) => d.id.toString() === props.deviceId.toString())
    );
  }, [props.deviceId]);

  const [selectedTab, setSelectedTab] = useState<AstroAccountTab>("monitoring");
  return (
    <PageLayout
      titleRow={[
        {
          text: "All Devices",
        },
        {
          text: device?.name,
          image: device ? (
            <Stack position="relative" borderRadius="100%">
              <Stack borderRadius="100%" overflow="hidden">
                <Image
                  height={36}
                  width={36}
                  src={device.profileAvatarUrl}
                  alt="profile avatar"
                />
              </Stack>
              {device?.connected ? (
                <Stack
                  height="11px"
                  width="11px"
                  border={`2px solid ${PALETTE.secondary.grey[1]}`}
                  borderRadius="100%"
                  bgcolor={PALETTE.system.green}
                  position="absolute"
                  bottom={0}
                  right={0}
                  sx={{ transform: "translate(2px, 2px)" }}
                />
              ) : null}
            </Stack>
          ) : null,
          options: [
            {
              text: "Boo",
              imageUrl:
                "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_profile.jpg",
              callback: () => null,
            },
            {
              text: "gooo",
              imageUrl:
                "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_profile.jpg",
              callback: () => null,
            },
          ],
        },
      ]}
      titleBackButton={true}
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="channels"
      button={{
        text: "Add a Device",
        callback: () => null,
        icon: PlusIcon,
      }}
      secondaryButton={{
        text: "Get Browser",
        callback: () => null,
        icon: DownloadIcon,
      }}
      maxWidth={834}
      scrollable
    >
      <Stack px="48px">
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
      <Stack height="24px" alignItems="center">
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
        ) : null}
      </Stack>
    </PageLayout>
  );
}
