import React from 'react';
export interface IAstroSettingCardProps {
    title: string;
    subtitle?: string;
    image?: React.ReactNode;
    rightContent?: React.ReactNode;
    textColor?: string;
}
declare const AstroSettingCard: (props: IAstroSettingCardProps) => import("react/jsx-runtime").JSX.Element;
export default AstroSettingCard;
