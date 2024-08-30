import { IActionPopupItem } from './ActionPopup';
export interface IUrsorActionButtonProps {
    actions: IActionPopupItem[];
    size?: string;
    iconSize?: string;
    threeDots?: boolean;
    large?: boolean;
    light?: boolean;
    background?: string;
    fontColor?: string;
    shadow?: boolean;
    border?: boolean;
    notClickable?: boolean;
    buttonClickCallback?: () => void;
}
export default function UrsorActionButton(props: IUrsorActionButtonProps): import("react/jsx-runtime").JSX.Element;
