import UrsorFadeIn from '@/components/UrsorFadeIn';
import PlusIcon from '@/images/icons/PlusIcon.svg';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { IEnrichedContentBucket } from './common';
import MobilePageLayout from '@/components/MobilePageLayout';
import { UrsorButton } from '@/ui';
import FolderCard from '@/components/FolderCard';
import EmptyStateIllustration from '@/components/EmptyStateIllustration';
import { INFOS } from '@/app/profiles/[id]/components/ProfilePageTabLayout';

const AllFoldersPageMobileBody = (props: {
  folders: IEnrichedContentBucket[];
  createFolder: () => void;
  onUpdate: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <MobilePageLayout
      title="My Folders"
      info={INFOS.folders}
      selectedPage="content"
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
      {props.folders.length > 0 ? (
        <Stack pt="20px">
          <Stack spacing="36px">
            {props.folders.map((f, i) => (
              <UrsorFadeIn key={f.id} duration={800} delay={i * 90} fullWidth>
                <FolderCard
                  {...f}
                  clickCallback={() => navigate(`/folders/${f.id}`)}
                  editingCallback={props.onUpdate}
                  deletionCallback={props.onUpdate}
                  isMobile
                />
              </UrsorFadeIn>
            ))}
          </Stack>
        </Stack>
      ) : (
        <EmptyStateIllustration paddingTop={20}>
          No Folders yet
        </EmptyStateIllustration>
      )}
    </MobilePageLayout>
  );
};

export default AllFoldersPageMobileBody;
