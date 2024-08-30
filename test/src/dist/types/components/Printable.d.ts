import React from 'react';
export interface IPrintableProps {
    dialogOpen: boolean;
    closeCallback: () => void;
    children: React.ReactNode;
}
export default function Printable(props: IPrintableProps): import("react/jsx-runtime").JSX.Element | null;
