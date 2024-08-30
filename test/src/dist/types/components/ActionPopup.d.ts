import React from 'react';
import { IUrsorPopoverProps } from './UrsorPopover';
export declare const PopupList: (props: {
    items: IActionPopupItem[];
    closeCallback: () => void;
}) => import("react/jsx-runtime").JSX.Element;
export interface IActionPopupItem {
    text: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    kallback: () => void;
    color?: string;
}
export interface IActionPopupProps {
    open: boolean;
    items: IActionPopupItem[];
    placement?: IUrsorPopoverProps['placement'];
    disableOverflowFlip?: boolean;
    closeCallback: () => void;
    zIndex?: number;
    children: React.ReactNode;
}
export default function ActionPopup(props: IActionPopupProps): import("react/jsx-runtime").JSX.Element;
