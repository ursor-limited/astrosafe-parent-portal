import React from 'react';
import { UserProvider } from '../components/UserContext';
import { getSelectorsByUserAgent } from 'react-device-detect';
import { headers } from 'next/headers';
import AllDevicesPage from './contents/common';

async function Page() {
  const isMobile = getSelectorsByUserAgent(
    headers().get('user-agent') ?? ''
  )?.isMobile;

  return (
    <UserProvider>
      <AllDevicesPage isMobile={isMobile} />
    </UserProvider>
  );
}

export default Page;
