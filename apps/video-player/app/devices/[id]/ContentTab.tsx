import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { Stack } from "@mui/system";
import NewLessonCard from "./NewLessonCard";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { useState } from "react";

export type AstroContent = "video" | "videoChannel" | "link";

export interface IContent {
  id: number;
  type: AstroContent;
  title: string;
  url: string;
  imgUrl: string;
  thumbnailImgUrl?: string;
  cardColor: string;
}

export interface IContentBucket {
  id: number;
  title: string;
  contentIds: number[];
  groupId: number;
}

const DevicePageContentTab = () => {
  const [folders, setFolders] = useState<IContentBucket[]>([]);
  return (
    <Stack pt="20px">
      <DynamicCardGrid cardWidth="292px" rowGap="40px" columnGap="20px">
        {folders.map((f, i) => (
          <UrsorFadeIn key={f.id} duration={800} delay={100 * i}>
            <NewLessonCard
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
