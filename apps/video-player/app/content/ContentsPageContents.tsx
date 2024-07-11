"use client";

import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { Stack } from "@mui/system";
import { IContentBucket } from "../devices/[id]/ContentTab";
import FolderCard from "../devices/[id]/FolderCard";
import PageLayout from "../dashboard_DESTINED_FOR_THE_FURNACE/PageLayout";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { useRouter } from "next/navigation";
import ApiController from "../api";
import { useState } from "react";

const DEFAULT_TITLE = "Untitled Folder";

const ContentsPageContents = () => {
  const router = useRouter();
  const [folders, setFolders] = useState<IContentBucket[]>([]);
  return (
    <PageLayout
      title="My Content"
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="content"
      button={{
        text: "Create a Folder",
        callback: () =>
          ApiController.createFolder(DEFAULT_TITLE, 1).then((f) =>
            router.push(`/content/${f.id}`)
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
              imageUrls={[
                "https://ursorassets.s3.eu-west-1.amazonaws.com/Kirby.webp",
                "https://ursorassets.s3.eu-west-1.amazonaws.com/boo!.webp",
              ]}
              profileImageUrls={[
                "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_profile.jpg",
                "https://ursorassets.s3.eu-west-1.amazonaws.com/Kirby.webp",
                "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_profile.jpg",
                "https://ursorassets.s3.eu-west-1.amazonaws.com/Kirby.webp",
              ]}
            />
          ))}
        </DynamicCardGrid>
      </Stack>
    </PageLayout>
  );
};

export default ContentsPageContents;
