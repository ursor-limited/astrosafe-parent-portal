import React from 'react'
import { isMobile } from 'react-device-detect'
import ProfilePage, { AstroAccountTab } from './contents/common'
import RootLayout from '../layout'

const Profile = ({
  props,
  searchParams,
}: {
  props: { astroDeviceId: string; deviceId: string; authUrl: string }
  searchParams: { tab: AstroAccountTab }
}) => {
  return (
    <RootLayout>
      <ProfilePage
        astroDeviceId={parseInt(props.astroDeviceId)}
        isMobile={isMobile}
        tab={searchParams.tab}
        deviceId={props.deviceId}
        authUrl={props.authUrl}
      />
    </RootLayout>
  )
}

export default Profile
