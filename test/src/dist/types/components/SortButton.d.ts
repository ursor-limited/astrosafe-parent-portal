import React from 'react';
export interface IClassSortButtonProps<T extends string> {
    selected: T;
    types: T[];
    displayNames: {
        [id in T]: string;
    };
    callback: (sortType: T) => void;
    darkMode?: boolean;
    iconOnly?: boolean;
    width?: string;
    text?: string;
    noText?: boolean;
    disabled?: boolean;
}
declare const SortButton: <T extends string>(props: IClassSortButtonProps<T> & {
    children?: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export default SortButton;
