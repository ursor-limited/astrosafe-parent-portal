import ContentCard from './ContentCard'

import { Stack } from '@mui/system'
import ApiController from '../../api'
import { ILink } from '../../profile/components/ContentTab'
import { PALETTE } from '../../ui'

const IMAGE_HEIGHT = 227

const LinkCard = ({
  title,
  url,
  thumbnailUrl,
  noMenu,
  noPointerEvents,
  id,
  onDelete,
  onOpenEditingDialog,
  twoLineTitleSectionHeight,
  isMobile,
  isProd = false,
}: Partial<Omit<ILink, 'createdAt'>> & {
  noPointerEvents?: boolean
  noMenu?: boolean
  onDelete?: () => any
  onOpenEditingDialog?: () => any
  isMobile?: boolean
  twoLineTitleSectionHeight?: boolean
  isProd: boolean
}) => {
  return (
    <ContentCard
      type="link"
      title={title}
      url={url}
      noPointerEvents={noPointerEvents}
      noMenu={noMenu}
      onDelete={() =>
        id && new ApiController(isProd).deleteLink(id).then(onDelete)
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
        boxShadow="0 0 6px rgba(0,0,0,0.08)"
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            style={{ objectFit: 'cover' }}
            alt="image card image"
          />
        ) : (
          <Stack flex={1} bgcolor={PALETTE.secondary.grey[2]} />
        )}
      </Stack>
    </ContentCard>
  )
}

export default LinkCard
