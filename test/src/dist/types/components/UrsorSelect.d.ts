import React from 'react';
export interface IUrsorSelectItem {
    id: string;
    value: string;
}
export interface IUrsorSelectProps {
    items: IUrsorSelectItem[];
    selected: string[];
    placeholder?: string;
    retainPlaceholder?: boolean;
    leftAlign?: boolean;
    leftAlignPopover?: boolean;
    keepOpenOnSelect?: boolean;
    width?: number | string;
    fieldWidth?: string;
    white?: boolean;
    callback: (id: string) => void;
    clearAllCallback?: () => void;
    listButtons?: {
        title: string;
        callback: () => void;
        icon: React.FC<React.SVGProps<SVGSVGElement>>;
        color?: string;
    }[];
    disabled?: boolean;
    zIndex?: number;
}
export default function UrsorSelect(props: IUrsorSelectProps): import("react/jsx-runtime").JSX.Element;
