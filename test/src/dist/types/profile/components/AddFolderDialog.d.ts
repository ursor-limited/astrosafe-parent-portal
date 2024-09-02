import { IDevice } from '../../filter/contents/common';
import { IGroup } from '../../folder/contents/common';
import { IEnrichedContentBucket } from '../../folders/contents/common';
declare const AddFolderDialog: (props: {
  open: boolean;
  onClose: () => void;
  onAdd: (id: IDevice['id']) => void;
  openCreateNewDialog: () => void;
  addedFolders: IEnrichedContentBucket[];
  isMobile?: boolean;
  groupId: IGroup['id'];
}) => import('react/jsx-runtime').JSX.Element;
export default AddFolderDialog;
