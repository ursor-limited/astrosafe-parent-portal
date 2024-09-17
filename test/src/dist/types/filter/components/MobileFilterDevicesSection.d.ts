import { IDevice } from '../contents/common';
declare const MobileFilterPageDevicesSection: (props: {
    email: string;
    devices: IDevice[];
    onAdd: () => void;
    openChangeFilterDialogForDevice: (device: IDevice) => void;
}) => import("react/jsx-runtime").JSX.Element;
export default MobileFilterPageDevicesSection;
