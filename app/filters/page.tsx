import React from 'react';
import { UserProvider } from '../components/UserContext';
import { getSelectorsByUserAgent } from 'react-device-detect';
import { headers } from 'next/headers';
import AllFiltersPage from './contents/common';

async function Page() {
  const isMobile = getSelectorsByUserAgent(
    headers().get('user-agent') ?? ''
  )?.isMobile;
  return <AllFiltersPage isMobile={isMobile} />;
}

export default Page;
