import { IContentCard } from './common';
import { ITitleRowItem } from '../../components/TitleRow';
import { IDevice } from '../../filter/contents/common';
import {
  AstroContent,
  IChannel,
  IContentBucket,
  ILink,
  IVideo,
} from '../../profile/components/ContentTab';
import { IActionPopupItem } from '../../components/ActionPopup';
declare const FolderPageDesktopBody: (props: {
  folderId: IContentBucket['id'];
  folder?: IContentBucket;
  contents: IContentCard[];
  allFolders: IContentBucket[];
  devices: IDevice[];
  setContentCreationDialogOpen: (type: AstroContent) => void;
  loadFolderAndContents: () => void;
  setAddDeviceDialogOpen: () => void;
  onRemoveDevice: () => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  selectedContentType: AstroContent | 'all';
  setSelectedContentType: (type: AstroContent | 'all') => void;
  setLinkEditingDialogId: (id: ILink['id']) => void;
  setVideoEditingDialogId: (id: IVideo['id']) => void;
  setChannelEditingDialogId: (id: IChannel['id']) => void;
  titleRow: ITitleRowItem[];
  actions: IActionPopupItem[];
}) => import('react/jsx-runtime').JSX.Element;
export default FolderPageDesktopBody;
