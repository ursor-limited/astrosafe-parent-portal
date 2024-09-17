import { IDevice } from '../contents/common';
declare const FilterPageDevicesSection: (props: {
    devices: IDevice[];
    onAdd: () => void;
    onRemove: () => void;
    openChangeFilterDialogForDevice: (device: IDevice) => void;
}) => import("react/jsx-runtime").JSX.Element;
export default FilterPageDevicesSection;
