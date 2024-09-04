import React from 'react'
import { isMobile } from 'react-device-detect'
import ProfilePage, { AstroAccountTab } from './contents/common'
import RootLayout from '../layout'

const Profile = ({
  props,
  searchParams,
}: {
  props: { deviceId: string; email: string }
  searchParams: { tab: AstroAccountTab }
}) => {
  return (
    <ProfilePage
      deviceId={parseInt(props.deviceId)}
      isMobile={isMobile}
      tab={searchParams.tab}
      email={props.email}
    />
  )
}

export default Profile
