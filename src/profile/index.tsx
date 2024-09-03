import React from 'react'
import { isMobile } from 'react-device-detect'
import ProfilePage, { AstroAccountTab } from './contents/common'

const Profile = ({
  props,
  searchParams,
}: {
  props: { astroDeviceId: string; deviceId: string; authUrl: string }
  searchParams: { tab: AstroAccountTab }
}) => {
  return (
    <ProfilePage
      astroDeviceId={parseInt(props.astroDeviceId)}
      isMobile={isMobile}
      tab={searchParams.tab}
      deviceId={props.deviceId}
      authUrl={props.authUrl}
    />
  )
}

export default Profile
