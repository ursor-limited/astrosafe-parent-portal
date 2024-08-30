import { AstroPlanState, IUser } from './common';
declare const AccountPageDesktopBody: (props: {
    user: IUser;
    allUsers: IUser[];
    setUpgradeDialogOpen: () => void;
    setEditDialogOpen: () => void;
    setInviteDialogOpen: () => void;
    setConnectDialogOpen: () => void;
    planState: AstroPlanState;
    onManagePlan: () => void;
}) => import("react/jsx-runtime").JSX.Element;
export default AccountPageDesktopBody;
