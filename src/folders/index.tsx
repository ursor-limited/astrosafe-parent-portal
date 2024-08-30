import React from 'react';
import AllFoldersPage from './contents/common';
import { isMobile } from 'react-device-detect';
import RootLayout from './../layout';

const Folders = () => {
  return (
    <RootLayout>
      <AllFoldersPage isMobile={isMobile} />
    </RootLayout>
  );
};

export default Folders;
