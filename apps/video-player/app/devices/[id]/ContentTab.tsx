import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { Stack } from "@mui/system";
import FolderCard from "./FolderCard";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { useState } from "react";

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
  Videos: IVideo[];
  Channels: IChannel[];
  Links: ILink[];
  Lessons: ILesson[];
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

const DevicePageContentTab = () => {
  const [folders, setFolders] = useState<IContentBucket[]>([]);
  return (
    <Stack pt="20px">
      <DynamicCardGrid cardWidth="292px" rowGap="40px" columnGap="20px">
        {folders.map((f, i) => (
          <UrsorFadeIn key={f.id} duration={800} delay={100 * i}>
            <FolderCard
              {...f}
              imageUrls={[
                "https://ursorassets.s3.eu-west-1.amazonaws.com/Kirby.webp",
                "https://ursorassets.s3.eu-west-1.amazonaws.com/boo!.webp",
              ]}
            />
          </UrsorFadeIn>
        ))}
      </DynamicCardGrid>
    </Stack>
  );
};

export default DevicePageContentTab;
