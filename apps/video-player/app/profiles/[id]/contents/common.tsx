"use client";

import React, { useCallback, useEffect, useState } from "react";
import PlugIcon from "@/images/icons/PlugIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import Image from "next/image";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import _ from "lodash";
import { useRouter } from "next/navigation";
import DevicePageContentTab from "../components/ContentTab";
import ApiController from "@/app/api";
import PageLayout from "@/app/components/PageLayout";
import { DUMMY_GROUP_ID } from "@/app/filters/contents/body-mobile";
import { IDevice } from "@/app/filters/[id]/contents/common";
import ProfilePageDesktopBody from "./body-desktop";
import DeviceRenameDialog from "../../components/DeviceRenameDialog";
import DeviceDisconnectDialog from "../../components/DeviceDisconnectDialog";
import ProfilePageMobileBody from "./body-mobile";
import { DEVICE_TYPE_DISPLAY_NAMES } from "../../components/DeviceCard";

export type DeviceType = "chrome" | "android" | "ios";

export type AstroAccountTab = "content" | "insights" | "apps" | "limits";

export default function ProfilePage(props: {
  deviceId: number;
  isMobile: boolean;
}) {
  const [device, setDevice] = useState<IDevice | undefined>();
  const loadDevice = useCallback(
    () => ApiController.getDevice(props.deviceId).then((d) => setDevice(d)),
    [props.deviceId]
  );
  useEffect(() => {
    loadDevice();
  }, [loadDevice]);

  const router = useRouter();

  const [renameDialogOpen, setRenameDialogOpen] = useState<boolean>(false);
  const [disconnectDialogOpen, setDisconnectDialogOpen] =
    useState<boolean>(false);

  const [allDevices, setAllDevices] = useState<IDevice[]>([]);
  useEffect(() => {
    ApiController.getGroupDevices(DUMMY_GROUP_ID).then((d) => setAllDevices(d));
  }, []);

  const titleRow = [
    {
      text: "All Devices",
      callback: () => router.push("/profiles"),
    },
    {
      text: device?.name ?? "",
      image: (
        <Stack position="relative" borderRadius="100%">
          <Stack borderRadius="100%" overflow="hidden">
            <Image
              height={36}
              width={36}
              src={device?.profileAvatarUrl ?? ""}
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
      ),
      options: allDevices.map((d) => ({
        text: d.name,
        imageUrl: d.profileAvatarUrl,
        callback: () => router.push(`/profiles/${d.id}`),
      })),
      label: device?.deviceType
        ? DEVICE_TYPE_DISPLAY_NAMES[device.deviceType as DeviceType]
        : undefined,
    },
  ];

  const actions = [
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
  ];

  return device ? (
    <>
      {props.isMobile ? (
        <ProfilePageMobileBody
          device={device}
          titleRow={titleRow}
          actions={actions}
        />
      ) : (
        <ProfilePageDesktopBody
          device={device}
          titleRow={titleRow}
          actions={actions}
        />
      )}
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
  ) : (
    <></>
  );
}
