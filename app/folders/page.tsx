import React from 'react';
import { UserProvider } from '../components/UserContext';
import AllFoldersPage from './contents/common';
import { getSelectorsByUserAgent } from 'react-device-detect';
import { headers } from 'next/headers';

async function Page() {
  const isMobile = getSelectorsByUserAgent(
    headers().get('user-agent') ?? ''
  )?.isMobile;
  return <AllFoldersPage isMobile={isMobile} />;
}

export default Page;
