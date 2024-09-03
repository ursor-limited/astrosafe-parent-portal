import { IDevice } from './../../filter/contents/common';
import { IContentBucket } from './../../profile/components/ContentTab';
declare const MobileDevicesSection: (props: {
    title: string;
    devices: IDevice[];
    folderId: IContentBucket["id"];
    onAdd: () => void;
    onRemove: (id: IDevice["id"]) => void;
}) => import("react/jsx-runtime").JSX.Element;
export default MobileDevicesSection;
