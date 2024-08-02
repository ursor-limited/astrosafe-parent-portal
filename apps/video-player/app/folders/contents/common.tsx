"use client";

import { useRouter } from "next/navigation";
import ApiController from "../../api";
import { useEffect, useState } from "react";
import { DUMMY_GROUP_ID } from "../../filters/contents/body-desktop";
import { IDevice } from "../../filters/[id]/contents/common";
import AllFoldersPageDesktopBody from "./body-desktop";
import AllFoldersPageMobileBody from "./body-mobile";
import { IContentBucket } from "@/app/profiles/[id]/components/ContentTab";
import FolderCreationDialog from "../[id]/components/FolderCreationDialog";

const DEFAULT_TITLE = "Untitled Folder";

export interface IEnrichedContentBucket {
  id: IContentBucket["id"];
  title: IContentBucket["id"];
  preview: {
    deviceCount: { devices: number };
    thumbnailUrls: string[];
    avatarUrls: IDevice["profileAvatarUrl"][];
  };
}

const AllFoldersPage = (props: { isMobile: boolean }) => {
  const router = useRouter();
  const [folders, setFolders] = useState<IEnrichedContentBucket[]>([]);
  useEffect(() => {
    ApiController.getEnrichedFolders(DUMMY_GROUP_ID).then((f) => setFolders(f));
  }, []);
  const createFolder = (title: IContentBucket["title"]) =>
    ApiController.createFolder(title, DUMMY_GROUP_ID).then((id) =>
      router.push(`/folders/${id}`)
    );
  const [creationDialogOpen, setCreationDialogOpen] = useState<boolean>(false);
  return (
    <>
      {props.isMobile ? (
        <AllFoldersPageMobileBody
          folders={folders}
          createFolder={() => setCreationDialogOpen(true)}
        />
      ) : (
        <AllFoldersPageDesktopBody
          folders={folders}
          createFolder={() => setCreationDialogOpen(true)}
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
