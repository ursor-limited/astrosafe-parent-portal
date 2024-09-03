import React from 'react'
import { isMobile } from 'react-device-detect'
import AllDevicesPage from './contents/common'
import RootLayout from './../layout'

const Profile = (props: { deviceId: string }) => {
  return (
    <RootLayout>
      <AllDevicesPage isMobile={isMobile} deviceId={props.deviceId} />
    </RootLayout>
  )
}

export default Profile
