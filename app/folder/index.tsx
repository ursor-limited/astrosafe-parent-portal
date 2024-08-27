import React from 'react';
import FolderPage from './contents/common';
import { isMobile } from 'react-device-detect';

const Folder = ({ params }: { params: { id: string } }) => {
  return <FolderPage folderId={parseInt(params.id)} isMobile={isMobile} />;
};

export default Folder;
