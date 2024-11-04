import { useState, useEffect, useCallback } from 'react'
import DynamicCardGrid from '../../../components/DynamicCardGrid'
import PageLayout from '../../../components/PageLayout'
import UrsorFadeIn from '../../../components/UrsorFadeIn'
import { ReactComponent as PlusIcon } from '../../../images/PlusIcon.svg'
import { Stack } from '@mui/system'
import { IEnrichedContentBucket } from '../../../folders/contents/common'
import FolderCard from '../../../components/FolderCard'
import EmptyStateIllustration from '../../../components/EmptyStateIllustration'
import { INFOS } from '../../../profile/components/ProfilePageTabLayout'
import ApiController from '../../../api'
import useAuth from '../../../hooks/useAuth'
import { IContentBucket } from '../../../profile/components/ContentTab'
import FolderCreationDialog from '../../../folder/components/FolderCreationDialog'
import { isMobile } from 'react-device-detect'

interface FoldersSectionProps {
  email: string
  onClickFolder: (folder: IEnrichedContentBucket) => any
  onCreateFolder: (folder: IEnrichedContentBucket) => any
}

const FoldersSection: React.FC<FoldersSectionProps> = ({
  email,
  onClickFolder,
  onCreateFolder,
}) => {
  const { user } = useAuth(email)

  const [folders, setFolders] = useState<IEnrichedContentBucket[]>([])

  const loadFolders = useCallback(
    () =>
      user?.group_id &&
      ApiController.getEnrichedFolders(user.group_id).then((f) =>
        setFolders(f)
      ),
    [user?.group_id]
  )

  useEffect(() => {
    loadFolders()
  }, [loadFolders])

  const createFolder = (title: IContentBucket['title']) => {
    if (!user?.group_id) return

    ApiController.createFolder(title, user.group_id).then((data) => {
      loadFolders()

      onCreateFolder(data)
    })
  }

  const [creationDialogOpen, setCreationDialogOpen] = useState<boolean>(false)

  return (
    <PageLayout
      noSidebar
      title="My Content"
      info={INFOS.folders}
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="content"
      button={{
        text: 'Create a Folder',
        callback: () => setCreationDialogOpen(true),
        icon: PlusIcon,
      }}
      maxWidth={834}
      scrollable
    >
      {folders.length > 0 ? (
        <Stack pt="20px" pb="33px" pl="51px">
          <DynamicCardGrid cardWidth="292px" rowGap="40px" columnGap="20px">
            {folders.map((f, i) => (
              <UrsorFadeIn key={f.id} duration={800} delay={i * 90}>
                <FolderCard
                  {...f}
                  clickCallback={() => onClickFolder(f)}
                  editingCallback={loadFolders}
                  deletionCallback={loadFolders}
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

      <FolderCreationDialog
        open={creationDialogOpen}
        onClose={() => setCreationDialogOpen(false)}
        onSubmit={(title) => createFolder(title)}
        isMobile={isMobile}
      />
    </PageLayout>
  )
}

export default FoldersSection
