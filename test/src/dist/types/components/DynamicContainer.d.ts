import React from 'react';
export interface IDynamicContainerProps {
    duration: number;
    children: React.ReactNode;
    fullWidth?: boolean;
}
export default function DynamicContainer(props: IDynamicContainerProps): import("react/jsx-runtime").JSX.Element;
