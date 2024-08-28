import React from 'react';
import { isMobile } from 'react-device-detect';
import AllDevicesPage from './contents/common';
import RootLayout from '@/layout';

const Profile = () => {
  return (
    <RootLayout>
      <AllDevicesPage isMobile={isMobile} />
    </RootLayout>
  );
};

export default Profile;
