import React from 'react';
export declare const X_PADDING = "20px";
interface IUrsorDropdownRowProps {
    value: string;
    secondaryValue?: string;
    icon?: JSX.Element;
    hovering?: boolean;
}
export declare function UrsorDropdownListRow(props: IUrsorDropdownRowProps): import("react/jsx-runtime").JSX.Element;
export declare function UrsorDropdownListHeader(props: {
    title: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function UrsorDropdownList(props: {
    rows: (Pick<IUrsorDropdownRowProps, 'value' | 'secondaryValue' | 'icon'> & {
        id: string;
        callback: () => void;
    })[];
}): import("react/jsx-runtime").JSX.Element;
export interface IUrsorDropdownButtonProps {
    rows: (Pick<IUrsorDropdownRowProps, 'value' | 'secondaryValue' | 'icon'> & {
        id: string;
        callback: () => void;
    })[];
    children: React.ReactNode;
}
export declare function UrsorDropdownButton(props: IUrsorDropdownButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
