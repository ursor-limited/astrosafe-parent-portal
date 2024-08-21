import { DUMMY_GROUP_ID } from "@/app/filters/contents/body-desktop";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { IEnrichedDevice } from "../contents/common";
import { IDevice } from "@/app/filters/[id]/contents/common";

const useDeviceOnlineStatus = (devices: (IDevice | IEnrichedDevice)[]) => {
  const [cuttingEdgeOnlineStatusDevices, setCuttingEdgeOnlineStatusDevices] =
    useState<(IDevice | IEnrichedDevice)[]>([]);
  useEffect(() => setCuttingEdgeOnlineStatusDevices(devices), [devices.length]);

  const setDeviceOnlineStatus = useCallback(
    (deviceId: IDevice["id"], online: IDevice["online"]) => {
      deviceId &&
        setCuttingEdgeOnlineStatusDevices((prev) =>
          prev.map((device) =>
            device.id === deviceId ? { ...device, online } : device
          )
        );
    },
    []
  );

  useEffect(() => {
    const socket = new WebSocket(
      `wss://api.astrosafe.co/sessions/groups/${DUMMY_GROUP_ID}`
    );
    const handleMessage = (event: any) => {
      if (!event.data) return;
      console.log("JOFOFKOFK");
      const data = JSON.parse(event.data);
      data.deviceId && setDeviceOnlineStatus(data.deviceId, data.online);
    };
    socket.addEventListener("message", handleMessage);
    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [setDeviceOnlineStatus]);

  return cuttingEdgeOnlineStatusDevices;
};

export default useDeviceOnlineStatus;
