"use client";

import React, { useCallback, useEffect, useState } from "react";
import PlugIcon from "@/images/icons/PlugIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import LinkExternalIcon from "@/images/icons/LinkExternalIcon.svg";
import Image from "next/image";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import _ from "lodash";
import AstroTabSwitch from "./AstroTabSwitch";
import DevicePageMonitoringTab from "./MonitoringTab";
import DevicePageSettingsTab from "./SettingsTab";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DevicePageContentTab from "./ContentTab";
import DeviceRenameDialog from "../components/DeviceRenameDialog";
import DeviceDisconnectDialog from "../components/DeviceDisconnectDialog";
import ApiController from "@/app/api";
import { DEVICE_TYPE_DISPLAY_NAMES } from "../components/DeviceCard";
import PageLayout from "@/app/components/PageLayout";
import { DUMMY_GROUP_ID } from "@/app/filters/contents/body-mobile";
import { IDevice } from "@/app/filters/[id]/contents/common";

export type DeviceType = "chrome" | "android" | "ios";

type AstroAccountTab = "monitoring" | "settings" | "content";

export default function DevicePageContents(props: { deviceId: number }) {
  const [device, setDevice] = useState<IDevice | undefined>();
  const loadDevice = useCallback(
    () => ApiController.getDevice(props.deviceId).then((d) => setDevice(d)),
    [props.deviceId]
  );
  useEffect(() => {
    loadDevice();
  }, [loadDevice]);

  const [selectedTab, setSelectedTab] = useState<AstroAccountTab>("monitoring");

  const router = useRouter();

  const [renameDialogOpen, setRenameDialogOpen] = useState<boolean>(false);
  const [disconnectDialogOpen, setDisconnectDialogOpen] =
    useState<boolean>(false);

  const [allDevices, setAllDevices] = useState<IDevice[]>([]);
  useEffect(() => {
    ApiController.getGroupDevices(DUMMY_GROUP_ID).then((d) => setAllDevices(d));
  }, []);

  return (
    <>
      <PageLayout
        titleRow={[
          {
            text: "All Devices",
            callback: () => router.push("/devices"),
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
            options: allDevices.map((d) => ({
              text: d.name,
              imageUrl: d.profileAvatarUrl,
              callback: () => router.push(`/devices/${d.id}`),
            })),
            label: device?.deviceType
              ? DEVICE_TYPE_DISPLAY_NAMES[device.deviceType as DeviceType]
              : undefined,
          },
        ]}
        titleBackButton={true}
        bodyWidth="100%"
        fullHeight
        selectedSidebarItemId="devices"
        actions={[
          {
            text: "Edit name",
            kallback: () => setRenameDialogOpen(true),
            icon: PencilIcon,
          },
          {
            text: "Disconnect",
            kallback: () => setDisconnectDialogOpen(true),
            icon: PlugIcon,
            color: PALETTE.system.red,
          },
        ]}
        maxWidth={834}
        scrollable
      >
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
      </PageLayout>
      <DeviceRenameDialog
        open={renameDialogOpen}
        onClose={() => setRenameDialogOpen(false)}
        onSubmit={(name) => {
          ApiController.renameDevice(props.deviceId, name).then(loadDevice);
          setRenameDialogOpen(false);
        }}
      />
      <DeviceDisconnectDialog
        open={disconnectDialogOpen}
        onClose={() => setDisconnectDialogOpen(false)}
        onSubmit={() => null}
      />
    </>
  );
}
