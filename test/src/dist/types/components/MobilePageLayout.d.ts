import { IActionPopupItem } from './ActionPopup';
import React from 'react';
import { AstroPage } from './MobileSideBar';
import { ITitleRowItem } from './TitleRow';
import { IInfoButtonProps } from './InfoButton';
declare const MobilePageLayout: (props: {
    title?: string;
    titleRow?: ITitleRowItem;
    info?: IInfoButtonProps;
    actions?: IActionPopupItem[];
    topRightElement?: React.ReactNode;
    selectedPage: AstroPage;
    header?: React.ReactNode;
    titleBackButtonCallback?: () => void;
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export default MobilePageLayout;
