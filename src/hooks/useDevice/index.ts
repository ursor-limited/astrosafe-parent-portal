import { useEffect, useState } from 'react'
import ApiController, { BACKEND_URL } from '../../../src/api'
import { IEnrichedDevice } from '../../../src/profiles/contents/common'

const useDevice = (externalDeviceId: string) => {
  const [deviceData, setDeviceData] = useState<IEnrichedDevice>()

  useEffect(() => {
    fetch(`${BACKEND_URL}/devices/discover/${externalDeviceId}`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((resp) => resp.json())
      .then((data) =>
        ApiController.getEnrichedDevice(data.id).then((data) => {
          setDeviceData(data)
        })
      )
  }, [externalDeviceId])

  return deviceData
}

export default useDevice
