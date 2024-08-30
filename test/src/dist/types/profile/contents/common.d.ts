export type DeviceType = 'chrome' | 'android' | 'ios';
export type AstroAccountTab = 'content' | 'insights' | 'apps' | 'limits';
export default function ProfilePage(props: {
    deviceId: number;
    isMobile: boolean;
    tab?: AstroAccountTab;
}): import("react/jsx-runtime").JSX.Element;
