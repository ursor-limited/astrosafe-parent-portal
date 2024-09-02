import DynamicCardGrid from './../../components/DynamicCardGrid';
import PageLayout from './../../components/PageLayout';
import UrsorFadeIn from './../../components/UrsorFadeIn';
import { ReactComponent as PlusIcon } from './../../images/PlusIcon.svg';
import { Stack } from '@mui/system';
import useNavigate from '../../hooks/useNavigate';
import { IEnrichedContentBucket } from './common';
import FolderCard from './../../components/FolderCard';
import EmptyStateIllustration from './../../components/EmptyStateIllustration';
import { INFOS } from './../../profile/components/ProfilePageTabLayout';

const AllFoldersPageDesktopBody = (props: {
  folders: IEnrichedContentBucket[];
  createFolder: () => void;
  onUpdate: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <PageLayout
      title="My Content"
      info={INFOS.folders}
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="content"
      button={{
        text: 'Create a Folder',
        callback: props.createFolder,
        icon: PlusIcon,
      }}
      maxWidth={834}
      scrollable
    >
      {props.folders.length > 0 ? (
        <Stack pt="20px" pb="33px" pl="51px">
          <DynamicCardGrid cardWidth="292px" rowGap="40px" columnGap="20px">
            {props.folders.map((f, i) => (
              <UrsorFadeIn key={f.id} duration={800} delay={i * 90}>
                <FolderCard
                  {...f}
                  clickCallback={() => navigate.push(`/folders/${f.id}`)}
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
