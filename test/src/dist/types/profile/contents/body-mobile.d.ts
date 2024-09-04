import { IDevice } from '../../filter/contents/common'
import { ITitleRowItem } from '../../components/TitleRow'
import { IActionPopupItem } from '../../components/ActionPopup'
import { AstroAccountTab } from './common'
import { IEnrichedContentBucket } from '../../folders/contents/common'
declare const ProfilePageMobileBody: (props: {
  device: IDevice
  titleRow: ITitleRowItem[]
  actions: IActionPopupItem[]
  folders: IEnrichedContentBucket[]
  tab?: AstroAccountTab
  onUpdateDevice: () => void
  onUpdateFolders: () => void
  openAddFolderDialog: () => void
}) => import('react/jsx-runtime').JSX.Element
export default ProfilePageMobileBody
