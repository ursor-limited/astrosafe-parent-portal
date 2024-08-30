import { IGroup } from '../../folder/contents/common';
export declare const DUMMY_USER_ID = 1;
export declare const VIBRANT_GRADIENT: string;
export interface IUser {
    id: number;
    realName: string;
    displayName: string;
    email: string;
    groupId: IGroup['id'];
    createdAt: string;
}
export type AstroPlanState = 'freeTrial' | 'troomi';
export declare const PLAN_DISPLAY_NAMES: Record<AstroPlanState, string>;
export declare const PLAN_BANNER_ITEMS: Record<AstroPlanState, {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    text: string;
}[]>;
export declare const getInitials: (name: string) => string;
export declare const UserInitialsCircle: (props: {
    name: IUser["realName"];
    size?: number;
    fontSize?: number;
}) => import("react/jsx-runtime").JSX.Element;
declare const AccountPage: (props: {
    isMobile: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default AccountPage;
