"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import ArrowUpRightIcon from "@/images/icons/ArrowUpRight.svg";
import PlugIcon from "@/images/icons/PlugIcon.svg";
import DownloadIcon from "@/images/icons/DownloadIcon.svg";
import PageLayout from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/PageLayout";
import {
  DUMMY_DEVICES,
  IDevice_new,
} from "@/app/filters/[id]/FilterPageContents";
import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import DeviceCard from "./components/DeviceCard";
import { Stack } from "@mui/system";
import UrsorActionButton from "../components/UrsorActionButton";
import { PALETTE } from "ui";
import { useRouter } from "next/navigation";
import DeviceInstructionsView from "./DeviceInstructionsView";
import DeviceRenameDialog from "./components/DeviceRenameDialog";
import DeviceDisconnectDialog from "./components/DeviceDisconnectDialog";
import DeviceConnectDialog from "./components/DeviceConnectDialog";
import DownloadDialog from "./components/DownloadDialog";

export type DeviceType = "chrome" | "android" | "ios";

export default function DevicesPageContents() {
  const [devices, setDevices] = useState<IDevice_new[]>(DUMMY_DEVICES);
  const router = useRouter();
  const [renameDialogOpen, setRenameDialogOpen] = useState<boolean>(false);
  const [connectDialogOpen, setConnectDialogOpen] = useState<boolean>(false);
  const [disconnectDialogOpen, setDisconnectDialogOpen] =
    useState<boolean>(false);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState<boolean>(false);
  return (
    <>
      <PageLayout
        title="My Devices"
        titleBackButton={true}
        bodyWidth="100%"
        fullHeight
        selectedSidebarItemId="devices"
        button={{
          text: "Add a Device",
          callback: () => setConnectDialogOpen(true),
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
        <Stack px="50px" flex={1}>
          {devices.length > 0 ? (
            <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
              {devices.map((d) => (
                <DeviceCard
                  key={d.id}
                  {...d}
                  showBrowsing
                  url="nintendo.com/bopioijgorfrifunrifjni"
                  button={
                    <UrsorActionButton
                      size="16px"
                      iconSize="16px"
                      actions={[
                        {
                          text: "Open",
                          kallback: () => router.push(`/devices/${d.id}`),
                          icon: ArrowUpRightIcon,
                        },
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
                    />
                  }
                />
              ))}
            </DynamicCardGrid>
          ) : (
            <DeviceInstructionsView />
          )}
        </Stack>
      </PageLayout>
      <DeviceRenameDialog
        open={renameDialogOpen}
        onClose={() => setRenameDialogOpen(false)}
        onSubmit={(name) => null}
      />
      <DeviceDisconnectDialog
        open={disconnectDialogOpen}
        onClose={() => setDisconnectDialogOpen(false)}
        onSubmit={() => null}
      />
      <DeviceConnectDialog
        open={connectDialogOpen}
        onClose={() => setConnectDialogOpen(true)}
        onOpen={() => {
          setDownloadDialogOpen(true);
          setConnectDialogOpen(false);
        }}
      />
      <DownloadDialog
        open={downloadDialogOpen}
        onClose={() => setDownloadDialogOpen(false)}
      />
    </>
  );
}
