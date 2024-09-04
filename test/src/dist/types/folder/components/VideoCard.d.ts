import { IVideo } from '../../profile/components/ContentTab'
declare const VideoCard: (
  props: Partial<Omit<IVideo, 'createdAt'>> & {
    noPointerEvents?: boolean
    noMenu?: boolean
    onDelete?: () => void
    onUpdate?: () => void
    onOpenEditingDialog?: () => void
    isMobile?: boolean
    twoLineTitleSectionHeight?: boolean
  }
) => import('react/jsx-runtime').JSX.Element
export default VideoCard
