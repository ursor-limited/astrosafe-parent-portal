import React from 'react';
import { IUser } from '../account/contents/common';
export interface IUserContext {
    user?: IUser;
    loaded: boolean;
    loading?: boolean;
    refresh?: () => void;
    clear?: () => void;
    schoolIsSubscribed?: boolean;
}
declare const useUserContext: () => IUserContext;
export interface IUserProviderProps {
    checkoutSessionId?: string;
    children: React.ReactNode;
}
declare const UserProvider: (props: IUserProviderProps) => import("react/jsx-runtime").JSX.Element;
export { UserProvider, useUserContext };
