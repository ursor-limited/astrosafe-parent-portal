import { isMobile } from 'react-device-detect'
import AccountPage from './contents/common'
import RootLayout from '../layout'

const Account = (props: { email: string }) => {
  return (
    <RootLayout>
      <AccountPage isMobile={isMobile} email={props.email} />
    </RootLayout>
  )
}

export default Account
