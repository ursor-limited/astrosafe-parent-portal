import { IDevice, IDeviceConfig } from '../../filter/contents/common';
import { IAllowedTime, ITimeLimit } from '../../profile/components/LimitsTab';
export type DeviceType = 'chrome' | 'android' | 'ios';
export type IEnrichedDevice = IDevice & {
    screenTime?: {
        allowed: number;
        current: number;
    };
    timeLimits?: ITimeLimit[];
    allowedTimes?: IAllowedTime[];
    config?: IDeviceConfig;
    latestBrowsing?: {
        url: string;
        title: string;
        faviconUrl: string;
    } | null;
};
export default function AllDevicesPage(props: {
    isMobile: boolean;
}): import("react/jsx-runtime").JSX.Element;
