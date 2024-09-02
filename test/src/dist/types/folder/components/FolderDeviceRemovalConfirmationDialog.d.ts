import { IDevice } from '../../filter/contents/common';
declare const FolderDeviceRemovalConfirmationDialog: (props: {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  deviceName: IDevice['name'];
  isMobile?: boolean;
}) => import('react/jsx-runtime').JSX.Element;
export default FolderDeviceRemovalConfirmationDialog;
