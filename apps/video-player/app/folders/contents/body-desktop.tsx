import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import PageLayout from "@/app/components/PageLayout";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { IEnrichedContentBucket } from "./common";
import FolderCard from "@/app/components/FolderCard";
import { EmptyStateIllustration } from "@/app/components/EmptyStateIllustration";
import { PALETTE, Typography } from "ui";

const AllFoldersPageDesktopBody = (props: {
  folders: IEnrichedContentBucket[];
  createFolder: () => void;
  onUpdate: () => void;
}) => {
  const router = useRouter();
  return (
    <PageLayout
      title="My Content"
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="content"
      button={{
        text: "Create a Folder",
        callback: props.createFolder,
        icon: PlusIcon,
      }}
      maxWidth={834}
      scrollable
    >
      {props.folders.length > 0 ? (
        <Stack pt="20px" pl="51px">
          <DynamicCardGrid cardWidth="292px" rowGap="40px" columnGap="20px">
            {props.folders.map((f, i) => (
              <UrsorFadeIn key={f.id} duration={800} delay={i * 90}>
                <FolderCard
                  {...f}
                  clickCallback={() => router.push(`/folders/${f.id}`)}
                  editingCallback={props.onUpdate}
                  deletionCallback={props.onUpdate}
                />
              </UrsorFadeIn>
            ))}
          </DynamicCardGrid>
        </Stack>
      ) : (
        <EmptyStateIllustration paddingTop={20}>
          No Folders yet
        </EmptyStateIllustration>
      )}
    </PageLayout>
  );
};

export default AllFoldersPageDesktopBody;
