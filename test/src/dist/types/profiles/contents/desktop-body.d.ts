import { IDevice } from '../../filter/contents/common';
import { IEnrichedDevice } from './common';
import { IFilter } from '../../filters/contents/common';
declare const AllDevicesPageDesktopBody: (props: {
  devices: IEnrichedDevice[];
  filters: IFilter[];
  setConnectDialogOpen: () => void;
  setRenameDeviceDialogId: (id: IDevice['id']) => void;
  setDisconnectDialogOpen: (id: IDevice['id']) => void;
}) => import('react/jsx-runtime').JSX.Element;
export default AllDevicesPageDesktopBody;
