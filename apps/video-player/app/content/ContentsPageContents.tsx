"use client";

import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { Stack } from "@mui/system";
import { IContentBucket } from "../devices/[id]/ContentTab";
import FolderCard from "../devices/[id]/FolderCard";
import PageLayout from "../dashboard_DESTINED_FOR_THE_FURNACE/PageLayout";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { useRouter } from "next/navigation";
import ApiController from "../api";
import { useEffect, useState } from "react";
import { DUMMY_GROUP_ID } from "../filters/FiltersPageContents";
import { IDevice } from "../filters/[id]/FilterPageContents";

const DEFAULT_TITLE = "Untitled Folder";

export interface IGroupContentBucket {
  id: IContentBucket["id"];
  title: IContentBucket["id"];
  deviceCount: number;
  thumbnailUrls: string[];
  avatarUrls: IDevice["profileAvatarUrl"][];
}

const ContentsPageContents = () => {
  const router = useRouter();
  const [folders, setFolders] = useState<IGroupContentBucket[]>([]);
  useEffect(() => {
    ApiController.getGroupFolders(DUMMY_GROUP_ID).then((f) => setFolders(f));
  }, []);
  return (
    <PageLayout
      title="My Content"
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="content"
      button={{
        text: "Create a Folder",
        callback: () =>
          ApiController.createFolder(DEFAULT_TITLE, DUMMY_GROUP_ID).then((id) =>
            router.push(`/content/${id}`)
          ),
        icon: PlusIcon,
      }}
      maxWidth={834}
      scrollable
    >
      <Stack pt="20px" pl="51px">
        <DynamicCardGrid cardWidth="292px" rowGap="40px" columnGap="20px">
          {folders.map((f) => (
            <FolderCard
              key={f.id}
              {...f}
              clickCallback={() => router.push(`/content/${f.id}`)}
              thumbnailUrls={f.thumbnailUrls}
              avatarUrls={f.avatarUrls}
            />
          ))}
        </DynamicCardGrid>
      </Stack>
    </PageLayout>
  );
};

export default ContentsPageContents;
