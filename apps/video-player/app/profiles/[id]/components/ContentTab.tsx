import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { Stack } from "@mui/system";
import FolderCard from "./FolderCard";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IDevice } from "@/app/filters/[id]/contents/common";
import ApiController from "@/app/api";

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
  bannerUrl: string;
}
export interface IVideo extends IContent {
  thumbnailUrl: string;
}
export interface ILesson extends IContent {
  imageUrls: string[];
}

export interface IDeviceContentBucket {
  id: IContentBucket["id"];
  title: IContentBucket["id"];
  thumbnailUrls: string[];
}

const DevicePageContentTab = (props: { folders: IDeviceContentBucket[] }) => {
  const router = useRouter();
  return (
    <Stack pt="20px">
      <DynamicCardGrid cardWidth="292px" rowGap="40px" columnGap="20px">
        {props.folders.map((f, i) => (
          <UrsorFadeIn key={f.id} duration={800} delay={100 * i}>
            <FolderCard
              key={f.id}
              {...f}
              clickCallback={() => router.push(`/folders/${f.id}`)}
              thumbnailUrls={f.thumbnailUrls}
            />
          </UrsorFadeIn>
        ))}
      </DynamicCardGrid>
    </Stack>
  );
};

export default DevicePageContentTab;
