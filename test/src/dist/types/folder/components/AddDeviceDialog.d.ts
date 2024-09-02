import { IGroup } from '../contents/common';
import { IDevice } from '../../filter/contents/common';
declare const AddDeviceDialog: (props: {
  title: string;
  subtitle: string[];
  emptyText: string;
  open: boolean;
  onClose: () => void;
  onAdd: (id: IDevice['id']) => void;
  addedDevices: IDevice[];
  groupId: IGroup['id'];
  isMobile?: boolean;
}) => import('react/jsx-runtime').JSX.Element;
export default AddDeviceDialog;
