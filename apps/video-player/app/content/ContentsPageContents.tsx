"use client";

import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { Stack } from "@mui/system";
import { IContentBucket } from "../devices/[id]/ContentTab";
import NewLessonCard from "../devices/[id]/NewLessonCard";
import PageLayout from "../dashboard_DESTINED_FOR_THE_FURNACE/PageLayout";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { useRouter } from "next/navigation";

export const DUMMY_FOLDERS: IContentBucket[] = [
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

const ContentsPageContents = () => {
  const router = useRouter();
  return (
    <PageLayout
      title="My Content"
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="content"
      button={{
        text: "Create a Folder",
        callback: () => null,
        icon: PlusIcon,
      }}
      maxWidth={834}
      scrollable
    >
      <Stack pt="20px" pl="51px">
        <DynamicCardGrid cardWidth="292px" rowGap="40px" columnGap="20px">
          {DUMMY_FOLDERS.map((f) => (
            <NewLessonCard
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
