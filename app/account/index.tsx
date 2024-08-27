import React from 'react';
import { isMobile } from 'react-device-detect';
import AccountPage from './contents/common';
import RootLayout from '@/layout';

const Account = () => {
  return (
    <RootLayout>
      <AccountPage isMobile={isMobile} />
    </RootLayout>
  );
};

export default Account;
