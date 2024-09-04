import { AstroContent, IContent } from '../../profile/components/ContentTab'
export declare const CONTENT_DISPLAY_NAMES: Record<AstroContent, string>
declare const ContentCard: (props: {
  type: AstroContent
  title?: IContent['title']
  url?: IContent['url']
  onClick?: () => void
  noPointerEvents?: boolean
  noMenu?: boolean
  onDelete: () => void
  onOpenEditingDialog: () => void
  isMobile?: boolean
  twoLineTitleSectionHeight?: boolean
  children: React.ReactNode
}) => import('react/jsx-runtime').JSX.Element
export default ContentCard
