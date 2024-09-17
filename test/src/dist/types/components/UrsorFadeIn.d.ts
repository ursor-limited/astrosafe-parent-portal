import React from 'react';
export declare const FULL_SIZE_CLASSNAME = "fullSize";
export interface IUrsorFadeInProps {
    duration?: number;
    delay?: number;
    fullWidth?: boolean;
    fullHeight?: boolean;
    centerAlign?: boolean;
    children: React.ReactNode;
}
export default function UrsorFadeIn(props: IUrsorFadeInProps): import("react/jsx-runtime").JSX.Element;
