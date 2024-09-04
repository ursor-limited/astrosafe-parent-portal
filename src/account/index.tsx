import { isMobile } from 'react-device-detect'
import AccountPage from './contents/common'

const Account = (props: { email: string }) => {
  return <AccountPage isMobile={isMobile} email={props.email} />
}

export default Account
