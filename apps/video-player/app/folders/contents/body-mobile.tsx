import PageLayout from "@/app/components/PageLayout";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import FolderCard from "@/app/profiles/[id]/FolderCard";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { IGroupContentBucket } from "./common";
import MobilePageLayout from "@/app/components/MobilePageLayout";
import { UrsorButton } from "ui";

const AllFoldersPageMobileBody = (props: {
  folders: IGroupContentBucket[];
  createFolder: () => void;
}) => {
  const router = useRouter();
  return (
    <MobilePageLayout
      title="My Folders"
      topRightElement={
        <UrsorButton
          dark
          variant="tertiary"
          size="small"
          endIcon={PlusIcon}
          onClick={props.createFolder}
        >
          Create a Folder
        </UrsorButton>
      }
    >
      <Stack pt="20px">
        <Stack spacing="12px">
          {props.folders.map((f, i) => (
            <UrsorFadeIn key={f.id} duration={800} delay={i * 90} fullWidth>
              <FolderCard
                {...f}
                clickCallback={() => router.push(`/folders/${f.id}`)}
                thumbnailUrls={f.thumbnailUrls}
                avatarUrls={f.avatarUrls}
              />
            </UrsorFadeIn>
          ))}
        </Stack>
      </Stack>
    </MobilePageLayout>
  );
};

export default AllFoldersPageMobileBody;
