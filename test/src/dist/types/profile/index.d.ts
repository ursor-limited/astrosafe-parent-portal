import { AstroAccountTab } from './contents/common';
declare const Profile: ({ props, searchParams, }: {
    props: {
        astroDeviceId: string;
        deviceId: string;
        authUrl: string;
    };
    searchParams: {
        tab: AstroAccountTab;
    };
}) => import("react/jsx-runtime").JSX.Element;
export default Profile;
