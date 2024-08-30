import * as React from 'react';
export declare const WIDTH = "106px";
export declare const slideIn: import("@emotion/serialize").Keyframes;
export declare const slideOut: import("@emotion/serialize").Keyframes;
export type SideBarItemId = 'home' | 'classroom' | 'people' | 'teachers' | 's tudents' | 'homepages' | 'contact' | 'logout' | 'browser' | 'account' | 's earch' | 'tutorials' | 'filters' | 'apps' | 'monitor' | 'devices' | 'library' | 'plugins' | 's afety' | 'users' | 'channels' | 'moonsafe' | 'content';
export interface ISidebarItem {
    id?: SideBarItemId;
    tourId?: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    noPathFill?: boolean;
    title: string;
    callback: () => void;
    notificationCount?: number;
}
export interface ISidebarProps {
    selectedItemId: SideBarItemId;
    classroomId?: string;
}
export declare const getListButtonStyle: (selected: boolean, disabled?: boolean, center?: boolean) => {
    display?: string | undefined;
    justifyContent?: string | undefined;
    fontFamily: string;
    color: string;
    background: string | null;
    borderRadius: string;
    px: string;
    py: string;
    opacity: number;
    '&:hover': {
        background: string | null;
    };
    '&& .MuiTouchRipple-child': {
        background: string;
    };
    cursor: string;
};
export default function Sidebar(props: ISidebarProps): import("react/jsx-runtime").JSX.Element;
