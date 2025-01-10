import { Stack } from '@mui/system'
import { ReactComponent as Play } from './../../images/play.svg'
import ApiController from '../../api'
import ContentCard from '../../folder/components/ContentCard'
import { IVideo } from '../../profile/components/ContentTab'
import { PALETTE } from '../../ui'

const IMAGE_HEIGHT = 144

const VideoCard = ({
  isProd,
  title,
  twoLineTitleSectionHeight,
  onDelete,
  onOpenEditingDialog,
  onUpdate,
  noMenu,
  noPointerEvents,
  thumbnailUrl,
  isMobile,
  url,
  id,
  channelId,
}: Partial<Omit<IVideo, 'createdAt'>> & {
  noPointerEvents?: boolean
  noMenu?: boolean
  onDelete?: () => any
  onUpdate?: () => any
  onOpenEditingDialog?: () => any
  isMobile?: boolean
  twoLineTitleSectionHeight?: boolean
  isProd: boolean
}) => {
  return (
    <ContentCard
      type="video"
      title={title}
      url={url}
      noPointerEvents={noPointerEvents}
      noMenu={noMenu}
      onDelete={() =>
        id &&
        new ApiController(isProd).deleteVideo(id, !!channelId).then(onDelete)
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
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            style={{
              objectFit: 'cover',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            alt="video card image"
          />
        ) : (
          <Stack flex={1} bgcolor={PALETTE.secondary.grey[2]} />
        )}
        <Stack
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          sx={{
            background: 'radial-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0))',
            svg: {
              fill: {
                path: 'rgb(255,255,255)',
              },
            },
          }}
        >
          <Play width="26px" height="26px" />
        </Stack>
      </Stack>
    </ContentCard>
  )
}

export default VideoCard
