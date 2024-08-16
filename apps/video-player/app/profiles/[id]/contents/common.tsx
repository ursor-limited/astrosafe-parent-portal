"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import PlugIcon from "@/images/icons/PlugIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import Image from "next/image";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import _ from "lodash";
import { useRouter } from "next/navigation";
import ApiController from "@/app/api";
import { DUMMY_GROUP_ID } from "@/app/filters/contents/body-mobile";
import { IDevice } from "@/app/filters/[id]/contents/common";
import ProfilePageDesktopBody from "./body-desktop";
import DeviceRenameDialog from "../../components/DeviceRenameDialog";
import DeviceDisconnectDialog from "../../components/DeviceDisconnectDialog";
import ProfilePageMobileBody from "./body-mobile";
import { DEVICE_TYPE_DISPLAY_NAMES } from "../../components/DeviceCard";
import { IEnrichedContentBucket } from "@/app/folders/contents/common";
import { IEnrichedDevice } from "../../contents/common";
import AddFolderDialog from "../components/AddFolderDialog";
import NotificationContext from "@/app/components/NotificationContext";
import FolderCreationDialog from "@/app/folders/[id]/components/FolderCreationDialog";
import { IContentBucket } from "../components/ContentTab";
import { IApp } from "../components/AppsTab";

export type DeviceType = "chrome" | "android" | "ios";

export type AstroAccountTab = "content" | "insights" | "apps" | "limits";

export default function ProfilePage(props: {
  deviceId: number;
  isMobile: boolean;
  tab?: AstroAccountTab;
}) {
  const [device, setDevice] = useState<IEnrichedDevice | undefined>();
  const loadDevice = useCallback(
    () =>
      ApiController.getEnrichedDevice(props.deviceId).then((d) => setDevice(d)),
    [props.deviceId]
  );
  useEffect(() => {
    loadDevice();
  }, [loadDevice]);

  const router = useRouter();

  const [renameDialogOpen, setRenameDialogOpen] = useState<boolean>(false);
  const [disconnectDialogOpen, setDisconnectDialogOpen] =
    useState<boolean>(false);
  const [addFolderDialogOpen, setAddFolderDialogOpen] =
    useState<boolean>(false);
  const [createFolderDialogOpen, setCreateFolderDialogOpen] =
    useState<boolean>(false);

  const [allDevices, setAllDevices] = useState<IDevice[]>([]);
  useEffect(() => {
    ApiController.getGroupEnrichedDevices(DUMMY_GROUP_ID).then((d) =>
      setAllDevices(d)
    );
  }, []);

  const [deviceFolders, setDeviceFolders] = useState<IEnrichedContentBucket[]>(
    []
  );
  const loadFolders = useCallback(
    () =>
      ApiController.getDeviceFolders(props.deviceId).then((folders) =>
        setDeviceFolders(_.reverse(_.sortBy(folders, (f) => f.id)))
      ),
    [props.deviceId]
  );
  useEffect(() => {
    loadFolders();
  }, [loadFolders]);

  const titleRow = [
    {
      text: "All Kids",
      callback: () => router.push("/profiles"),
    },
    {
      text: device?.name ?? "",
      image: (
        <Stack position="relative" borderRadius="100%">
          <Stack borderRadius="100%" overflow="hidden">
            <Image
              height={props.isMobile ? 24 : 36}
              width={props.isMobile ? 24 : 36}
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
      options: allDevices
        .filter((d) => d.id !== props.deviceId)
        .map((d) => ({
          text: d.name,
          imageUrl: d.profileAvatarUrl,
          callback: () => router.push(`/profiles/${d.id}`),
        })),
      label:
        !props.isMobile && device?.deviceType
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
    // {
    //   text: "Disconnect",
    //   kallback: () => setDisconnectDialogOpen(true),
    //   icon: PlugIcon,
    //   color: PALETTE.system.red,
    // },
  ];

  const notificationCtx = useContext(NotificationContext);

  const createAndAddFolder = (title: IContentBucket["title"]) =>
    ApiController.createFolder(title, DUMMY_GROUP_ID).then((response) => {
      ApiController.addFolderToDevice(response.contentBucketId, props.deviceId);
      router.push(`/folders/${response.contentBucketId}`);
      notificationCtx.success("Created Folder and added it to the Device.");
    });

  const setDeviceOnlineStatus = useCallback(
    (deviceId: IDevice["id"], online: IEnrichedDevice["online"]) => {
      device && deviceId === props.deviceId && setDevice({ ...device, online });
    },
    [props.deviceId, device]
  );

  useEffect(() => {
    const socket = new WebSocket(
      `wss://api.astrosafe.co/sessions/groups/${DUMMY_GROUP_ID}`
    );
    socket.addEventListener("message", (event) => {
      if (!event.data) return;
      const data = JSON.parse(event.data);
      props.deviceId === data.deviceId &&
        setDeviceOnlineStatus(data.deviceId, data.online);
    });
  }, [setDeviceOnlineStatus]);

  return device ? (
    <>
      {props.isMobile ? (
        <ProfilePageMobileBody
          device={device}
          titleRow={titleRow}
          actions={actions}
          folders={deviceFolders}
          tab={props.tab}
          onUpdateDevice={loadDevice}
          onUpdateFolders={loadFolders}
          openAddFolderDialog={() => setAddFolderDialogOpen(true)}
        />
      ) : (
        <ProfilePageDesktopBody
          device={device}
          titleRow={titleRow}
          actions={actions}
          folders={deviceFolders}
          tab={props.tab}
          onUpdateDevice={loadDevice}
          onUpdateFolders={loadFolders}
          openAddFolderDialog={() => setAddFolderDialogOpen(true)}
        />
      )}
      <DeviceRenameDialog
        open={renameDialogOpen}
        onClose={() => setRenameDialogOpen(false)}
        onSubmit={(name) => {
          ApiController.renameDevice(props.deviceId, name)
            .then(loadDevice)
            .then(() => notificationCtx.success("Renamed Device"));
          setRenameDialogOpen(false);
        }}
        name={device.name ?? ""}
        isMobile={props.isMobile}
      />
      <DeviceDisconnectDialog
        open={disconnectDialogOpen}
        onClose={() => setDisconnectDialogOpen(false)}
        onSubmit={() => null}
      />
      <AddFolderDialog
        open={addFolderDialogOpen}
        groupId={DUMMY_GROUP_ID}
        onClose={() => setAddFolderDialogOpen(false)}
        addedFolders={deviceFolders}
        onAdd={(id) =>
          ApiController.addFolderToDevice(id, props.deviceId)
            .then(loadFolders)
            .then(() => setAddFolderDialogOpen(false))
            .then(() => notificationCtx.success("Added Folder to Device."))
        }
        openCreateNewDialog={() => {
          setCreateFolderDialogOpen(true);
          setAddFolderDialogOpen(false);
        }}
        isMobile={props.isMobile}
      />
      <FolderCreationDialog
        open={createFolderDialogOpen}
        onClose={() => setCreateFolderDialogOpen(false)}
        onSubmit={createAndAddFolder}
        isMobile={props.isMobile}
      />
    </>
  ) : (
    <></>
  );
}
