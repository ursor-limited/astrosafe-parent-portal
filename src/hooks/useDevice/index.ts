import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../../src/api'

const useDevice = (externalDeviceId: string) => {
  const [deviceId, setDeviceId] = useState<number>()

  useEffect(() => {
    fetch(`${BACKEND_URL}/devices/discover/${externalDeviceId}`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((resp) => resp.json())
      .then((data) => setDeviceId(data.id))
  })

  return deviceId
}

export default useDevice
