import { IUser } from '../contents/common';
declare const EditProfileDialog: (props: {
    open: boolean;
    name: IUser["realName"];
    nickName: IUser["displayName"];
    onSave: (name: IUser["realName"], nickname: IUser["displayName"]) => void;
    onClose: () => void;
    isMobile?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default EditProfileDialog;
