import { IDevice } from './../../filter/contents/common';
declare const DeviceRenameDialog: (props: {
    open: boolean;
    name: IDevice["name"];
    onClose: () => void;
    onSubmit: (name: string) => void;
    isMobile?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default DeviceRenameDialog;
