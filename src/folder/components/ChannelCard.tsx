import ContentCard from './ContentCard'
import { Stack } from '@mui/system'
import ApiController from '../../api'
import { IChannel, IContentBucket } from '../../profile/components/ContentTab'
import { PALETTE } from '../../ui'

const IMAGE_HEIGHT = 160

interface ChannelCardProps extends Partial<Omit<IChannel, 'createdAt'>> {
  noPointerEvents?: boolean
  noMenu?: boolean
  onDelete?: () => any
  onUpdate?: () => any
  onOpenEditingDialog?: () => any
  isMobile?: boolean
  twoLineTitleSectionHeight?: boolean
  folderId?: IContentBucket['id']
  isProd?: boolean
}

const ChannelCard: React.FC<ChannelCardProps> = ({
  profileUrl,
  title,
  id,
  bannerUrl,
  noPointerEvents,
  noMenu,
  onDelete,
  onUpdate,
  onOpenEditingDialog,
  isMobile,
  twoLineTitleSectionHeight,
  isProd = false,
}) => {
  return (
    <ContentCard
      type="channel"
      title={title}
      onClick={noPointerEvents ? undefined : () => {}}
      noPointerEvents={noPointerEvents}
      noMenu={noMenu}
      onDelete={() =>
        id && new ApiController(isProd).deleteChannel(id).then(onDelete)
      }
      onOpenEditingDialog={() => onOpenEditingDialog?.()}
      isMobile={isMobile}
      twoLineTitleSectionHeight={twoLineTitleSectionHeight}
    >
      <Stack
        height={IMAGE_HEIGHT}
        width="100%"
        borderRadius="8px"
        overflow="hidden"
        position="relative"
        boxShadow="0 0 4px rgba(0,0,0,0.08)"
      >
        {bannerUrl ? (
          <img
            src={bannerUrl}
            style={{
              objectFit: 'cover',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            alt="banner image"
          />
        ) : (
          <Stack flex={1} bgcolor={PALETTE.secondary.grey[2]} />
        )}
        {profileUrl ? (
          <Stack
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              height="72px"
              width="72px"
              borderRadius="100%"
              overflow="hidden"
              border="3px solid rgb(255,255,255)"
              position="relative"
              boxShadow="0 0 20px rgba(0,0,0,0.1)"
            >
              {profileUrl ? (
                <img
                  src={profileUrl}
                  style={{
                    objectFit: 'cover',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  alt="profile image"
                />
              ) : (
                <Stack flex={1} bgcolor={PALETTE.secondary.grey[3]} />
              )}
            </Stack>
          </Stack>
        ) : null}
      </Stack>
    </ContentCard>
  )
}

export default ChannelCard
