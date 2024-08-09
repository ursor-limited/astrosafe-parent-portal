"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DeviceRenameDialog from "../components/DeviceRenameDialog";
import DeviceDisconnectDialog from "../components/DeviceDisconnectDialog";
import DeviceConnectDialog from "../components/DeviceConnectDialog";
import DownloadDialog from "../components/DownloadDialog";
import ApiController from "../../api";
import { DUMMY_GROUP_ID } from "../../filters/contents/body-desktop";
import { IDevice, IDeviceConfig } from "../../filters/[id]/contents/common";
import AllDevicesPageDesktopBody from "./desktop-body";
import AllDevicesPageMobileBody from "./mobile-body";
import { IAllowedTime, ITimeLimit } from "../[id]/components/LimitsTab";
import { IFilter } from "@/app/filters/contents/common";

export type DeviceType = "chrome" | "android" | "ios";

export type IEnrichedDevice = IDevice & {
  online?: boolean;
  screenTime?: {
    allowed: number;
    current: number;
  };
  timeLimits?: ITimeLimit[];
  allowedTimes?: IAllowedTime[];
  config?: IDeviceConfig;
  latestBrowsing?: {
    url: string;
    title: string;
    faviconUrl: string;
  } | null;
};

export default function AllDevicesPage(props: { isMobile: boolean }) {
  const [devices, setDevices] = useState<IEnrichedDevice[]>([]);
  useEffect(() => {
    ApiController.getGroupEnrichedDevices(DUMMY_GROUP_ID).then(setDevices);
  }, []);
  const [filters, setFilters] = useState<IFilter[]>([]);
  useEffect(() => {
    ApiController.getGroupFilters(DUMMY_GROUP_ID).then(setFilters);
  }, []);
  const [renameDeviceDialogId, setRenameDeviceDialogId] = useState<
    IDevice["id"] | undefined
  >();
  const [connectDialogOpen, setConnectDialogOpen] = useState<boolean>(false);
  const [disconnectDeviceDialogId, setDisconnectDeviceDialogId] = useState<
    IDevice["id"] | undefined
  >();
  const [downloadDialogOpen, setDownloadDialogOpen] = useState<boolean>(false);

  const setDeviceOnlineStatus = useCallback(
    (deviceId: IDevice["id"], online: IEnrichedDevice["online"]) => {
      deviceId &&
        setDevices(
          devices.map((device) =>
            device.id === deviceId ? { ...device, online } : device
          )
        );
    },
    [devices]
  );

  useEffect(() => {
    const socket = new WebSocket(
      `wss://api.astrosafe.co/sessions/groups/${DUMMY_GROUP_ID}`
    );
    socket.addEventListener("message", (event) => {
      if (!event.data) return;
      const data = JSON.parse(event.data);
      setDeviceOnlineStatus(data.userId, data.online);
    });
  }, [setDeviceOnlineStatus]);

  return (
    <>
      {props.isMobile ? (
        <AllDevicesPageMobileBody
          devices={devices}
          filters={filters}
          setConnectDialogOpen={() => setConnectDialogOpen(true)}
          setRenameDeviceDialogId={setRenameDeviceDialogId}
          setDisconnectDialogOpen={setDisconnectDeviceDialogId}
        />
      ) : (
        <AllDevicesPageDesktopBody
          devices={devices}
          filters={filters}
          setConnectDialogOpen={() => setConnectDialogOpen(true)}
          setRenameDeviceDialogId={setRenameDeviceDialogId}
          setDisconnectDialogOpen={setDisconnectDeviceDialogId}
        />
      )}
      {renameDeviceDialogId ? (
        <DeviceRenameDialog
          open={true}
          onClose={() => setRenameDeviceDialogId(undefined)}
          onSubmit={(name) => {
            ApiController.renameDevice(renameDeviceDialogId, name).then();
            setRenameDeviceDialogId(undefined);
          }}
        />
      ) : null}
      {disconnectDeviceDialogId ? (
        <DeviceDisconnectDialog
          open={true}
          onClose={() => setDisconnectDeviceDialogId(undefined)}
          onSubmit={() => null}
        />
      ) : null}
      <DeviceConnectDialog
        open={connectDialogOpen}
        onClose={() => setConnectDialogOpen(false)}
        onOpen={() => {
          setDownloadDialogOpen(true);
          setConnectDialogOpen(false);
        }}
        isMobile={props.isMobile}
      />
      <DownloadDialog
        open={downloadDialogOpen}
        onClose={() => setDownloadDialogOpen(false)}
        isMobile={props.isMobile}
      />
    </>
  );
}
