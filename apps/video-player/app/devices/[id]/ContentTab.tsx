import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { Stack } from "@mui/system";
import NewLessonCard from "./NewLessonCard";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";

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
}

const DUMMY_FOLDERS: IContentBucket[] = [
  {
    id: 1,
    title: "Booo boo",
    contentIds: [],
  },
  {
    id: 2,
    title: "Cooooool",
    contentIds: [],
  },
  {
    id: 3,
    title: "Bamboo goo oo",
    contentIds: [],
  },
  {
    id: 4,
    title: "LOL!",
    contentIds: [],
  },
  {
    id: 5,
    title: "Nosh fuuuuuu",
    contentIds: [],
  },
];

const DevicePageContentTab = () => {
  return (
    <Stack pt="20px">
      <DynamicCardGrid cardWidth="292px" rowGap="40px" columnGap="20px">
        {DUMMY_FOLDERS.map((f, i) => (
          <UrsorFadeIn duration={800} delay={100 * i}>
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
