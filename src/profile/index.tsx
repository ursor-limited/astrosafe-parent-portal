import React from 'react'
import { isMobile } from 'react-device-detect'
import ProfilePage, { AstroAccountTab } from './contents/common'
import RootLayout from '../layout'

const Profile = ({
  props,
  searchParams,
  isProd,
}: {
  props: { deviceId: string; email: string }
  searchParams: { tab: AstroAccountTab }
  isProd: boolean
}) => {
  return (
    <RootLayout>
      <ProfilePage
        deviceId={parseInt(props.deviceId)}
        isMobile={isMobile}
        tab={searchParams.tab}
        email={props.email}
        isProd={isProd}
      />
    </RootLayout>
  )
}

export default Profile
