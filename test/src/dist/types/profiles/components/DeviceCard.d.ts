import { DeviceType } from '../../filter/contents/common';
import { IFilterUrl } from './../../filters/contents/common';
export declare const DEVICE_TYPE_DISPLAY_NAMES: Record<DeviceType, string>;
export declare const DeviceCardSection: (props: {
    title: string;
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const DeviceCardBrowsingStatusSection: (props: {
    browsingEnabled: boolean;
    flipBrowsingEnabled: () => void;
}) => import("react/jsx-runtime").JSX.Element;
export declare const DeviceCardScreenTimeSection: (props: {
    totalTime: number;
    elapsedTime: number;
    onClickView: () => void;
}) => import("react/jsx-runtime").JSX.Element;
export declare const DeviceCardCurrentUrlSection: (props: {
    url?: IFilterUrl["url"];
    title?: IFilterUrl["title"];
    disabled?: "offline" | "browsingDisabled";
    faviconUrl?: IFilterUrl["imageUrl"];
}) => import("react/jsx-runtime").JSX.Element;
interface DeviceCardProps {
    email: string;
    deviceId: string;
    small?: boolean;
    noExtras?: boolean;
    onClick?: () => void;
    onFilterClick?: () => void;
    onClickView?: () => void;
    gotoDeviceOnClick?: () => void;
    onClickOpen?: () => void;
}
declare const DeviceCard: React.FC<DeviceCardProps>;
export default DeviceCard;
