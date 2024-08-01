"use client";

import { useRouter } from "next/navigation";
import ApiController from "../../api";
import { useEffect, useState } from "react";
import { DUMMY_GROUP_ID } from "../../filters/contents/body-desktop";
import { IDevice } from "../../filters/[id]/contents/common";
import AllFoldersPageDesktopBody from "./body-desktop";
import AllFoldersPageMobileBody from "./body-mobile";
import { IContentBucket } from "@/app/profiles/[id]/components/ContentTab";

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
  const createFolder = () =>
    ApiController.createFolder(DEFAULT_TITLE, DUMMY_GROUP_ID).then((id) =>
      router.push(`/folders/${id}`)
    );
  return props.isMobile ? (
    <AllFoldersPageMobileBody folders={folders} createFolder={createFolder} />
  ) : (
    <AllFoldersPageDesktopBody folders={folders} createFolder={createFolder} />
  );
};

export default AllFoldersPage;
