import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { Stack } from "@mui/system";
import FolderCard from "./FolderCard";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { useState } from "react";
import { IDevice } from "@/app/filters/[id]/FilterPageContents";
import { useRouter } from "next/navigation";

export type AstroContent = "video" | "channel" | "link";

export interface IContent {
  id: number;
  title: string;
  url: string;
  createdAt: string;
}

export interface IContentBucket {
  id: number;
  title: string;
  groupId: number;
  videos: IVideo[];
  channels: IChannel[];
  links: ILink[];
  lessons: ILesson[];
}

export interface ILink extends IContent {
  thumbnailUrl: string;
}
export interface IChannel extends IContent {
  profileUrl: string;
  backgroundUrl: string;
}
export interface IVideo extends IContent {
  thumbnailUrl: string;
}
export interface ILesson extends IContent {
  imageUrls: string[];
}

export interface IGroupContentBucket {
  id: IContentBucket["id"];
  title: IContentBucket["id"];
  deviceCount: number;
  thumbnailUrls: string[];
  avatarUrls: IDevice["profileAvatarUrl"][];
}

const DevicePageContentTab = () => {
  const [folders, setFolders] = useState<IGroupContentBucket[]>([]);
  const router = useRouter();
  return (
    <Stack pt="20px">
      <DynamicCardGrid cardWidth="292px" rowGap="40px" columnGap="20px">
        {folders.map((f, i) => (
          <UrsorFadeIn key={f.id} duration={800} delay={100 * i}>
            <FolderCard
              key={f.id}
              {...f}
              clickCallback={() => router.push(`/content/${f.id}`)}
              thumbnailUrls={f.thumbnailUrls}
            />
          </UrsorFadeIn>
        ))}
      </DynamicCardGrid>
    </Stack>
  );
};

export default DevicePageContentTab;
