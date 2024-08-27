import React from 'react';
import { UserProvider } from '@/app/components/UserContext';
import { headers } from 'next/headers';
import { getSelectorsByUserAgent } from 'react-device-detect';
import FilterPage from './contents/common';
import { IFilter } from '../contents/common';

async function Page({ params }: { params: { id: string } }) {
  return <FilterPage filterId={parseInt(params.id)} isMobile={isMobile} />;
}

export default Page;
