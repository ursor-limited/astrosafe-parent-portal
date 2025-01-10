import { isMobile } from 'react-device-detect'
import AllDevicesPage from './contents/common'
import RootLayout from './../layout'

const Profile = (props: { email: string; isProd: boolean }) => {
  return (
    <RootLayout>
      <AllDevicesPage
        isMobile={isMobile}
        email={props.email}
        isProd={props.isProd}
      />
    </RootLayout>
  )
}

export default Profile
