import React from 'react';
import { isMobile } from 'react-device-detect';
import AllFiltersPage from './contents/common';
import RootLayout from '@/layout';

const Filter = () => {
  return (
    <RootLayout>
      <AllFiltersPage isMobile={isMobile} />
    </RootLayout>
  );
};

export default Filter;
