import { IDevice } from '../../filter/contents/common'
import { IContentBucket } from '../../profile/components/ContentTab'
declare const DevicesSection: (props: {
  title: string
  devices: IDevice[]
  folderId: IContentBucket['id']
  onAdd: () => void
  onRemove: () => void
  isMobile?: boolean
}) => import('react/jsx-runtime').JSX.Element
export default DevicesSection
