import React from 'react';
import { UserProvider } from '../components/UserContext';
import { isMobile } from 'react-device-detect';
import AllDevicesPage from './contents/common';

async function Page() {
  return <AllDevicesPage isMobile={isMobile} />;
}

export default Page;
