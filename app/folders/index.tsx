import React from 'react';

import AllFoldersPage from './contents/common';
import { isMobile } from 'react-device-detect';

const Folder = () => {
  return <AllFoldersPage isMobile={isMobile} />;
};

export default Folder;
