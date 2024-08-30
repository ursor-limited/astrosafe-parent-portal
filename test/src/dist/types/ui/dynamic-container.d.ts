import React from 'react';
export interface DynamicContainerProps {
    width?: string;
    duration?: number;
    children: React.ReactNode;
}
export declare function DynamicContainer(props: DynamicContainerProps): JSX.Element;
