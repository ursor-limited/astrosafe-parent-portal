"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import DownloadIcon from "@/images/icons/DownloadIcon.svg";
import PageLayout from "@/app/dashboard/PageLayout";
import {
  DUMMY_DEVICES,
  IDevice_new,
} from "@/app/filters/[id]/FilterPageContents";
import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import DeviceCard from "./components/DeviceCard";
import { Stack } from "@mui/system";

export type DeviceType = "chrome" | "android" | "ios";

export default function DevicesPageContents() {
  const [devices, setDevices] = useState<IDevice_new[]>(DUMMY_DEVICES);
  return (
    <PageLayout
      title="My Filters"
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
      <Stack px="50px">
        <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
          {devices.map((d) => (
            <DeviceCard
              key={d.id}
              {...d}
              showBrowsing
              url="nintendo.com/bopioijgorfrifunrifjni"
            />
          ))}
        </DynamicCardGrid>
      </Stack>
    </PageLayout>
  );
}
