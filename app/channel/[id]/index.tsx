import React from 'react';
import { isMobile } from 'react-device-detect';
import ChannelPage from './contents/common';

const Channel = ({ params }: { params: { id: string } }) => {
  return <ChannelPage id={parseInt(params.id)} isMobile={isMobile} />;
};

export default Channel;
