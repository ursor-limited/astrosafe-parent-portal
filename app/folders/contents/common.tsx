'use client';

import { useNavigate } from 'react-router-dom';
import ApiController from '../../api';
import { useCallback, useEffect, useState } from 'react';
import { IDevice } from '../../filters/[id]/contents/common';
import AllFoldersPageDesktopBody from './body-desktop';
import AllFoldersPageMobileBody from './body-mobile';
import { IContentBucket } from '@/app/profiles/[id]/components/ContentTab';
import FolderCreationDialog from '../[id]/components/FolderCreationDialog';
import useAuth from '@/app/hooks/useAuth';

export interface IEnrichedContentBucket {
  id: IContentBucket['id'];
  title: IContentBucket['title'];
  preview: {
    thumbnailUrls: string[];
    devices: {
      profileAvatarUrl: IDevice['profileAvatarUrl'];
      name: IDevice['name'];
    }[];
    totalDeviceCount: number;
  };
}

const AllFoldersPage = (props: { isMobile: boolean }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [folders, setFolders] = useState<IEnrichedContentBucket[]>([]);
  const loadFolders = useCallback(
    () =>
      user?.group_id &&
      ApiController.getEnrichedFolders(user.group_id).then((f) =>
        setFolders(f)
      ),
    [user?.group_id]
  );
  useEffect(() => {
    loadFolders();
  }, [loadFolders]);
  const createFolder = (title: IContentBucket['title']) =>
    user?.group_id &&
    ApiController.createFolder(title, user.group_id).then((response) =>
      navigate(`/folders/${response.contentBucketId}`)
    );
  const [creationDialogOpen, setCreationDialogOpen] = useState<boolean>(false);

  return (
    <>
      {props.isMobile ? (
        <AllFoldersPageMobileBody
          folders={folders}
          createFolder={() => setCreationDialogOpen(true)}
          onUpdate={loadFolders}
        />
      ) : (
        <AllFoldersPageDesktopBody
          folders={folders}
          createFolder={() => setCreationDialogOpen(true)}
          onUpdate={loadFolders}
        />
      )}
      <FolderCreationDialog
        open={creationDialogOpen}
        onClose={() => setCreationDialogOpen(false)}
        onSubmit={createFolder}
        isMobile={props.isMobile}
      />
    </>
  );
};

export default AllFoldersPage;
