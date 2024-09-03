import React from 'react'
import { isMobile } from 'react-device-detect'
import AllDevicesPage from './contents/common'
import RootLayout from './../layout'

const Profile = (props: { deviceId: string; authUrl: string }) => {
  return (
    <RootLayout>
      <AllDevicesPage
        isMobile={isMobile}
        deviceId={props.deviceId}
        authUrl={props.authUrl}
      />
    </RootLayout>
  )
}

export default Profile
