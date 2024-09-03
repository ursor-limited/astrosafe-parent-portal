import { IDevice } from './../../filter/contents/common';
import { IFilter } from './../../filters/contents/common';
declare const AllDevicesPageMobileBody: (props: {
    devices: IDevice[];
    filters: IFilter[];
    setConnectDialogOpen: () => void;
    setRenameDeviceDialogId: (id: IDevice["id"]) => void;
    setDisconnectDialogOpen: (id: IDevice["id"]) => void;
}) => import("react/jsx-runtime").JSX.Element;
export default AllDevicesPageMobileBody;
