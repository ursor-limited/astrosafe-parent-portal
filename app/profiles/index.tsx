import React from 'react';

import { isMobile } from 'react-device-detect';
import AllDevicesPage from './contents/common';

const Profile = () => {
  return <AllDevicesPage isMobile={isMobile} />;
};

export default Profile;
