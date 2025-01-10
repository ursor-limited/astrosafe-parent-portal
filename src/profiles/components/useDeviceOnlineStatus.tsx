import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { IEnrichedDevice } from '../contents/common'
import { IDevice } from './../../filter/contents/common'
import useAuth from './../../hooks/useAuth'

const useDeviceOnlineStatus = (
  devices: (IDevice | IEnrichedDevice)[],
  email: string,
  isProd: boolean = false
) => {
  const { user } = useAuth(email, isProd)

  const [cuttingEdgeOnlineStatusDevices, setCuttingEdgeOnlineStatusDevices] =
    useState<(IDevice | IEnrichedDevice)[]>([])

  useEffect(() => setCuttingEdgeOnlineStatusDevices(devices), [devices.length])

  const setDeviceOnlineStatus = useCallback(
    (deviceId: IDevice['id'], online: IDevice['online']) => {
      deviceId &&
        setCuttingEdgeOnlineStatusDevices((prev) =>
          prev.map((device) =>
            device.id === deviceId ? { ...device, online } : device
          )
        )
    },
    []
  )

  const websocketUrl = 'wss://api.astrosafe.co'

  useEffect(() => {
    if (!user?.group_id) return
    const socket = new WebSocket(
      `${websocketUrl}/sessions/groups/${user.group_id}`
    )
    const handleMessage = (event: any) => {
      if (!event.data) return
      const data = JSON.parse(event.data)
      data.deviceId && setDeviceOnlineStatus(data.deviceId, data.online)
    }
    socket.addEventListener('message', handleMessage)
    return () => {
      socket.removeEventListener('message', handleMessage)
    }
  }, [setDeviceOnlineStatus, user?.group_id])

  return cuttingEdgeOnlineStatusDevices
}

export default useDeviceOnlineStatus
