import { IFilter, IFilterUrl } from '../../filters/contents/common';
export type DeviceType = 'chrome' | 'android' | 'ios';
export interface IFilterException {
    domain: string;
    title: string;
    favicon: string;
    createdAt: string;
}
export interface IDevice {
    id: number;
    name: string;
    backgroundColor: string;
    profileAvatarUrl?: string;
    lastOnline: string;
    deviceType: DeviceType;
    favorites: number[];
    requestedSites: IFilterUrl[];
    createdAt: string;
    online: boolean;
    filterId: IFilter['id'];
}
export interface IDeviceConfig {
    browsingAllowed: boolean;
    videoAllowed: boolean;
    timeLimitsEnabled: boolean;
    allowedTimesEnabled: boolean;
}
export default function FilterPage(props: {
    isMobile: boolean;
    filterId: number;
    deviceId: string;
    authUrl: string;
}): import("react/jsx-runtime").JSX.Element | null;
