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
import { PALETTE, Typography } from "ui";
import AstroTimeChart from "./AstroTimeChart";

export type DeviceType = "chrome" | "android" | "ios";

export default function DevicePageContents(props: { deviceId: number }) {
  const [device, setDevice] = useState<IDevice_new | undefined>();
  useEffect(() => {
    setDevice(DUMMY_DEVICES.find((d) => d.id === props.deviceId));
  }, [props.deviceId]);

  const [timeSpent, setTimeSpent] = useState<number>(59083);
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
    >
      <Stack pl="48px">
        <Stack height="290px" spacing="28px" direction="row">
          <Stack
            width="54%"
            borderRadius="12px"
            bgcolor="rgb(255,255,255)"
            p="16px"
            boxSizing="border-box"
            spacing="30px"
          >
            <Typography bold variant="large">{`${Math.floor(
              timeSpent / 3600
            )}h ${Math.floor(
              (timeSpent % 3600) / 60
            )}m spent on screen`}</Typography>
            <AstroTimeChart times={[2, 0.5, 3, 7, 8, 1, 3]} />
          </Stack>
          <Stack
            flex={1}
            bgcolor="rgb(255,255,255)"
            borderRadius="12px"
          ></Stack>
        </Stack>
      </Stack>
    </PageLayout>
  );
}
