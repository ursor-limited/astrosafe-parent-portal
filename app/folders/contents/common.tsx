"use client";

import { useRouter } from "next/navigation";
import ApiController from "../../api";
import { useCallback, useEffect, useState } from "react";
import { DUMMY_GROUP_ID } from "../../filters/contents/body-desktop";
import { IDevice } from "../../filters/[id]/contents/common";
import AllFoldersPageDesktopBody from "./body-desktop";
import AllFoldersPageMobileBody from "./body-mobile";
import { IContentBucket } from "@/app/profiles/[id]/components/ContentTab";
import FolderCreationDialog from "../[id]/components/FolderCreationDialog";

const DEFAULT_TITLE = "Untitled Folder";

export interface IEnrichedContentBucket {
  id: IContentBucket["id"];
  title: IContentBucket["title"];
  preview: {
    deviceCount: number;
    thumbnailUrls: string[];
    avatarUrls: IDevice["profileAvatarUrl"][];
  };
}

const AllFoldersPage = (props: { isMobile: boolean }) => {
  const router = useRouter();
  const [folders, setFolders] = useState<IEnrichedContentBucket[]>([]);
  const loadFolders = useCallback(
    () =>
      ApiController.getEnrichedFolders(DUMMY_GROUP_ID).then((f) =>
        setFolders(f)
      ),
    []
  );
  useEffect(() => {
    loadFolders();
  }, [loadFolders]);
  const createFolder = (title: IContentBucket["title"]) =>
    ApiController.createFolder(title, DUMMY_GROUP_ID).then((response) =>
      router.push(`/folders/${response.contentBucketId}`)
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
