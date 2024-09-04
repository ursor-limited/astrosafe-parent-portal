import React from 'react'
import { isMobile } from 'react-device-detect'
import AllDevicesPage from './contents/common'
import RootLayout from './../layout'

const Profile = (props: { email: string }) => {
  return <AllDevicesPage isMobile={isMobile} email={props.email} />
}

export default Profile
