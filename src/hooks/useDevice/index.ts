import { useEffect, useState } from 'react'
import ApiController from '../../../src/api'
import { IEnrichedDevice } from '../../../src/profiles/contents/common'

let deviceDiscoveryPromise: Promise<IEnrichedDevice> | null = null

const discoverDevice = (externalDeviceId: string, isProd: boolean) => {
  if (deviceDiscoveryPromise) return deviceDiscoveryPromise

  const backendUrl = isProd
    ? 'https://api.astrosafe.co'
    : 'https://dev.api.astrosafe.co'

  deviceDiscoveryPromise = (async () => {
    const res = await fetch(
      `${backendUrl}/devices/discover/${externalDeviceId}`,
      {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    )

    const device = await res.json()

    const enrichedDevice = await new ApiController(isProd).getEnrichedDevice(
      device.id
    )

    return enrichedDevice
  })()

  return deviceDiscoveryPromise
}

const useDevice = (externalDeviceId: string, isProd: boolean) => {
  const [device, setDevice] = useState<IEnrichedDevice | null>(null)

  useEffect(() => {
    if (!externalDeviceId) return

    discoverDevice(externalDeviceId, isProd)
      .then((data) => setDevice(data))
      .catch((error) => {
        console.error(`Failed to load device: ${externalDeviceId}`, error)

        setDevice(null)
      })
  }, [externalDeviceId])

  return device
}

export default useDevice
