import { isMobile } from 'react-device-detect'
import AllDevicesPage from './contents/common'
import RootLayout from './../layout'

const Profile = (props: { email: string }) => {
  return (
    <RootLayout>
      <AllDevicesPage isMobile={isMobile} email={props.email} />
    </RootLayout>
  )
}

export default Profile
