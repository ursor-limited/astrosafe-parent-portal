import React from 'react';
import { isMobile } from 'react-device-detect';
import AllFiltersPage from './contents/common';

const Filter = () => {
  return <AllFiltersPage isMobile={isMobile} />;
};

export default Filter;
