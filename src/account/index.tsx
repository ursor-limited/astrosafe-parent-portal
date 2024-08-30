import { isMobile } from 'react-device-detect';
import AccountPage from './contents/common';
import RootLayout from './../layout';

const Account = () => {
  return <AccountPage isMobile={isMobile} />;
};

export default Account;
