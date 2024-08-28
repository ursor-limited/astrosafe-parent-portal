import React from 'react';
import { isMobile } from 'react-device-detect';
import ProfilePage, { AstroAccountTab } from './contents/common';

const Profile = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { tab: AstroAccountTab };
}) => {
  return (
    <ProfilePage
      deviceId={parseInt(params.id)}
      isMobile={isMobile}
      tab={searchParams.tab}
    />
  );
};

export default Profile;
