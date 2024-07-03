"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import DownloadIcon from "@/images/icons/DownloadIcon.svg";
import PageLayout from "@/app/dashboard/PageLayout";
import {
  DUMMY_DEVICES,
  IDevice_new,
} from "@/app/filters/[id]/FilterPageContents";
import Image from "next/image";
import { Stack } from "@mui/system";
import { PALETTE } from "ui";

export type DeviceType = "chrome" | "android" | "ios";

export default function DevicePageContents(props: { deviceId: number }) {
  const [device, setDevice] = useState<IDevice_new | undefined>();
  useEffect(() => {
    setDevice(DUMMY_DEVICES.find((d) => d.id === props.deviceId));
  }, [props.deviceId]);
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
          options: ["oo"],
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
    ></PageLayout>
  );
}
