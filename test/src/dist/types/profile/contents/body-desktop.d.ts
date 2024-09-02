import { ITitleRowItem } from '../../components/TitleRow';
import { IActionPopupItem } from '../../components/ActionPopup';
import { AstroAccountTab } from './common';
import { IEnrichedContentBucket } from '../../folders/contents/common';
import { IEnrichedDevice } from '../../profiles/contents/common';
declare const ProfilePageDesktopBody: (props: {
  device: IEnrichedDevice;
  titleRow: ITitleRowItem[];
  actions: IActionPopupItem[];
  folders: IEnrichedContentBucket[];
  tab?: AstroAccountTab;
  onUpdateDevice: () => void;
  onUpdateFolders: () => void;
  openAddFolderDialog: () => void;
}) => import('react/jsx-runtime').JSX.Element;
export default ProfilePageDesktopBody;
