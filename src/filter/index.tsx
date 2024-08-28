import React from 'react';
import { isMobile } from 'react-device-detect';
import FilterPage from './contents/common';

const Filter = ({ params }: { params: { id: string } }) => {
  return <FilterPage filterId={parseInt(params.id)} isMobile={isMobile} />;
};

export default Filter;
