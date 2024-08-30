import React from 'react';
export declare const HIDE_SCROLLBAR: {
    '::-webkit-scrollbar': {
        display: string;
    };
};
declare const DynamicCardGrid: (props: {
    cardWidth: string;
    rowGap: string;
    columnGap: string;
    paddingRight?: string;
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export default DynamicCardGrid;
