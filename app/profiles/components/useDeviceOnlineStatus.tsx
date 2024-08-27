import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { IEnrichedDevice } from '../contents/common';
import { IDevice } from '@/filters/[id]/contents/common';
import useAuth from '@/app/hooks/useAuth';

const useDeviceOnlineStatus = (devices: (IDevice | IEnrichedDevice)[]) => {
  const { user } = useAuth();

  const [cuttingEdgeOnlineStatusDevices, setCuttingEdgeOnlineStatusDevices] =
    useState<(IDevice | IEnrichedDevice)[]>([]);
  useEffect(() => setCuttingEdgeOnlineStatusDevices(devices), [devices.length]);

  const setDeviceOnlineStatus = useCallback(
    (deviceId: IDevice['id'], online: IDevice['online']) => {
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
    if (!user?.group_id) return;
    const socket = new WebSocket(
      `wss://api.astrosafe.co/sessions/groups/${user.group_id}`
    );
    const handleMessage = (event: any) => {
      if (!event.data) return;
      const data = JSON.parse(event.data);
      data.deviceId && setDeviceOnlineStatus(data.deviceId, data.online);
    };
    socket.addEventListener('message', handleMessage);
    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [setDeviceOnlineStatus, user?.group_id]);

  return cuttingEdgeOnlineStatusDevices;
};

export default useDeviceOnlineStatus;
