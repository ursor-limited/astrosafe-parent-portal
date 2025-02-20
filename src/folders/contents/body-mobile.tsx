import UrsorFadeIn from './../../components/UrsorFadeIn'
import { ReactComponent as PlusIcon } from './../../images/PlusIcon.svg'
import { Stack } from '@mui/system'
import useNavigate from '../../hooks/useNavigate'
import { IEnrichedContentBucket } from './common'
import MobilePageLayout from './../../components/MobilePageLayout'
import { UrsorButton } from './../../ui'
import FolderCard from './../../components/FolderCard'
import EmptyStateIllustration from './../../components/EmptyStateIllustration'
import { INFOS } from './../../profile/components/ProfilePageTabLayout'

const AllFoldersPageMobileBody = (props: {
  folders: IEnrichedContentBucket[]
  isProd: boolean
  createFolder: () => any
  onUpdate: () => any
}) => {
  const navigate = useNavigate()
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
                  clickCallback={() => navigate.push(`/folders/${f.id}`)}
                  editingCallback={props.onUpdate}
                  deletionCallback={props.onUpdate}
                  isMobile
                  isProd={props.isProd}
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
  )
}

export default AllFoldersPageMobileBody
