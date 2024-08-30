import React from 'react';
import { IActionPopupItem } from './ActionPopup';
import { IUrsorDropdownButtonProps } from './UrsorDropdown';
export declare const FONT_SIZES: {
    normal: string;
    medium: string;
};
export interface IUrsorTableColumn {
    name: string;
    displayName: string;
    getAvatar?: (id: string) => JSX.Element;
    itemDisplay?: (item: any) => string | number | JSX.Element;
    faded?: (row: any) => boolean;
    getButton?: (row: any) => IUrsorTableCellSimpleButton;
    getListButton?: (item: any) => IUrsorTableCellListButton;
    getActionButtonItems?: (id: string) => IActionPopupItem[];
    headerButton?: JSX.Element;
    checkbox?: boolean;
    sortable?: boolean;
    selectAll?: boolean;
    link?: boolean;
    newTag?: boolean;
    urlPopover?: boolean;
    noRowClick?: boolean;
    getExtraElement?: (id: string, hovering: boolean) => JSX.Element;
}
interface IUrsorTableCellButton {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
interface IUrsorTableCellSimpleButton extends IUrsorTableCellButton {
    callback: () => void;
}
interface IUrsorTableCellListButton extends IUrsorTableCellButton {
    rows: IUrsorDropdownButtonProps['rows'];
    showCount?: boolean;
}
export interface IUrsorTableRow<T extends Record<string, any>> {
    id: string;
    items: T;
    tags: string[];
    url?: string;
    newTagDatetime?: string;
    disabled: boolean;
}
export interface IUrsorTableProps<T extends Record<string, any>> {
    columns: IUrsorTableColumn[];
    rows: IUrsorTableRow<T>[];
    tagColumnName?: string;
    getActionButtonItems?: (rowId: string) => IActionPopupItem[];
    getEndButton?: (rowId: string) => JSX.Element;
    defaultSortedByColumn?: string;
    defaultSortedAscending?: boolean;
    checkboxes?: {
        checked: string[];
        callback: (id: string) => void;
        selectAllCallback: () => void;
    };
    selectedSort: string;
    ascending: boolean;
    sortSelectionCallback: (columnId: string) => void;
    rowClickCallback?: (id: string) => void;
    noHeaderGradient?: boolean;
    titleColumnWidth?: string;
}
export default function UrsorTable<T extends Record<string, any>>(props: IUrsorTableProps<T> & {
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export {};
