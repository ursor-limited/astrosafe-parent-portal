import React from 'react';
import FolderPage from './contents/common';
import { UserProvider } from '@/app/components/UserContext';
import { headers } from 'next/headers';
import { getSelectorsByUserAgent } from 'react-device-detect';
import FolderPageMobileBody from './contents/body-mobile';

async function Page({ params }: { params: { id: string } }) {
  const isMobile = getSelectorsByUserAgent(
    headers().get('user-agent') ?? ''
  )?.isMobile;
  return <FolderPage folderId={parseInt(params.id)} isMobile={isMobile} />;
}

export default Page;
