import React from 'react'
import { isMobile } from 'react-device-detect'
import ProfilePage, { AstroAccountTab } from './contents/common'
import RootLayout from '../layout'

const Profile = ({
  props,
  searchParams,
}: {
  props: { astroemail: string; email: string }
  searchParams: { tab: AstroAccountTab }
}) => {
  return (
    <RootLayout>
      <ProfilePage
        astroDeviceId={parseInt(props.astroDeviceId)}
        isMobile={isMobile}
        tab={searchParams.tab}
        email={props.email}
      />
    </RootLayout>
  )
}

export default Profile
