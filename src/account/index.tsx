import { isMobile } from 'react-device-detect';
import AccountPage from './contents/common';

const Account = () => {
  return <AccountPage isMobile={isMobile} />;
};

export default Account;
