import { IDevice } from '../filter/contents/common';
declare const MobileAllDevicesDialog: (props: {
    email: string;
    title: string;
    open: boolean;
    onClose: () => void;
    onAdd: () => void;
    onRemove: (id: IDevice["id"]) => void;
    devices: IDevice[];
}) => import("react/jsx-runtime").JSX.Element;
export default MobileAllDevicesDialog;
