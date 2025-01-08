import { useEffect, useState } from 'react'
import ApiController, { BACKEND_URL } from '../../../src/api'
import { IEnrichedDevice } from '../../../src/profiles/contents/common'

let deviceDiscoveryPromise: Promise<IEnrichedDevice> | null = null

const discoverDevice = (externalDeviceId: string) => {
  if (deviceDiscoveryPromise) return deviceDiscoveryPromise

  deviceDiscoveryPromise = (async () => {
    const res = await fetch(
      `${BACKEND_URL}/devices/discover/${externalDeviceId}`,
      {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    )

    const device = await res.json()

    const enrichedDevice = await ApiController.getEnrichedDevice(device.id)

    return enrichedDevice
  })()

  return deviceDiscoveryPromise
}

const useDevice = (externalDeviceId: string) => {
  const [device, setDevice] = useState<IEnrichedDevice | null>(null)

  useEffect(() => {
    if (!externalDeviceId) return

    discoverDevice(externalDeviceId)
      .then((data) => setDevice(data))
      .catch((error) => {
        console.error(`Failed to load device: ${externalDeviceId}`, error)

        setDevice(null)
      })
  }, [externalDeviceId])

  return device
}

export default useDevice
