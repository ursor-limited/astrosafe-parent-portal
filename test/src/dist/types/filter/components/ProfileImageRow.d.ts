import { IDevice } from '../contents/common';
declare const ProfileImageRow: (props: {
    devices: {
        name: IDevice["name"];
        profileAvatarUrl: IDevice["profileAvatarUrl"];
    }[];
    totalDeviceCount: number;
}) => import("react/jsx-runtime").JSX.Element;
export default ProfileImageRow;
